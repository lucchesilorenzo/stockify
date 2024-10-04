import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create 10 Categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Electronics" },
      { name: "Clothing" },
      { name: "Books" },
      { name: "Toys" },
      { name: "Furniture" },
      { name: "Beauty" },
      { name: "Sports" },
      { name: "Jewelry" },
      { name: "Home Appliances" },
      { name: "Automotive" },
    ],
  });

  // Create 10 Products
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Smartphone",
        price: 699.99,
        quantity: 50,
        maxQuantity: 100,
        minQuantity: 10,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Electronics" } }))
            ?.id || "",
      },
      {
        name: "Laptop",
        price: 1299.99,
        quantity: 30,
        maxQuantity: 50,
        minQuantity: 5,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Electronics" } }))
            ?.id || "",
      },
      {
        name: "T-shirt",
        price: 19.99,
        quantity: 200,
        maxQuantity: 300,
        minQuantity: 20,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Clothing" } }))
            ?.id || "",
      },
      {
        name: "Sneakers",
        price: 79.99,
        quantity: 120,
        maxQuantity: 200,
        minQuantity: 20,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Clothing" } }))
            ?.id || "",
      },
      {
        name: "Mystery Novel",
        price: 14.99,
        quantity: 80,
        maxQuantity: 150,
        minQuantity: 15,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Books" } }))
            ?.id || "",
      },
      {
        name: "Toy Car",
        price: 9.99,
        quantity: 90,
        maxQuantity: 150,
        minQuantity: 10,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Toys" } }))?.id ||
          "",
      },
      {
        name: "Dining Table",
        price: 299.99,
        quantity: 25,
        maxQuantity: 50,
        minQuantity: 5,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Furniture" } }))
            ?.id || "",
      },
      {
        name: "Lipstick",
        price: 29.99,
        quantity: 150,
        maxQuantity: 200,
        minQuantity: 20,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Beauty" } }))
            ?.id || "",
      },
      {
        name: "Running Shoes",
        price: 89.99,
        quantity: 100,
        maxQuantity: 150,
        minQuantity: 15,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Sports" } }))
            ?.id || "",
      },
      {
        name: "Necklace",
        price: 149.99,
        quantity: 50,
        maxQuantity: 80,
        minQuantity: 10,
        categoryId:
          (await prisma.category.findUnique({ where: { name: "Jewelry" } }))
            ?.id || "",
      },
    ],
  });

  // Create 10 Orders for different products
  const orders = await prisma.order.createMany({
    data: [
      {
        productId:
          (await prisma.product.findUnique({ where: { name: "Smartphone" } }))
            ?.id || "",
        quantity: 2,
        totalPrice: 699.99 * 2,
      },
      {
        productId:
          (await prisma.product.findUnique({ where: { name: "Laptop" } }))
            ?.id || "",
        quantity: 1,
        totalPrice: 1299.99,
      },
      {
        productId:
          (await prisma.product.findUnique({ where: { name: "T-shirt" } }))
            ?.id || "",
        quantity: 10,
        totalPrice: 19.99 * 10,
      },
      {
        productId:
          (await prisma.product.findUnique({ where: { name: "Sneakers" } }))
            ?.id || "",
        quantity: 3,
        totalPrice: 79.99 * 3,
      },
      {
        productId:
          (
            await prisma.product.findUnique({
              where: { name: "Mystery Novel" },
            })
          )?.id || "",
        quantity: 5,
        totalPrice: 14.99 * 5,
      },
      {
        productId:
          (await prisma.product.findUnique({ where: { name: "Toy Car" } }))
            ?.id || "",
        quantity: 8,
        totalPrice: 9.99 * 8,
      },
      {
        productId:
          (await prisma.product.findUnique({ where: { name: "Dining Table" } }))
            ?.id || "",
        quantity: 1,
        totalPrice: 299.99,
      },
      {
        productId:
          (await prisma.product.findUnique({ where: { name: "Lipstick" } }))
            ?.id || "",
        quantity: 6,
        totalPrice: 29.99 * 6,
      },
      {
        productId:
          (
            await prisma.product.findUnique({
              where: { name: "Running Shoes" },
            })
          )?.id || "",
        quantity: 2,
        totalPrice: 89.99 * 2,
      },
      {
        productId:
          (await prisma.product.findUnique({ where: { name: "Necklace" } }))
            ?.id || "",
        quantity: 1,
        totalPrice: 149.99,
      },
    ],
  });

  console.log({ categories, products, orders });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
