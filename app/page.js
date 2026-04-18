import ProboxHero from "@/components/ProboxHero";
import Services from "@/components/Services";
import WhyChooseProbox from "@/components/WhyChooseProbox";
import Careers from "@/components/Careers";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import SectionDivider from "@/components/ui/section-divider";
import Spotlight from "@/components/ui/spotlight";
import StatsGlobe from "@/components/StatsGlobe";
import VelocityMarquee from "@/components/ui/velocity-marquee";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export default function Home() {
  return (
    <main className="relative">
      <PageBackground />
      <div className="relative z-10">
        <ProboxHero />

        <VelocityMarquee
          items={[
            "Engineered.",
            "Secured.",
            "Scaled.",
            "Intelligent.",
            "Observed.",
            "Shipped.",
          ]}
          accentIndexes={[1, 3, 5]}
        />

        <SectionDivider
          chapter="01"
          label="What We Do"
          tagline="Services that compound"
        />
        <Spotlight>
          <Services />
        </Spotlight>

        <SectionDivider
          chapter="02"
          label="Why Probox"
          tagline="The difference, engineered"
        />
        <Spotlight color="rgba(56, 189, 248, 0.15)">
          <WhyChooseProbox />
        </Spotlight>

        <SectionDivider
          chapter="03"
          label="Testimonials"
          tagline="Loved by teams that ship"
        />
        <StaggerTestimonials />

        <SectionDivider
          chapter="04"
          label="Global Footprint"
          tagline="Shipping across continents"
        />
        <StatsGlobe />

        <SectionDivider
          chapter="05"
          label="Careers"
          tagline="Build the future with us"
        />
        <Careers />

        <Footer />
      </div>
    </main>
  );
}
