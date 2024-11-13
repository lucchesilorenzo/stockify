"use client";

import { Product, Warehouse } from "@prisma/client";
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

type ProductEditFormWarehouseProps = {
  product: Product;
  warehouses: Warehouse[];
  setValue: UseFormSetValue<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditFormWarehouse({
  product,
  warehouses,
  setValue,
  errors,
}: ProductEditFormWarehouseProps) {
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Warehouse Selection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="warehouse">Select Warehouse</Label>
            <Select
              onValueChange={(value) => setValue("warehouseId", value)}
              defaultValue={product.warehouseId}
            >
              <SelectTrigger id="warehouse" aria-label="Select warehouse">
                <SelectValue placeholder="Select warehouse" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.warehouseId && (
              <p className="px-1 text-xs text-red-600">
                {errors.warehouseId.message}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
