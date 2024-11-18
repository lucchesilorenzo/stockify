"use client";

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
import { formatDate, formatOrderId } from "@/lib/utils";

export default function OrderInvoice() {
  const { isInvoiceOpen, handleCloseInvoice, order } = useInvoice();

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
    <Card className="overflow-hidden relative">
      <Button
        className="absolute top-3 right-3 p-1 bg-transparent border-none"
        onClick={handleCloseInvoice}
        aria-label="Close invoice"
        variant="link"
      >
        <X className="h-6 w-6 text-muted-foreground hover:text-foreground transition" />
      </Button>
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-xl">
            Order # {formatOrderId(order)}
          </CardTitle>
          <CardDescription>Date: {formatDate(order.createdAt)}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="font-semibold">Order Details</div>
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
            {formatDate(order.updatedAt)}
          </time>
        </div>
      </CardFooter>
    </Card>
  );
}
