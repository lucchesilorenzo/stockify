"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "../common/loading-button";
import EmailInput from "../ui/email-input";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PhoneInput } from "../ui/phone-input";

import { createSupplierAction } from "@/app/actions/supplier-actions";
import {
  TSupplierFormSchema,
  supplierFormSchema,
} from "@/lib/validations/supplier-validations";

type SupplierFormProps = {
  onFormSubmit: () => void;
};

export default function SupplierForm({ onFormSubmit }: SupplierFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TSupplierFormSchema>({
    resolver: zodResolver(supplierFormSchema),
  });

  async function onSubmit(data: TSupplierFormSchema) {
    const result = await createSupplierAction(data);
    if (result?.message) {
      toast.error(result.message);
      return;
    }

    onFormSubmit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="name">
            Name <span className="text-red-600">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter supplier name"
            {...register("name")}
          />
          {errors.name && (
            <p className="px-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </Label>
          <EmailInput
            id="email"
            placeholder="Enter supplier email"
            register={register}
            registerValue="email"
          />
          {errors.email && (
            <p className="px-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                id="phone"
                placeholder="Enter supplier phone"
                autoComplete="tel"
                defaultCountry="IT"
                {...field}
              />
            )}
          />
          {errors.phone && (
            <p className="px-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <LoadingButton isLoading={isSubmitting} className="w-full">
          Create
        </LoadingButton>
      </div>
    </form>
  );
}
