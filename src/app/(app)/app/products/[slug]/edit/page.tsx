import EditProductForm from "@/components/edit-product-form";
import { getProductBySlug } from "@/lib/server-utils";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <EditProductForm product={product} />
    </main>
  );
}
