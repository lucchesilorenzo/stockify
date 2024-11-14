"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { LoadingButton } from "@/components/common/loading-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { CustomerWithCustomerShipment } from "@/lib/types";
import {
  TCustomerEditFormSchema,
  customerEditFormSchema,
} from "@/lib/validations/customer-validations";

type CustomerEditFormProps = {
  onFormSubmit: () => void;
  customer: CustomerWithCustomerShipment;
};

export default function CustomerEditForm({
  onFormSubmit,
  customer,
}: CustomerEditFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<TCustomerEditFormSchema>({
    resolver: zodResolver(customerEditFormSchema),
  });

  async function onSubmit(data: TCustomerEditFormSchema) {
    console.log(data);
    onFormSubmit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="firstName">
            First name <span className="text-red-600">*</span>
          </Label>
          <Input
            defaultValue={customer?.firstName ?? ""}
            id="firstName"
            placeholder="Enter customer first name"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="px-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="lastName">
            Last name <span className="text-red-600">*</span>
          </Label>
          <Input
            defaultValue={customer?.lastName ?? ""}
            id="lastName"
            placeholder="Enter customer last name"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="px-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </Label>
          <Input
            defaultValue={customer?.email ?? ""}
            id="email"
            placeholder="Enter customer email"
            {...register("email")}
          />
          {errors.email && (
            <p className="px-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">
            Phone <span className="text-red-600">*</span>
          </Label>
          <Controller
            defaultValue={customer?.phone ?? ""}
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                {...field}
                id="phone"
                placeholder="Enter customer phone number"
                autoComplete="tel"
                defaultCountry="IT"
              />
            )}
          />
          {errors.phone && (
            <p className="px-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="address">
            Address <span className="text-red-600">*</span>
          </Label>
          <Input
            defaultValue={customer?.address ?? ""}
            id="address"
            placeholder="Enter customer address"
            {...register("address")}
          />
          {errors.address && (
            <p className="px-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="city">
            City <span className="text-red-600">*</span>
          </Label>
          <Input
            defaultValue={customer?.city ?? ""}
            id="city"
            placeholder="Enter customer city"
            {...register("city")}
          />
          {errors.city && (
            <p className="px-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="zipCode">
            Zip Code <span className="text-red-600">*</span>
          </Label>
          <Input
            defaultValue={customer?.zipCode ?? ""}
            id="zipCode"
            placeholder="Enter customer zip code"
            {...register("zipCode")}
          />
          {errors.zipCode && (
            <p className="px-1 text-sm text-red-600">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <LoadingButton isLoading={isSubmitting} className="w-full">
          Edit customer
        </LoadingButton>
      </div>
    </form>
  );
}
