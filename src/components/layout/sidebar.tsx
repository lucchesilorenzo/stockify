import Logo from "../common/logo";
import Navigation from "./navigation";

export default function Sidebar() {
  return (
    <aside className="border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <Logo />

        <Navigation />
      </div>
    </aside>
  );
}
