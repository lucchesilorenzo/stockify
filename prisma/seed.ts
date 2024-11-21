import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crea alcune categorie
  const category1 = await prisma.category.create({
    data: {
      name: "Electronics",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Furniture",
    },
  });

  // Crea un magazzino
  const warehouse = await prisma.warehouse.create({
    data: {
      name: "Main Warehouse",
      location: "Milan",
    },
  });

  // Crea alcuni fornitori
  const supplier1 = await prisma.supplier.create({
    data: {
      name: "Tech Supplier",
      email: "techsupplier@example.com",
      phone: "123456789",
      rating: 4,
    },
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: "Furniture Supplier",
      email: "furnituresupplier@example.com",
      phone: "987654321",
      rating: 5,
    },
  });

  // Crea alcuni prodotti
  const product1 = await prisma.product.create({
    data: {
      name: "Laptop",
      slug: "laptop",
      sku: "LPT123",
      price: 1200.0,
      quantity: 100,
      maxQuantity: 150,
      description: "High-performance laptop",
      categoryId: category1.id,
      warehouseId: warehouse.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Desk",
      slug: "desk",
      sku: "DSK456",
      price: 300.0,
      quantity: 50,
      maxQuantity: 100,
      description: "Office desk",
      categoryId: category2.id,
      warehouseId: warehouse.id,
    },
  });

  // Crea alcuni ordini
  await prisma.order.create({
    data: {
      supplierId: supplier1.id,
      productId: product1.id,
      type: "Restock",
      quantity: 20,
      subtotal: 24000,
      shipping: 50,
      tax: 100,
      totalPrice: 24150,
      status: "Completed",
    },
  });

  await prisma.order.create({
    data: {
      supplierId: supplier2.id,
      productId: product2.id,
      type: "Purchase",
      quantity: 10,
      subtotal: 3000,
      shipping: 30,
      tax: 15,
      totalPrice: 3045,
      status: "Pending",
    },
  });

  // Crea un cliente
  const customer = await prisma.customer.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phone: "111222333",
      address: "123 Main St",
      city: "Milan",
      zipCode: "20100",
    },
  });

  // Crea una spedizione per il cliente
  const customerShipment = await prisma.customerShipment.create({
    data: {
      customerId: customer.id,
      status: "Shipped",
    },
  });

  // Crea un'attività
  await prisma.activity.create({
    data: {
      activity: "Created new supplier",
      entity: "Supplier",
      product: null,
    },
  });

  // Crea valori di inventario mensili
  await prisma.monthlyInventoryValue.create({
    data: {
      month: new Date("2023-09-01"),
      totalValue: 50000,
    },
  });

  await prisma.monthlyInventoryValue.create({
    data: {
      month: new Date("2023-10-01"),
      totalValue: 52000,
    },
  });
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
