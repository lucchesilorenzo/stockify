"use client";

import { Product } from "@prisma/client";
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
import { Status } from "@/lib/types";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductEditFormStatusProps = {
  product: Product;
  productStatuses: Status[];
  setValue: UseFormSetValue<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormStatus({
  product,
  productStatuses,
  setValue,
  errors,
}: ProductEditFormStatusProps) {
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Product Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="status">Status</Label>
            <Select
              onValueChange={(value: TProductEditFormSchema["status"]) =>
                setValue("status", value)
              }
              defaultValue={product.status}
            >
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {productStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.label}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="px-1 text-xs text-red-600">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
