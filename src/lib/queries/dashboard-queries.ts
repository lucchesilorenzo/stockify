import prisma from "../db";
import { ActivityEssentials } from "../types";

export async function getInventoryValue() {
  const products = await prisma.product.findMany({
    where: {
      status: "Available",
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
      status: "Available",
    },
    select: {
      quantity: true,
      minQuantity: true,
    },
  });

  const lowStockProducts = products.filter(
    ({ quantity, minQuantity }) => quantity <= minQuantity,
  ).length;

  return lowStockProducts;
}

export async function getPendingOrders() {
  const pendingOrders = await prisma.order.count({
    where: {
      status: "Pending",
    },
  });

  return pendingOrders;
}

export async function getAvailableProducts() {
  const availableProducts = await prisma.product.count({
    where: {
      status: "Available",
    },
  });

  return availableProducts;
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