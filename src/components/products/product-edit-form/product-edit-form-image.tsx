"use client";

import { Product } from "@prisma/client";
import { Upload } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ProductEditFormImageProps = {
  product: Product;
  imageInputRef: React.RefObject<HTMLInputElement>;
};

export default function ProductEditFormImage({
  product,
  imageInputRef,
}: ProductEditFormImageProps) {
  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Product Image</CardTitle>
        <CardDescription>Change the image of your product</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            src={product.image ?? "/placeholder.svg"}
            alt="Product image"
            width="300"
            height="300"
            className="aspect-square w-full rounded-md object-cover"
          />
          <div className="grid grid-cols-3 gap-2">
            <div className="relative flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
              <Input
                type="file"
                id="imageInput"
                ref={imageInputRef}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
