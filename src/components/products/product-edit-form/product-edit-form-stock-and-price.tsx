"use client";

import { Product } from "@prisma/client";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import ProductEditTable from "./product-edit-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductEditFormStockAndPriceProps = {
  product: Product;
  register: UseFormRegister<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormStockAndPrice({
  product,
  register,
  errors,
}: ProductEditFormStockAndPriceProps) {
  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>
          Change the stock and price of your product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductEditTable
          product={product}
          register={register}
          errors={errors}
        />
      </CardContent>
    </Card>
  );
}
