"use client";

import { useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Link from "next/link";

import Logo from "../common/logo";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { routes } from "@/lib/data";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-[300px]">
        <nav>
          <ul className="grid gap-2 text-lg font-medium">
            <SheetHeader>
              <SheetTitle>
                <Logo device="mobile" onOpenChange={() => setOpen(!open)} />
              </SheetTitle>

              <VisuallyHidden>
                <SheetDescription>Navigation menu</SheetDescription>
              </VisuallyHidden>

              {routes.map((route) => (
                <li key={route.name}>
                  <Link
                    href={route.href}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setOpen(!open)}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.name}
                  </Link>
                </li>
              ))}
            </SheetHeader>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
