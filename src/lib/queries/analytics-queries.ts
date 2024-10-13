import { COLORS } from "../constants";
import prisma from "../db";

import { ChartConfig } from "@/components/ui/chart";

export async function getProductsByCategory() {
  // Gets products by category
  const productsByCategory = await prisma.category.findMany({
    include: {
      products: true,
    },
  });

  // Maps products by category, returning category name and number of products
  const pieChartData = productsByCategory.map((category, index) => ({
    category: category.name,
    products: category.products.length,
    fill: `hsl(${COLORS[index % COLORS.length]}`,
  }));

  // Takes pieChartData and returns pieChartConfig with category name and color
  const pieChartConfig = pieChartData.reduce((config, data) => {
    config[data.category] = {
      label: data.category,
      color: data.fill,
    };
    return config;
  }, {} as ChartConfig);

  return { pieChartData, pieChartConfig };
}
