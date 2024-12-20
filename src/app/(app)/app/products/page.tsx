import { Metadata } from "next";

import H1 from "@/components/common/h1";
import { columns } from "@/components/tables/products/columns";
import ProductsTable from "@/components/tables/products/products-table";
import WarehouseSummary from "@/components/warehouses/warehouse-summary";
import { productStatuses } from "@/lib/data";
import { getProducts } from "@/lib/queries/product-queries";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const products = await getProducts();

  const csvData = products.map((product) => ({
    Name: product.name,
    SKU: product.sku,
    Category: product.category.name,
    Price: formatCurrency(product.price),
    Status:
      productStatuses.find((p) => p.value === product.status)?.label ||
      product.status,
    Warehouse: product.warehouse.name,
    Quantity: product.quantity,
  }));

  return (
    <main>
      <H1>Products</H1>

      <div className="my-6 space-y-6">
        <WarehouseSummary />

        <div className="my-6 grid grid-cols-1">
          <ProductsTable columns={columns} data={products} csvData={csvData} />
        </div>
      </div>
    </main>
  );
}
