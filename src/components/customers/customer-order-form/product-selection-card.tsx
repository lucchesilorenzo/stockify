"use client";

import { useState } from "react";

import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { toast } from "sonner";

import ProductSelectionTable from "./product-selection-table";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomerSelectedProduct, ProductWithCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { ShippingFormSchema } from "@/lib/validations/customer-validations";

type ProductSelectionCardProps = {
  products: ProductWithCategory[];
  setValue: UseFormSetValue<ShippingFormSchema>;
  errors: FieldErrors<ShippingFormSchema>;
};

export default function ProductSelectionCard({
  products,
  setValue,
  errors,
}: ProductSelectionCardProps) {
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<
    CustomerSelectedProduct[]
  >([]);

  const totalPrice = selectedProducts.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0,
  );

  function handleProductSelection(productId: string) {
    setSelectedProductId(productId);
  }

  function handleAddProductToSelection() {
    // Check if product is already selected
    if (!selectedProductId) return;

    // Get the selected product from the products array
    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;

    // Check if product is already selected
    const isProductAlreadySelected = selectedProducts.some(
      (p) => p.productId === product.id,
    );
    if (isProductAlreadySelected) {
      setSelectedProductId("");
      toast.warning("Product already selected.");
      return;
    }

    // Add the selected product to the selectedProducts array
    const updatedProducts = [
      ...selectedProducts,
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity:
          selectedProducts.find((p) => p.productId === product.id)?.quantity ||
          1,
      },
    ];

    setSelectedProductId("");
    setSelectedProducts(updatedProducts);
    setValue("products", updatedProducts);
  }

  function handleProductQuantityChange(productId: string, quantity: number) {
    // Get the selected product from the products array
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Check if quantity is greater than available quantity
    if (quantity > product.quantity) {
      toast.warning(
        "Quantity exceeds available stock. Please select a lower quantity.",
      );
      return;
    }

    // Update the quantity in the selectedProducts array
    const updatedProducts = selectedProducts.map((product) =>
      product.productId === productId ? { ...product, quantity } : product,
    );

    setSelectedProducts(updatedProducts);
    setValue("products", updatedProducts);
  }

  function handleRemoveProduct(productId: string) {
    const updatedFilteredProducts = selectedProducts.filter(
      (p) => p.productId !== productId,
    );

    setSelectedProductId("");
    setSelectedProducts(updatedFilteredProducts);
    setValue("products", updatedFilteredProducts);
  }

  function handleClearAll() {
    setSelectedProductId("");
    setSelectedProducts([]);
    setValue("products", []);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Selection</CardTitle>
        <CardDescription>Select products for shipment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Select
              value={selectedProductId}
              onValueChange={handleProductSelection}
            >
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="max-h-60 overflow-y-auto">
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - {formatCurrency(product.price)}{" "}
                      {product.quantity <= 10 && (
                        <>
                          <span>-</span>{" "}
                          <span className="text-red-600">
                            {product.quantity} left
                          </span>
                        </>
                      )}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>

            <Button
              type="button"
              disabled={!selectedProductId}
              onClick={handleAddProductToSelection}
            >
              Add
            </Button>
            <Button
              type="button"
              disabled={!selectedProducts.length}
              onClick={handleClearAll}
            >
              Clear
            </Button>
          </div>
          {errors.products && (
            <p className="text-red-600">{errors.products.message}</p>
          )}
        </div>

        <ProductSelectionTable
          products={selectedProducts}
          totalPrice={totalPrice}
          onProductQuantityChange={handleProductQuantityChange}
          onRemoveProduct={handleRemoveProduct}
        />
      </CardContent>
    </Card>
  );
}