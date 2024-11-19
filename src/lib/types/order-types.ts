import { Order, Prisma } from "@prisma/client";

export type OrderEssentials = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "status"
>;

export type OrderWithProductAndSupplier = Prisma.OrderGetPayload<{
  include: {
    product: {
      select: {
        name: true;
      };
    };
    supplier: {
      select: {
        name: true;
      };
    };
  };
}>;
