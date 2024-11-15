import { Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-4">
      <div className="container mx-auto px-4">
        <p className="flex items-center justify-center flex-wrap text-sm text-center">
          <span className="mr-1">&copy; {new Date().getFullYear()}.</span>
          <span className="flex items-center">
            Made with
            <Lightbulb
              className="text-yellow-500 h-4 w-4 mx-1"
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
