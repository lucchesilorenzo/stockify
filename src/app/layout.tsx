import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./styles/globals.css";

import ThemeContextProvider from "@/contexts/theme-context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Welcome | Stockify",
    template: "%s | Stockify",
  },
  description:
    "Stockify is a warehouse management system designed for stock clerks, allowing them to add new products, reorder stock, view recent orders, monitor statistics, and efficiently manage inventory operations.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} text-sm antialiased`}>
        <ThemeContextProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeContextProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
