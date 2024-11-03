"use client";

import { useEffect, useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";

import { routes, themeData } from "@/lib/data";

export function BarcodeCommandDialog() {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  const router = useRouter();

  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="relative">
        <Input
          placeholder="Search..."
          className="border rounded p-2 w-[300px]"
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        />

        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 absolute top-2 left-[220px]">
          <span className="text-xs">Ctrl + K</span>
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden>
          <DialogTitle>Barcode Command Dialog</DialogTitle>
        </VisuallyHidden>
        <VisuallyHidden>
          <DialogDescription>
            Enter a barcode to search for available products.
          </DialogDescription>
        </VisuallyHidden>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            {routes.map((route) => (
              <CommandItem
                key={route.href}
                onSelect={() => {
                  setOpen(false);
                  router.push(route.href);
                }}
              >
                <route.icon className="h-5 w-5 mr-3" />
                {route.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            {themeData.map((theme) => (
              <CommandItem
                key={theme.value}
                onSelect={() => {
                  setOpen(false);
                  setTheme(theme.value);
                }}
              >
                <theme.icon className="h-5 w-5 mr-3" />
                {theme.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
