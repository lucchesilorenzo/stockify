"use client";

import { createContext, useState } from "react";

import { Customer } from "@prisma/client";

import { CustomerSelectedProduct } from "@/lib/types";

type CustomerProviderProps = {
  children: React.ReactNode;
};

type TCustomerContext = {
  selectedCustomer: Customer["id"] | null;
  handleSelectCustomer: (customerId: Customer["id"] | null) => void;
  selectedProductId: string;
  selectedProducts: CustomerSelectedProduct[];
  setSelectedProductId: (productId: string) => void;
  setSelectedProducts: (products: CustomerSelectedProduct[]) => void;
};

export const CustomerContext = createContext<TCustomerContext | null>(null);

export default function CustomerProvider({ children }: CustomerProviderProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer["id"] | null
  >(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    CustomerSelectedProduct[]
  >([]);

  function handleSelectCustomer(customerId: Customer["id"] | null) {
    setSelectedCustomer(customerId);
  }

  return (
    <CustomerContext.Provider
      value={{
        selectedCustomer,
        handleSelectCustomer,
        selectedProductId,
        setSelectedProductId,
        selectedProducts,
        setSelectedProducts,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
