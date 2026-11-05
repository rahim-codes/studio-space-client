import BookingWidget from "@/components/StudioDetails/BookingWidget";
import { MapPin, Star, Users } from "lucide-react";
import Image from "next/image";

interface Studio {
  _id: string;
  title: string;
  category: string;
  price: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  amenities: string[];
  description: string;
  hostName: string;
  hostEmail: string;
  rating?: number;
}

// Server-side data fetching
async function getStudio(id: string): Promise<Studio | null> {
  try {
    const res = await fetch(
      `https://studio-space-server-ten.vercel.app/studios/${id}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    console.log(data);
    return data.data || data;
  } catch (error) {
    console.error("Failed to fetch studio details:", error);
    return null;
  }
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StudioDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const studio = await getStudio(id);

  if (!studio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f5] dark:bg-[#0b0f17]">
        <p className="text-red-500 font-semibold">Studio not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] dark:bg-[#0b0f17] py-10 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left 2 Columns: Details & Gallery */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery Carousel / Images */}
          <div className="space-y-3">
            <div className="relative h-95 sm:h-112.5 w-full rounded-3xl overflow-hidden bg-muted shadow-sm">
              <Image
                src={
                  studio.image ||
                  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675"
                }
                alt={studio.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-lg">
                Gallery carousel – image 1 of 4
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((_, idx) => (
                <div
                  key={idx}
                  className="relative h-24 rounded-2xl overflow-hidden bg-muted cursor-pointer border hover:border-amber-500 transition-all"
                >
                  <Image
                    src={studio.image}
                    alt="thumbnail"
                    fill
                    sizes="25vw"
                    className="object-cover opacity-80 hover:opacity-100 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Category Badge */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-800 dark:text-amber-400 font-semibold text-xs tracking-wide">
              {studio.category}
            </span>
          </div>

          {/* Title & Meta Info */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {studio.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />{" "}
                {studio.location}, Dhaka
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" /> Up to{" "}
                {studio.maxCapacity} people
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-foreground font-semibold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />{" "}
                {studio.rating || 4.9}
              </span>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2 pt-2 border-t border-border">
            <h2 className="text-lg font-bold text-foreground">Overview</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {studio.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="space-y-3 pt-2 border-t border-border">
            <h2 className="text-lg font-bold text-foreground">Amenities</h2>
            <div className="flex flex-wrap gap-2.5">
              {studio.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full border border-border bg-card text-foreground text-xs font-medium shadow-2xs"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Host Info Card */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-2xs space-y-2">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Hosted by
            </p>
            <h3 className="text-base font-bold text-foreground">
              {studio.hostName}
            </h3>
            <p className="text-xs text-muted-foreground">{studio.hostEmail}</p>
          </div>

          {/* Reviews Section */}
          <div className="space-y-4 pt-2 border-t border-border">
            <h2 className="text-lg font-bold text-foreground">Reviews</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-card border border-border space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">
                    Alex Morgan
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{" "}
                    5.0
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Amazing space with great lighting and equipment!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Extracted Booking Widget Component */}
        <div className="lg:col-span-1">
          <div className="sticky top-10">
            <BookingWidget studio={studio} />
          </div>
        </div>
      </div>
    </div>
  );
}
