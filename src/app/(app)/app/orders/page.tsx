import { format } from "date-fns";
import { Metadata } from "next";

import H1 from "@/components/common/h1";
import OrderInvoice from "@/components/orders/order-invoice";
import OrderSummaryCard from "@/components/orders/order-summary-card";
import OrdersActionCard from "@/components/orders/orders-action-card";
import { columns } from "@/components/tables/orders/columns";
import OrdersTable from "@/components/tables/orders/orders-table";
import InvoiceProvider from "@/contexts/invoice-provider";
import {
  getMonthlyOrders,
  getOrders,
  getWeeklyOrders,
} from "@/lib/queries/order-queries";
import { formatCurrency, formatOrderId } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function OrdersPage() {
  const [orders, monthlyOrders, weeklyOrders] = await Promise.all([
    getOrders(),
    getMonthlyOrders(),
    getWeeklyOrders(),
  ]);

  const csvData = orders.map((order) => ({
    ID: formatOrderId(order),
    Type: order.type,
    Name: order.product.name,
    Quantity: order.quantity,
    Status: order.status,
    Amount: formatCurrency(order.totalPrice),
    Date: format(order.createdAt, "yyyy-MM-dd"),
  }));

  return (
    <InvoiceProvider>
      <main>
        <H1>Orders</H1>

        <div className="my-6 w-full lg:hidden">
          <OrdersActionCard />
        </div>

        <div className="my-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <div className="hidden lg:block">
            <OrdersActionCard />
          </div>
          <OrderSummaryCard type="month" orders={monthlyOrders} />
          <OrderSummaryCard type="week" orders={weeklyOrders} />
        </div>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1150px_1fr]">
          <div>
            <OrdersTable columns={columns} data={orders} csvData={csvData} />
          </div>
          <div>
            <OrderInvoice />
          </div>
        </section>
      </main>
    </InvoiceProvider>
  );
}
