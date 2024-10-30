"use client";

import { useState } from "react";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import ProductAlertDialog from "./product-alert-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProduct } from "@/hooks/use-product";
import { ProductWithCategory } from "@/lib/types";

type ProductActionsProps = {
  product: ProductWithCategory;
};

export default function ProductActions({ product }: ProductActionsProps) {
  const { handleDeleteProduct } = useProduct();
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
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/app/products/${product.slug}/edit`}>Edit</Link>
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
