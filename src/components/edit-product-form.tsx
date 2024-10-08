"use client";

import H1 from "@/components/h1";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { productStatuses } from "@/lib/data";
import { useProductContext } from "@/lib/hooks";
import {
  editProductFormSchema,
  TEditProductFormSchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import { ChevronLeft, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import EditProductTable from "./edit-product-table";
import { LoadingButton } from "./loading-button";

type EditProductFormProps = {
  product: Product;
};

export default function EditProductForm({ product }: EditProductFormProps) {
  const { categories, handleUpdateProduct } = useProductContext();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<TEditProductFormSchema>({
    resolver: zodResolver(editProductFormSchema),
  });

  async function onSubmit(data: TEditProductFormSchema) {
    // await handleUpdateProduct(product.id, data);
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/app/products">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <H1>Edit Product</H1>
        <Badge variant="outline" className="ml-auto sm:ml-0">
          In stock
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

      {/* Product Details */}
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Update your product details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    defaultValue={product.name}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    defaultValue={product.description}
                    spellCheck={false}
                    placeholder="Add a description of your product"
                    className="min-h-32"
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stock and Price */}
          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader>
              <CardTitle>Stock</CardTitle>
              <CardDescription>
                Change the stock and price of your product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditProductTable
                product={product}
                register={register}
                errors={errors}
              />
            </CardContent>
          </Card>

          {/* Product Category */}
          <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Product Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onValueChange={(value) => setValue("categoryId", value)}
                    defaultValue={product.categoryId}
                  >
                    <SelectTrigger id="category" aria-label="Select category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Status */}
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-3">
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    onValueChange={(value: TEditProductFormSchema["status"]) =>
                      setValue("status", value)
                    }
                    defaultValue={product.status}
                  >
                    <SelectTrigger id="status" aria-label="Select status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {productStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="px-1 text-xs text-red-600">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Image */}
          <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
            <CardHeader>
              <CardTitle>Product Image</CardTitle>
              <CardDescription>
                Change the image of your product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Image
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  src={product.image ?? "/placeholder.svg"}
                  height="300"
                  width="300"
                />
                <div className="grid grid-cols-3 gap-2">
                  {/* TODO: Upload Image */}
                  <button
                    type="button"
                    className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                  >
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Upload</span>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Archive Product */}
          <Card x-chunk="dashboard-07-chunk-5">
            <CardHeader>
              <CardTitle>Archive Product</CardTitle>
              <CardDescription>
                Archive this product so it can no longer be sold
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button type="button" size="sm" variant="secondary">
                Archive Product
              </Button>
            </CardContent>
          </Card>
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
