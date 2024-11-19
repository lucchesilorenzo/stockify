import { Category } from "@prisma/client";

import prisma from "../db";

export async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}

export async function getCategory(categoryId: Category["id"]) {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  return category;
}
