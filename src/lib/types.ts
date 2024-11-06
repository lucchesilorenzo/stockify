import { Prisma, Product, RestockOrder, User } from "@prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    category: {
      select: {
        name: true;
      };
    };
  };
}>;

export type ProductEssentials = Omit<
  Product,
  "id" | "createdAt" | "updatedAt" | "status" | "description" | "image"
>;

export type RestockOrderWithProduct = Prisma.RestockOrderGetPayload<{
  include: {
    product: {
      select: {
        name: true;
      };
    };
  };
}>;

export type RestockOrderEssentials = Omit<
  RestockOrder,
  "id" | "createdAt" | "updatedAt" | "status" | "customerId"
>;

export type Status = {
  value: "available" | "archived";
  label: "Available" | "Archived";
};

export type ActivityEssentials = {
  activity: "Created" | "Updated" | "Deleted";
  entity: "Product" | "Order";
  product: ProductEssentials["name"];
};

export type UserEssentials = Pick<
  User,
  "email" | "hashedPassword" | "firstName" | "lastName"
>;

export type UserSettings = {
  firstName: User["firstName"];
  lastName: User["lastName"];
  email: User["email"];
  dateOfBirth: User["dateOfBirth"] | null;
  bio: User["bio"] | null;
  phoneNumber: User["phoneNumber"] | null;
  address: User["address"] | null;
  city: User["city"] | null;
  zipcode: User["zipcode"] | null;
} | null;

export type CustomerSelectedProduct = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};
