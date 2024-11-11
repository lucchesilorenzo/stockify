import { RestockOrder } from "@prisma/client";

export type RestockOrderEssentials = Omit<
  RestockOrder,
  "id" | "createdAt" | "updatedAt" | "status" | "customerId"
>;
