import { Product } from "@prisma/client";
import "server-only";

import prisma from "../db";
import { OrderEssentials } from "../types";

export async function getOrders() {
  const orders = await prisma.order.findMany({
    include: {
      product: {
        select: {
          name: true,
        },
      },
    },
  });

  return orders;
}

export async function checkIfProductHasOrder(productId: Product["id"]) {
  const productHasOrder = await prisma.order.findFirst({
    where: {
      productId,
    },
  });

  return productHasOrder;
}

export async function createNewOrder(orderDetails: OrderEssentials) {
  const newOrder = await prisma.order.create({
    data: orderDetails,
  });

  return newOrder;
}

export async function getMonthlyOrders() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);

  const ordersThisMonth = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

  return ordersThisMonth;
}
