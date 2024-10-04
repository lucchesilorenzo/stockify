"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { productFormSchema } from "./validations";
import { Prisma } from "@prisma/client";

export async function addProduct(product: unknown) {
  const validatedProduct = productFormSchema.safeParse(product);
  if (!validatedProduct.success) {
    return { message: "Invalid product." };
  }

  try {
    await prisma.product.create({
      data: validatedProduct.data,
    });
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
