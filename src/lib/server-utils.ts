import { Order, Product } from "@prisma/client";
import "server-only";
import prisma from "./db";
import { TOrderFormSchema, TProductFormSchema } from "./validations";

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

export async function createNewProduct(product: TProductFormSchema) {
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
  // Checks if product has an order
  const productHasOrder = await prisma.order.findFirst({
    where: {
      productId,
    },
  });

  return productHasOrder;
}

export async function createNewOrder(
  order: TOrderFormSchema,
  totalPrice: Order["totalPrice"],
) {
  const newOrder = await prisma.order.create({
    data: {
      ...order,
      totalPrice,
    },
  });

  return newOrder;
}

// --- Categories ---

export async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}
