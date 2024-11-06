"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../../common/loading-button";
import CustomerInfoCard from "./customer-info-form";
import ProductSelectionCard from "./product-selection-card";

import { ProductWithCategory } from "@/lib/types";
import {
  CustomerFormSchema,
  customerFormSchema,
} from "@/lib/validations/customer-validations";

type CustomerOrderFormProps = {
  products: ProductWithCategory[];
};

export default function CustomerOrderForm({
  products,
}: CustomerOrderFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
  });

  async function onSubmit(data: CustomerFormSchema) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid lg:grid-cols-2 gap-6"
    >
      <CustomerInfoCard register={register} errors={errors} />

      <ProductSelectionCard products={products} setValue={setValue} />

      <LoadingButton type="submit" isLoading={isSubmitting} className="ml-auto">
        Submit Order
      </LoadingButton>
    </form>
  );
}
