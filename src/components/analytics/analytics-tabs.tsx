import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AnalyticsOverview from "./analytics-overview";

import {
  getInventoryValueByMonth,
  getProductsByCategory,
} from "@/lib/queries/analytics-queries";

export default async function AnalyticsTabs() {
  const { pieChartData, pieChartConfig } = await getProductsByCategory();
  const inventoryValueByMonth = await getInventoryValueByMonth();

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <AnalyticsOverview
          pieChartData={pieChartData}
          pieChartConfig={pieChartConfig}
          lineChartData={inventoryValueByMonth}
        />
      </TabsContent>
    </Tabs>
  );
}
