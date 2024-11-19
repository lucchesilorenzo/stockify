"use client";

import { useState } from "react";

import CustomerEditForm from "../customers/customer-edit-form/customer-edit-form";
import OrderForm from "../orders/order-form";
import RestockOrderForm from "../orders/restock-order-form";
import SupplierForm from "../suppliers/supplier-form";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CustomerWithCustomerShipment,
  ProductWithCategoryAndWarehouse,
} from "@/lib/types";

type FormDialogProps = {
  children: React.ReactNode;
  actionType:
    | "createOrder"
    | "createRestockOrder"
    | "editCustomer"
    | "addSupplier";
  products?: ProductWithCategoryAndWarehouse[];
  customer?: CustomerWithCustomerShipment;
};

export default function FormDialog({
  children,
  actionType,
  products,
  customer,
}: FormDialogProps) {
  const [closeDialog, setCloseDialog] = useState(false);

  return (
    <Dialog open={closeDialog} onOpenChange={setCloseDialog}>
      <DialogTrigger asChild>
        <Button
          variant={customer ? "outline" : "default"}
          size={customer ? "icon" : "default"}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "createOrder" && "Create a new order"}
            {actionType === "createRestockOrder" &&
              "Create a new restock order"}
            {actionType === "editCustomer" && "Edit customer"}
            {actionType === "addSupplier" && "Add a new supplier"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below. Ensure that all required fields are
            completed correctly before submitting.
          </DialogDescription>
        </DialogHeader>
        {actionType === "createOrder" && (
          <OrderForm onFormSubmit={() => setCloseDialog(!closeDialog)} />
        )}
        {actionType === "createRestockOrder" && (
          <RestockOrderForm
            onFormSubmit={() => setCloseDialog(!closeDialog)}
            products={products!}
          />
        )}
        {actionType === "editCustomer" && (
          <CustomerEditForm
            onFormSubmit={() => setCloseDialog(!closeDialog)}
            customer={customer!}
          />
        )}
        {actionType === "addSupplier" && (
          <SupplierForm onFormSubmit={() => setCloseDialog(!closeDialog)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
