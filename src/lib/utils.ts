import { Order, Task } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { auth } from "./auth";
import { CustomerShipmentWithItems } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatOrderId(order: Order) {
  const date = order.createdAt.toISOString().split("T")[0].replace(/-/g, "");
  const numberPart = order.id.slice(-4).toUpperCase();

  return `ORD-${date}-${numberPart}`;
}

export function formatShipmentId(shipment: CustomerShipmentWithItems) {
  const date = shipment.createdAt.toISOString().split("T")[0].replace(/-/g, "");
  const numberPart = shipment.id.slice(-4).toUpperCase();

  return `SHIP-${date}-${numberPart}`;
}

export function formatTaskId(task: Task) {
  const numberPart = task.id.slice(-4).toUpperCase();

  return `TASK-${numberPart}`;
}

export function generateSKU({ category, name }: Record<string, string>) {
  const categoryPart = category.slice(0, 3).toUpperCase();
  const namePart = name.slice(0, 3).toUpperCase();
  const idPart = crypto.randomUUID().slice(-4).toUpperCase();

  return `${categoryPart}-${namePart}-${idPart}`;
}

export function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return session;
}
