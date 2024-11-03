"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import DatePicker from "../common/date-picker";
import { LoadingButton } from "../common/loading-button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PhoneInput } from "../ui/phone-input";
import { Textarea } from "../ui/textarea";

import { updateSettingsAction } from "@/app/actions/settings-actions";
import { UserSettings } from "@/lib/types";
import {
  TSettingsFormSchema,
  settingsFormSchema,
} from "@/lib/validations/settings-validations";

type SettingsFormProps = {
  userSettings: UserSettings;
};

export default function SettingsForm({ userSettings }: SettingsFormProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TSettingsFormSchema>({
    resolver: zodResolver(settingsFormSchema),
  });

  async function onSubmit(data: TSettingsFormSchema) {
    const result = await updateSettingsAction(data);
    if (result?.message) {
      toast.error(result?.message);
      return;
    }
    toast.success("Settings updated successfully.");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px]"
    >
      <div className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            placeholder="John"
            defaultValue={userSettings?.firstName}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="px-1 text-xs text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            defaultValue={userSettings?.lastName}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="px-1 text-xs text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="johndoe@gmail.com"
            defaultValue={userSettings?.email}
            disabled
          />
        </div>

        <div className="space-y-1 flex flex-col">
          <Label htmlFor="dateOfBirth">Date of birth</Label>
          <DatePicker
            setValue={setValue}
            defaultValue={userSettings?.dateOfBirth ?? undefined}
            fieldName="dateOfBirth"
          />
          {errors.dateOfBirth && (
            <p className="px-1 text-xs text-red-600">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a bit about yourself"
            rows={3}
            spellCheck={false}
            defaultValue={userSettings?.bio ?? ""}
            {...register("bio")}
          />
          {errors.bio && (
            <p className="px-1 text-xs text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="phoneNumber">Phone number</Label>
          <PhoneInput
            id="phoneNumber"
            placeholder="339 755 0176"
            value={userSettings?.phoneNumber ?? ""}
            defaultCountry="IT"
            onChange={(value) => setValue("phoneNumber", value)}
          />
          {errors.phoneNumber && (
            <p className="px-1 text-xs text-red-600">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            placeholder="123 Main St."
            defaultValue={userSettings?.address ?? ""}
            {...register("address")}
          />
          {errors.address && (
            <p className="px-1 text-xs text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="San Francisco"
            defaultValue={userSettings?.city ?? ""}
            {...register("city")}
          />
          {errors.city && (
            <p className="px-1 text-xs text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="zipcode">Zipcode</Label>
          <Input
            id="zipcode"
            placeholder="94105"
            defaultValue={userSettings?.zipcode ?? ""}
            {...register("zipcode")}
          />
          {errors.zipcode && (
            <p className="px-1 text-xs text-red-600">
              {errors.zipcode.message}
            </p>
          )}
        </div>

        <LoadingButton isLoading={isSubmitting}>Update account</LoadingButton>
      </div>
    </form>
  );
}
