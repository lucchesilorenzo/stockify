"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderWithProduct } from "@/lib/types";

type OrderSummaryCardProps = {
  orders: OrderWithProduct[];
};

export default function OrderSummaryCard({ orders }: OrderSummaryCardProps) {
  const totalOrderPrice = orders
    .reduce((total, order) => total + order.totalPrice, 0)
    .toFixed(2);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>Total Orders</CardDescription>
        <CardTitle className="text-4xl">{`$${totalOrderPrice}`}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent>
    </Card>
  );
}
