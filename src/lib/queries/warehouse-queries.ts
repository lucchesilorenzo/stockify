import { Warehouse } from "@prisma/client";

import prisma from "../db";

export async function getWarehouses() {
  const warehouses = await prisma.warehouse.findMany();

  return warehouses;
}

export async function getWarehouse(warehouseId: Warehouse["id"]) {
  const warehouse = await prisma.warehouse.findUnique({
    where: {
      id: warehouseId,
    },
  });

  return warehouse;
}

export async function updateWarehouseQuantity(
  warehouseId: Warehouse["id"],
  quantity: Warehouse["quantity"],
) {
  const warehouse = await prisma.warehouse.update({
    where: {
      id: warehouseId,
    },
    data: {
      quantity: {
        increment: quantity,
      },
    },
  });

  return warehouse;
}

export async function decrementWarehouseQuantity(
  warehouseId: Warehouse["id"],
  quantity: Warehouse["quantity"],
) {
  const warehouse = await prisma.warehouse.update({
    where: {
      id: warehouseId,
    },
    data: {
      quantity: {
        decrement: quantity,
      },
    },
  });

  return warehouse;
}

export async function updateWarehouseQuantities(
  warehousesToUpdate: {
    warehouseId: Warehouse["id"];
    quantity: Warehouse["quantity"];
  }[],
) {
  const updatePromises = warehousesToUpdate.map(
    async ({ warehouseId, quantity }) => {
      const warehouse = await prisma.warehouse.findUnique({
        where: {
          id: warehouseId,
        },
      });

      if (warehouse && warehouse.quantity >= quantity) {
        return prisma.warehouse.update({
          where: {
            id: warehouseId,
          },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        });
      }
    },
  );

  const updatedWarehouses = await Promise.all(updatePromises);

  return updatedWarehouses;
}
