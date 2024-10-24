import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFoundPage() {
  return (
    <main className="flex flex-col min-h-screen justify-center items-center w-[500px] mx-auto space-y-4">
      <h1 className="flex items-center">
        <span className="font-bold text-xl">404</span>
        <Separator orientation="vertical" className="h-8 bg-gray-400 mx-3" />
        <span className="text-lg">This page could not be found.</span>
      </h1>
      <Button variant="link">
        <Link href="/app/dashboard">&larr; Go back to dashboard</Link>
      </Button>
    </main>
  );
}
