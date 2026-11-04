"use client";

import UserInfo from "@/components/HomePage/UserInfo";
import LoadingFallback from "@/components/shared/LoadingFallback";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export function BasketballIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M4.93 4.93c4.34 4.34 9.73 6.8 14.14 6.8M4.93 19.07c4.34-4.34 9.73-6.8 14.14-6.8M2 12h20" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore-studio", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About Us" },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background dark:border-white/5 dark:bg-[#0B1120]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-amber-500">
            <BasketballIcon className="size-5 text-[#0B1120]" />
          </span>
          <span className="text-xl font-bold text-foreground dark:text-white">
            StudioSpace
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "border-b-2 border-amber-500 pb-0.5 text-amber-500"
                    : "text-muted-foreground hover:text-foreground dark:text-slate-200 dark:hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="rounded-md"
            aria-label="Toggle Theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Suspense fallback={<LoadingFallback />}>
            <UserInfo />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
