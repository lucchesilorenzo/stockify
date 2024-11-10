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

  const productNames = [
    "Laptop",
    "Smartphone",
    "Office Chair",
    "T-Shirt",
    "Bicycle",
    "Headphones",
    "Bookshelf",
    "Sneakers",
    "Tablet",
    "Basketball",
    "Smartwatch",
    "Jacket",
    "Desk",
    "Novel",
    "Running Shoes",
    "Monitor",
    "Backpack",
    "Gaming Console",
    "Soccer Ball",
    "Camera",
  ];

  for (let i = 0; i < 20; i++) {
    const categoryIndex = i % categories.length;
    const product = {
      name: productNames[i],
      slug: `product-${i + 1}`,
      price: Math.floor(Math.random() * 200) + 20,
      quantity: Math.floor(Math.random() * 50) + 1,
      maxQuantity: 100,
      description: `Description for ${productNames[i]}`,
      status: i % 2 === 0 ? "In Stock" : "Out Of Stock",
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
    const orderedQuantity = Math.floor(Math.random() * 10) + 1;

    const options = {
      price: products[productIndex].price,
    };

    const subtotal = orderedQuantity * options.price;
    const shipping = subtotal > 100 ? 0 : 5;
    const tax = +(subtotal * 0.22).toFixed(2);
    const totalPrice = +(subtotal + shipping + tax).toFixed(2);

    const order = {
      quantity: orderedQuantity,
      totalPrice: totalPrice,
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      status: i % 2 === 0 ? "Pending" : "Completed",
      productId: products[productIndex].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    orders.push(order);
  }

  await prisma.restockOrder.createMany({
    data: orders,
  });

  console.log("Seeded successfully with realistic data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
