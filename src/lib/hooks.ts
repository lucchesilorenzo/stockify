import { OrderContext } from "@/contexts/order-context-provider";
import { ProductContext } from "@/contexts/product-context-provider";
import { useContext } from "react";

export function useProductContext() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider",
    );
  }

  return context;
}

export function useOrderContext() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrderContext must be used within a OrderContextProvider",
    );
  }

  return context;
}
