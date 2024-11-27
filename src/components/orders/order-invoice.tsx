"use client";

import { format } from "date-fns";
import { X } from "lucide-react";

import { Button } from "../ui/button";
import OrderInvoiceItem from "./order-invoice-item";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInvoice } from "@/hooks/use-invoice";
import { formatOrderId } from "@/lib/utils";

export default function OrderInvoice() {
  const { isInvoiceOpen, order, handleCloseInvoice } = useInvoice();

  if (!isInvoiceOpen || !order) return null;

  const orderInvoiceData = [
    {
      id: 1,
      label: `${order.product.name} x ${order.quantity}`,
      amount: order.subtotal,
    },
    { id: 2, label: "Subtotal", amount: order.subtotal },
    { id: 3, label: "Shipping", amount: order.shipping },
    { id: 4, label: "Tax", amount: order.tax },
    { id: 5, label: "Total", amount: order.totalPrice },
  ];

  return (
    <Card className="relative overflow-hidden">
      <Button
        className="absolute right-2 top-2 border-none bg-transparent p-1"
        onClick={handleCloseInvoice}
        aria-label="Close invoice"
        variant="link"
      >
        <X className="h-6 w-6 text-muted-foreground transition hover:text-foreground" />
      </Button>
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order # {formatOrderId(order)}
          </CardTitle>
          <CardDescription>
            Date: {format(order.createdAt, "PPP")} <br />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-1 font-semibold">Order Details</div>
        <ul className="grid gap-3">
          {orderInvoiceData.map((item) => (
            <OrderInvoiceItem key={item.id} item={item} />
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated{" "}
          <time dateTime={order.updatedAt.toISOString()}>
            {format(order.updatedAt, "PPP")} <br />
          </time>
        </div>
      </CardFooter>
    </Card>
  );
}
