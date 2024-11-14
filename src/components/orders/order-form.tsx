"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../common/loading-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import OrderCombobox from "./order-combobox";

import { useOrder } from "@/hooks/use-order";
import { ProductWithCategoryAndWarehouse } from "@/lib/types";
import {
  TOrderFormSchema,
  orderFormSchema,
} from "@/lib/validations/order-validations";

type OrderFormProps = {
  onFormSubmit: () => void;
  products: ProductWithCategoryAndWarehouse[];
};

export default function OrderForm({ onFormSubmit, products }: OrderFormProps) {
  const { handleCreateOrder } = useOrder();

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
        <div className="text-sm text-green-600">
          Orders exceeding 50,00 € in product value qualify for free shipping.
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="productId">
            Product <span className="text-red-600">*</span>
          </Label>
          <OrderCombobox
            products={products}
            setValue={setValue}
            fieldName="productId"
          />
          {errors.productId && (
            <p className="px-1 text-sm text-red-600">
              {errors.productId.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="quantity">
            Quantity <span className="text-red-600">*</span>
          </Label>
          <Input
            id="quantity"
            placeholder="Enter quantity"
            {...register("quantity")}
          />
          {errors.quantity && (
            <p className="px-1 text-sm text-red-600">
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
