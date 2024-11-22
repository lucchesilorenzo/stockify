"use client";

import { Product } from "@prisma/client";
import { QrCode } from "lucide-react";
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

type ProductEditFormStockDetailsProps = {
  product: Product;
  register: UseFormRegister<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormStockAndPrice({
  product,
  register,
  errors,
}: ProductEditFormStockDetailsProps) {
  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          <span className="text-xl">Stock Details</span>
        </CardTitle>
        <CardDescription>
          Change the stock quantity and price of your product.
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