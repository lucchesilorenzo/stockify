"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createActivity } from "@/lib/queries/dashboard-queries";
import {
  createSupplier,
  updateSupplierRating,
} from "@/lib/queries/supplier-queries";
import { ActivityEssentials } from "@/lib/types";
import { checkAuth } from "@/lib/utils";
import {
  supplierFormSchema,
  supplierIdSchema,
  supplierRatingSchema,
} from "@/lib/validations/supplier-validations";

export async function createSupplierAction(supplier: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

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

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Created",
    entity: "Supplier",
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/suppliers");
}

export async function updateSupplierRatingAction(
  supplierId: unknown,
  rating: unknown,
) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation for supplier ID
  const validatedSuppliedId = supplierIdSchema.safeParse(supplierId);
  if (!validatedSuppliedId.success) {
    return { message: "Invalid supplier ID." };
  }

  // Validation for rating
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

  // Create a new activity
  const activity: ActivityEssentials = {
    activity: "Updated",
    entity: "Supplier",
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/suppliers");
}
