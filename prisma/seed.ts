import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createCategoryIfNotExists = async (name: string) => {
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });
    return (
      existingCategory ||
      (await prisma.category.create({
        data: { name },
      }))
    );
  };

  const electronics = await createCategoryIfNotExists("Electronics");
  const clothing = await createCategoryIfNotExists("Clothing");
  const literature = await createCategoryIfNotExists("Literature");
  const homeAppliances = await createCategoryIfNotExists("Home Appliances");
  const sports = await createCategoryIfNotExists("Sports");

  await prisma.product.createMany({
    data: [
      {
        name: "Smartphone",
        price: 599.99,
        quantity: 50,
        maxQuantity: 100,
        minQuantity: 10,
        categoryId: electronics.id,
      },
      {
        name: "Laptop",
        price: 999.99,
        quantity: 30,
        maxQuantity: 50,
        minQuantity: 5,
        categoryId: electronics.id,
      },
      {
        name: "Smartwatch",
        price: 199.99,
        quantity: 100,
        maxQuantity: 200,
        minQuantity: 20,
        categoryId: electronics.id,
      },
      {
        name: "Headphones",
        price: 79.99,
        quantity: 75,
        maxQuantity: 150,
        minQuantity: 15,
        categoryId: electronics.id,
      },
      {
        name: "Tablet",
        price: 399.99,
        quantity: 60,
        maxQuantity: 120,
        minQuantity: 12,
        categoryId: electronics.id,
      },

      {
        name: "T-shirt",
        price: 19.99,
        quantity: 200,
        maxQuantity: 500,
        minQuantity: 50,
        categoryId: clothing.id,
      },
      {
        name: "Jeans",
        price: 39.99,
        quantity: 150,
        maxQuantity: 300,
        minQuantity: 30,
        categoryId: clothing.id,
      },
      {
        name: "Sweater",
        price: 49.99,
        quantity: 100,
        maxQuantity: 200,
        minQuantity: 25,
        categoryId: clothing.id,
      },
      {
        name: "Jacket",
        price: 89.99,
        quantity: 80,
        maxQuantity: 150,
        minQuantity: 10,
        categoryId: clothing.id,
      },
      {
        name: "Dress",
        price: 59.99,
        quantity: 90,
        maxQuantity: 180,
        minQuantity: 15,
        categoryId: clothing.id,
      },

      {
        name: "Fiction Novel",
        price: 14.99,
        quantity: 100,
        maxQuantity: 200,
        minQuantity: 20,
        categoryId: literature.id,
      },
      {
        name: "Non-Fiction Book",
        price: 24.99,
        quantity: 50,
        maxQuantity: 100,
        minQuantity: 10,
        categoryId: literature.id,
      },
      {
        name: "Children's Book",
        price: 9.99,
        quantity: 150,
        maxQuantity: 300,
        minQuantity: 15,
        categoryId: literature.id,
      },
      {
        name: "Textbook",
        price: 29.99,
        quantity: 70,
        maxQuantity: 150,
        minQuantity: 5,
        categoryId: literature.id,
      },
      {
        name: "Comic Book",
        price: 19.99,
        quantity: 80,
        maxQuantity: 160,
        minQuantity: 12,
        categoryId: literature.id,
      },

      {
        name: "Vacuum Cleaner",
        price: 149.99,
        quantity: 40,
        maxQuantity: 80,
        minQuantity: 10,
        categoryId: homeAppliances.id,
      },
      {
        name: "Microwave Oven",
        price: 89.99,
        quantity: 30,
        maxQuantity: 60,
        minQuantity: 5,
        categoryId: homeAppliances.id,
      },
      {
        name: "Refrigerator",
        price: 799.99,
        quantity: 20,
        maxQuantity: 30,
        minQuantity: 2,
        categoryId: homeAppliances.id,
      },
      {
        name: "Blender",
        price: 39.99,
        quantity: 100,
        maxQuantity: 200,
        minQuantity: 20,
        categoryId: homeAppliances.id,
      },
      {
        name: "Coffee Maker",
        price: 49.99,
        quantity: 80,
        maxQuantity: 160,
        minQuantity: 10,
        categoryId: homeAppliances.id,
      },

      {
        name: "Running Shoes",
        price: 69.99,
        quantity: 150,
        maxQuantity: 300,
        minQuantity: 20,
        categoryId: sports.id,
      },
      {
        name: "Basketball",
        price: 29.99,
        quantity: 100,
        maxQuantity: 200,
        minQuantity: 15,
        categoryId: sports.id,
      },
      {
        name: "Soccer Ball",
        price: 19.99,
        quantity: 80,
        maxQuantity: 160,
        minQuantity: 10,
        categoryId: sports.id,
      },
      {
        name: "Yoga Mat",
        price: 29.99,
        quantity: 120,
        maxQuantity: 240,
        minQuantity: 25,
        categoryId: sports.id,
      },
      {
        name: "Dumbbells",
        price: 39.99,
        quantity: 60,
        maxQuantity: 120,
        minQuantity: 5,
        categoryId: sports.id,
      },
    ],
  });

  console.log("Seeding completed with products and categories!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
