import { Product } from "@prisma/client";
import { notFound } from "next/navigation";

import prisma from "../db";
import { ProductEssentials } from "../types";

import { TProductEditFormSchema } from "@/lib/validations/product-validations";

export async function getProducts() {
  const products = await prisma.product.findMany({
    where: {
      deletedAt: null,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      warehouse: {
        select: {
          name: true,
        },
      },
    },
  });

  return products;
}

export async function getAvailableProducts() {
  const availableProducts = await prisma.product.findMany({
    where: {
      status: "In Stock",
      deletedAt: null,
      quantity: {
        gt: 0,
      },
    },
  });

  return availableProducts;
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

  if (!product) return notFound();

  return product;
}

export async function getProductOptions(productId: Product["id"]) {
  const options = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      quantity: true,
      maxQuantity: true,
      price: true,
    },
  });

  return options;
}

export async function findDeletedProductByName(name: Product["name"]) {
  const product = await prisma.product.findFirst({
    where: {
      name,
      deletedAt: {
        not: null,
      },
    },
  });

  return product;
}

export async function createProduct(product: ProductEssentials) {
  const newProduct = await prisma.product.create({
    data: product,
  });

  return newProduct;
}

export async function updateProductById(
  productId: Product["id"],
  product: TProductEditFormSchema,
) {
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: product,
  });
}

export async function restoreProductById(productId: Product["id"]) {
  const restoredProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      deletedAt: null,
    },
  });

  return restoredProduct;
}

export async function updateProductQuantityAndStatus(
  productId: Product["id"],
  quantity: Product["quantity"],
) {
  const productToUpdate = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      quantity: {
        increment: quantity,
      },
      status: "In Stock",
    },
  });

  return productToUpdate;
}

export async function updateProductQuantitiesAndStatus(
  productsToUpdate: { id: Product["id"]; quantity: Product["quantity"] }[],
) {
  const updatePromises = productsToUpdate.map(async ({ id, quantity }) => {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { quantity: true },
    });

    if (product && product.quantity >= quantity) {
      const newQuantity = product.quantity - quantity;

      return prisma.product.update({
        where: { id },
        data: {
          quantity: {
            decrement: quantity,
          },
          status: newQuantity === 0 ? "Out of Stock" : "In Stock",
        },
      });
    }
  });

  const updatedProducts = await Promise.all(updatePromises);

  return updatedProducts;
}

export async function softDeleteProductById(productId: Product["id"]) {
  const deletedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return deletedProduct;
}

export async function checkIfProductHasBeenRestocked(productId: Product["id"]) {
  const hasProductBeenRestocked = await prisma.order.findFirst({
    where: {
      productId,
      type: "Restock",
    },
  });

  return hasProductBeenRestocked;
}

export async function checkIfProductHasBeenShipped(productId: Product["id"]) {
  const hasProductBeenShipped = await prisma.shipmentItem.findFirst({
    where: {
      productId,
    },
  });

  return hasProductBeenShipped;
}
