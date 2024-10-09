import { useContext } from "react";

import { InvoiceContext } from "@/contexts/invoice-context-provider";
import { OrderContext } from "@/contexts/order-context-provider";
import { ProductContext } from "@/contexts/product-context-provider";

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

export function useInvoiceContext() {
  const context = useContext(InvoiceContext);

  if (!context) {
    throw new Error(
      "useInvoiceContext must be used within a InvoiceContextProvider",
    );
  }

  return context;
}
