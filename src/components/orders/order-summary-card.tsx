import { Order } from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

type OrderSummaryCardProps = {
  type: "month" | "week";
  orders: Order[];
};

export default function OrderSummaryCard({
  type,
  orders,
}: OrderSummaryCardProps) {
  const totalOrdersLength = orders.length;
  const totalOrders = orders.reduce(
    (curr, order) => curr + order.totalPrice,
    0,
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>
          This {type === "month" ? "Month" : "Week"}
        </CardDescription>
        <CardTitle className="text-4xl">
          {formatCurrency(totalOrders)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Orders this {type === "month" ? "month" : "week"}:
          <span className="ml-1 text-lg font-medium">{totalOrdersLength}</span>
        </div>
      </CardContent>
    </Card>
  );
}
