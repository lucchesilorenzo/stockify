import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Categorie
  const electronics = await prisma.category.upsert({
    where: { name: "Electronics" },
    update: {},
    create: {
      name: "Electronics",
    },
  });

  const books = await prisma.category.upsert({
    where: { name: "Books" },
    update: {},
    create: {
      name: "Books",
    },
  });

  const furniture = await prisma.category.upsert({
    where: { name: "Furniture" },
    update: {},
    create: {
      name: "Furniture",
    },
  });

  // Prodotti
  const product1 = await prisma.product.upsert({
    where: { name: "Smartphone" },
    update: {},
    create: {
      name: "Smartphone",
      price: 299.99,
      quantity: 50,
      maxQuantity: 100,
      minQuantity: 1,
      categoryId: electronics.id,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { name: "Laptop" },
    update: {},
    create: {
      name: "Laptop",
      price: 899.99,
      quantity: 30,
      maxQuantity: 50,
      minQuantity: 1,
      categoryId: electronics.id,
    },
  });

  const product3 = await prisma.product.upsert({
    where: { name: "Bookshelf" },
    update: {},
    create: {
      name: "Bookshelf",
      price: 79.99,
      quantity: 15,
      maxQuantity: 30,
      minQuantity: 1,
      categoryId: furniture.id,
    },
  });

  // Ordini
  const order1 = await prisma.order.create({
    data: {
      productId: product1.id,
      quantity: 2,
      totalPrice: product1.price * 2,
      subtotal: product1.price * 2,
      shipping: 5.0,
      tax: 2.99,
      status: "Pending",
    },
  });

  const order2 = await prisma.order.create({
    data: {
      productId: product2.id,
      quantity: 1,
      totalPrice: product2.price * 1,
      subtotal: product2.price,
      shipping: 10.0,
      tax: 5.99,
      status: "Shipped",
    },
  });

  const order3 = await prisma.order.create({
    data: {
      productId: product3.id,
      quantity: 3,
      totalPrice: product3.price * 3,
      subtotal: product3.price * 3,
      shipping: 7.0,
      tax: 1.99,
      status: "Delivered",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
