import SupplierCard from "./supplier-card";

import { suppliersData } from "@/lib/data";
import { SupplierWithOrderCount } from "@/lib/types";

type SuppliersSummaryProps = {
  suppliers: SupplierWithOrderCount[];
};

export default async function SuppliersSummary({
  suppliers,
}: SuppliersSummaryProps) {
  const suppliersLength = suppliers.length;
  const avgRating =
    suppliers.reduce((total, { rating }) => total + rating, 0) /
      suppliersLength || 0;

  const updatedSuppliersData = [
    { ...suppliersData[0], amount: suppliersLength.toString() },
    { ...suppliersData[1], amount: avgRating.toFixed(2) },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {updatedSuppliersData.map((card) => (
        <SupplierCard key={card.title} card={card} />
      ))}
    </div>
  );
}
