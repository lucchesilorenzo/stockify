"use client";

import { createContext, useState } from "react";

import { Category, Product, Warehouse } from "@prisma/client";
import { toast } from "sonner";

import {
  isMaxProductQuantityReachedAction,
  updateProductAction,
  updateProductStatusAction,
} from "@/app/actions/product-actions";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductProviderProps = {
  children: React.ReactNode;
  categoriesData: Category[];
  warehousesData: Warehouse[];
};

type TProductContext = {
  categories: Category[];
  warehouses: Warehouse[];
  handleUpdateProductStatus: (
    productId: Product["id"],
    status: Product["status"],
  ) => Promise<void>;
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
  warehousesData,
}: ProductProviderProps) {
  const [categories] = useState(categoriesData);
  const [warehouses] = useState(warehousesData);

  async function handleUpdateProductStatus(
    productId: Product["id"],
    status: Product["status"],
  ) {
    const result = await updateProductStatusAction(productId, status);
    if (result?.message) {
      toast.error(result.message);
      return;
    }
    toast.success("Product status updated successfully.");
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
        warehouses,
        handleUpdateProductStatus,
        handleUpdateProduct,
        handleCheckProductMaxQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
