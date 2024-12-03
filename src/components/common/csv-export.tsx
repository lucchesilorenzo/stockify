"use client";

import React from "react";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

import { Button } from "@/components/ui/button";

// Dynamically imports the CSVLink component from react-csv
const CSVLink = dynamic(() => import("react-csv").then((mod) => mod.CSVLink), {
  ssr: false,
  loading: () => (
    <Button variant="outline" disabled>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Loading...
    </Button>
  ),
});

type CSVExportProps = {
  children: React.ReactNode;
  data: Record<string, string | number>[];
  fileName: string;
};

export default function CSVExport({
  children,
  data,
  fileName,
}: CSVExportProps) {
  return (
    <Button variant="outline" asChild>
      <CSVLink data={data} filename={fileName}>
        {children}
      </CSVLink>
    </Button>
  );
}
