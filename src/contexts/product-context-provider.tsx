"use client";

import { addProduct } from "@/lib/actions";
import { ProductWithCategory } from "@/lib/types";
import { TProductFormSchema } from "@/lib/validations";
import { Category } from "@prisma/client";
import { createContext, useState } from "react";
import { toast } from "sonner";

type ProductContextProviderProps = {
  children: React.ReactNode;
  productsData: ProductWithCategory[];
  categoriesData: Category[];
};

type TProductContext = {
  products: ProductWithCategory[];
  categories: Category[];
  handleAddProduct: (product: TProductFormSchema) => Promise<void>;
};

export const ProductContext = createContext<TProductContext | null>(null);

export default function ProductContextProvider({
  children,
  productsData,
  categoriesData,
}: ProductContextProviderProps) {
  const [products] = useState(productsData);
  const [categories] = useState(categoriesData);

  async function handleAddProduct(product: TProductFormSchema) {
    const result = await addProduct(product);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
  }

  return (
    <ProductContext.Provider value={{ products, categories, handleAddProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
