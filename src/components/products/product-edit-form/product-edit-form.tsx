"use client";

import { useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// import ProductEditFormArchive from "./product-edit-form-archive";
import ProductEditFormCategory from "./product-edit-form-category";
import ProductEditFormDetails from "./product-edit-form-details";
import ProductEditFormImage from "./product-edit-form-image";
import ProductEditFormStockAndPrice from "./product-edit-form-stock-and-price";
import ProductEditFormWarehouse from "./product-edit-form-warehouse";

import H1 from "@/components/common/h1";
import { LoadingButton } from "@/components/common/loading-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/use-product";
import { uploadImage } from "@/lib/api";
import {
  TProductEditFormSchema,
  productEditFormSchema,
} from "@/lib/validations/product-validations";

type ProductEditFormProps = {
  product: Product;
};

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const {
    categories,
    warehouses,
    handleUpdateProduct,
    handleCheckProductMaxQuantity,
  } = useProduct();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TProductEditFormSchema>({
    resolver: zodResolver(productEditFormSchema),
  });

  async function onSubmit(data: TProductEditFormSchema) {
    // Check if max quantity is reached
    const result = await handleCheckProductMaxQuantity(
      product.id,
      data.maxQuantity,
    );
    if (!result) return;

    // Upload image if it exists
    const file = imageInputRef.current?.files?.[0];

    if (file) {
      if (file.type.startsWith("image")) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadResponse = await uploadImage(formData);

        // Checks if upload was successful
        if (uploadResponse.message) {
          toast.error(uploadResponse.message);
          data.image = product.image; // Set image to previous image
        } else {
          data.image = uploadResponse.filePath; // Set image to new image
        }
      } else {
        // If file is not an image, show error
        toast.error("Please upload a valid image.");
        return;
      }
    } else {
      data.image = product.image; // If there's no file, set image to previous image
    }

    // Update product
    await handleUpdateProduct(product.id, data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
    >
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/app/products">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <H1>{product.name}</H1>
        <Badge
          variant={
            product.status === "Out of Stock" ? "destructive" : "default"
          }
          className="ml-auto sm:ml-0"
        >
          {product.status === "In Stock" ? "In Stock" : "Out of Stock"}
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => reset()}
          >
            Discard
          </Button>
          <LoadingButton type="submit" size="sm" isLoading={isSubmitting}>
            Save Product
          </LoadingButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <ProductEditFormDetails
            product={product}
            register={register}
            errors={errors}
          />

          <ProductEditFormStockAndPrice
            product={product}
            register={register}
            errors={errors}
          />

          <ProductEditFormCategory
            product={product}
            categories={categories}
            setValue={setValue}
            errors={errors}
          />
        </div>

        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <ProductEditFormWarehouse
            product={product}
            warehouses={warehouses}
            setValue={setValue}
            errors={errors}
          />

          <ProductEditFormImage
            product={product}
            imageInputRef={imageInputRef}
          />

          {/* TODO: Archive Product */}
          {/* <ProductEditFormArchive /> */}
        </div>
      </div>

      {/* Save and Discard Buttons (Mobile) */}
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => reset()}
        >
          Discard
        </Button>
        <LoadingButton type="submit" size="sm" isLoading={isSubmitting}>
          Save Product
        </LoadingButton>
      </div>
    </form>
  );
}
