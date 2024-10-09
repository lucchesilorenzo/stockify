"use client";

import { createContext, useState } from "react";

import { toast } from "sonner";

import { createOrder } from "@/app/actions/order-actions";
import { OrderWithProduct } from "@/lib/types";
import { TOrderFormSchema } from "@/lib/validations/order-validations";

type OrderContextProviderProps = {
  children: React.ReactNode;
  ordersData: OrderWithProduct[];
};

type TOrderContext = {
  orders: OrderWithProduct[];
  handleCreateOrder: (order: TOrderFormSchema) => Promise<void>;
};

export const OrderContext = createContext<TOrderContext | null>(null);

export default function OrderContextProvider({
  children,
  ordersData,
}: OrderContextProviderProps) {
  const [orders] = useState(ordersData);

  async function handleCreateOrder(order: TOrderFormSchema) {
    const result = await createOrder(order);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Order created successfully.");
  }

  return (
    <OrderContext.Provider value={{ orders, handleCreateOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
