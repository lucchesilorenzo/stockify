import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "./styles/globals.css";

import FontSizeProvider from "@/contexts/font-size-provider";
import ThemeProvider from "@/contexts/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Welcome | Stockify",
    template: "%s | Stockify",
  },
  description:
    "Stockify is a warehouse management system designed for stock clerks, allowing them to add new products, reorder stock, view recent orders, monitor statistics, efficiently manage inventory operations, and handle customer information and shipments.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FontSizeProvider>{children}</FontSizeProvider>
        </ThemeProvider>
        <Toaster position="top-right" duration={4000} />
      </body>
    </html>
  );
}
