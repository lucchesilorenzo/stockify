import { Customer, CustomerShipment, Prisma } from "@prisma/client";

export type CustomerEssentials = Omit<
  Customer,
  "id" | "createdAt" | "updatedAt"
>;

export type CustomerWithCustomerShipment = Prisma.CustomerGetPayload<{
  include: {
    customerShipment: true;
  };
}>;

export type CustomerSelectedProduct = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type CustomerShipmentEssentials = Omit<
  CustomerShipment,
  "id" | "createdAt" | "updatedAt" | "status"
>;
