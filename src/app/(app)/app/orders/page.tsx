import { Metadata } from "next";

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

export const metadata: Metadata = {
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

        <div className="my-6 w-full lg:hidden">
          <OrdersActionCard />
        </div>

        <div className="my-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="hidden lg:block">
            <OrdersActionCard />
          </div>
          <OrderSummaryCard type="month" orders={monthlyOrders} />
          <OrderSummaryCard type="week" orders={weeklyOrders} />
        </div>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1200px_1fr]">
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
