"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createActivity } from "@/lib/queries/dashboard-queries";
import { createNewOrder, updateOrderStatus } from "@/lib/queries/order-queries";
import {
  getProductById,
  getProductOptions,
  updateProductQuantityAndStatus,
} from "@/lib/queries/product-queries";
import { ActivityEssentials } from "@/lib/types";
import {
  orderFormSchema,
  orderStatusSchema,
} from "@/lib/validations/order-validations";

export async function createOrderAction(order: unknown) {
  const validatedOrder = orderFormSchema.safeParse(order);
  if (!validatedOrder.success) {
    return { message: "Invalid order data." };
  }

  // Check if product exists
  const product = await getProductById(validatedOrder.data.productId);
  if (!product) return { message: "Product not found." };

  // Check if quantity is present
  const options = await getProductOptions(validatedOrder.data.productId);
  if (!options) return { message: "Options not found." };

  // Check if quantity is valid
  const orderedQuantity = validatedOrder.data.quantity;
  const currentQuantity = options.quantity;
  const maxQuantity = options.maxQuantity;
  const minQuantity = options.minQuantity;

  if (orderedQuantity > maxQuantity) {
    return {
      message: `The selected quantity cannot exceed the maximum limit of ${maxQuantity}.`,
    };
  } else if (orderedQuantity < minQuantity) {
    return {
      message: `The selected quantity must be at least ${minQuantity}.`,
    };
  } else if (orderedQuantity + currentQuantity > maxQuantity) {
    return {
      message: `The total quantity cannot exceed the maximum limit of ${maxQuantity}. Please select a quantity no greater than ${maxQuantity - currentQuantity}.`,
    };
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
    await updateProductQuantityAndStatus(
      validatedOrder.data.productId,
      validatedOrder.data.quantity,
    );
  } catch {
    return { message: "Failed to update product quantity." };
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "Created",
    entity: "Order",
    product: product.name,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/orders");
}

export async function updateOrderStatusAction(newOrderData: unknown) {
  // Validation
  const validatedOrderData = orderStatusSchema.safeParse(newOrderData);
  if (!validatedOrderData.success) return { message: "Invalid order data." };

  // Update order status
  try {
    await updateOrderStatus(validatedOrderData.data.id);
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
