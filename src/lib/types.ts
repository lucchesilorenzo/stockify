import { Order, Prisma, Product } from "@prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    category: {
      select: {
        name: true;
      };
    };
  };
}>;

export type ProductEssentials = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type OrderWithProduct = Prisma.OrderGetPayload<{
  include: {
    product: {
      select: {
        name: true;
      };
    };
  };
}>;

export type OrderEssentials = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "status"
>;
