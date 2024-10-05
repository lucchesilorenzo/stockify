import H1 from "@/components/h1";
import OrderSummaryCard from "@/components/order-summary-card";
import OrdersActionCard from "@/components/orders-action-card";
import RecentOrdersTable from "@/components/recent-orders-table";
import { getOrders } from "@/lib/server-utils";
import { columns } from "./columns";
import OrderInvoice from "@/components/order-invoice";

export const metadata = {
  title: "Orders",
};

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <main>
      <H1>Orders</H1>

      <div className="my-6 flex items-center gap-x-10">
        <OrdersActionCard />
        <OrderSummaryCard orders={orders} />
      </div>

      <section className="grid grid-cols-[60vw_1fr] gap-6">
        <div>
          <RecentOrdersTable columns={columns} data={orders} />
        </div>

        <div>
          <OrderInvoice />
        </div>
      </section>
    </main>
  );
}
