"use client";

import { Product } from "@prisma/client";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductEditFormDetailsProps = {
  product: Product;
  register: UseFormRegister<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormDetails({
  product,
  register,
  errors,
}: ProductEditFormDetailsProps) {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Update your product details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue={product.name}
              disabled
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              defaultValue={product.description ?? ""}
              spellCheck={false}
              placeholder="Add a description of your product"
              className="min-h-32"
              {...register("description")}
            />
            {errors.description && (
              <p className="px-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
