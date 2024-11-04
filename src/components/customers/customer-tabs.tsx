import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CustomerOrderForm from "./customer-order-form/customer-order-form";

import { getFilteredProducts } from "@/lib/queries/product-queries";

export default async function CustomerTabs() {
  const availableProducts = await getFilteredProducts();

  return (
    <Tabs defaultValue="new-order" className="space-y-4">
      <TabsList>
        <TabsTrigger value="new-order">New Order</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
      </TabsList>

      <TabsContent value="new-order">
        <CustomerOrderForm products={availableProducts} />
      </TabsContent>

      <TabsContent value="customers"></TabsContent>
    </Tabs>
  );
}
