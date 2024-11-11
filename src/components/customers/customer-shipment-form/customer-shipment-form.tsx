"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Customer, Product } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "../../common/loading-button";
import CustomerInfoCard from "./customer-info-form";
import ProductSelectionCard from "./product-selection-card";

import { createShipmentAction } from "@/app/actions/customer-actions";
import { useCustomer } from "@/hooks/use-customer";
import {
  TShippingFormSchema,
  shippingFormSchema,
} from "@/lib/validations/customer-validations";

type CustomerOrderFormProps = {
  products: Product[];
  customers: Customer[];
};

export default function CustomerOrderForm({
  products,
  customers,
}: CustomerOrderFormProps) {
  const {
    selectedCustomer,
    handleSelectCustomer,
    setSelectedProductId,
    setSelectedProducts,
  } = useCustomer();

  const selectedCustomerInfo = customers.find(
    (customer) => customer.id === selectedCustomer,
  );

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TShippingFormSchema>({
    resolver: zodResolver(shippingFormSchema),
  });

  useEffect(() => {
    if (selectedCustomerInfo) {
      setValue("firstName", selectedCustomerInfo.firstName);
      setValue("lastName", selectedCustomerInfo.lastName);
      setValue("email", selectedCustomerInfo.email);
      setValue("phone", selectedCustomerInfo.phone ?? "");
      setValue("address", selectedCustomerInfo.address);
      setValue("city", selectedCustomerInfo.city);
      setValue("zipCode", selectedCustomerInfo.zipCode);
    }
  }, [selectedCustomerInfo, setValue]);

  async function onSubmit(data: TShippingFormSchema) {
    const result = await createShipmentAction(data);
    if (result?.message) {
      toast.error(result?.message);
      return;
    }

    reset();
    handleSelectCustomer(null);
    setSelectedProductId("");
    setSelectedProducts([]);

    toast.success("Shipment created successfully.");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid lg:grid-cols-2 gap-6"
    >
      <CustomerInfoCard
        customers={customers}
        register={register}
        errors={errors}
      />

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
