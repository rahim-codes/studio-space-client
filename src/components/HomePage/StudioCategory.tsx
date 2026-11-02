import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Category Data Array
const categories = [
  {
    id: 1,
    title: "Photo Studios",
    subtitle: "Browse spaces",
    image: "/images/photo-studios.jpg", // public folder er image path
    href: "#",
  },
  {
    id: 2,
    title: "Sound Stages",
    subtitle: "Browse spaces",
    image: "/images/sound-stages.jpg",
    href: "#",
  },
  {
    id: 3,
    title: "Podcast Rooms",
    subtitle: "Browse spaces",
    image: "/images/podcast-rooms.jpg",
    href: "#",
  },
  {
    id: 4,
    title: "Music Suites",
    subtitle: "Browse spaces",
    image: "/images/music-suites.jpg",
    href: "#",
  },
  {
    id: 5,
    title: "Art Workshops",
    subtitle: "Browse spaces",
    image: "/images/art-workshops.jpg",
    href: "#",
  },
];

export default function StudioCategories() {
  return (
    <section className="bg-[#f7f7f5] py-16 px-6 lg:px-15">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Browse by Studio Category
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Pick a category and jump straight to matching spaces.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <a key={category.id} href={category.href} className="group block">
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
