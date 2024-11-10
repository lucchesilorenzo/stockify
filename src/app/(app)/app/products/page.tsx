import { Metadata } from "next";

import { columns } from "./columns";

import H1 from "@/components/common/h1";
import ProductsTable from "@/components/products/products-table";
import { getProducts } from "@/lib/queries/product-queries";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const products = await getProducts();

  const csvData = products.map((product) => ({
    Name: product.name,
    Category: product.category?.name,
    Price: product.price,
    Status: product.status,
    Quantity: product.quantity,
    MaxQuantity: product.maxQuantity,
  }));

  return (
    <main>
      <H1>Products</H1>

      <div className="my-6 grid grid-cols-1">
        <ProductsTable columns={columns} data={products} csvData={csvData} />
      </div>
    </main>
  );
}
