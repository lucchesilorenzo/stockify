import { format } from "date-fns";

import { COLORS } from "../constants";
import prisma from "../db";

import { ChartConfig } from "@/components/ui/chart";

export async function getProductsByCategory() {
  // Get products grouped by category
  const productsByCategory = await prisma.category.findMany({
    include: {
      products: {
        where: {
          status: "In Stock",
        },
        select: {
          quantity: true,
        },
      },
    },
  });

  // Map products by category, returning category name, number of products units and color
  const pieChartData = productsByCategory.map((category, index) => ({
    category: category.name,
    units: category.products.reduce(
      (total, product) => total + product.quantity,
      0,
    ),
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
    where: {
      status: "In Stock",
    },
    select: {
      price: true,
      quantity: true,
      updatedAt: true,
    },
  });

  const inventoryByMonthObj = inventoryData.reduce(
    (total, { price, quantity, updatedAt }) => {
      const month = format(updatedAt, "MMMM");
      const value = price * quantity;

      total[month] = (total[month] || 0) + value;

      return total;
    },
    {} as Record<string, number>,
  );

  const sortedMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const inventoryValueByMonth = sortedMonths.map((month) => ({
    month,
    value: inventoryByMonthObj[month] || 0,
  }));

  return inventoryValueByMonth;
}

export async function getTopProducts() {
  const products = await prisma.product.findMany({
    where: {
      status: "In Stock",
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
