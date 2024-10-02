"use client";

import { cn } from "@/lib/utils";
import { Home, LineChart, Package, Package2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { name: "Dashboard", href: "/app/dashboard", icon: Home },
  { name: "Orders", href: "/app/orders", icon: ShoppingCart },
  { name: "Products", href: "/app/products", icon: Package },
  { name: "Analytics", href: "/app/analytics", icon: LineChart },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <div className="border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/app/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span>Stockify</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {routes.map((route) => (
                <Link
                  key={route.name}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    route.href === pathname
                      ? "bg-muted text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <route.icon className="h-4 w-4" />
                  {route.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
