import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// Category Data Array
const categories = [
  {
    id: 1,
    title: "Photo Studio",
    subtitle: "Browse spaces",
    image: "/images/photo-studios.jpg",
    href: `/category/${encodeURIComponent("Photo Studio")}`,
  },
  {
    id: 2,
    title: "Film Stage",
    subtitle: "Browse spaces",
    image: "/images/sound-stages.jpg",
    href: `/category/${encodeURIComponent("Film Stage")}`,
  },
  {
    id: 3,
    title: "Podcast Lounge",
    subtitle: "Browse spaces",
    image: "/images/podcast-rooms.jpg",
    href: `/category/${encodeURIComponent("Podcast Lounge")}`,
  },
  {
    id: 4,
    title: "Music Suite",
    subtitle: "Browse spaces",
    image: "/images/music-suites.jpg",
    href: `/category/${encodeURIComponent("Music Suite")}`,
  },
  {
    id: 5,
    title: "Workshop",
    subtitle: "Browse spaces",
    image: "/images/art-workshops.jpg",
    href: `/category/${encodeURIComponent("Workshop")}`,
  },
];

export default function StudioCategories() {
  return (
    <section className="bg-[#f7f7f5] py-16 px-6 lg:px-15 dark:bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Browse by Studio Category
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Pick a category and jump straight to matching spaces.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group block"
            >
              <Card className="relative h-60 sm:h-72 overflow-hidden rounded-2xl border-none shadow-md transition-all duration-300 group-hover:scale-[1.02]">
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark Overlay/Gradient for readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                {/* Card Content at bottom */}
                <CardContent className="absolute bottom-0 left-0 right-0 p-5 text-white z-10 space-y-1">
                  <h3 className="text-lg font-bold leading-snug">
                    {category.title}
                  </h3>
                  <p className="text-xs font-medium text-amber-400 group-hover:underline">
                    {category.subtitle}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
