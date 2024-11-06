import { Product, RestockOrder } from "@prisma/client";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";

import prisma from "../db";
import { RestockOrderEssentials } from "../types";

export async function getOrders() {
  const orders = await prisma.restockOrder.findMany({
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
  const productHasOrder = await prisma.restockOrder.findFirst({
    where: {
      productId,
    },
  });

  return productHasOrder;
}

export async function createNewOrder(orderDetails: RestockOrderEssentials) {
  const newOrder = await prisma.restockOrder.create({
    data: orderDetails,
  });

  return newOrder;
}

export async function getMonthlyOrders() {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  const ordersThisMonth = await prisma.restockOrder.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });

  return ordersThisMonth;
}

export async function getWeeklyOrders() {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });

  const ordersLastWeek = await prisma.restockOrder.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });

  return ordersLastWeek;
}

export async function updateOrderStatus(orderId: RestockOrder["id"]) {
  const updatedOrder = await prisma.restockOrder.update({
    where: {
      id: orderId,
    },
    data: {
      status: "Completed",
    },
  });

  return updatedOrder;
}
