import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    stepNumber: "1",
    title: "Discover Spaces",
    description: "Filter by category, city and amenities.",
  },
  {
    stepNumber: "2",
    title: "Select Shoot Hours",
    description: "Check live availability and pick your slot.",
  },
  {
    stepNumber: "3",
    title: "Book Instantly",
    description: "Transparent pricing, no hidden fees.",
  },
  {
    stepNumber: "4",
    title: "Create & Produce",
    description: "Show up, set up, and make your work.",
  },
];

export default function HowBookingWorks() {
  return (
    <section className="py-16 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
            How Booking Works
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            From idea to shoot day in four steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <Card
              key={item.stepNumber}
              className="bg-[#f9fafb] border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-0 space-y-4">
                {/* Number Badge */}
                <div className="w-10 h-10 rounded-full bg-[#f59e0b] text-black font-bold flex items-center justify-center text-base shadow-sm">
                  {item.stepNumber}
                </div>

                {/* Text Content */}
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-gray-950 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
