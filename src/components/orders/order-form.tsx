"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../common/loading-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import OrderCombobox from "./order-combobox";

import { useOrderContext, useProductContext } from "@/lib/hooks";
import {
  TOrderFormSchema,
  orderFormSchema,
} from "@/lib/validations/order-validations";

type OrderFormProps = {
  onFormSubmit: () => void;
};

export default function OrderForm({ onFormSubmit }: OrderFormProps) {
  const { filteredProducts } = useProductContext();
  const { handleCreateOrder } = useOrderContext();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TOrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
  });

  async function onSubmit(data: TOrderFormSchema) {
    await handleCreateOrder(data);
    onFormSubmit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="space-y-6">
        <div className="flex flex-col space-y-1">
          <Label htmlFor="productId">Product</Label>
          <OrderCombobox
            products={filteredProducts}
            setValue={setValue} // setValue is used to set the value of the form
            fieldName="productId" // fieldName is used to get the value of the form
          />
          {errors.productId && (
            <p className="px-1 text-xs text-red-600">
              {errors.productId.message}
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
