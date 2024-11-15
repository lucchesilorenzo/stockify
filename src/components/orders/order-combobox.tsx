"use client";

import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProductWithCategoryAndWarehouse } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TOrderFormSchema } from "@/lib/validations/order-validations";

type OrderComboboxProps = {
  products: ProductWithCategoryAndWarehouse[];
  setValue: UseFormSetValue<TOrderFormSchema>;
  fieldName: "productId";
};

export default function OrderCombobox({
  products,
  setValue,
  fieldName,
}: OrderComboboxProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="productId"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {internalValue
            ? products.find((product) => product.name === internalValue)?.name
            : "Select product..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandList onWheel={(e) => (e.currentTarget.scrollTop += e.deltaY)}>
            <CommandEmpty>No product found.</CommandEmpty>
            <CommandGroup>
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.name}
                  onSelect={(currentValue) => {
                    setInternalValue(
                      currentValue === internalValue ? "" : currentValue,
                    );
                    setValue(fieldName, product.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      internalValue === product.name
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {product.name}
                  {product.quantity <= 10 && (
                    <>
                      <span className="ml-1">(</span>
                      <span className="text-red-600 font-semibold">
                        {product.quantity} left
                      </span>
                      <span>)</span>
                    </>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
