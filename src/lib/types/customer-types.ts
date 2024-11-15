import { Customer, CustomerShipment, Prisma } from "@prisma/client";

export type CustomerEssentials = Omit<
  Customer,
  "id" | "createdAt" | "updatedAt"
>;

export type CustomerWithCustomerShipment = Prisma.CustomerGetPayload<{
  include: {
    customerShipment: {
      include: {
        shipmentItem: {
          include: {
            product: {
              select: {
                name: true;
                price: true;
              };
            };
          };
        };
      };
    };
  };
}>;

export type CustomerShipmentWithItems = Prisma.CustomerShipmentGetPayload<{
  include: {
    shipmentItem: {
      include: {
        product: {
          select: {
            name: true;
            price: true;
          };
        };
      };
    };
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
