"use client";

import { createContext } from "react";

import { toast } from "sonner";

import { createOrderAction } from "@/app/actions/order-actions";
import { TOrderFormSchema } from "@/lib/validations/order-validations";

type OrderProviderProps = {
  children: React.ReactNode;
};

type TOrderContext = {
  handleCreateOrder: (order: TOrderFormSchema) => Promise<void>;
};

export const OrderContext = createContext<TOrderContext | null>(null);

export default function OrderProvider({ children }: OrderProviderProps) {
  async function handleCreateOrder(order: TOrderFormSchema) {
    const result = await createOrderAction(order);
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
