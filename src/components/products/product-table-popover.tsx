"use client";

import * as React from "react";

import { Table } from "@tanstack/react-table";
import { XCircle } from "lucide-react";

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
import { productStatuses } from "@/lib/data";
import { Status } from "@/lib/types";

type ProductTablePopoverProps<T> = {
  table: Table<T>;
};

export default function ProductTablePopover<T>({
  table,
}: ProductTablePopoverProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null,
  );

  function handleResetStatus() {
    setSelectedStatus(null);
    table.getColumn("status")?.setFilterValue("");
    setOpen(false);
  }

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[110px] sm:w-[150px] justify-start"
          >
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-[200px] -ml-8"
          side="bottom"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {productStatuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        productStatuses.find(
                          (priority) => priority.value === value,
                        ) || null,
                      );
                      table.getColumn("status")?.setFilterValue(value);
                      setOpen(false);
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {selectedStatus && (
          <Button variant="ghost" onClick={handleResetStatus} className="p-2">
            <XCircle className="h-5 w-5" />
          </Button>
        )}
      </Popover>
    </div>
  );
}
