import { Customer, CustomerShipment } from "@prisma/client";

import prisma from "../db";
import { CustomerEssentials, CustomerShipmentEssentials } from "../types";

export async function getCustomers() {
  const customers = await prisma.customer.findMany({
    include: {
      customerShipments: {
        include: {
          shipmentItems: {
            include: {
              product: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      },
    },
  });

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
  shipment: CustomerShipmentEssentials,
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
  customerShipmentId: CustomerShipment["id"],
) {
  const updatedCustomerShipment = await prisma.customerShipment.update({
    where: {
      id: customerShipmentId,
    },
    data: {
      status: "DELIVERED",
    },
  });

  return updatedCustomerShipment;
}

export async function updateCustomerById(
  customerId: Customer["id"],
  customer: CustomerEssentials,
) {
  const updatedCustomer = await prisma.customer.update({
    where: {
      id: customerId,
    },
    data: customer,
  });

  return updatedCustomer;
}
