import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  const electronicsCategory = await prisma.category.upsert({
    where: { name: "Electronics" },
    update: {},
    create: {
      name: "Electronics",
    },
  });

  const fashionCategory = await prisma.category.upsert({
    where: { name: "Fashion" },
    update: {},
    create: {
      name: "Fashion",
    },
  });

  const products = [
    {
      name: "Laptop Gaming",
      price: 1200.0,
      quantity: 20,
      maxQuantity: 100,
      minQuantity: 5,
      categoryId: electronicsCategory.id,
    },
    {
      name: "Wireless Headphones",
      price: 200.0,
      quantity: 50,
      maxQuantity: 200,
      minQuantity: 10,
      categoryId: electronicsCategory.id,
    },
    {
      name: "Designer T-Shirt",
      price: 50.0,
      quantity: 100,
      maxQuantity: 500,
      minQuantity: 20,
      categoryId: fashionCategory.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: {
        name: product.name,
        slug: slugify(product.name, { lower: true, strict: true }),
        price: product.price,
        quantity: product.quantity,
        maxQuantity: product.maxQuantity,
        minQuantity: product.minQuantity,
        categoryId: product.categoryId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
