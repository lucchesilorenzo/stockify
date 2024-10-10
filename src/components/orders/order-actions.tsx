"use client";

import { Paperclip } from "lucide-react";

import { Button } from "../ui/button";

import { useInvoiceContext } from "@/lib/hooks";
import { OrderWithProduct } from "@/lib/types";

type OrderActionsProps = {
  order: OrderWithProduct;
};

export default function OrderActions({ order }: OrderActionsProps) {
  const { handleIsInvoiceOpenAndSetOrder } = useInvoiceContext();

  return (
    <Button
      onClick={() => handleIsInvoiceOpenAndSetOrder(order)}
      variant="ghost"
      className="h-8 w-8 p-0"
    >
      <Paperclip className="h-4 w-4" />
    </Button>
  );
}
