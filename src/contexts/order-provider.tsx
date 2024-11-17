"use client";

import { createContext } from "react";

import { toast } from "sonner";

import {
  createOrderAction,
  createRestockOrderAction,
} from "@/app/actions/order-actions";
import {
  TOrderFormSchema,
  TRestockOrderFormSchema,
} from "@/lib/validations/order-validations";

type OrderProviderProps = {
  children: React.ReactNode;
};

type TOrderContext = {
  handleCreateOrder: (order: TOrderFormSchema) => Promise<void>;
  handleCreateRestockOrder: (order: TRestockOrderFormSchema) => Promise<void>;
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

  async function handleCreateRestockOrder(
    restockOrder: TRestockOrderFormSchema,
  ) {
    const result = await createRestockOrderAction(restockOrder);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Restock order created successfully.");
  }

  return (
    <OrderContext.Provider
      value={{ handleCreateOrder, handleCreateRestockOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
