import UserInfo from "@/components/HomePage/UserInfo";
import LoadingFallback from "@/components/shared/LoadingFallback";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { Globe } from "lucide-react";
import Link from "next/link";
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
  { href: "/", label: "Home", active: true },
  { href: "/explore-studio", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B1120]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-amber-500">
            <BasketballIcon className="size-5 text-[#0B1120]" />
          </span>
          <span className="text-xl font-bold text-white">StudioSpace</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                link.active
                  ? "border-b-2 border-amber-500 pb-0.5 text-amber-500"
                  : "text-slate-200 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            aria-label="Language"
          >
            <Globe className="size-4" />
          </Button>
          <Suspense fallback={<LoadingFallback />}>
            <UserInfo />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
