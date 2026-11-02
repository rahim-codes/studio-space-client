export default function LoadingFallback() {
  return (
    <div className="min-h-[350px] w-full flex flex-col items-center justify-center bg-[#0b0f17] text-white space-y-4 py-16">
      {/* Animated Spinner */}
      <div className="w-10 h-10 border-4 border-gray-800 border-t-[#f59e0b] rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="text-gray-400 text-sm font-medium tracking-wide">
        Loading amazing spaces...
      </p>
    </div>
  );
}
