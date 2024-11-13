"use client";

import { Customer } from "@prisma/client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomer } from "@/hooks/use-customer";

type CustomerInfoFormSelectProps = {
  customers: Customer[];
};

export default function CustomerInfoFormSelect({
  customers,
}: CustomerInfoFormSelectProps) {
  const { selectedCustomer, handleSelectCustomer } = useCustomer();

  return (
    <Select
      value={selectedCustomer ?? ""}
      onValueChange={(value) => handleSelectCustomer(value)}
    >
      <SelectTrigger id="customer-select" className="w-full">
        <SelectValue placeholder="Select existing customer" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="max-h-60 overflow-y-auto">
          {customers.map((customer) => (
            <SelectItem key={customer.id} value={customer.id}>
              {`${customer.firstName} ${customer.lastName} (${customer.email})`}
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
