"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../common/loading-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProduct } from "@/hooks/use-product";
import {
  TProductFormSchema,
  productFormSchema,
} from "@/lib/validations/product-validations";

type ProductFormProps = {
  onFormSubmit: () => void;
};

export default function ProductForm({ onFormSubmit }: ProductFormProps) {
  const { categories, warehouses, handleAddProduct } = useProduct();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<TProductFormSchema>({
    resolver: zodResolver(productFormSchema),
  });

  async function onSubmit(data: TProductFormSchema) {
    await handleAddProduct(data);
    onFormSubmit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name">
            Name <span className="text-red-600">*</span>
          </Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="barcode">Barcode</Label>
          <Input id="barcode" {...register("barcode")} />
          {errors.barcode && (
            <p className="px-1 text-xs text-red-600">
              {errors.barcode.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="categoryId">
            Category <span className="text-red-600">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("categoryId", value)}>
            <SelectTrigger id="categoryId">
              <SelectValue placeholder="Select a category" />
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
            <p className="px-1 text-xs text-red-600">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="warehouseId">
            Warehouse <span className="text-red-600">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("warehouseId", value)}>
            <SelectTrigger id="warehouseId">
              <SelectValue placeholder="Select a warehouse" />
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

        <div className="space-y-1">
          <Label htmlFor="price">
            Price <span className="text-red-600">*</span>
          </Label>
          <Input id="price" {...register("price")} />
          {errors.price && (
            <p className="px-1 text-xs text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="maxQuantity">
            Max Quantity <span className="text-red-600">*</span>
          </Label>
          <Input id="maxQuantity" {...register("maxQuantity")} />
          {errors.maxQuantity && (
            <p className="px-1 text-xs text-red-600">
              {errors.maxQuantity.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="quantity">
            Quantity <span className="text-red-600">*</span>
          </Label>
          <Input id="quantity" {...register("quantity")} />
          {errors.quantity && (
            <p className="px-1 text-xs text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <LoadingButton isLoading={isSubmitting} className="w-full">
          Create
        </LoadingButton>
      </div>
    </form>
  );
}
