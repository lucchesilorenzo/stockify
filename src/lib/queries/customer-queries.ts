import { CustomerOrder } from "@prisma/client";

import prisma from "../db";
import { CustomerEssentials, CustomerOrderEssentials } from "../types";

export async function createCustomer(customer: CustomerEssentials) {
  const newCustomer = await prisma.customer.create({
    data: customer,
  });

  return newCustomer;
}

export async function getCustomerByEmail(email: CustomerEssentials["email"]) {
  const customer = await prisma.customer.findUnique({
    where: {
      email,
    },
  });

  return customer;
}

export async function createCustomerOrder(order: CustomerOrderEssentials) {
  const newCustomerOrder = await prisma.customerOrder.create({
    data: order,
  });

  return newCustomerOrder;
}

export async function updateCustomerOrderStatus(
  customerOrderId: CustomerOrder["id"],
) {
  const updatedCustomerOrder = await prisma.customerOrder.update({
    where: {
      id: customerOrderId,
    },
    data: {
      status: "Completed",
    },
  });

  return updatedCustomerOrder;
}

export async function createCustomerItems(
  items: { productId: string; customerOrderId: string; quantity: number }[],
) {
  const newCustomerItems = await prisma.customerOrderItem.createMany({
    data: items,
  });

  return newCustomerItems;
}
