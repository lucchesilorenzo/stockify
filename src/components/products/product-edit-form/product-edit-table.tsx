"use client";

import { Product } from "@prisma/client";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProductEditFormSchema } from "@/lib/validations/product-validations";

type ProductEditTableProps = {
  product: Product;
  register: UseFormRegister<TProductEditFormSchema>;
  errors: FieldErrors<TProductEditFormSchema>;
};

export default function ProductEditTable({
  product,
  register,
  errors,
}: ProductEditTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">{product.name}</TableCell>
          <TableCell>
            <Label htmlFor="stock" className="sr-only">
              Stock
            </Label>
            <Input
              id="stock"
              defaultValue={product.maxQuantity}
              {...register("maxQuantity")}
            />
            {errors.maxQuantity && (
              <p className="px-1 text-xs text-red-600">
                {errors.maxQuantity.message}
              </p>
            )}
          </TableCell>
          <TableCell>
            <Label htmlFor="price" className="sr-only">
              Price
            </Label>
            <Input
              id="price"
              defaultValue={product.price}
              {...register("price")}
            />
            {errors.price && (
              <p className="px-1 text-xs text-red-600">
                {errors.price.message}
              </p>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
