"use client";

import React from "react";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";

// Dynamically imports the CSVLink component from react-csv
const CSVLink = dynamic(() => import("react-csv").then((mod) => mod.CSVLink), {
  loading: () => (
    <Button variant="outline" disabled>
      <Loader2 className="h-5 w-5 animate-spin mr-2" />,
    </Button>
  ),
});

type CSVExportProps = {
  children: React.ReactNode;
  data: Record<string, string | number>[];
  filename: string;
};

export default function CSVExport({
  children,
  data,
  filename,
}: CSVExportProps) {
  return (
    <Button variant="outline" asChild>
      <CSVLink data={data} filename={filename}>
        {children}
      </CSVLink>
    </Button>
  );
}
