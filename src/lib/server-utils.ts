import "server-only";
import prisma from "./db";

export async function getProducts() {
  const products = await prisma.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return products;
}

export async function getOrders() {
  const orders = await prisma.order.findMany({
    include: {
      product: {
        select: {
          name: true,
        },
      },
    },
  });

  return orders;
}

export async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}
