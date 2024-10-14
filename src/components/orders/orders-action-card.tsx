import { Plus } from "lucide-react";

import EntityDialog from "../common/entity-dialog";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFilteredProducts } from "@/lib/queries/product-queries";

export default async function OrdersActionCard() {
  const filteredProducts = await getFilteredProducts();

  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Your Orders</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Manage your orders efficiently with our comprehensive dashboard.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <EntityDialog
          actionType="createOrder"
          filteredProducts={filteredProducts}
        >
          <Plus className="mr-1 h-5 w-5" />
          Create New Order
        </EntityDialog>
      </CardFooter>
    </Card>
  );
}
