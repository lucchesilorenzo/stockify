"use client";

import Papa from "papaparse";
import { toast } from "sonner";

import { createCustomersFromCSVAction } from "@/app/actions/customer-actions";
import { Input } from "@/components/ui/input";
import { CSVCustomerEssentials } from "@/lib/validations/customer-validations";

export default function CustomerCSVUpload() {
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
    <div className="min-w-[150px]">
      <Input
        type="file"
        id="csv-file"
        accept="text/csv, .csv, application/vnd.ms-excel"
        onChange={handleFileChange}
      />
    </div>
  );
}
