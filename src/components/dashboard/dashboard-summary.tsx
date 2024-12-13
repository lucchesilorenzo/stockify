import DashboardCard from "./dashboard-card";

import { dashboardData } from "@/lib/data";
import {
  getInventoryValue,
  getLowStockProducts,
  getShippedOrders,
  getUnitsInStock,
} from "@/lib/queries/dashboard-queries";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardSummary() {
  const [inventoryValue, lowStockProducts, shippedOrders, totalUnits] =
    await Promise.all([
      getInventoryValue(),
      getLowStockProducts(),
      getShippedOrders(),
      getUnitsInStock(),
    ]);

  // Update dashboard data with new amount values
  const updatedDashboardData = [
    { ...dashboardData[0], amount: formatCurrency(inventoryValue) },
    { ...dashboardData[1], amount: lowStockProducts.toLocaleString() },
    { ...dashboardData[2], amount: shippedOrders.toLocaleString() },
    { ...dashboardData[3], amount: totalUnits.toLocaleString() },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {updatedDashboardData.map((card) => (
        <DashboardCard key={card.title} card={card} />
      ))}
    </div>
  );
}
