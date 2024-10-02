import { DataTable } from "@/components/data-table";
import H1 from "@/components/h1";
import { getProducts } from "@/lib/server-utils";
import { columns } from "./columns";

export const metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  const data = await getProducts();

  return (
    <main>
      <H1>Products</H1>

      <div className="my-6">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
