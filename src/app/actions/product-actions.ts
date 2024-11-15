"use server";

import { Prisma, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createActivity } from "@/lib/queries/dashboard-queries";
import {
  checkIfProductHasBeenShipped,
  checkIfProductHasOrder,
  createNewProduct,
  deleteProductById,
  getProductById,
  getProductOptions,
  updateProductById,
} from "@/lib/queries/product-queries";
import { ActivityEssentials } from "@/lib/types";
import { createSlug } from "@/lib/utils";
import {
  productEditFormSchema,
  productFormSchema,
  productIdSchema,
} from "@/lib/validations/product-validations";

export async function createProductAction(product: unknown) {
  const validatedProduct = productFormSchema.safeParse(product);
  if (!validatedProduct.success) {
    return { message: "Invalid product." };
  }

  // Create a new product with slug
  const newProduct = {
    ...validatedProduct.data,
    slug: createSlug(validatedProduct.data.name),
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

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Created",
    entity: "Product",
    product: validatedProduct.data.name,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/products");
}

export async function deleteProductAction(productId: unknown) {
  const validatedProductId = productIdSchema.safeParse(productId);
  if (!validatedProductId.success) {
    return { message: "Invalid product ID." };
  }

  // Check if product exists
  const product = await getProductById(validatedProductId.data);
  if (!product) return { message: "Product not found." };

  // Check if product has an order
  const productHasOrder = await checkIfProductHasOrder(validatedProductId.data);
  if (productHasOrder) {
    return { message: "You cannot delete a product that has an order!" };
  }

  // Check if product has been shipped
  const productHasBeenshipped = await checkIfProductHasBeenShipped(
    validatedProductId.data,
  );
  if (productHasBeenshipped) {
    return { message: "You cannot delete a product that has been shipped!" };
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
