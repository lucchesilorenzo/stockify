"use client";

import { createContext } from "react";

import { toast } from "sonner";

import { createOrder } from "@/app/actions/order-actions";
import { TOrderFormSchema } from "@/lib/validations/order-validations";

type OrderContextProviderProps = {
  children: React.ReactNode;
};

type TOrderContext = {
  handleCreateOrder: (order: TOrderFormSchema) => Promise<void>;
};

export const OrderContext = createContext<TOrderContext | null>(null);

export default function OrderContextProvider({
  children,
}: OrderContextProviderProps) {
  async function handleCreateOrder(order: TOrderFormSchema) {
    const result = await createOrder(order);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Order created successfully.");
  }

  return (
    <OrderContext.Provider value={{ handleCreateOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
