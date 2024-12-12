"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
  createCustomer,
  createCustomerItems,
  createCustomerShipment,
  createCustomers,
  getCustomerByEmail,
  updateCustomerById,
  updateCustomerShipmentStatus,
} from "@/lib/queries/customer-queries";
import { createActivity } from "@/lib/queries/dashboard-queries";
import { updateProductQuantitiesAndStatus } from "@/lib/queries/product-queries";
import { updateWarehouseQuantities } from "@/lib/queries/warehouse-queries";
import { ActivityEssentials } from "@/lib/types";
import { checkAuth } from "@/lib/utils";
import {
  CSVCustomerEssentials,
  customerEditFormSchema,
  shippingFormSchema,
} from "@/lib/validations/customer-validations";

export async function createShipmentAction(shipment: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation
  const validatedShipment = shippingFormSchema.safeParse(shipment);
  if (!validatedShipment.success) {
    return { message: "Invalid form data." };
  }

  // Check if customer already exists
  const customer = await getCustomerByEmail(validatedShipment.data.email);

  let newCustomer;

  // If customer does not exist, create a new customer
  if (!customer) {
    const { firstName, lastName, phone, email, address, city, zipCode } =
      validatedShipment.data;

    try {
      newCustomer = await createCustomer({
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        zipCode,
      });
    } catch {
      return { message: "Failed to create customer." };
    }
  }

  // Create new activity if a new customer was created
  if (newCustomer) {
    const activity: ActivityEssentials = {
      activity: "CREATED",
      entity: "Customer",
      userId: session.user.id,
    };

    try {
      await createActivity(activity);
    } catch {
      return { message: "Failed to create activity." };
    }
  }

  // Take customer ID from new customer or existing customer
  const customerId = customer?.id || newCustomer?.id;
  if (!customerId) return;

  // Create customer shipment
  try {
    const customerShipment = await createCustomerShipment({ customerId });

    // Update customer shipment status in 1 minute
    setTimeout(async () => {
      try {
        await updateCustomerShipmentStatus(customerShipment.id);
      } catch {
        return { message: "Failed to update shipment status." };
      }
    }, 60000);

    // Create items for shipment
    const customerShipmentItems = validatedShipment.data.products.map((p) => ({
      productId: p.productId,
      customerShipmentId: customerShipment.id,
      quantity: p.quantity,
    }));

    // Assign items to shipment and add to customer
    await createCustomerItems(customerShipmentItems);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Shipment already exists." };
      }
    }
    return { message: "Failed to create shipment." };
  }

  // Decrement quantity from inventory
  const productsToUpdate = validatedShipment.data.products.map((p) => ({
    id: p.productId,
    quantity: p.quantity,
  }));

  try {
    await updateProductQuantitiesAndStatus(productsToUpdate);
  } catch {
    return { message: "Failed to update product quantities and status." };
  }

  // Decrement quantity from warehouse
  const warehousesToUpdate = validatedShipment.data.products.map((p) => ({
    warehouseId: p.warehouseId,
    quantity: p.quantity,
  }));

  try {
    await updateWarehouseQuantities(warehousesToUpdate);
  } catch {
    return { message: "Failed to update warehouse quantities." };
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "CREATED",
    entity: "Shipment",
    product: validatedShipment.data.products.map((p) => p.name).join(", "),
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/customers");
}

export async function updateCustomerAction(customer: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation
  const validatedCustomer = customerEditFormSchema.safeParse(customer);
  if (!validatedCustomer.success) {
    return { message: "Invalid form data." };
  }

  // Update customer
  try {
    await updateCustomerById(validatedCustomer.data.id, validatedCustomer.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email has already been taken." };
      }
    }
    return { message: "Failed to update customer." };
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "UPDATED",
    entity: "Customer",
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/customers");
}

export async function createCustomersFromCSVAction(csvData: unknown) {
  // Check if user is authenticated
  const session = await checkAuth();

  // Validation
  const validatedCustomersData = CSVCustomerEssentials.safeParse(csvData);
  if (!validatedCustomersData.success) {
    return { message: "Invalid CSV file format." };
  }

  // Create customers
  try {
    await createCustomers(validatedCustomersData.data);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Email or phone have already been taken." };
      }
    }
    return { message: "Failed to create customers." };
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "CREATED",
    entity: "Customer",
    userId: session.user.id,
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/customers");
}
