"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductEditFormArchive() {
  return (
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
  );
}
