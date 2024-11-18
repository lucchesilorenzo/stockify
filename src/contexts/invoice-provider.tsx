"use client";

import { createContext, useState } from "react";

import { Order } from "@prisma/client";

import { OrderWithProduct } from "@/lib/types";

type InvoiceProviderProps = {
  children: React.ReactNode;
};

type TInvoiceContext = {
  isInvoiceOpen: boolean;
  order: OrderWithProduct | null;
  handleIsInvoiceOpenAndSetOrder: (order: OrderWithProduct) => void;
  handleCloseInvoice: () => void;
};

export const InvoiceContext = createContext<TInvoiceContext | null>(null);

export default function InvoiceProvider({ children }: InvoiceProviderProps) {
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [order, setOrder] = useState<OrderWithProduct | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<Order["id"] | null>(
    null,
  );

  function handleIsInvoiceOpenAndSetOrder(newOrder: OrderWithProduct) {
    // Check if new order is the same as selected order
    const isSameOrder = newOrder.id === selectedOrderId;

    setIsInvoiceOpen(!isSameOrder); // Toggle dialog state
    setOrder(!isSameOrder ? newOrder : null); // Set new order
    setSelectedOrderId(!isSameOrder ? newOrder.id : null); // Set new selected order id
  }

  function handleCloseInvoice() {
    setIsInvoiceOpen(false);
    setOrder(null);
    setSelectedOrderId(null);
  }

  return (
    <InvoiceContext.Provider
      value={{
        isInvoiceOpen,
        handleIsInvoiceOpenAndSetOrder,
        handleCloseInvoice,
        order,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
