"use client";

import { useState } from "react";

import { Button } from "../ui/button";

import { updateOrderStatusAction } from "@/app/actions/order-actions";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type StatusBadgeProps = {
  initialStatus: string;
  orderId: string;
};

export default function StatusBadge({
  initialStatus,
  orderId,
}: StatusBadgeProps) {
  const [status, setStatus] = useState(initialStatus);

  async function handleStatusChange(newStatus: string) {
    setStatus(newStatus);

    const orderToUpdate = {
      id: orderId,
      status,
    };

    await updateOrderStatusAction(orderToUpdate);
  }

  if (initialStatus === "Completed") {
    return (
      <Badge
        variant={status === "Pending" ? "secondary" : "default"}
        className="cursor-pointer"
      >
        {status}
      </Badge>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 bg-transparent border-none">
          <Badge
            variant={status === "Pending" ? "secondary" : "default"}
            className="cursor-pointer"
          >
            {status}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleStatusChange("Completed")}>
          <Badge variant="default">Completed</Badge>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
