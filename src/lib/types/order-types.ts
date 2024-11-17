import { Order, Prisma } from "@prisma/client";

export type OrderEssentials = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "status"
>;

export type OrderWithProduct = Prisma.OrderGetPayload<{
  include: {
    product: {
      select: {
        name: true;
      };
    };
  };
}>;
