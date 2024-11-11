"use client";

import { Activity } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActivityEssentials } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export const columns: ColumnDef<Activity>[] = [
  {
    accessorKey: "activity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Activity
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const activity: ActivityEssentials["activity"] = row.getValue("activity");

      let activityColor;

      switch (activity) {
        case "Created":
          activityColor = "bg-green-100 text-green-800";
          break;
        case "Updated":
          activityColor = "bg-yellow-100 text-yellow-800";
          break;
        case "Deleted":
          activityColor = "bg-red-100 text-red-800";
          break;
        default:
          activityColor = "bg-gray-100 text-gray-800";
          break;
      }

      return (
        <div
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs",
            activityColor,
          )}
        >
          {activity}
        </div>
      );
    },
  },
  {
    accessorKey: "entity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Entity
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product: ActivityEssentials["product"] = row.getValue("product");

      return <div>{product ?? "N/A"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = formatDate(date, "short");

      return <div>{formattedDate}</div>;
    },
  },
];
