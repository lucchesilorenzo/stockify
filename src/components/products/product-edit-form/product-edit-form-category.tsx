"use client";

import { Category, Product } from "@prisma/client";
import { FieldErrors, UseFormSetValue } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductEditFormCategoryProps = {
  product: Product;
  categories: Category[];
  setValue: UseFormSetValue<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormCategory({
  product,
  categories,
  setValue,
  errors,
}: ProductEditFormCategoryProps) {
  return (
    <Card x-chunk="dashboard-07-chunk-2">
      <CardHeader>
        <CardTitle>Category Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="grid gap-3">
            <Label htmlFor="category">Select Category</Label>
            <Select
              onValueChange={(value) => setValue("categoryId", value)}
              defaultValue={product.categoryId}
            >
              <SelectTrigger id="category" aria-label="Select category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="px-1 text-sm text-red-600">
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
