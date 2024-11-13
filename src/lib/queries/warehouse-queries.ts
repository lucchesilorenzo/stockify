import prisma from "../db";

export async function getWarehouses() {
  const warehouses = await prisma.warehouse.findMany();

  return warehouses;
}
