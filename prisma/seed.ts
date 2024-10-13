import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Electronics" },
    { name: "Books" },
    { name: "Clothing" },
    { name: "Toys" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  const categoryIds = await prisma.category.findMany({
    select: { id: true, name: true },
  });

  const products = [
    {
      name: "Laptop",
      slug: "laptop",
      price: 1500.0,
      quantity: 10,
      maxQuantity: 20,
      minQuantity: 1,
      categoryId: categoryIds.find((c) => c.name === "Electronics")!.id,
    },
    {
      name: "Smartphone",
      slug: "smartphone",
      price: 800.0,
      quantity: 20,
      maxQuantity: 50,
      minQuantity: 1,
      categoryId: categoryIds.find((c) => c.name === "Electronics")!.id,
    },
    {
      name: "Tablet",
      slug: "tablet",
      price: 600.0,
      quantity: 15,
      maxQuantity: 30,
      minQuantity: 1,
      categoryId: categoryIds.find((c) => c.name === "Electronics")!.id,
    },
    {
      name: "Smartwatch",
      slug: "smartwatch",
      price: 300.0,
      quantity: 25,
      maxQuantity: 50,
      minQuantity: 1,
      categoryId: categoryIds.find((c) => c.name === "Electronics")!.id,
    },
    {
      name: "Book A",
      slug: "book-a",
      price: 20.0,
      quantity: 50,
      maxQuantity: 100,
      minQuantity: 1,
      categoryId: categoryIds.find((c) => c.name === "Books")!.id,
    },
    {
      name: "Book B",
      slug: "book-b",
      price: 25.0,
      quantity: 40,
      maxQuantity: 80,
      minQuantity: 1,
      categoryId: categoryIds.find((c) => c.name === "Books")!.id,
    },
    {
      name: "Novel",
      slug: "novel",
      price: 18.0,
      quantity: 70,
      maxQuantity: 120,
      minQuantity: 5,
      categoryId: categoryIds.find((c) => c.name === "Books")!.id,
    },
    {
      name: "T-shirt",
      slug: "tshirt",
      price: 25.99,
      quantity: 30,
      maxQuantity: 50,
      minQuantity: 5,
      categoryId: categoryIds.find((c) => c.name === "Clothing")!.id,
    },
    {
      name: "Jeans",
      slug: "jeans",
      price: 45.0,
      quantity: 25,
      maxQuantity: 60,
      minQuantity: 3,
      categoryId: categoryIds.find((c) => c.name === "Clothing")!.id,
    },
    {
      name: "Jacket",
      slug: "jacket",
      price: 80.0,
      quantity: 15,
      maxQuantity: 40,
      minQuantity: 1,
      categoryId: categoryIds.find((c) => c.name === "Clothing")!.id,
    },
    {
      name: "Toy Car",
      slug: "toy-car",
      price: 15.0,
      quantity: 60,
      maxQuantity: 100,
      minQuantity: 10,
      categoryId: categoryIds.find((c) => c.name === "Toys")!.id,
    },
    {
      name: "Doll",
      slug: "doll",
      price: 20.0,
      quantity: 55,
      maxQuantity: 100,
      minQuantity: 10,
      categoryId: categoryIds.find((c) => c.name === "Toys")!.id,
    },
    {
      name: "Board Game",
      slug: "board-game",
      price: 30.0,
      quantity: 40,
      maxQuantity: 80,
      minQuantity: 5,
      categoryId: categoryIds.find((c) => c.name === "Toys")!.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  const productIds = await prisma.product.findMany({
    select: { id: true, name: true },
  });

  const orders = [
    {
      quantity: 2,
      totalPrice: 3000.0,
      subtotal: 2900.0,
      shipping: 50.0,
      tax: 50.0,
      status: "Shipped",
      productId: productIds[0].id,
    },
    {
      quantity: 5,
      totalPrice: 125.0,
      subtotal: 100.0,
      shipping: 10.0,
      tax: 15.0,
      status: "Delivered",
      productId: productIds[7].id,
    },
    {
      quantity: 3,
      totalPrice: 59.97,
      subtotal: 59.97,
      shipping: 0.0,
      tax: 0.0,
      status: "Processing",
      productId: productIds[4].id,
    },
    {
      quantity: 1,
      totalPrice: 800.0,
      subtotal: 780.0,
      shipping: 15.0,
      tax: 5.0,
      status: "Pending",
      productId: productIds[1].id,
    },
    {
      quantity: 10,
      totalPrice: 6000.0,
      subtotal: 5800.0,
      shipping: 100.0,
      tax: 100.0,
      status: "Shipped",
      productId: productIds[0].id,
    },
    {
      quantity: 4,
      totalPrice: 320.0,
      subtotal: 300.0,
      shipping: 10.0,
      tax: 10.0,
      status: "Shipped",
      productId: productIds[7].id,
    },
    {
      quantity: 1,
      totalPrice: 1000.0,
      subtotal: 950.0,
      shipping: 30.0,
      tax: 20.0,
      status: "Delivered",
      productId: productIds[12].id,
    },
    {
      quantity: 3,
      totalPrice: 45.0,
      subtotal: 40.0,
      shipping: 5.0,
      tax: 0.0,
      status: "Delivered",
      productId: productIds[14].id,
    },
    {
      quantity: 6,
      totalPrice: 270.0,
      subtotal: 240.0,
      shipping: 20.0,
      tax: 10.0,
      status: "Processing",
      productId: productIds[8].id,
    },
    {
      quantity: 5,
      totalPrice: 225.0,
      subtotal: 200.0,
      shipping: 15.0,
      tax: 10.0,
      status: "Delivered",
      productId: productIds[6].id,
    },
  ];

  for (const order of orders) {
    await prisma.order.create({ data: order });
  }

  const activities = [
    { activity: "Created order", entity: "Order", product: productIds[0].name },
    {
      activity: "Updated product quantity",
      entity: "Product",
      product: productIds[2].name,
    },
    {
      activity: "Processed order",
      entity: "Order",
      product: productIds[3].name,
    },
    { activity: "Created order", entity: "Order", product: productIds[5].name },
    { activity: "Shipped order", entity: "Order", product: productIds[6].name },
    { activity: "Created order", entity: "Order", product: productIds[9].name },
    {
      activity: "Delivered order",
      entity: "Order",
      product: productIds[11].name,
    },
    {
      activity: "Updated product quantity",
      entity: "Product",
      product: productIds[13].name,
    },
    {
      activity: "Created order",
      entity: "Order",
      product: productIds[14].name,
    },
    {
      activity: "Processed order",
      entity: "Order",
      product: productIds[1].name,
    },
  ];

  for (const activity of activities) {
    await prisma.activity.create({ data: activity });
  }

  console.log("Database seeded successfully without duplicates!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
