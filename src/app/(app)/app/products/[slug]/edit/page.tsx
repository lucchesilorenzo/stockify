import { Metadata } from "next";

import ProductEditForm from "@/components/products/product-edit-form/product-edit-form";
import { getProductBySlug } from "@/lib/queries/product-queries";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const slug = params.slug;
  const product = await getProductBySlug(slug);

  return {
    title: product.name,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <ProductEditForm product={product} />
    </main>
  );
}
