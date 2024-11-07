"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import {
  createCustomer,
  createCustomerItems,
  createCustomerOrder,
  getCustomerByEmail,
  updateCustomerOrderStatus,
} from "@/lib/queries/customer-queries";
import { createActivity } from "@/lib/queries/dashboard-queries";
import { ActivityEssentials } from "@/lib/types";
import { shippingFormSchema } from "@/lib/validations/customer-validations";

export async function createShipment(shipment: unknown) {
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
    const { firstName, lastName, email, phone, address, city, zipcode } =
      validatedShipment.data;

    try {
      newCustomer = await createCustomer({
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        zipcode,
      });
    } catch {
      return { message: "Failed to create customer." };
    }
  }

  // Take customer ID from new customer or existing customer
  const customerId = customer?.id || newCustomer?.id;
  if (!customerId) return;

  // Create shipment for customer order
  try {
    const customerOrder = await createCustomerOrder({ customerId });

    // Update customer order status in 1 minute
    setTimeout(async () => {
      try {
        await updateCustomerOrderStatus(customerOrder.id);
      } catch {
        return { message: "Failed to update order status." };
      }
    }, 60000);

    // Create customer order items object
    const customerOrderItems = validatedShipment.data.products.map((p) => ({
      productId: p.productId,
      customerOrderId: customerOrder.id,
      quantity: p.quantity,
    }));

    // Assign customer order items to customer order
    await createCustomerItems(customerOrderItems);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Customer order already exists." };
      }
    }
    return { message: "Failed to create customer order." };
  }

  // Create new activity
  const activity: ActivityEssentials = {
    activity: "Created",
    entity: "Shipping",
    product: "-",
  };

  try {
    await createActivity(activity);
  } catch {
    return { message: "Failed to create activity." };
  }

  revalidatePath("/app/customers");
}
