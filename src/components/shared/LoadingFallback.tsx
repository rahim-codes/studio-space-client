export default function LoadingFallback() {
  return (
    <div className="min-h-[350px] w-full flex flex-col items-center justify-center bg-background text-foreground space-y-4 py-16 dark:bg-[#0b0f17] dark:text-white">
      {/* Animated Spinner */}
      <div className="w-10 h-10 border-4 border-border border-t-[#f59e0b] rounded-full animate-spin dark:border-gray-800"></div>

      {/* Loading Text */}
      <p className="text-muted-foreground text-sm font-medium tracking-wide dark:text-gray-400">
        Loading amazing spaces...
      </p>
    </div>
  );
}
