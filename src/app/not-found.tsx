import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-[500px] flex-col items-center justify-center space-y-4">
      <h1 className="flex items-center">
        <span className="text-xl font-bold">404</span>
        <Separator orientation="vertical" className="mx-3 h-8 bg-gray-400" />
        <span className="text-lg">This page could not be found.</span>
      </h1>
      <Button variant="link">
        <Link href="/app/dashboard">&larr; Go back to dashboard</Link>
      </Button>
    </main>
  );
}
