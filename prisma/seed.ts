import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const category1 = await prisma.category.upsert({
    where: { name: "Electronics" },
    update: {},
    create: {
      name: "Electronics",
    },
  });

  const category2 = await prisma.category.upsert({
    where: { name: "Furniture" },
    update: {},
    create: {
      name: "Furniture",
    },
  });

  const product1 = await prisma.product.upsert({
    where: { name: "Laptop" },
    update: {},
    create: {
      name: "Laptop",
      slug: "laptop",
      price: 1000.0,
      quantity: 50,
      maxQuantity: 100,
      minQuantity: 10,
      categoryId: category1.id,
      status: "Available",
    },
  });

  const product2 = await prisma.product.upsert({
    where: { name: "Chair" },
    update: {},
    create: {
      name: "Chair",
      slug: "chair",
      price: 150.0,
      quantity: 200,
      maxQuantity: 500,
      minQuantity: 20,
      categoryId: category2.id,
      status: "Available",
    },
  });

  await prisma.order.createMany({
    data: [
      {
        quantity: 9,
        totalPrice: 338.98,
        subtotal: 76.14,
        shipping: 5.22,
        tax: 32.68,
        status: "Completed",
        productId: product1.id,
        createdAt: new Date("2024-09-15T20:02:04Z"),
      },
      {
        quantity: 8,
        totalPrice: 145.3,
        subtotal: 32.1,
        shipping: 2.05,
        tax: 37.98,
        status: "Completed",
        productId: product1.id,
        createdAt: new Date("2024-10-07T20:02:04Z"),
      },
      {
        quantity: 5,
        totalPrice: 302.28,
        subtotal: 113.35,
        shipping: 15.45,
        tax: 33.67,
        status: "Completed",
        productId: product2.id,
        createdAt: new Date("2024-10-06T20:02:04Z"),
      },
      {
        quantity: 6,
        totalPrice: 303.44,
        subtotal: 80.19,
        shipping: 18.74,
        tax: 17.68,
        status: "Completed",
        productId: product1.id,
        createdAt: new Date("2024-10-05T20:02:04Z"),
      },
      {
        quantity: 2,
        totalPrice: 391.28,
        subtotal: 380.01,
        shipping: 6.44,
        tax: 36.27,
        status: "Completed",
        productId: product1.id,
        createdAt: new Date("2024-09-12T20:02:04Z"),
      },
      {
        quantity: 4,
        totalPrice: 110.2,
        subtotal: 305.39,
        shipping: 13.07,
        tax: 21.27,
        status: "Completed",
        productId: product2.id,
        createdAt: new Date("2024-09-30T20:02:04Z"),
      },
      {
        quantity: 1,
        totalPrice: 335.82,
        subtotal: 180.95,
        shipping: 8.66,
        tax: 19.65,
        status: "Completed",
        productId: product2.id,
        createdAt: new Date("2024-09-29T20:02:04Z"),
      },
      {
        quantity: 10,
        totalPrice: 83.07,
        subtotal: 137.35,
        shipping: 16.71,
        tax: 22.97,
        status: "Completed",
        productId: product1.id,
        createdAt: new Date("2024-09-14T20:02:04Z"),
      },
      {
        quantity: 5,
        totalPrice: 441.1,
        subtotal: 63.75,
        shipping: 2.27,
        tax: 28.67,
        status: "Pending",
        productId: product2.id,
        createdAt: new Date("2024-09-15T20:02:04Z"),
      },
      {
        quantity: 2,
        totalPrice: 251.95,
        subtotal: 341.91,
        shipping: 15.57,
        tax: 38.05,
        status: "Pending",
        productId: product1.id,
        createdAt: new Date("2024-09-16T20:02:04Z"),
      },
    ],
  });

  console.log("Seeded sample orders successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
