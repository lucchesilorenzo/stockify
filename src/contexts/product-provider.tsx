"use client";

import { createContext, useState } from "react";

import { Category, Product } from "@prisma/client";
import { toast } from "sonner";

import {
  createProductAction,
  deleteProductAction,
  isMaxProductQuantityReachedAction,
  updateProductAction,
} from "@/app/actions/product-actions";
import {
  TProductEditFormSchema,
  TProductFormSchema,
} from "@/lib/validations/product-validations";

type ProductProviderProps = {
  children: React.ReactNode;
  categoriesData: Category[];
};

type TProductContext = {
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

export default function ProductProvider({
  children,
  categoriesData,
}: ProductProviderProps) {
  const [categories] = useState(categoriesData);

  async function handleAddProduct(product: TProductFormSchema) {
    const result = await createProductAction(product);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Product added successfully.");
  }

  async function handleDeleteProduct(productId: Product["id"]) {
    const result = await deleteProductAction(productId);
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
    const result = await updateProductAction(productId, product);
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
    const result = await isMaxProductQuantityReachedAction(
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
