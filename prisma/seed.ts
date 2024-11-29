import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: "john.doe@example.com",
      hashedPassword: "hashedpassword123",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: new Date("1990-01-01"),
      phone: "1234567890",
      bio: "Warehouse manager",
      address: "123 Main St",
      city: "Metropolis",
      zipCode: "10001",
    },
  });

  const supplier = await prisma.supplier.create({
    data: {
      name: "Best Supplier Inc.",
      email: "supplier@example.com",
      phone: "0987654321",
      address: "456 Supplier Rd",
      city: "Supplier City",
      zipCode: "20002",
      website: "https://bestsupplier.com",
      rating: 5,
    },
  });

  const category = await prisma.category.create({
    data: {
      name: "Electronics",
      taxRate: 0.21,
    },
  });

  const warehouse = await prisma.warehouse.create({
    data: {
      name: "Main Warehouse",
      location: "Warehouse District",
      quantity: 100,
      maxQuantity: 1000,
    },
  });

  const product = await prisma.product.create({
    data: {
      name: "Laptop",
      slug: "laptop-2024",
      sku: "LPT123",
      price: 999.99,
      quantity: 50,
      maxQuantity: 100,
      description: "High performance laptop",
      status: "IN_STOCK",
      category: { connect: { id: category.id } },
      warehouse: { connect: { id: warehouse.id } },
    },
  });

  await prisma.order.create({
    data: {
      type: "PURCHASE",
      quantity: 10,
      subtotal: 9999.9,
      shipping: 50,
      tax: 2100,
      totalPrice: 12149.9,
      status: "SHIPPED",
      user: { connect: { id: user.id } },
      supplier: { connect: { id: supplier.id } },
      product: { connect: { id: product.id } },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
