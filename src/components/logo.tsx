import { Package2 } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/app/dashboard"
      className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
    >
      <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
      <span className="sr-only">Stockify</span>
    </Link>
  );
}
