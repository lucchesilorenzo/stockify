import { columns } from "./columns";

import H1 from "@/components/common/h1";
import OrderInvoice from "@/components/orders/order-invoice";
import OrderSummaryCard from "@/components/orders/order-summary-card";
import OrdersActionCard from "@/components/orders/orders-action-card";
import RecentOrdersTable from "@/components/orders/recent-orders-table";
import InvoiceContextProvider from "@/contexts/invoice-context-provider";
import {
  getMonthlyOrders,
  getOrders,
  getWeeklyOrders,
} from "@/lib/queries/order-queries";

export const metadata = {
  title: "Orders",
};

export default async function OrdersPage() {
  const orders = await getOrders();
  const monthlyOrders = await getMonthlyOrders();
  const weeklyOrders = await getWeeklyOrders();

  return (
    <InvoiceContextProvider>
      <main>
        <H1>Orders</H1>

        <div className="my-6 flex gap-x-10">
          <OrdersActionCard />
          <OrderSummaryCard type="month" orders={monthlyOrders} />
          <OrderSummaryCard type="week" orders={weeklyOrders} />
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
