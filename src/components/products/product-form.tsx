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
  const { categories, handleAddProduct } = useProduct();

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
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="categoryId">Category</Label>
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
          <Label htmlFor="price">Price</Label>
          <Input id="price" {...register("price")} />
          {errors.price && (
            <p className="px-1 text-xs text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="minQuantity">Min Quantity</Label>
          <Input id="minQuantity" {...register("minQuantity")} />
          {errors.minQuantity && (
            <p className="px-1 text-xs text-red-600">
              {errors.minQuantity.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="maxQuantity">Max Quantity</Label>
          <Input id="maxQuantity" {...register("maxQuantity")} />
          {errors.maxQuantity && (
            <p className="px-1 text-xs text-red-600">
              {errors.maxQuantity.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="quantity">Quantity</Label>
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
