import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

export default function StudioCard({ studio }: { studio: Studio }) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
      {/* Top Banner / Image Area */}
      <div className="relative h-52 w-full bg-[#1e293b]">
        <Image
          src={studio.image}
          alt={studio.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-[#f59e0b] text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
          {studio.category}
        </span>
        {/* Rating Badge */}
        <span className="absolute top-3 right-3 bg-black/75 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
          ★ {studio.rating}
        </span>
      </div>

      {/* Bottom Content Area */}
      <CardContent className="p-5 space-y-4 bg-card">
        <div>
          <h3 className="text-lg font-bold text-foreground tracking-tight truncate">
            {studio.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">{studio.location}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-foreground font-extrabold text-base">
            ${studio.price}{" "}
            <span className="text-xs font-normal text-muted-foreground">/ hr</span>
          </div>
        </div>

        <Link
          href={`/studio-details/${studio._id}`}
          className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-lg transition-colors text-sm shadow"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}
