import { Warehouse } from "lucide-react";
import Link from "next/link";

type LogoProps = {
  device: "desktop" | "mobile";
};

export default function Logo({ device }: LogoProps) {
  return (
    <Link
      href="/app/dashboard"
      className="flex items-center gap-2 font-semibold"
    >
      <Warehouse className="h-6 w-6 mr-1" />
      {device === "desktop" && <span>Stockify</span>}
    </Link>
  );
}
