"use client";

import StudioCard from "@/components/HomePage/StudioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

export default function ExploreStudiosPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(studios);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [maxPrice, setMaxPrice] = useState("Any price");

  useEffect(() => {
    async function fetchStudios() {
      try {
        const res = await fetch(
          "https://studio-space-server-ten.vercel.app/studios",
        );
        if (!res.ok) {
          throw new Error("Failed to fetch studios");
        }
        const responseData = await res.json();
        const studioArray: Studio[] = responseData.data || [];
        console.log(studioArray);
        setStudios(studioArray);
      } catch (error) {
        console.error("Error fetching studios:", error);
        setStudios([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStudios();
  }, []);

  const filteredStudios = studios.filter((studio) => {
    const matchesSearch =
      studio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All categories" ||
      studio.category === selectedCategory;

    const matchesPrice =
      maxPrice === "Any price" || studio.price <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#f7f7f5] py-12 px-6 lg:px-20 dark:bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Explore Studios
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Search, filter and compare every available creative space.
          </p>
        </div>

        {/* Filters Section Bar */}
        <div className="bg-card p-6 rounded-3xl shadow-sm border border-border grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Search
            </label>
            <Input
              type="text"
              placeholder="Studio name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 rounded-xl text-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option>All categories</option>
              <option>Photo Studio</option>
              <option>Film Stage</option>
              <option>Podcast Lounge</option>
              <option>Music Suite</option>
              <option>Workshop</option>
            </select>
          </div>

          {/* Max Hourly Rate Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Max hourly rate
            </label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option>Any price</option>
              <option value="40">Under $40</option>
              <option value="60">Under $60</option>
              <option value="100">Under $100</option>
              <option value="150">Under $150</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <Button
            onClick={() => {}}
            className="w-full h-11 bg-[#f59e0b] hover:bg-[#d97706] text-black font-semibold rounded-xl text-sm transition-all shadow-none"
          >
            Apply Filters
          </Button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-muted-foreground">
            Loading studios from database...
          </div>
        ) : filteredStudios.length > 0 ? (
          /* Studios Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 text-muted-foreground bg-card rounded-3xl border border-border shadow-sm">
            <p className="text-lg font-semibold text-foreground">
              No studios found
            </p>
            <p className="text-sm mt-1">
              No studios match your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
