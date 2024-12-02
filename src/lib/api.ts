import { Product } from "@prisma/client";

export async function uploadProductImage(
  formData: FormData,
  productId: Product["id"],
) {
  const res = await fetch(`/api/products/upload/${productId}`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    return error;
  }

  const data = await res.json();
  return data;
}
