import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.supplier.create({
    data: {
      name: "Supplier One",
      email: "supplier1@example.com",
      phone: "9876543210",
      rating: 5,
      address: "456 Supplier Ave",
      city: "Supplier City",
      zipCode: "11111",
    },
  });

  const category1 = await prisma.category.create({
    data: {
      name: "Electronics",
      taxRate: 15.0,
    },
  });

  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Warehouse One",
      location: "Location 1",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "Laptop",
      slug: "laptop",
      sku: "LAP123",
      price: 999.99,
      quantity: 100,
      maxQuantity: 200,
      description: "High-performance laptop",
      warehouseId: warehouse1.id,
      categoryId: category1.id,
    },
  });

  const customer1 = await prisma.customer.create({
    data: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "1122334455",
      address: "456 Another Street",
      city: "Townsville",
      zipCode: "67890",
    },
  });

  const shipment1 = await prisma.customerShipment.create({
    data: {
      customerId: customer1.id,
      status: "Shipped",
    },
  });

  await prisma.shipmentItem.create({
    data: {
      productId: product1.id,
      customerShipmentId: shipment1.id,
      quantity: 1,
    },
  });

  await prisma.activity.create({
    data: {
      activity: "Product Added",
      entity: "Product",
      product: product1.name,
    },
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
