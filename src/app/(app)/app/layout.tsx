import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import CustomerProvider from "@/contexts/customer-provider";
import OrderProvider from "@/contexts/order-provider";
import ProductProvider from "@/contexts/product-provider";
import TaskProvider from "@/contexts/task-provider";
import { getCategories } from "@/lib/queries/category-queries";
import { getSuppliers } from "@/lib/queries/supplier-queries";
import { getWarehouses } from "@/lib/queries/warehouse-queries";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const [categories, warehouses, suppliers] = await Promise.all([
    getCategories(),
    getWarehouses(),
    getSuppliers(),
  ]);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[220px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
          <CustomerProvider>
            <TaskProvider>
              <OrderProvider suppliersData={suppliers}>
                <ProductProvider
                  categoriesData={categories}
                  warehousesData={warehouses}
                >
                  {children}
                </ProductProvider>
              </OrderProvider>
            </TaskProvider>
          </CustomerProvider>
        </main>
        <Footer />
      </div>
    </div>
  );
}
