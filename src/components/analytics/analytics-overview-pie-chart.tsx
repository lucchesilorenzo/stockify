"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type AnalyticsOverviewPieChartProps = {
  pieChartData: {
    category: string;
    products: number;
  }[];
  pieChartConfig: ChartConfig;
};

export default function AnalyticsOverviewPieChart({
  pieChartData,
  pieChartConfig,
}: AnalyticsOverviewPieChartProps) {
  const productsTotal = pieChartData.reduce(
    (total, item) => total + item.products,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Categories</CardTitle>
        <CardDescription>Distribution of products by category</CardDescription>
      </CardHeader>
      <CardContent>
        {!productsTotal ? (
          <p className="text-center">No results.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <ChartContainer config={pieChartConfig}>
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend
                  content={<ChartLegendContent />}
                  className="flex flex-wrap"
                />
                <Pie
                  data={pieChartData}
                  nameKey="category"
                  dataKey="products"
                />
              </PieChart>
            </ChartContainer>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}