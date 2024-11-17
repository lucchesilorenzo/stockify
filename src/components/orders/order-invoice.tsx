"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useInvoice } from "@/hooks/use-invoice";
import { formatCurrency, formatDate, formatOrderId } from "@/lib/utils";

export default function OrderInvoice() {
  const { isInvoiceOpen, order } = useInvoice();

  if (!isInvoiceOpen || !order) return null;

  const {
    createdAt,
    totalPrice,
    updatedAt,
    quantity,
    product,
    subtotal,
    tax,
    shipping,
  } = order;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-xl">
            Order # {formatOrderId(order)}
          </CardTitle>
          <CardDescription>Date: {formatDate(createdAt)}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {product.name} <span>x {quantity}</span>
              </span>
              <span>{formatCurrency(subtotal)}</span>
            </li>
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatCurrency(tax)}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Updated{" "}
          <time dateTime={updatedAt.toISOString()}>
            {formatDate(updatedAt)}
          </time>
        </div>
      </CardFooter>
    </Card>
  );
}
