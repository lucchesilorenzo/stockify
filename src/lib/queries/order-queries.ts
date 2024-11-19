import { Order } from "@prisma/client";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";

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
      supplier: {
        select: {
          name: true,
        },
      },
    },
  });

  return orders;
}

export async function createOrder(orderDetails: OrderEssentials) {
  const newOrder = await prisma.order.create({
    data: orderDetails,
  });

  return newOrder;
}

export async function getMonthlyOrders() {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  const ordersThisMonth = await prisma.order.findMany({
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

  const ordersLastWeek = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: start,
        lt: end,
      },
    },
  });

  return ordersLastWeek;
}

export async function updateOrderStatus(orderId: Order["id"]) {
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "Completed",
    },
  });

  return updatedOrder;
}
