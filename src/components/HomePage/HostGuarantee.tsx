import { Card, CardContent } from "@/components/ui/card";

const guarantees = [
  {
    title: "Liability Protection",
    description: "Every booking is covered by host and creator terms.",
  },
  {
    title: "Verified Profiles",
    description: "Hosts and creators confirm their identity.",
  },
  {
    title: "Equipment Safety",
    description: "Gear checklists keep shoots and spaces safe.",
  },
  {
    title: "24/7 Host Support",
    description: "A real person is on call for any session.",
  },
];

export default function HostGuarantee() {
  return (
    <section className="bg-[#0b0f17] text-white py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Host Guarantee & Creator Support
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Every session is backed by the platform.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, index) => (
            <Card
              key={index}
              className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-lg hover:border-gray-700 transition-all duration-300"
            >
              <CardContent className="p-0 space-y-3">
                {/* Title with Accent Color */}
                <h3 className="text-lg font-bold text-[#f59e0b] tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
