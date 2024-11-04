import { Lightbulb } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-4">
      <small className="flex items-center justify-center">
        &copy; {new Date().getFullYear()}. Made with{" "}
        <Lightbulb className="text-yellow-500 h-4 w-4 mx-1" /> by Lorenzo
        Lucchesi.
      </small>
    </footer>
  );
}
