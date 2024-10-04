import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import EntityDialog from "./entity-dialog";

export default function OrdersActionCard() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Your Orders</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Introducing our dynamic orders dashboard for seamless management.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <EntityDialog actionType="createOrder">
          <Plus className="mr-2 h-5 w-5" /> Create new order
        </EntityDialog>
      </CardFooter>
    </Card>
  );
}
