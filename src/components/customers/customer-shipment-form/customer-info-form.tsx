"use client";

import { Customer } from "@prisma/client";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import CustomerInfoFormSelect from "./customer-info-form-select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TShippingFormSchema } from "@/lib/validations/customer-validations";

type CustomerInfoCardProps = {
  customers: Customer[];
  register: UseFormRegister<TShippingFormSchema>;
  errors: FieldErrors<TShippingFormSchema>;
};

export default function CustomerInfoCard({
  customers,
  register,
  errors,
}: CustomerInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Customer Information</CardTitle>
        <CardDescription>
          Enter the customer&apos;s details
          {customers.length > 0 && (
            <span className="ml-1">or select an existing customer</span>
          )}
          .
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {customers.length > 0 && (
          <CustomerInfoFormSelect customers={customers} />
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="firstName">
              First Name <span className="text-red-600">*</span>
            </Label>
            <Input id="firstName" {...register("firstName")} />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="lastName">
              Last Name <span className="text-red-600">*</span>
            </Label>
            <Input id="lastName" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">
            Email <span className="text-red-600">*</span>
          </Label>
          <Input id="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="address">
            Address <span className="text-red-600">*</span>
          </Label>
          <Input id="address" {...register("address")} />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="city">
              City <span className="text-red-600">*</span>
            </Label>
            <Input id="city" {...register("city")} />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="zipCode">
              Zip Code <span className="text-red-600">*</span>
            </Label>
            <Input id="zipCode" {...register("zipCode")} />
            {errors.zipCode && (
              <p className="text-sm text-red-500">{errors.zipCode.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
