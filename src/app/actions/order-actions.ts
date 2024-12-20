"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { getCategory } from "@/lib/queries/category-queries";
import { createActivity } from "@/lib/queries/dashboard-queries";
import { createOrder, updateOrderStatus } from "@/lib/queries/order-queries";
import {
  createProduct,
  getProductById,
  getProductOptions,
  updateProductQuantityAndStatus,
} from "@/lib/queries/product-queries";
import {
  getWarehouse,
  updateWarehouseQuantity,
} from "@/lib/queries/warehouse-queries";
import { ActivityEssentials } from "@/lib/types";
import { checkAuth, generateSKU, generateSlug } from "@/lib/utils";
import {
  orderFormSchema,
  orderIdSchema,
  restockOrderFormSchema,
} from "@/lib/validations/order-validations";

export async function createOrderAction(order: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation
  const validatedOrder = orderFormSchema.safeParse(order);
  if (!validatedOrder.success) {
    return { message: "Invalid form data." };
  }

  // Check if there is enough space in the warehouse
  const warehouse = await getWarehouse(validatedOrder.data.warehouseId);
  if (!warehouse) return { message: "Warehouse not found." };

  if (
    validatedOrder.data.quantity + warehouse.quantity >
    warehouse.maxQuantity
  ) {
    return {
      message: `There is not enough space in the warehouse: ${warehouse.name}.`,
    };
  }

  // Get category
  const category = await getCategory(validatedOrder.data.categoryId);
  if (!category) return { message: "Category not found." };

  // Destructure order data
  const { supplierId, vatRate, ...productData } = validatedOrder.data;

  // Generate SKU and slug
  const sku = generateSKU({
    category: category.name,
    name: validatedOrder.data.name,
  });
  const slug = generateSlug(validatedOrder.data.name);

  // Create a new product
  const productVatRate = Number(vatRate);
  const newProduct = { ...productData, vatRate: productVatRate, sku, slug };

  let product;

  try {
    product = await createProduct(newProduct);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "A product with this name or SKU already exists." };
      }
    }
    return { message: "Failed to create product." };
  }

  // Calculate order details
  const subtotal = validatedOrder.data.quantity * product.price;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const vat = Number((subtotal * (productVatRate / 100)).toFixed(2));
  const totalPrice = Number((subtotal + shipping + vat).toFixed(2));

  const orderDetails = {
    productId: product.id,
    supplierId,
    userId: session.user.id,
    type: "NEW",
    quantity: validatedOrder.data.quantity,
    subtotal,
    shipping,
    vat,
    totalPrice,
  };

  // Create a new order
  try {
    await createOrder(orderDetails);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Order already exists." };
      }
    }
    return { message: "Failed to create order." };
  }

  // Update warehouse quantity
  try {
    await updateWarehouseQuantity(warehouse.id, validatedOrder.data.quantity);
  } catch {
    return { message: "Failed to update warehouse quantity." };
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "CREATED",
    entity: "Order",
    product: validatedOrder.data.name,
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/products");
}

export async function createRestockOrderAction(restockOrder: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation
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

  // Check if there is enough space in the warehouse
  const warehouse = await getWarehouse(product.warehouseId);
  if (!warehouse) return { message: "Warehouse not found." };

  if (
    validatedRestockOrder.data.quantity + warehouse.quantity >
    warehouse.maxQuantity
  ) {
    return {
      message: `There is not enough space in the warehouse: ${warehouse.name}.`,
    };
  }

  // Get category
  const category = await getCategory(product.categoryId);
  if (!category) return { message: "Category not found." };

  // Check if quantity is valid
  const orderedQuantity = validatedRestockOrder.data.quantity;
  const currentQuantity = options.quantity;
  const maxQuantity = options.maxQuantity;

  switch (true) {
    case orderedQuantity <= 0:
      return {
        message: "The selected quantity must be at least 1.",
      };
    case currentQuantity >= maxQuantity:
      return {
        message:
          "You cannot order more units of this product. The maximum quantity is already reached.",
      };
    case orderedQuantity + currentQuantity > maxQuantity:
      return {
        message: `The total quantity cannot exceed the maximum limit of ${maxQuantity}. Please select a quantity no greater than ${maxQuantity - currentQuantity}.`,
      };
  }

  // Calculate order details
  const subtotal = orderedQuantity * options.price;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const vat = Number((subtotal * (product.vatRate / 100)).toFixed(2));
  const totalPrice = Number((subtotal + shipping + vat).toFixed(2));

  const orderDetails = {
    productId: validatedRestockOrder.data.productId,
    supplierId: validatedRestockOrder.data.supplierId,
    userId: session.user.id,
    type: "RESTOCK",
    quantity: orderedQuantity,
    subtotal,
    shipping,
    vat,
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

  // Update warehouse quantity
  try {
    await updateWarehouseQuantity(
      warehouse.id,
      validatedRestockOrder.data.quantity,
    );
  } catch {
    return { message: "Failed to update warehouse quantity." };
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "CREATED",
    entity: "Restock",
    product: product.name,
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/orders");
}

export async function updateOrderStatusAction(orderId: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation
  const validatedOrderId = orderIdSchema.safeParse(orderId);
  if (!validatedOrderId.success) {
    return { message: "Invalid order ID." };
  }

  // Update order status
  try {
    await updateOrderStatus(validatedOrderId.data);
  } catch {
    return { message: "Failed to update order status." };
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "UPDATED",
    entity: "Order",
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/orders");
}
