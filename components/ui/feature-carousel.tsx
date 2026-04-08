"use client";

import React from "react";
import { motion } from "motion/react";
import {
  GlobalSearchIcon,
  AiCloudIcon,
  SmartPhone01Icon,
  CheckmarkCircle01Icon,
  DashboardSquare01Icon,
  MagicWandIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight } from "lucide-react";
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtain,
} from "@/components/ui/card-curtain-reveal";

const FEATURES = [
  {
    id: "ai",
    label: "AI Solutions",
    icon: MagicWandIcon,
    mediaType: "image",
    mediaSrc:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800",
    description:
      "Predictive models and workflow automation that help teams move faster with confidence.",
  },
  {
    id: "security",
    label: "Cybersecurity",
    icon: CheckmarkCircle01Icon,
    mediaType: "video",
    mediaSrc: "/videos/cybersec.mp4",
    poster:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800",
    description:
      "Security-first protection across your infrastructure, users, and data.",
  },
  {
    id: "managed-it",
    label: "Managed IT Services",
    icon: DashboardSquare01Icon,
    mediaType: "image",
    mediaSrc: "/managed-it-abstract.svg",
    description:
      "Proactive IT operations so your team stays focused and productive.",
  },
  {
    id: "iiot",
    label: "IIOT Solutions",
    icon: SmartPhone01Icon,
    mediaType: "image",
    mediaSrc:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
    description:
      "Connected industrial systems built for real-time visibility, control, and uptime.",
  },
  {
    id: "network",
    label: "Network Management",
    icon: GlobalSearchIcon,
    mediaType: "image",
    mediaSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    description:
      "Stable, secure connectivity managed end-to-end for peak performance.",
  },
  {
    id: "cloud",
    label: "Cloud Services",
    icon: AiCloudIcon,
    mediaType: "image",
    mediaSrc:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800",
    description:
      "Flexible cloud environments designed for growth, resilience, and speed.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const WIDE_INDICES = new Set([0, 3, 4]);

export function FeatureCarousel() {
  return (
    <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {FEATURES.map((feature, index) => {
          const isWide = WIDE_INDICES.has(index);

          return (
            <motion.div
              key={feature.id}
              className={cn(isWide && "lg:col-span-2")}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: EASE,
              }}
            >
              <CardCurtainReveal className="group/card h-[500px] rounded-[1.75rem] sm:rounded-[2rem] border border-white/15 bg-[#c98545] text-white shadow-xl transition-shadow duration-500 cursor-pointer hover:shadow-2xl hover:shadow-[#8b5e2f]/25">
                <CardCurtainRevealBody
                  className={cn(
                    "flex flex-col relative z-10",
                    isWide && "lg:p-10"
                  )}
                >
                  {/* Number + Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-white/40 tracking-[0.25em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={cn(
                        "rounded-2xl bg-white/15 flex items-center justify-center border border-white/20",
                        isWide ? "h-12 w-12 lg:h-14 lg:w-14" : "h-11 w-11"
                      )}
                    >
                      <HugeiconsIcon
                        icon={feature.icon}
                        size={isWide ? 24 : 20}
                        strokeWidth={2}
                        className="text-white"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <CardCurtainRevealTitle
                    className={cn(
                      "mt-4 font-bold tracking-tight leading-[1.15]",
                      isWide
                        ? "text-[1.85rem] sm:text-[2.2rem] lg:text-[2.5rem]"
                        : "text-[1.65rem] sm:text-[1.85rem]"
                    )}
                  >
                    {feature.label}
                  </CardCurtainRevealTitle>

                  {/* Description + CTA */}
                  <CardCurtainRevealDescription className="mt-4">
                    <p
                      className={cn(
                        "text-white/75 leading-relaxed mb-5",
                        isWide
                          ? "text-sm sm:text-base lg:max-w-md"
                          : "text-[13px] sm:text-sm"
                      )}
                    >
                      {feature.description}
                    </p>
                    <span className="inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                      Learn More
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#c98545]">
                        <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                    </span>
                  </CardCurtainRevealDescription>

                  {/* Curtain overlay */}
                  <CardCurtain className="bg-white" />
                </CardCurtainRevealBody>

                {/* Footer image */}
                <CardCurtainRevealFooter
                  className={cn(
                    isWide
                      ? "h-[180px] sm:h-[200px]"
                      : "h-[160px] sm:h-[180px]"
                  )}
                >
                  {feature.mediaType === "video" ? (
                    <video
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={feature.poster}
                    >
                      <source src={feature.mediaSrc} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={feature.mediaSrc}
                      alt={feature.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </CardCurtainRevealFooter>
              </CardCurtainReveal>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default FeatureCarousel;
