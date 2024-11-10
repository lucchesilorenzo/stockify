import { Plus } from "lucide-react";

import EntityDialog from "../common/entity-dialog";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProducts } from "@/lib/queries/product-queries";

export default async function OrdersActionCard() {
  const products = await getProducts();

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Restock Inventory</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Track and manage your inventory restocks with ease.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <EntityDialog actionType="createOrder" products={products}>
          <Plus className="mr-1 h-5 w-5" />
          Restock Product
        </EntityDialog>
      </CardFooter>
    </Card>
  );
}
