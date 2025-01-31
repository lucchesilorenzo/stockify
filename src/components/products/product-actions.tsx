"use client";

import { useState } from "react";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import MainAlertDialog from "../common/main-alert-dialog";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProduct } from "@/hooks/use-product";
import { ProductWithCategoryAndWarehouse } from "@/lib/types";

type ProductActionsProps = {
  product: ProductWithCategoryAndWarehouse;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const { handleUpdateProductStatus } = useProduct();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  async function onUpdateProductStatus() {
    await handleUpdateProductStatus(product.id, product.status);
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
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/app/products/${product.slug}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsAlertOpen(true)}>
            {product.status === "ARCHIVED" ? "Restore" : "Archive"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MainAlertDialog
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        onUpdateItemStatus={onUpdateProductStatus}
        status={product.status}
        type="product"
      />
    </>
  );
}
