"use client";

import { createContext, useState } from "react";

import { RestockOrder } from "@prisma/client";

import { RestockOrderWithProduct } from "@/lib/types";

type InvoiceProviderProps = {
  children: React.ReactNode;
};

type TInvoiceContext = {
  isInvoiceOpen: boolean;
  order: RestockOrderWithProduct | null;
  handleIsInvoiceOpenAndSetOrder: (order: RestockOrderWithProduct) => void;
};

export const InvoiceContext = createContext<TInvoiceContext | null>(null);

export default function InvoiceProvider({ children }: InvoiceProviderProps) {
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [order, setOrder] = useState<RestockOrderWithProduct | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<
    RestockOrder["id"] | null
  >(null);

  function handleIsInvoiceOpenAndSetOrder(newOrder: RestockOrderWithProduct) {
    // Check if new order is the same as selected order
    const isSameOrder = newOrder.id === selectedOrderId;

    setIsInvoiceOpen(!isSameOrder); // Toggle dialog state
    setOrder(!isSameOrder ? newOrder : null); // Set new order
    setSelectedOrderId(!isSameOrder ? newOrder.id : null); // Set new selected order id
  }

  return (
    <InvoiceContext.Provider
      value={{
        isInvoiceOpen,
        handleIsInvoiceOpenAndSetOrder,
        order,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
