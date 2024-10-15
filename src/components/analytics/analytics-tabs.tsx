import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AnalyticsInventory from "./analytics-inventory";
import AnalyticsOverview from "./analytics-overview";

import {
  getInventoryValueByMonth,
  getProductsByCategory,
  getTopProducts,
} from "@/lib/queries/analytics-queries";

export default async function AnalyticsTabs() {
  const { pieChartData, pieChartConfig } = await getProductsByCategory();
  const inventoryValueByMonth = await getInventoryValueByMonth();
  const topProducts = await getTopProducts();

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <AnalyticsOverview
          pieChartData={pieChartData}
          pieChartConfig={pieChartConfig}
          lineChartData={inventoryValueByMonth}
        />
      </TabsContent>

      <TabsContent value="inventory">
        <AnalyticsInventory barChartData={topProducts} />
      </TabsContent>
    </Tabs>
  );
}
