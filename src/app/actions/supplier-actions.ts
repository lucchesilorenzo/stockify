"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
  createSupplier,
  updateSupplierRating,
} from "@/lib/queries/supplier-queries";
import {
  supplierFormSchema,
  supplierIdSchema,
  supplierRatingSchema,
} from "@/lib/validations/supplier-validations";

export async function createSupplierAction(supplier: unknown) {
  // Validation
  const validatedSupplier = supplierFormSchema.safeParse(supplier);
  if (!validatedSupplier.success) {
    return { message: "Invalid form data." };
  }

  // Create supplier
  try {
    await createSupplier(validatedSupplier.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Supplier already exists." };
      }
    }
    return { message: "Failed to create supplier." };
  }

  revalidatePath("/app/suppliers");
}

export async function updateSupplierRatingAction(
  supplierId: unknown,
  rating: unknown,
) {
  // Validation
  const validatedSuppliedId = supplierIdSchema.safeParse(supplierId);
  if (!validatedSuppliedId.success) {
    return { message: "Invalid supplier ID." };
  }

  const validatedRating = supplierRatingSchema.safeParse(rating);
  if (!validatedRating.success) {
    return { message: "Invalid rating." };
  }

  // Update supplier rating
  try {
    await updateSupplierRating(validatedSuppliedId.data, validatedRating.data);
  } catch {
    return { message: "Failed to update supplier rating." };
  }

  revalidatePath("/app/suppliers");
}
