import { FontSizeIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  AlertTriangle,
  Home,
  LineChart,
  Monitor,
  Package,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  UserRound,
} from "lucide-react";

import { OrderStatus, OrderType, ProductStatus } from "./types";

export const routes = [
  { name: "Dashboard", href: "/app/dashboard", icon: Home },
  { name: "Orders", href: "/app/orders", icon: ShoppingCart },
  { name: "Products", href: "/app/products", icon: Package },
  { name: "Suppliers", href: "/app/suppliers", icon: Truck },
  { name: "Customers", href: "/app/customers", icon: UserRound },
  { name: "Analytics", href: "/app/analytics", icon: LineChart },
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
    title: "Total Units",
    description: "In stock",
    icon: Package,
  },
];

export const suppliersData = [
  {
    title: "Total Suppliers",
    description: "Number of suppliers",
    icon: Truck,
  },
  {
    title: "Average Rating",
    description: "Average rating of suppliers",
    icon: Star,
  },
];

export const themeData = [
  { name: "Light", value: "light", icon: SunIcon },
  { name: "Dark", value: "dark", icon: MoonIcon },
  { name: "System", value: "system", icon: Monitor },
];

export const fontSizeData = [
  { name: "Medium", value: "text-md", icon: FontSizeIcon },
  { name: "Large", value: "text-lg", icon: FontSizeIcon },
  { name: "Extra Large", value: "text-xl", icon: FontSizeIcon },
];

export const productStatuses: ProductStatus[] = [
  { value: "in-stock", label: "In Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
];

export const orderTypes: OrderType[] = [
  { value: "new", label: "New Orders" },
  { value: "restock", label: "Restock Orders" },
];

export const orderStatuses: OrderStatus[] = [
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];
