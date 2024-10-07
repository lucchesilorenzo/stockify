import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  // Creazione delle categorie
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

  // Creazione dei prodotti
  const products = [
    {
      name: "Laptop Gaming",
      price: 1200.0,
      quantity: 20,
      maxQuantity: 100,
      minQuantity: 5,
      description: "High-performance gaming laptop with latest hardware.",
      categoryId: electronicsCategory.id,
    },
    {
      name: "Wireless Headphones",
      price: 200.0,
      quantity: 50,
      maxQuantity: 200,
      minQuantity: 10,
      description:
        "Noise-cancelling wireless headphones with long battery life.",
      categoryId: electronicsCategory.id,
    },
    {
      name: "Designer T-Shirt",
      price: 50.0,
      quantity: 100,
      maxQuantity: 500,
      minQuantity: 20,
      description: "Stylish designer t-shirt made from premium materials.",
      categoryId: fashionCategory.id,
    },
  ];

  const createdProducts = [];

  // Creazione e salvataggio dei prodotti
  for (const product of products) {
    const createdProduct = await prisma.product.upsert({
      where: { name: product.name },
      update: {},
      create: {
        name: product.name,
        slug: slugify(product.name, { lower: true, strict: true }),
        price: product.price,
        quantity: product.quantity,
        maxQuantity: product.maxQuantity,
        minQuantity: product.minQuantity,
        description: product.description,
        categoryId: product.categoryId,
      },
    });
    createdProducts.push(createdProduct);
  }

  // Controlla che i prodotti siano stati creati correttamente
  if (createdProducts.length === 0) {
    throw new Error("Nessun prodotto creato. Controlla il seed.");
  }

  // Creazione degli ordini associati ai prodotti
  const orders = [
    {
      productName: "Laptop Gaming",
      quantity: 2,
      totalPrice: 2400.0,
      subtotal: 2200.0,
      shipping: 50.0,
      tax: 150.0,
    },
    {
      productName: "Wireless Headphones",
      quantity: 5,
      totalPrice: 1000.0,
      subtotal: 950.0,
      shipping: 30.0,
      tax: 20.0,
    },
    {
      productName: "Designer T-Shirt",
      quantity: 10,
      totalPrice: 500.0,
      subtotal: 470.0,
      shipping: 20.0,
      tax: 10.0,
    },
  ];

  for (const order of orders) {
    const product = await prisma.product.findUnique({
      where: { name: order.productName },
    });

    if (!product) {
      console.error(`Prodotto non trovato: ${order.productName}`);
      continue;
    }

    await prisma.order.create({
      data: {
        productId: product.id,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        subtotal: order.subtotal,
        shipping: order.shipping,
        tax: order.tax,
      },
    });
  }
}

main()
  .then(async () => {
    console.log("Seed completato con successo.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Errore durante il seed: ", e);
    await prisma.$disconnect();
    process.exit(1);
  });
