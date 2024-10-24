import { format } from "date-fns";

import { COLORS } from "../constants";
import prisma from "../db";

import { ChartConfig } from "@/components/ui/chart";

export async function getProductsByCategory() {
  // Get products by category
  const productsByCategory = await prisma.category.findMany({
    include: {
      products: true,
    },
  });

  // Map products by category, returning category name and number of products
  const pieChartData = productsByCategory.map((category, index) => ({
    category: category.name,
    products: category.products.length,
    fill: `hsl(${COLORS[index % COLORS.length]}`,
  }));

  // Take pieChartData and return pieChartConfig with category name and color
  const pieChartConfig = pieChartData.reduce((config, data) => {
    config[data.category] = {
      label: data.category,
      color: data.fill,
    };

    return config;
  }, {} as ChartConfig);

  return { pieChartData, pieChartConfig };
}

export async function getInventoryValueByMonth() {
  const inventoryData = await prisma.product.findMany({
    select: {
      price: true,
      quantity: true,
      updatedAt: true,
    },
    where: {
      status: "Available",
    },
  });

  const inventoryByMonthObj = inventoryData.reduce(
    (total, { price, quantity, updatedAt }) => {
      // Get month name from updatedAt
      const month = format(updatedAt, "MMMM");
      const value = price * quantity;

      // Add value to corresponding month if it exists, otherwise set value to 0
      total[month] = (total[month] || 0) + value;

      return total;
    },
    {} as Record<string, number>,
  );

  // Convert object to array of objects with month and value properties
  const inventoryValueByMonth = Object.entries(inventoryByMonthObj).map(
    ([month, value]) => ({
      month,
      value,
    }),
  );

  return inventoryValueByMonth;
}

export async function getTopProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: "Available",
    },
    select: {
      name: true,
      quantity: true,
      price: true,
    },
  });

  // Get top 5 products
  const topProducts = products
    .map(({ name, quantity, price }) => ({
      product: name,
      value: quantity * price,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return topProducts;
}