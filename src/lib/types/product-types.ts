import { Prisma, Product } from "@prisma/client";

export type ProductWithCategoryAndWarehouse = Prisma.ProductGetPayload<{
  include: {
    category: {
      select: {
        name: true;
      };
    };
    warehouse: {
      select: {
        name: true;
      };
    };
  };
}>;

export type ProductEssentials = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "status" | "description" | "image"
>;

export type ProductStatus = {
  value: "in-stock" | "out-of-stock" | "archived";
  label: "In Stock" | "Out of Stock" | "Archived";
};
