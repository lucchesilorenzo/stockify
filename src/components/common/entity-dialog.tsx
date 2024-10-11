"use client";

import { useState } from "react";

import OrderForm from "../orders/order-form";
import ProductForm from "../products/product-form";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductWithCategory } from "@/lib/types";

type EntityDialogProps = {
  children: React.ReactNode;
  actionType: "addProduct" | "createOrder";
  filteredProducts?: ProductWithCategory[];
};

export default function EntityDialog({
  children,
  actionType,
  filteredProducts,
}: EntityDialogProps) {
  const [closeDialog, setCloseDialog] = useState(false);

  return (
    <Dialog open={closeDialog} onOpenChange={setCloseDialog}>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "createOrder"
              ? "Create a new order"
              : "Add a new product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below. Ensure that all required fields are
            completed correctly before submitting.
          </DialogDescription>
        </DialogHeader>
        {actionType === "createOrder" ? (
          <OrderForm
            onFormSubmit={() => setCloseDialog(!closeDialog)}
            filteredProducts={filteredProducts!}
          />
        ) : (
          <ProductForm onFormSubmit={() => setCloseDialog(!closeDialog)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
