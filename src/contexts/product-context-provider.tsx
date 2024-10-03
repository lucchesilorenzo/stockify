"use client";

import { ProductWithCategory } from "@/lib/types";
import { createContext, useState } from "react";

type ProductContextProviderProps = {
  children: React.ReactNode;
  productsData: ProductWithCategory[];
};

type TProductContext = {
  products: ProductWithCategory[];
};

export const ProductContext = createContext<TProductContext | null>(null);

export default function ProductContextProvider({
  children,
  productsData,
}: ProductContextProviderProps) {
  const [products] = useState(productsData);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
