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
      <div className="w-24 h-9 bg-gray-800 animate-pulse rounded-xl"></div>
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
        <DropdownMenuTrigger className="flex items-center gap-2.5 py-1.5 px-3 rounded-xl bg-[#111827] border border-gray-800 hover:border-gray-700 transition-all cursor-pointer outline-none">
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
          <span className="text-sm font-semibold text-gray-200">
            {firstName}
          </span>
        </DropdownMenuTrigger>

        {/* Dropdown Menu Content */}
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-2xl bg-[#111827] border border-gray-800 text-gray-200 p-2 shadow-2xl z-50"
        >
          {/* User Info Header Inside Dropdown */}
          <div className="px-3 py-2 space-y-0.5 border-b border-gray-800 mb-1">
            <p className="font-bold text-sm text-white truncate">
              {displayName}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>

          {/* Navigation Links with Active Route Indicator */}
          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive("/dashboard")
                  ? "bg-amber-500 text-black font-semibold"
                  : "hover:bg-gray-800/60 text-gray-300 hover:text-white"
              }`}
            >
              📊 Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Link
              href="/studios/add"
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive("/studios/add")
                  ? "bg-amber-500 text-black font-semibold"
                  : "hover:bg-gray-800/60 text-gray-300 hover:text-white"
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
                  : "hover:bg-gray-800/60 text-gray-300 hover:text-white"
              }`}
            >
              🏢 My Studio Listings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Link
              href="/my-bookings"
              className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isActive("/my-bookings")
                  ? "bg-amber-500 text-black font-semibold"
                  : "hover:bg-gray-800/60 text-gray-300 hover:text-white"
              }`}
            >
              📅 My Bookings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-800 my-1" />

          {/* Logout Button */}
          <DropdownMenuItem
            onClick={handleSignOut}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer focus:bg-red-500/10 focus:text-red-300"
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
        className="text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-xl px-4 py-2"
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
