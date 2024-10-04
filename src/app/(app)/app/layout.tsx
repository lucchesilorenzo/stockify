import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import OrderContextProvider from "@/contexts/order-context-provider";
import ProductContextProvider from "@/contexts/product-context-provider";
import { getCategories, getOrders, getProducts } from "@/lib/server-utils";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const products = await getProducts();
  const categories = await getCategories();
  // const orders = await getOrders();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* <OrderContextProvider ordersData={orders}> */}
          <ProductContextProvider
            productsData={products}
            categoriesData={categories}
          >
            {children}
          </ProductContextProvider>
        </main>
      </div>
    </div>
  );
}
