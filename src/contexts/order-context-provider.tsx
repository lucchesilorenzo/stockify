"use client";

import { OrderWithProduct } from "@/lib/types";
import { createContext, useState } from "react";

type OrderContextProviderProps = {
  children: React.ReactNode;
  ordersData: OrderWithProduct[];
};

type TOrderContext = {
  orders: OrderWithProduct[];
};

export const OrderContext = createContext<TOrderContext | null>(null);

export default function OrderContextProvider({
  children,
  ordersData,
}: OrderContextProviderProps) {
  const [orders] = useState(ordersData);

  return (
    <OrderContext.Provider value={{ orders }}>{children}</OrderContext.Provider>
  );
}
