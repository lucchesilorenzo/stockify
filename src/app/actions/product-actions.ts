"use server";

import { Prisma, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

import { checkIfProductHasOrder } from "@/lib/queries/order-queries";
import {
  createNewProduct,
  deleteProductById,
  getProductById,
  getProductOptions,
  updateProductById,
} from "@/lib/queries/product-queries";
import {
  productEditFormSchema,
  productFormSchema,
  productIdSchema,
} from "@/lib/validations/product-validations";

export async function addProduct(product: unknown) {
  const validatedProduct = productFormSchema.safeParse(product);
  if (!validatedProduct.success) {
    return { message: "Invalid product." };
  }

  // Create a new product with slug
  const newProduct = {
    ...validatedProduct.data,
    slug: slugify(validatedProduct.data.name, { lower: true }),
  };

  try {
    await createNewProduct(newProduct);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Product already exists." };
      }
    }
    return { message: "Failed to create product." };
  }

  revalidatePath("/app/products");
}

export async function deleteProduct(productId: unknown) {
  const validatedProductId = productIdSchema.safeParse(productId);
  if (!validatedProductId.success) {
    return { message: "Invalid product ID." };
  }

  // Checks if product has an order
  const productHasOrder = await checkIfProductHasOrder(validatedProductId.data);
  if (productHasOrder) {
    return { message: "You cannot delete a product that has an order!" };
  }

  try {
    await deleteProductById(validatedProductId.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { message: "Product not found." };
      }
    }
    return { message: "Failed to delete product." };
  }

  revalidatePath("/app/products");
}

export async function updateProduct(productId: unknown, product: unknown) {
  // Checks if product ID is valid
  const validatedProductId = productIdSchema.safeParse(productId);
  if (!validatedProductId.success) {
    return { message: "Invalid product ID." };
  }

  // Checks if product data is valid
  const validatedProduct = productEditFormSchema.safeParse(product);
  if (!validatedProduct.success) {
    return { message: "Invalid product data." };
  }

  // Checks if product exists
  const productToUpdate = await getProductById(validatedProductId.data);
  if (!productToUpdate) return { message: "Product not found." };

  // Update product
  try {
    await updateProductById(validatedProductId.data, validatedProduct.data);
  } catch {
    return { message: "Failed to update product." };
  }

  revalidatePath(`/app/products/${productToUpdate.slug}/edit`);
}

export async function checkIfProductMaxQuantityIsReached(
  productId: Product["id"],
  maxQuantity: Product["maxQuantity"],
) {
  const options = await getProductOptions(productId);
  if (!options) return { message: "Product options not found." };

  if (!(maxQuantity >= options.maxQuantity)) {
    return {
      message:
        "New max quantity must be greater or equal than current max quantity.",
    };
  }
}
