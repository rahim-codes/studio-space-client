"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserInfo() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully signed out!");
            router.push("/login");
          },
        },
      });
    } catch {
      toast.error("Failed to sign out. Try again.");
    }
  };

  // Loading Skeleton
  if (isPending) {
    return (
      <div className="w-24 h-9 bg-muted animate-pulse rounded-xl dark:bg-gray-800"></div>
    );
  }

  // 1. Authenticated State
  if (user) {
    const displayName = user.name || "User";
    const firstName = displayName.split(" ")[0];

    // Helper function for active route indicator
    const isActive = (path: string) => pathname === path;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl bg-card border border-border hover:border-amber-500/50 transition-all cursor-pointer outline-none dark:bg-[#111827] dark:border-gray-800 dark:hover:border-gray-700">
          <Avatar className="w-8 h-8 rounded-lg border border-amber-500/30">
            <AvatarImage
              src={user.image || ""}
              alt={displayName}
              className="object-cover"
            />
            <AvatarFallback className="bg-amber-500 text-black font-bold text-xs rounded-lg">
              {firstName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold text-foreground dark:text-gray-200">
            {firstName}
          </span>
        </DropdownMenuTrigger>

        {/* Dropdown Menu Content */}
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-2xl bg-popover border border-border text-popover-foreground p-2 shadow-2xl z-50 dark:bg-[#111827] dark:border-gray-800 dark:text-gray-200"
        >
          {/* User Info Header Inside Dropdown */}
          <div className="px-3 py-2 space-y-0.5 border-b border-border mb-1 dark:border-gray-800">
            <p className="font-bold text-sm text-foreground truncate dark:text-white">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate dark:text-gray-400">{user.email}</p>
          </div>

          {/* Navigation Links with Active Route Indicator */}
          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive("/dashboard")
                  ? "bg-amber-500 text-black font-semibold"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground dark:hover:bg-gray-800/60 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              📊 Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Link
              href="/add-studio"
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive("/studios/add")
                  ? "bg-amber-500 text-black font-semibold"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground dark:hover:bg-gray-800/60 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              ➕ Add New Studio
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Link
              href="/my-listings"
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive("/my-listings")
                  ? "bg-amber-500 text-black font-semibold"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground dark:hover:bg-gray-800/60 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              🏢 My Studio Listings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Link
              href="/my-booking"
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive("/my-bookings")
                  ? "bg-amber-500 text-black font-semibold"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground dark:hover:bg-gray-800/60 dark:text-gray-300 dark:hover:text-white"
              }`}
            >
              📅 My Bookings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-border my-1 dark:bg-gray-800" />

          {/* Logout Button */}
          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-500/10 hover:text-red-700 transition-colors cursor-pointer focus:bg-red-500/10 focus:text-red-700 dark:text-red-400 dark:hover:text-red-300 dark:focus:text-red-300"
          >
            🚪 Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // 2. Unauthenticated State (Login and Register Action Buttons)
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl px-4 py-2 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/60"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-semibold rounded-xl px-5 py-2 shadow-sm transition-all"
      >
        Register
      </Link>
    </div>
  );
}
