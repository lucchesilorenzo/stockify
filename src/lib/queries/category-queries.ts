import prisma from "../db";

export async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}
