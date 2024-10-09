"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createNewOrder } from "@/lib/queries/order-queries";
import {
  getProductById,
  getProductOptions,
  updateProductQuantity,
} from "@/lib/queries/product-queries";
import { orderFormSchema } from "@/lib/validations/order-validations";

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
