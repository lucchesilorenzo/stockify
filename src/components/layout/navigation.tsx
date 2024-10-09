"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="grid items-start px-2 text-sm font-medium lg:px-4">
        {routes.map((route) => (
          <li key={route.name}>
            <Link
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                route.href === pathname
                  ? "bg-muted text-primary"
                  : "text-muted-foreground",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
