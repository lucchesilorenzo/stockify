"use client";

import { useState } from "react";

import { MoreHorizontal } from "lucide-react";

import MainAlertDialog from "../common/main-alert-dialog";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { updateOrderStatusAction } from "@/app/actions/order-actions";
import { useInvoice } from "@/hooks/use-invoice";
import { DetailedOrder } from "@/lib/types";

type OrderActionsProps = {
  order: DetailedOrder;
};

export default function OrderActions({ order }: OrderActionsProps) {
  const { handleIsInvoiceOpenAndSetOrder } = useInvoice();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  async function onUpdateOrderStatus() {
    await updateOrderStatusAction(order.id);
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
          <DropdownMenuItem
            onSelect={() => handleIsInvoiceOpenAndSetOrder(order)}
          >
            View details
          </DropdownMenuItem>
          {order.status === "SHIPPED" && (
            <DropdownMenuItem onSelect={() => setIsAlertOpen(true)}>
              Update status
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <MainAlertDialog
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        onUpdateItemStatus={onUpdateOrderStatus}
        type="order"
      />
    </>
  );
}
