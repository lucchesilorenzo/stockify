"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import ProductActions from "@/components/products/product-actions";
import { Button } from "@/components/ui/button";
import { ProductWithCategory } from "@/lib/types";
import { cn, formatCurrency } from "@/lib/utils";

export const columns: ColumnDef<ProductWithCategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    accessorKey: "category.name",
    id: "category.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formattedCurrency = formatCurrency(amount);

      return <div>{formattedCurrency}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity: number = row.getValue("quantity");
      const maxQuantity = row.original.maxQuantity;
      const minQuantity = row.original.minQuantity;

      let quantityColor = "";

      if (quantity <= minQuantity) {
        quantityColor = "bg-red-100 text-red-800";
      } else if (quantity >= maxQuantity / 2) {
        quantityColor = "bg-green-100 text-green-800";
      } else {
        quantityColor = "bg-yellow-100 text-yellow-800";
      }

      return (
        <div
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 font-medium",
            quantityColor,
          )}
        >
          {quantity}
        </div>
      );
    },
  },
  {
    accessorKey: "maxQuantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Max Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "minQuantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Min Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return <ProductActions product={product} />;
    },
  },
];
