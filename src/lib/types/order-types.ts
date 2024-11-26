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
    user: {
      select: {
        firstName: true;
        lastName: true;
      };
    };
  };
}>;

export type OrderType = {
  value: "new" | "restock";
  label: "New Orders" | "Restock Orders";
};

export type OrderStatus = {
  value: "shipped" | "delivered";
  label: "Shipped" | "Delivered";
};
