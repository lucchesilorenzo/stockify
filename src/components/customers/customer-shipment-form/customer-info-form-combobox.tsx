"use client";

import { useCallback, useState } from "react";

import { Customer } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { cn } from "@/lib/utils";

// TODO: NOT FINALIZED

type CustomerInfoFormCombobox = {
  customers: Customer[];
};

export default function CustomerInfoFormCombobox({
  customers,
}: CustomerInfoFormCombobox) {
  const [open, setOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  );
  const [searchCustomer, setSearchCustomer] = useState("");

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  const filterCustomers = useCallback(
    (customers: Customer[], search: string) => {
      const searchLower = search.toLowerCase();
      return customers.filter(
        (customer) =>
          customer.firstName.toLowerCase().includes(searchLower) ||
          customer.lastName.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower),
      );
    },
    [],
  );

  const filteredCustomers = filterCustomers(customers, searchCustomer);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedCustomer
            ? `${selectedCustomer.firstName} ${selectedCustomer.lastName} (${selectedCustomer.email})`
            : "Select customer..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search customer..."
            value={searchCustomer}
            onValueChange={(value) => setSearchCustomer(value)}
          />
          <CommandList onWheel={(e) => (e.currentTarget.scrollTop += e.deltaY)}>
            <CommandEmpty>No customer found.</CommandEmpty>
            <CommandGroup>
              {filteredCustomers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.id}
                  onSelect={() => {
                    setSelectedCustomerId(
                      customer.id === selectedCustomerId ? null : customer.id,
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCustomerId === customer.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {`${customer.firstName} ${customer.lastName} (${customer.email})`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
