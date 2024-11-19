import { Supplier } from "@prisma/client";

import prisma from "../db";
import { TSupplierFormSchema } from "../validations/supplier-validations";

export async function getSuppliers() {
  const suppliers = await prisma.supplier.findMany({
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  return suppliers;
}

export async function createSupplier(supplier: TSupplierFormSchema) {
  const newSupplier = await prisma.supplier.create({
    data: supplier,
  });

  return newSupplier;
}

export async function updateSupplierRating(
  supplierId: Supplier["id"],
  rating: Supplier["rating"],
) {
  const updatedSupplier = await prisma.supplier.update({
    where: {
      id: supplierId,
    },
    data: {
      rating,
    },
  });

  return updatedSupplier;
}
