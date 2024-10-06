import H1 from "@/components/h1";
import OrderInvoice from "@/components/order-invoice";
import OrderSummaryCard from "@/components/order-summary-card";
import OrdersActionCard from "@/components/orders-action-card";
import RecentOrdersTable from "@/components/recent-orders-table";
import InvoiceContextProvider from "@/contexts/invoice-context-provider";
import { getMonthlyOrders, getOrders } from "@/lib/server-utils";
import { columns } from "./columns";

export const metadata = {
  title: "Orders",
};

export default async function OrdersPage() {
  const orders = await getOrders();
  const monthlyOrders = await getMonthlyOrders();

  return (
    <InvoiceContextProvider>
      <main>
        <H1>Orders</H1>

        <div className="my-6 flex gap-x-10">
          <OrdersActionCard />
          <OrderSummaryCard orders={monthlyOrders} />
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
    </InvoiceContextProvider>
  );
}
