import H1 from "@/components/h1";
import { getProducts } from "@/lib/server-utils";
import { columns } from "./columns";
import ProductsTable from "@/components/products-table";

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
