import { CustomerShipment, Product } from "@prisma/client";

import prisma from "../db";
import { CustomerEssentials, CustomerOrderEssentials } from "../types";

export async function getCustomers() {
  const customers = await prisma.customer.findMany();

  return customers;
}

export async function getCustomerByEmail(email: CustomerEssentials["email"]) {
  const customer = await prisma.customer.findUnique({
    where: {
      email,
    },
  });

  return customer;
}

export async function createCustomer(customer: CustomerEssentials) {
  const newCustomer = await prisma.customer.create({
    data: customer,
  });

  return newCustomer;
}

export async function createCustomerShipment(
  shipment: CustomerOrderEssentials,
) {
  const newCustomerShipment = await prisma.customerShipment.create({
    data: shipment,
  });

  return newCustomerShipment;
}

export async function createCustomerItems(
  items: { productId: string; customerShipmentId: string; quantity: number }[],
) {
  const newCustomerItems = await prisma.shipmentItem.createMany({
    data: items,
  });

  return newCustomerItems;
}

export async function updateCustomerShipmentStatus(
  customerOrderId: CustomerShipment["id"],
) {
  const updatedCustomerOrder = await prisma.customerShipment.update({
    where: {
      id: customerOrderId,
    },
    data: {
      status: "Completed",
    },
  });

  return updatedCustomerOrder;
}

export async function updateProductQuantities(
  productsToUpdate: { id: Product["id"]; quantity: Product["quantity"] }[],
) {
  const updatePromises = productsToUpdate.map(({ id, quantity }) => {
    return prisma.product.update({
      where: {
        id,
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });
  });

  const updatedProducts = await Promise.all(updatePromises);

  return updatedProducts;
}
