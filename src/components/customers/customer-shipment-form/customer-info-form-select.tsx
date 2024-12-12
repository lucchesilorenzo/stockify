"use client";

import { Customer } from "@prisma/client";
import { X } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";

import { createCustomersFromCSVAction } from "@/app/actions/customer-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCustomer } from "@/hooks/use-customer";
import { CSVCustomerEssentials } from "@/lib/validations/customer-validations";

type CustomerInfoFormSelectProps = {
  customers: Customer[];
  onClearAll: () => void;
};

export default function CustomerInfoFormSelect({
  customers,
  onClearAll,
}: CustomerInfoFormSelectProps) {
  const { selectedCustomer, handleSelectCustomer } = useCustomer();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: async (csv) => {
          // CSV validation
          const validatedCustomersData = CSVCustomerEssentials.safeParse(
            csv.data,
          );
          if (!validatedCustomersData.success) {
            toast.error("Invalid CSV file format.");
            return;
          }

          // Create customers
          const result = await createCustomersFromCSVAction(
            validatedCustomersData.data,
          );
          if (result?.message) {
            toast.error(result.message);
            return;
          }
          toast.success("Customers created successfully.");
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  }

  return (
    <div className="flex items-center gap-x-4">
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

      {selectedCustomer && (
        <Button
          onClick={onClearAll}
          variant="outline"
          size="icon"
          className="shrink-0"
        >
          <X className="h-5 w-5" />
        </Button>
      )}

      <Separator orientation="vertical" className="h-10" />

      <div className="min-w-[150px]">
        <Input
          type="file"
          id="csv-file"
          accept="text/csv, .csv, application/vnd.ms-excel"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
