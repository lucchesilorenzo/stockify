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
  handleSelectShipment: (shipmentId: string | null) => void;
  selectedProductId: string;
  selectedProducts: CustomerSelectedProduct[];
  setSelectedProductId: (productId: string) => void;
  setSelectedProducts: (products: CustomerSelectedProduct[]) => void;
  selectedShipment: string | null;
};

export const CustomerContext = createContext<TCustomerContext | null>(null);

export default function CustomerProvider({ children }: CustomerProviderProps) {
  // Customer shipment form
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer["id"] | null
  >(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    CustomerSelectedProduct[]
  >([]);

  // View shipment details
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);

  function handleSelectCustomer(customerId: Customer["id"] | null) {
    setSelectedCustomer(customerId);
  }

  function handleSelectShipment(shipmentId: string | null) {
    setSelectedShipment(shipmentId);
  }

  return (
    <CustomerContext.Provider
      value={{
        selectedCustomer,
        handleSelectCustomer,
        handleSelectShipment,
        selectedProductId,
        setSelectedProductId,
        selectedProducts,
        setSelectedProducts,
        selectedShipment,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}
