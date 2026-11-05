"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5] dark:bg-[#0b0f17] text-foreground px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Decorative Subtle Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* Large Visual 404 Badge with Animated Icon */}
        <div className="relative inline-flex items-center justify-center">
          <span className="text-8xl sm:text-9xl font-black tracking-tighter text-muted-foreground/20 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 sm:p-5 bg-card/80 dark:bg-card/60 backdrop-blur-md rounded-3xl border border-border/60 shadow-xl animate-bounce duration-1000">
              <Compass className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 stroke-[1.5]" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
            Oops! The studio workspace or page you are looking for doesn&apos;t
            exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          {/* Go Back button using Next.js router.back() */}
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full sm:w-auto h-12 px-6 rounded-2xl border-border hover:bg-muted text-foreground font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>

          {/* Back to Home button using asChild correctly with Link */}
          <Link
            href="/"
            className="w-full sm:w-auto h-12 px-7 bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold text-sm rounded-2xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
