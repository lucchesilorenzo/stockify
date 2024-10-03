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
import { Button } from "./ui/button";

type EntityDialogProps = {
  children: React.ReactNode;
};

export default function EntityDialog({ children }: EntityDialogProps) {
  const [closeDialog, setCloseDialog] = useState(false);

  return (
    <Dialog open={closeDialog} onOpenChange={setCloseDialog}>
      <DialogTrigger asChild>
        <Button>{children}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new order</DialogTitle>
          <DialogDescription>
            Fill in the details below to place a new order. Ensure that all
            required fields are completed correctly before submitting.
          </DialogDescription>
        </DialogHeader>
        <OrderForm onFormSubmit={() => setCloseDialog(!closeDialog)} />
      </DialogContent>
    </Dialog>
  );
}
