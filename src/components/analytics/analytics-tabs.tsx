import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AnalyticsInventory from "./analytics-inventory";
import AnalyticsOverview from "./analytics-overview";

import {
  getMonthlyInventoryValues,
  getProductsByCategory,
  getTopProducts,
} from "@/lib/queries/analytics-queries";

export default async function AnalyticsTabs() {
  const { pieChartData, pieChartConfig } = await getProductsByCategory();
  const monthlyInventoryValues = await getMonthlyInventoryValues();
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
          lineChartData={monthlyInventoryValues}
        />
      </TabsContent>

      <TabsContent value="inventory">
        <AnalyticsInventory barChartData={topProducts} />
      </TabsContent>
    </Tabs>
  );
}
