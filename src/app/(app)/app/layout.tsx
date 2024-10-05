import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import ThemeToggle from "@/components/theme-toggle";
import OrderContextProvider from "@/contexts/order-context-provider";
import ProductContextProvider from "@/contexts/product-context-provider";
import { getCategories, getOrders, getProducts } from "@/lib/server-utils";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const [products, categories, orders] = await Promise.all([
    getProducts(),
    getCategories(),
    getOrders(),
  ]);

  return (
    <div className="relative grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <OrderContextProvider ordersData={orders}>
            <ProductContextProvider
              productsData={products}
              categoriesData={categories}
            >
              {children}
              <div className="absolute bottom-5 right-5">
                <ThemeToggle />
              </div>
            </ProductContextProvider>
          </OrderContextProvider>
        </main>
      </div>
    </div>
  );
}
