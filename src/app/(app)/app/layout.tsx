import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import OrderProvider from "@/contexts/order-provider";
import ProductProvider from "@/contexts/product-provider";
import { getCategories } from "@/lib/queries/category-queries";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const categories = await getCategories();

  return (
    <div className="relative grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
          <OrderProvider>
            <ProductProvider categoriesData={categories}>
              {children}
            </ProductProvider>
          </OrderProvider>
        </main>
        <Footer />
      </div>
    </div>
  );
}
