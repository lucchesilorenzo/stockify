import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomerShipmentForm from "./customer-shipment-form/customer-shipment-form";

import { getCustomers } from "@/lib/queries/customer-queries";
import { getAvailableProducts } from "@/lib/queries/product-queries";

export default async function CustomerTabs() {
  const availableProducts = await getAvailableProducts();
  const customers = await getCustomers();

  return (
    <Tabs defaultValue="prepare-shipment" className="space-y-4">
      <TabsList>
        <TabsTrigger value="prepare-shipment">Prepare Shipment</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
      </TabsList>

      <TabsContent value="prepare-shipment">
        <CustomerShipmentForm
          products={availableProducts}
          customers={customers}
        />
      </TabsContent>

      <TabsContent value="customers"></TabsContent>
    </Tabs>
  );
}
