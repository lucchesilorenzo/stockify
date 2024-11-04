import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  AlertTriangle,
  Home,
  LineChart,
  Monitor,
  Package,
  ShoppingCart,
  TrendingUp,
  Truck,
  UserRound,
} from "lucide-react";

import { Status } from "./types";

export const routes = [
  { name: "Dashboard", href: "/app/dashboard", icon: Home },
  { name: "Orders", href: "/app/orders", icon: ShoppingCart },
  { name: "Products", href: "/app/products", icon: Package },
  { name: "Customers", href: "/app/customers", icon: UserRound },
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

export const themeData = [
  {
    name: "Light",
    value: "light",
    icon: SunIcon,
  },
  {
    name: "Dark",
    value: "dark",
    icon: MoonIcon,
  },
  {
    name: "System",
    value: "system",
    icon: Monitor,
  },
];
