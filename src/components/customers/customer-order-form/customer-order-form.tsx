"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "../../common/loading-button";
import CustomerInfoCard from "./customer-info-form";
import ProductSelectionCard from "./product-selection-card";

import { createShipment } from "@/app/actions/customer-actions";
import { ProductWithCategory } from "@/lib/types";
import {
  ShippingFormSchema,
  shippingFormSchema,
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
  } = useForm<ShippingFormSchema>({
    resolver: zodResolver(shippingFormSchema),
  });

  async function onSubmit(data: ShippingFormSchema) {
    const result = await createShipment(data);
    if (result?.message) {
      toast.error(result?.message);
      return;
    }
    toast.success("Shipment created successfully.");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid lg:grid-cols-2 gap-6"
    >
      <CustomerInfoCard register={register} errors={errors} />

      <ProductSelectionCard
        products={products}
        setValue={setValue}
        errors={errors}
      />

      <LoadingButton type="submit" isLoading={isSubmitting} className="ml-auto">
        Confirm Shipment
      </LoadingButton>
    </form>
  );
}
