import StudioCard from "@/components/HomePage/StudioCard";

interface Studio {
  _id: string;
  title: string;
  category: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

export default async function FeaturedStudios() {
  const res = await fetch("http://localhost:8000/studios");
  const responseData = await res.json();

  const studioArray: Studio[] = responseData.data || [];

  const studios = [...studioArray]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <section className="py-16 px-6 lg:px-20 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            Featured Studios
          </h2>
        </div>

        {/* Studio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      </div>
    </section>
  );
}
