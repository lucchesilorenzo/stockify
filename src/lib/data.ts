import {
  AlertTriangle,
  Home,
  LineChart,
  Package,
  ShoppingCart,
  TrendingUp,
  Truck,
} from "lucide-react";

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

export const dashboardData = [
  {
    title: "Inventory Value",
    description: "Value of your inventory",
    icon: TrendingUp,
  },
  {
    title: "Low Stock Products",
    description: "Products to restock",
    icon: AlertTriangle,
  },
  {
    title: "Pending Orders",
    description: "Orders to process",
    icon: Truck,
  },
  {
    title: "Total Products",
    description: "In stock",
    icon: Package,
  },
];
