import "./studio.css";
import StudioShell from "@/components/studio/StudioShell";
import StudioHero from "@/components/studio/StudioHero";
import StudioPositioning from "@/components/studio/StudioPositioning";
import StudioServices from "@/components/studio/StudioServices";
import StudioWhy from "@/components/studio/StudioWhy";
import StudioProcess from "@/components/studio/StudioProcess";
import StudioImpact from "@/components/studio/StudioImpact";
import StudioCTA from "@/components/studio/StudioCTA";
import StudioFooter from "@/components/studio/StudioFooter";

export const metadata = {
  title: "Probox / Studio — A quiet practice for systems that must hold",
  description:
    "An alternate landing concept for Probox Infotech. Five materials, one quiet system: intelligence, security, data, cloud, and engineering shaped like precise matter.",
};

export default function StudioPage() {
  return (
    <StudioShell>
      <StudioHero />
      <StudioPositioning />
      <StudioServices />
      <StudioWhy />
      <StudioProcess />
      <StudioImpact />
      <StudioCTA />
      <StudioFooter />
    </StudioShell>
  );
}
