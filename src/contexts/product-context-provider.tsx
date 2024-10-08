"use client";

import { addProduct, deleteProduct, updateProduct } from "@/lib/actions";
import { ProductWithCategory } from "@/lib/types";
import { TEditProductFormSchema, TProductFormSchema } from "@/lib/validations";
import { Category, Product } from "@prisma/client";
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
  handleDeleteProduct: (productId: Product["id"]) => Promise<void>;
  handleUpdateProduct: (
    productId: Product["id"],
    product: TEditProductFormSchema,
  ) => Promise<void>;
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
    toast.success("Product added successfully.");
  }

  async function handleDeleteProduct(productId: Product["id"]) {
    const result = await deleteProduct(productId);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Product deleted successfully.");
  }

  async function handleUpdateProduct(
    productId: Product["id"],
    product: TEditProductFormSchema,
  ) {
    const result = await updateProduct(productId, product);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Product updated successfully.");
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        handleAddProduct,
        handleDeleteProduct,
        handleUpdateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
