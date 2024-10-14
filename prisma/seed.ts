import { PrismaClient } from "@prisma/client";
import { subMonths } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  const categoriesData = [
    { name: "Electronics" },
    { name: "Furniture" },
    { name: "Clothing" },
    { name: "Books" },
    { name: "Sports" },
  ];

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categories = await prisma.category.findMany();

  const productsData = [];
  const baseDate = new Date();

  for (let i = 0; i < 20; i++) {
    const categoryIndex = i % categories.length;
    const product = {
      name: `Product ${i + 1}`,
      slug: `product-${i + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
      quantity: Math.floor(Math.random() * 50) + 1,
      maxQuantity: 100,
      minQuantity: 1,
      description: `Description for Product ${i + 1}`,
      status: "Available",
      image: null,
      categoryId: categories[categoryIndex].id,
      updatedAt: subMonths(baseDate, i % 12),
      createdAt: new Date(),
    };
    productsData.push(product);
  }

  const products = [];
  for (const product of productsData) {
    const createdProduct = await prisma.product.create({
      data: product,
    });
    products.push(createdProduct);
  }

  const orders = [];
  for (let i = 0; i < 15; i++) {
    const productIndex = Math.floor(Math.random() * products.length);
    const order = {
      quantity: Math.floor(Math.random() * 10) + 1,
      totalPrice: Math.floor(Math.random() * 100) + 1,
      subtotal: Math.floor(Math.random() * 100) + 1,
      shipping: Math.floor(Math.random() * 10) + 1,
      tax: Math.floor(Math.random() * 5) + 1,
      status: "Pending",
      productId: products[productIndex].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    orders.push(order);
  }

  await prisma.order.createMany({
    data: orders,
  });

  const activities = [];
  for (let i = 0; i < 10; i++) {
    const activity = {
      activity: `Activity ${i + 1}`,
      entity: `Entity ${Math.floor(Math.random() * 5) + 1}`,
      product: products[i % products.length].name,
      createdAt: new Date(),
    };
    activities.push(activity);
  }

  await prisma.activity.createMany({
    data: activities,
  });

  console.log("Seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
