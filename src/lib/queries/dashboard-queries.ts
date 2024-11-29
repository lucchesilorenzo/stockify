import prisma from "../db";
import { ActivityEssentials } from "../types";

export async function getInventoryValue() {
  const products = await prisma.product.findMany({
    where: {
      status: "IN_STOCK",
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
    },
    select: {
      quantity: true,
      price: true,
    },
  });

  const inventoryValue = products.reduce(
    (total, { quantity, price }) => total + quantity * price,
    0,
  );

  return inventoryValue;
}

export async function getLowStockProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: "IN_STOCK",
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
    },
    select: {
      quantity: true,
    },
  });

  const lowStockProducts = products.filter(
    ({ quantity }) => quantity <= 10,
  ).length;

  return lowStockProducts;
}

export async function getShippedOrders() {
  const shippedOrders = await prisma.order.count({
    where: {
      status: "SHIPPED",
    },
  });

  return shippedOrders;
}

export async function getUnitsInStock() {
  const unitsInStock = await prisma.product.findMany({
    where: {
      orders: {
        every: {
          status: "DELIVERED",
        },
      },
    },
    select: {
      quantity: true,
    },
  });

  const totalUnitsInStock = unitsInStock.reduce(
    (total, { quantity }) => total + quantity,
    0,
  );

  return totalUnitsInStock;
}

export async function getActivities() {
  const recentActivities = await prisma.activity.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return recentActivities;
}

export async function createActivity(activity: ActivityEssentials) {
  const newActivity = await prisma.activity.create({
    data: activity,
  });

  return newActivity;
}
