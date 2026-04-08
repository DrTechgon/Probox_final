import AIHero from "@/components/AI_hero";
import AICapabilities from "@/components/ai-services/ai-capabilities";
import AIUseCases from "@/components/ai-services/ai-use-cases";
import AIProcess from "@/components/ai-services/ai-process";
import AIDifferentiators from "@/components/ai-services/ai-differentiators";
import NeuralMesh from "@/components/ai-services/neural-mesh";
import AICTA from "@/components/ai-services/ai-cta";

export const metadata = {
  title: "AI Services | Probox",
  description:
    "Enterprise AI solutions — predictive analytics, generative AI, workflow automation, computer vision, and strategic consulting.",
};

export default function AIServicesV2Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <AIHero />
      <AICapabilities />
      <AIUseCases />
      <AIProcess />
      <AIDifferentiators />
      <NeuralMesh />
      <AICTA />
    </main>
  );
}
