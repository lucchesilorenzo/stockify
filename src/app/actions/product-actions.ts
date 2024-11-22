"use server";

import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createActivity } from "@/lib/queries/dashboard-queries";
import {
  checkIfProductHasBeenRestocked,
  checkIfProductHasBeenShipped,
  getProductById,
  getProductOptions,
  softDeleteProductById,
  updateProductById,
} from "@/lib/queries/product-queries";
import { ActivityEssentials } from "@/lib/types";
import {
  productEditFormSchema,
  productIdSchema,
} from "@/lib/validations/product-validations";

export async function deleteProductAction(productId: unknown) {
  // Validate product ID
  const validatedProductId = productIdSchema.safeParse(productId);
  if (!validatedProductId.success) {
    return { message: "Invalid product ID." };
  }

  // Check if product exists
  const product = await getProductById(validatedProductId.data);
  if (!product) return { message: "Product not found." };

  // Check if product has been restocked
  if (await checkIfProductHasBeenRestocked(validatedProductId.data)) {
    return { message: "You cannot delete a product that has been restocked!" };
  }

  // Check if product has been shipped
  if (await checkIfProductHasBeenShipped(validatedProductId.data)) {
    return { message: "You cannot delete a product that has been shipped!" };
  }

  try {
    await softDeleteProductById(validatedProductId.data);
  } catch {
    return { message: "Failed to delete product." };
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Deleted",
    entity: "Product",
    product: product.name,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/products");
}

export async function updateProductAction(
  productId: unknown,
  product: unknown,
) {
  // Check if product ID is valid
  const validatedProductId = productIdSchema.safeParse(productId);
  if (!validatedProductId.success) {
    return { message: "Invalid product ID." };
  }

  // Check if product data is valid
  const validatedProduct = productEditFormSchema.safeParse(product);
  if (!validatedProduct.success) {
    return { message: "Invalid product data." };
  }

  // Check if product exists
  const productToUpdate = await getProductById(validatedProductId.data);
  if (!productToUpdate) return { message: "Product not found." };

  // Update product
  try {
    await updateProductById(validatedProductId.data, validatedProduct.data);
  } catch {
    return { message: "Failed to update product." };
  }

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Updated",
    entity: "Product",
    product: productToUpdate.name,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath(`/app/products/${productToUpdate.slug}/edit`);
}

export async function isMaxProductQuantityReachedAction(
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
