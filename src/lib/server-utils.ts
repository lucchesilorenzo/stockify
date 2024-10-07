import { Product } from "@prisma/client";
import "server-only";
import prisma from "./db";
import { TProductFormSchema } from "./validations";
import {
  OrderEssentials,
  ProductEssentials,
  ProductWithCategory,
} from "./types";

// --- Products ---

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

export async function getProductById(productId: Product["id"]) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  return product;
}

export async function getProductBySlug(productSlug: Product["slug"]) {
  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug,
    },
  });

  return product;
}

export async function getProductOptions(productId: Product["id"]) {
  const options = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      quantity: true,
      minQuantity: true,
      maxQuantity: true,
      price: true,
    },
  });

  return options;
}

export async function createNewProduct(product: ProductEssentials) {
  const newProduct = await prisma.product.create({
    data: product,
  });

  return newProduct;
}

export async function updateProductQuantity(
  productId: Product["id"],
  quantity: Product["quantity"],
) {
  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      quantity: {
        increment: quantity,
      },
    },
  });

  return updatedProduct;
}

export async function deleteProductById(productId: Product["id"]) {
  const deletedProduct = await prisma.product.delete({
    where: {
      id: productId,
    },
  });

  return deletedProduct;
}

// --- Orders ---

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

export async function checkIfProductHasOrder(productId: Product["id"]) {
  const productHasOrder = await prisma.order.findFirst({
    where: {
      productId,
    },
  });

  return productHasOrder;
}

export async function createNewOrder(orderDetails: OrderEssentials) {
  const newOrder = await prisma.order.create({
    data: orderDetails,
  });

  return newOrder;
}

export async function getMonthlyOrders() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);

  const ordersThisMonth = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
      },
    },
  });

  return ordersThisMonth;
}

// --- Categories ---

export async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}
