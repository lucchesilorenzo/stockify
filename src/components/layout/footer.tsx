import { Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-4">
      <div className="container mx-auto px-4">
        <p className="flex flex-wrap items-center justify-center text-center text-xs">
          <span className="mr-1">&copy; {new Date().getFullYear()}.</span>
          <span className="flex items-center">
            Made with
            <Lightbulb
              className="mx-1 h-4 w-4 text-yellow-500"
              aria-label="idea"
            />
            by
          </span>
          <Link
            href="https://github.com/lucchesilorenzo"
            target="_blank"
            className="ml-1 hover:underline"
          >
            Lorenzo Lucchesi.
          </Link>
        </p>
      </div>
    </footer>
  );
}
