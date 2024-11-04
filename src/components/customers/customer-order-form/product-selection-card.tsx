"use client";

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
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductWithCategory } from "@/lib/types";

type ProductSelectionCardProps = {
  products: ProductWithCategory[];
};

export default function ProductSelectionCard({
  products,
}: ProductSelectionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Selection</CardTitle>
        <CardDescription>Choose products for the order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="max-h-60 overflow-y-auto">
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}{" "}
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
          <Button type="button">Clear</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Product 1</TableCell>
              <TableCell>$10.00</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
