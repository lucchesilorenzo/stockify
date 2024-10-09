"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoadingButton } from "../common/loading-button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TAuthFormSchema,
  authFormSchema,
} from "@/lib/validations/auth-validations";

export const metadata = {
  title: "Login | Stockify",
};

type AuthFormProps = {
  authType: "login" | "signup";
};

export default function AuthForm({ authType }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TAuthFormSchema>({
    resolver: zodResolver(authFormSchema),
  });

  function onSubmit(data: TAuthFormSchema) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="johndoe@gmail.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="px-1 text-xs text-red-600">{errors.password.message}</p>
        )}
      </div>

      <LoadingButton isLoading={isSubmitting} className="w-full">
        {authType === "login" ? "Login" : "Sign up"}
      </LoadingButton>
    </form>
  );
}