"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProductContext } from "@/lib/hooks";
import { ProductWithCategory } from "@/lib/types";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import ProductAlertDialog from "./product-alert-dialog";
import { Button } from "./ui/button";

type ProductActionsProps = {
  product: ProductWithCategory;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const { handleDeleteProduct } = useProductContext();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  async function onDeleteProduct() {
    await handleDeleteProduct(product.id);
    setIsAlertOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(product.id)}
          >
            Copy product ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsAlertOpen(!isAlertOpen)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProductAlertDialog
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        onDeleteProduct={onDeleteProduct}
      />
    </>
  );
}
