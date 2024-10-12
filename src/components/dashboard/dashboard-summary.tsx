import DashboardCard from "./dashboard-card";

import { dashboardData } from "@/lib/data";
import {
  getAvailableProducts,
  getInventoryValue,
  getLowStockProducts,
  getPendingOrders,
} from "@/lib/queries/dashboard-queries";
import { formatCurrency } from "@/lib/utils";

export default async function DashboardSummary() {
  const [inventoryValue, lowStockProducts, pendingOrders, totalProducts] =
    await Promise.all([
      getInventoryValue(),
      getLowStockProducts(),
      getPendingOrders(),
      getAvailableProducts(),
    ]);

  // Updates dashboard data with new amount values
  const updatedDashboardData = [
    { ...dashboardData[0], amount: formatCurrency(inventoryValue) },
    { ...dashboardData[1], amount: lowStockProducts.toString() },
    { ...dashboardData[2], amount: pendingOrders.toString() },
    { ...dashboardData[3], amount: totalProducts.toString() },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {updatedDashboardData.map((card) => (
        <DashboardCard key={card.title} card={card} />
      ))}
    </div>
  );
}
