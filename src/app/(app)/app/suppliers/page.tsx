import { Metadata } from "next";

import H1 from "@/components/common/h1";
import SuppliersSummary from "@/components/suppliers/suppliers-summary";
import { columns } from "@/components/tables/suppliers/columns";
import SuppliersTable from "@/components/tables/suppliers/suppliers-table";
import { getSuppliers } from "@/lib/queries/supplier-queries";

export const metadata: Metadata = {
  title: "Suppliers",
};

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <main>
      <H1>Suppliers</H1>

      <div className="my-6 space-y-6">
        <SuppliersSummary suppliers={suppliers} />

        <div className="my-6 grid grid-cols-1">
          <SuppliersTable columns={columns} data={suppliers} />
        </div>
      </div>
    </main>
  );
}
