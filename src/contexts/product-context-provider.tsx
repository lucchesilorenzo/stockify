"use client";

import { createContext, useState } from "react";

import { Category, Product } from "@prisma/client";
import { toast } from "sonner";

import {
  addProduct,
  checkIfProductMaxQuantityIsReached,
  deleteProduct,
  updateProduct,
} from "@/app/actions/product-actions";
import { ProductWithCategory } from "@/lib/types";
import {
  TProductEditFormSchema,
  TProductFormSchema,
} from "@/lib/validations/product-validations";

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
    product: TProductEditFormSchema,
  ) => Promise<void>;
  handleCheckProductMaxQuantity: (
    productId: Product["id"],
    maxQuantity: Product["maxQuantity"],
  ) => Promise<boolean>;
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
    product: TProductEditFormSchema,
  ) {
    const result = await updateProduct(productId, product);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Product updated successfully.");
  }

  async function handleCheckProductMaxQuantity(
    productId: Product["id"],
    maxQuantity: Product["maxQuantity"],
  ) {
    const result = await checkIfProductMaxQuantityIsReached(
      productId,
      maxQuantity,
    );

    if (result?.message) {
      toast.error(result.message);
      return false;
    }

    return true;
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        handleAddProduct,
        handleDeleteProduct,
        handleUpdateProduct,
        handleCheckProductMaxQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
