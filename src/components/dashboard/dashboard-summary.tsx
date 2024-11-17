import DashboardCard from "./dashboard-card";

import { dashboardData } from "@/lib/data";
import {
  getInventoryValue,
  getLowStockProducts,
  getPendingOrders,
  getUnitsInStock,
} from "@/lib/queries/dashboard-queries";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardSummary() {
  const [inventoryValue, lowStockProducts, pendingOrders, totalUnits] =
    await Promise.all([
      getInventoryValue(),
      getLowStockProducts(),
      getPendingOrders(),
      getUnitsInStock(),
    ]);

  // Updates dashboard data with new amount values
  const updatedDashboardData = [
    { ...dashboardData[0], amount: formatCurrency(inventoryValue) },
    { ...dashboardData[1], amount: lowStockProducts.toLocaleString() },
    { ...dashboardData[2], amount: pendingOrders.toLocaleString() },
    { ...dashboardData[3], amount: totalUnits.toLocaleString() },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {updatedDashboardData.map((card) => (
        <DashboardCard key={card.title} card={card} />
      ))}
    </div>
  );
}
