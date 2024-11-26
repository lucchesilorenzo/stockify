"use client";

import { useState } from "react";

import { Order } from "@prisma/client";

import { Button } from "../ui/button";

import { updateOrderStatusAction } from "@/app/actions/order-actions";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus } from "@/lib/types";

type StatusBadgeProps = {
  initialStatus: OrderStatus["label"];
  orderId: Order["id"];
};

export default function StatusBadge({
  initialStatus,
  orderId,
}: StatusBadgeProps) {
  const [status, setStatus] = useState(initialStatus);

  async function handleStatusChange(newStatus: OrderStatus["label"]) {
    setStatus(newStatus);
    await updateOrderStatusAction(orderId);
  }

  if (initialStatus === "Delivered") {
    return (
      <Badge
        variant={status === "Shipped" ? "secondary" : "default"}
        className="cursor-pointer"
      >
        {status}
      </Badge>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="border-none bg-transparent p-0 hover:bg-transparent focus-visible:ring-0"
          tabIndex={-1}
        >
          <Badge
            variant={status === "Shipped" ? "secondary" : "default"}
            className="cursor-pointer"
          >
            {status}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleStatusChange("Delivered")}>
          <Badge variant="default">Delivered</Badge>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
