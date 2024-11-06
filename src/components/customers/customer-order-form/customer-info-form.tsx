"use client";

import { FieldErrors, UseFormRegister } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerFormSchema } from "@/lib/validations/customer-validations";

type CustomerInfoCardProps = {
  register: UseFormRegister<CustomerFormSchema>;
  errors: FieldErrors<CustomerFormSchema>;
};

export default function CustomerInfoCard({
  register,
  errors,
}: CustomerInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Customer Information</CardTitle>
        <CardDescription>
          Enter the customer&apos;s details to create an order
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Label htmlFor="zipcode">
            Zipcode <span className="text-red-600">*</span>
          </Label>
          <Input id="zipcode" {...register("zipcode")} />
          {errors.zipcode && (
            <p className="text-sm text-red-500">{errors.zipcode.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
