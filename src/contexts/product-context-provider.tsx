"use client";

import { ProductWithCategory } from "@/lib/types";
import { createContext, useState } from "react";

type ProductContextProviderProps = {
  children: React.ReactNode;
  data: ProductWithCategory[];
};

type TProductContext = {
  products: ProductWithCategory[];
};

export const ProductContext = createContext<TProductContext | null>(null);

export default function ProductContextProvider({
  children,
  data,
}: ProductContextProviderProps) {
  const [products] = useState(data);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
