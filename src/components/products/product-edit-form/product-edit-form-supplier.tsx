"use client";

import { Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductEditFormSupplier() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Supplier Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
          <Input id="supplier" placeholder="Enter supplier name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplierCode">Supplier Code</Label>
          <Input id="supplierCode" placeholder="Enter supplier code" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="leadTime">Lead Time (days)</Label>
          <Input type="number" id="leadTime" placeholder="Enter lead time" />
        </div>
      </CardContent>
    </Card>
  );
}
