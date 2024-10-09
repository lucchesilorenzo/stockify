"use client";

import { Paperclip } from "lucide-react";

import { useInvoiceContext } from "@/lib/hooks";
import { OrderWithProduct } from "@/lib/types";

type OrderActionsProps = {
  order: OrderWithProduct;
};

export default function OrderActions({ order }: OrderActionsProps) {
  const { handleIsInvoiceOpenAndSetOrder } = useInvoiceContext();

  return (
    <button onClick={() => handleIsInvoiceOpenAndSetOrder(order)}>
      <Paperclip className="h-4 w-4" />
    </button>
  );
}
