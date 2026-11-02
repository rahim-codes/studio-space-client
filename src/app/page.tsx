import FeaturedStudios from "@/components/HomePage/FeaturedStudios";
import HeroSlider from "@/components/HomePage/HeroSlider";
import HostGuarantee from "@/components/HomePage/HostGuarantee";
import HowBookingWorks from "@/components/HomePage/HowBookingWorks";
import StudioCategories from "@/components/HomePage/StudioCategory";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <StudioCategories />
      <FeaturedStudios />
      <HowBookingWorks />
      <HostGuarantee />
    </div>
  );
}
