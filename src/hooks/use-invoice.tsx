import { useContext } from "react";

import { InvoiceContext } from "@/contexts/invoice-provider";

export function useInvoice() {
  const context = useContext(InvoiceContext);

  if (!context) {
    throw new Error("useInvoice must be used within a InvoiceProvider");
  }

  return context;
}
