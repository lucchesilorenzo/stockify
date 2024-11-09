import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import CustomerProvider from "@/contexts/customer-provider";
import OrderProvider from "@/contexts/order-provider";
import ProductProvider from "@/contexts/product-provider";
import { getCategories } from "@/lib/queries/category-queries";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const categories = await getCategories();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
          <CustomerProvider>
            <OrderProvider>
              <ProductProvider categoriesData={categories}>
                {children}
              </ProductProvider>
            </OrderProvider>
          </CustomerProvider>
        </main>
        <Footer />
      </div>
    </div>
  );
}
