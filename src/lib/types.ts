import { Category, Order, Product } from "@prisma/client";

export type ProductWithCategory = Product & Pick<Category, "name">;

export type ProductEssentials = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "categoryId"
> &
  Pick<Category, "name">;

export type OrderWithProduct = Order & Pick<Product, "name">;
