import Link from "next/link";

import StudioCard from "@/components/HomePage/StudioCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

interface CategoryPageProps {
  params: Promise<{ categoryName: string }>;
}

// Server-side fetch function (SSR)
async function getCategoryStudios(category: string): Promise<Studio[]> {
  try {
    const res = await fetch(
      `http://localhost:8000/studios/category/${encodeURIComponent(category)}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) return [];

    const data = await res.json();
    console.log(data);
    return data.success ? data.data : [];
  } catch (error) {
    console.error("Failed to fetch category studios:", error);
    return [];
  }
}

export default async function CategoryStudiosPage({
  params,
}: CategoryPageProps) {
  const resolvedParams = await params;
  const categoryStudio = decodeURIComponent(resolvedParams.categoryName || "");

  const studios = await getCategoryStudios(categoryStudio);

  return (
    <div className="min-h-screen bg-[#f7f7f5] py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button & Header */}
        <div className="space-y-3">
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-xl border-gray-200 text-gray-700 bg-white hover:bg-gray-50 cursor-pointer text-xs h-9 px-4"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-400/20 text-amber-800">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                  {categoryStudio}
                </h1>
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                Explore available creative spaces under {categoryStudio}.
              </p>
            </div>

            <span className="hidden sm:inline-block px-4 py-2 rounded-2xl bg-white border border-gray-100 shadow-xs text-sm font-bold text-gray-700">
              {studios.length} Spaces Found
            </span>
          </div>
        </div>

        {/* Studios Grid / Empty State */}
        {studios.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 space-y-4">
            <p className="text-gray-500 font-medium">
              No studios found in this category yet.
            </p>
            <Link href="/">
              <Button className="bg-[#111827] hover:bg-black text-white font-semibold rounded-xl text-sm h-11 px-6">
                Browse All Studios
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
