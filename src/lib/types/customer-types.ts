import { Customer, CustomerShipment, Prisma } from "@prisma/client";

export type CustomerEssentials = Omit<
  Customer,
  "id" | "createdAt" | "updatedAt"
>;

export type CustomerWithCustomerShipment = Prisma.CustomerGetPayload<{
  include: {
    customerShipments: {
      include: {
        shipmentItems: {
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
    shipmentItems: {
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
