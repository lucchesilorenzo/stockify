import prisma from "../db";
import { ActivityEssentials } from "../types";

export async function getInventoryValue() {
  const products = await prisma.product.findMany({
    where: {
      status: "In Stock",
      orders: {
        every: {
          status: "Delivered",
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
      status: "In Stock",
      orders: {
        every: {
          status: "Delivered",
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
      status: "Shipped",
    },
  });

  return shippedOrders;
}

export async function getUnitsInStock() {
  const unitsInStock = await prisma.product.findMany({
    where: {
      orders: {
        every: {
          status: "Delivered",
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

export async function getRecentActivities() {
  const recentActivities = await prisma.activity.findMany();

  return recentActivities;
}

export async function createActivity(activity: ActivityEssentials) {
  const newActivity = await prisma.activity.create({
    data: activity,
  });

  return newActivity;
}
