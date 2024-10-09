import { columns } from "./columns";

import H1 from "@/components/common/h1";
import ProductsTable from "@/components/products/products-table";
import { getProducts } from "@/lib/queries/product-queries";

export const metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <main>
      <H1>Products</H1>

      <div className="my-6">
        <ProductsTable columns={columns} data={data} />
      </div>
    </main>
  );
}
