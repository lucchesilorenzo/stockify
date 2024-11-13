"use client";

import * as React from "react";

import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
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
          <Button variant="outline" className="justify-start">
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
                    value={status.label}
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
                <CommandSeparator />
                <CommandItem
                  onSelect={handleResetStatus}
                  className="flex justify-center text-red-500 hover:bg-red-50 font-semibold"
                >
                  Reset
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
