"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import OrderForm from "./order-form";
import ProductForm from "./product-form";
import { Button } from "./ui/button";

type EntityDialogProps = {
  children: React.ReactNode;
  actionType: "addProduct" | "createOrder";
};

export default function EntityDialog({
  children,
  actionType,
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
            Fill in the details below to place a new order. Ensure that all
            required fields are completed correctly before submitting.
          </DialogDescription>
        </DialogHeader>
        {actionType === "createOrder" ? (
          <OrderForm onFormSubmit={() => setCloseDialog(!closeDialog)} />
        ) : (
          <ProductForm onFormSubmit={() => setCloseDialog(!closeDialog)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
