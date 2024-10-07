"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import {
  checkIfProductHasOrder,
  createNewOrder,
  createNewProduct,
  deleteProductById,
  getProductById,
  getProductOptions,
  updateProductQuantity,
} from "./server-utils";
import {
  orderFormSchema,
  productFormSchema,
  productIdSchema,
} from "./validations";

// --- Products ---

export async function addProduct(product: unknown) {
  const validatedProduct = productFormSchema.safeParse(product);
  if (!validatedProduct.success) {
    return { message: "Invalid product." };
  }

  // Create a new product with slug
  const newProduct = {
    ...validatedProduct.data,
    slug: slugify(validatedProduct.data.name, { lower: true }),
  };

  try {
    await createNewProduct(newProduct);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Product already exists." };
      }
    }
    return { message: "Failed to create product." };
  }

  revalidatePath("/app/products");
}

export async function deleteProduct(productId: unknown) {
  const validatedProductId = productIdSchema.safeParse(productId);
  if (!validatedProductId.success) {
    return { message: "Invalid product ID." };
  }

  // Checks if product has an order
  const productHasOrder = await checkIfProductHasOrder(validatedProductId.data);
  if (productHasOrder) {
    return { message: "You cannot delete a product that has an order!" };
  }

  try {
    await deleteProductById(validatedProductId.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { message: "Product not found." };
      }
    }
    return { message: "Failed to delete product." };
  }

  revalidatePath("/app/products");
}

// --- Orders ---

export async function createOrder(order: unknown) {
  const validatedOrder = orderFormSchema.safeParse(order);
  if (!validatedOrder.success) {
    return { message: "Invalid order data." };
  }

  // Checks if product exists
  const product = await getProductById(validatedOrder.data.productId);
  if (!product) return { message: "Product not found." };

  // Checks if quantity is present
  const options = await getProductOptions(validatedOrder.data.productId);
  if (!options) return { message: "Options not found." };

  // Checks if quantity is valid
  const orderedQuantity = validatedOrder.data.quantity;
  const currentQuantity = options.quantity;
  const maxQuantity = options.maxQuantity;
  const minQuantity = options.minQuantity;

  if (orderedQuantity > maxQuantity) {
    return { message: "Quantity is too large." };
  } else if (orderedQuantity < minQuantity) {
    return { message: "Quantity is too small." };
  } else if (orderedQuantity + currentQuantity > maxQuantity) {
    return { message: "You can't order more than Max Quantity." };
  }

  // Calculate order details
  const subtotal = orderedQuantity * options.price;
  const shipping = subtotal > 100 ? 0 : 5;
  const tax = +(subtotal * 0.22).toFixed(2);
  const totalPrice = +(subtotal + shipping + tax).toFixed(2);

  const orderDetails = {
    productId: validatedOrder.data.productId,
    quantity: orderedQuantity,
    subtotal,
    shipping,
    tax,
    totalPrice,
  };

  // Create order
  try {
    await createNewOrder(orderDetails);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Order already exists." };
      }
    }
    return { message: "Failed to create order." };
  }

  // Update product quantity
  try {
    await updateProductQuantity(
      validatedOrder.data.productId,
      validatedOrder.data.quantity,
    );
  } catch {
    return { message: "Failed to update product quantity." };
  }

  revalidatePath("/app/orders");
}
