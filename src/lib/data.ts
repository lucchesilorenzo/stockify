import { Home, LineChart, Package, ShoppingCart } from "lucide-react";

import { Status } from "./types";

export const routes = [
  { name: "Dashboard", href: "/app/dashboard", icon: Home },
  { name: "Orders", href: "/app/orders", icon: ShoppingCart },
  { name: "Products", href: "/app/products", icon: Package },
  { name: "Analytics", href: "/app/analytics", icon: LineChart },
];

export const productStatuses: Status[] = [
  { value: "available", label: "Available" },
  { value: "archived", label: "Archived" },
];
