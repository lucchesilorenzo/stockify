"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { getCategory } from "@/lib/queries/category-queries";
import { createActivity } from "@/lib/queries/dashboard-queries";
import { createOrder, updateOrderStatus } from "@/lib/queries/order-queries";
import {
  createProduct,
  findDeletedProductByName,
  getProductById,
  getProductOptions,
  restoreProductById,
  updateProductQuantityAndStatus,
} from "@/lib/queries/product-queries";
import { ActivityEssentials } from "@/lib/types";
import { createSlug, generateSKU } from "@/lib/utils";
import {
  orderFormSchema,
  orderStatusSchema,
  restockOrderFormSchema,
} from "@/lib/validations/order-validations";

export async function createOrderAction(order: unknown) {
  // Validation
  const validatedOrder = orderFormSchema.safeParse(order);
  if (!validatedOrder.success) {
    return { message: "Invalid form data." };
  }

  // Get category name
  const category = await getCategory(validatedOrder.data.categoryId);
  if (!category) return { message: "Category not found." };

  // Destructure order data
  const { supplierId, ...productData } = validatedOrder.data;

  // Generate sku and slug
  const sku = generateSKU({
    category: category.name,
    name: validatedOrder.data.name,
  });
  const slug = createSlug(validatedOrder.data.name);

  // Check if product was archived
  let product = await findDeletedProductByName(validatedOrder.data.name);

  // Restore product
  if (product) {
    product = await restoreProductById(product.id);
  } else {
    // Create a new product
    const newProduct = {
      ...productData,
      sku,
      slug,
      deletedAt: null,
    };

    product = await createProduct(newProduct);
  }

  // Calculate order details
  const subtotal = validatedOrder.data.quantity * product.price;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = Number((subtotal * 0.22).toFixed(2));
  const totalPrice = Number((subtotal + shipping + tax).toFixed(2));

  const orderDetails = {
    productId: product.id,
    supplierId,
    type: "New",
    quantity: validatedOrder.data.quantity,
    subtotal,
    shipping,
    tax,
    totalPrice,
  };

  // Create a new order
  try {
    await createOrder(orderDetails);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Product or order already exists." };
      }
    }
    return { message: "Failed to create product or order." };
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Created",
    entity: "Order",
    product: validatedOrder.data.name,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/products");
}

export async function createRestockOrderAction(restockOrder: unknown) {
  const validatedRestockOrder = restockOrderFormSchema.safeParse(restockOrder);
  if (!validatedRestockOrder.success) {
    return { message: "Invalid form data." };
  }

  // Check if product exists
  const product = await getProductById(validatedRestockOrder.data.productId);
  if (!product) return { message: "Product not found." };

  // Check if quantity is present
  const options = await getProductOptions(validatedRestockOrder.data.productId);
  if (!options) return { message: "Options not found." };

  // Check if quantity is valid
  const orderedQuantity = validatedRestockOrder.data.quantity;
  const currentQuantity = options.quantity;
  const maxQuantity = options.maxQuantity;

  if (orderedQuantity <= 0) {
    return {
      message: "The selected quantity must be at least 1.",
    };
  } else if (currentQuantity >= maxQuantity) {
    return {
      message:
        "You cannot order more units of this product. The maximum quantity is already reached.",
    };
  } else if (orderedQuantity + currentQuantity > maxQuantity) {
    return {
      message: `The total quantity cannot exceed the maximum limit of ${maxQuantity}. Please select a quantity no greater than ${maxQuantity - currentQuantity}.`,
    };
  }

  // Calculate order details
  const subtotal = orderedQuantity * options.price;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = Number((subtotal * 0.22).toFixed(2));
  const totalPrice = Number((subtotal + shipping + tax).toFixed(2));

  const orderDetails = {
    productId: validatedRestockOrder.data.productId,
    supplierId: validatedRestockOrder.data.supplierId,
    type: "Restock",
    quantity: orderedQuantity,
    subtotal,
    shipping,
    tax,
    totalPrice,
  };

  // Create restock order
  try {
    await createOrder(orderDetails);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Restock order already exists." };
      }
    }
    return { message: "Failed to create restock order." };
  }

  // Update product quantity
  try {
    await updateProductQuantityAndStatus(
      validatedRestockOrder.data.productId,
      validatedRestockOrder.data.quantity,
    );
  } catch {
    return { message: "Failed to update product quantity." };
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "Created",
    entity: "Restock",
    product: product.name,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/orders");
}

export async function updateOrderStatusAction(order: unknown) {
  // Validation
  const validatedOrder = orderStatusSchema.safeParse(order);
  if (!validatedOrder.success) {
    return { message: "Invalid order data." };
  }

  // Update order status
  try {
    await updateOrderStatus(validatedOrder.data.id);
  } catch {
    return { message: "Failed to update order status." };
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "Updated",
    entity: "Order",
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/orders");
}
