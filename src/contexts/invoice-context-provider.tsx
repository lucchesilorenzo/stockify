"use client";

import { OrderWithProduct } from "@/lib/types";
import { createContext, useState } from "react";

type InvoiceContextProviderProps = {
  children: React.ReactNode;
};

type TInvoiceContext = {
  isInvoiceOpen: boolean;
  order: OrderWithProduct | null;

  handleIsInvoiceOpenAndSetOrder: (order: OrderWithProduct) => void;
};

export const InvoiceContext = createContext<TInvoiceContext | null>(null);

export default function InvoiceContextProvider({
  children,
}: InvoiceContextProviderProps) {
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [order, setOrder] = useState<OrderWithProduct | null>(null);

  function handleIsInvoiceOpenAndSetOrder(order: OrderWithProduct) {
    setIsInvoiceOpen(!isInvoiceOpen);
    setOrder(order);
  }

  return (
    <InvoiceContext.Provider
      value={{ isInvoiceOpen, handleIsInvoiceOpenAndSetOrder, order }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}
