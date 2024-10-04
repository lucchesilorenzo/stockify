import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Welcome | Stockify",
    template: "%s | Stockify",
  },
  description: "Stockify is a stock tracking app.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50 text-sm antialiased`}>
        {children}
      </body>
      <Toaster position="top-right" />
    </html>
  );
}
