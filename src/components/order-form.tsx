"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOrderFormSchema, orderFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type OrderFormProps = {
  onFormSubmit: () => void;
};

export default function OrderForm({ onFormSubmit }: OrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TOrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
  });

  function onSubmit(data: TOrderFormSchema) {
    console.log(data);
    onFormSubmit();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select product" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="product">Product</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {!isSubmitting ? "Create" : "Creating..."}
      </Button>
    </form>
  );
}
