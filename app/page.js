import HeroCarousel from "@/components/HeroCarousel";
import Services from "@/components/Services";
import WhyChooseProbox from "@/components/WhyChooseProbox";
import Careers from "@/components/Careers";
import PageBackground from "@/components/PageBackground";

export default function Home() {
  return (
    <main className="relative">
      <PageBackground />
      <div className="relative z-10">
        <HeroCarousel />
        <Services />
        <WhyChooseProbox />
        <Careers />
      </div>
    </main>
  );
}
