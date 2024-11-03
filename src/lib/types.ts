import { Order, Prisma, Product, User } from "@prisma/client";

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

export type OrderWithProduct = Prisma.OrderGetPayload<{
  include: {
    product: {
      select: {
        name: true;
      };
    };
  };
}>;

export type OrderEssentials = Omit<
  Order,
  "id" | "createdAt" | "updatedAt" | "status"
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
