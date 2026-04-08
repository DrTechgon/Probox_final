"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/* ─── Service data ─────────────────────────────────────────── */

const SERVICES = [
  {
    id: "ai",
    number: "01",
    title: "AI Solutions",
    description:
      "Predictive models and workflow automation that help teams move faster with confidence. We build intelligent systems tailored to your business needs.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    tint: "#efe8dd",
    accent: "#7a5a2e",
  },
  {
    id: "security",
    number: "02",
    title: "Cybersecurity",
    description:
      "Security-first protection across your infrastructure, users, and data. From threat detection to compliance, we keep your business safe.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    tint: "#e8e4f0",
    accent: "#5a4f8a",
  },
  {
    id: "managed-it",
    number: "03",
    title: "Managed IT",
    description:
      "Proactive IT operations so your team stays focused and productive. We handle monitoring, maintenance, and support end-to-end.",
    image: "/managed-it-abstract.svg",
    tint: "#e0ece5",
    accent: "#3d6b50",
  },
  {
    id: "iiot",
    number: "04",
    title: "IIOT Solutions",
    description:
      "Connected industrial systems built for real-time visibility, control, and uptime. Smart sensors and analytics that drive operational excellence.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    tint: "#ede7dc",
    accent: "#7a6330",
  },
  {
    id: "network",
    number: "05",
    title: "Network Mgmt",
    description:
      "Stable, secure connectivity managed end-to-end for peak performance. We design, deploy, and monitor networks that scale with your business.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    tint: "#e1e8f2",
    accent: "#3d5580",
  },
  {
    id: "cloud",
    number: "06",
    title: "Cloud Services",
    description:
      "Flexible cloud environments designed for growth, resilience, and speed. Migration, optimization, and management across all major platforms.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop",
    tint: "#f0e5e1",
    accent: "#8a4f3d",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Desktop strip ────────────────────────────────────────── */

function Strip({
  service,
  isActive,
  onActivate,
}: {
  service: (typeof SERVICES)[number];
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <div
      onMouseEnter={onActivate}
      className="relative cursor-pointer overflow-hidden rounded-[1.25rem]"
      style={{
        flex: isActive ? 5.5 : 1,
        transition: "flex 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        backgroundColor: service.tint,
      }}
    >
      {/* ── Background image (fades in when active) ── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isActive ? 1 : 0,
          transition: "opacity 500ms ease",
        }}
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 55vw, 0vw"
        />
        {/* Left gradient: solid tint → transparent for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, ${service.tint} 0%, ${service.tint}f2 20%, ${service.tint}99 38%, ${service.tint}33 52%, transparent 65%)`,
          }}
        />
        {/* Bottom gradient: extra readability for bottom text */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${service.tint}cc 0%, ${service.tint}66 18%, transparent 40%)`,
          }}
        />
      </div>

      {/* ── Collapsed content: vertical text ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-between py-8 px-1"
        style={{
          opacity: isActive ? 0 : 1,
          transition: "opacity 350ms ease",
          pointerEvents: isActive ? "none" : "auto",
        }}
      >
        <span
          className="text-[10px] font-mono tracking-[0.3em]"
          style={{ color: service.accent, opacity: 0.45 }}
        >
          {service.number}
        </span>

        <span
          className="font-display text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{
            writingMode: "vertical-rl",
            color: service.accent,
            opacity: 0.55,
          }}
        >
          {service.title}
        </span>

        <div
          className="h-8 w-px rounded-full"
          style={{ backgroundColor: service.accent, opacity: 0.12 }}
        />
      </div>

      {/* ── Expanded content ── */}
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={service.id}
            className="relative z-10 flex h-full flex-col justify-end p-8 lg:p-10 xl:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {/* Number + line */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
            >
              <span
                className="text-[11px] font-mono tracking-[0.3em]"
                style={{ color: service.accent, opacity: 0.5 }}
              >
                {service.number}
              </span>
              <div
                className="h-px w-10"
                style={{ backgroundColor: service.accent, opacity: 0.2 }}
              />
            </motion.div>

            {/* Title */}
            <motion.h3
              className="mt-3 max-w-xs font-display text-[2rem] font-bold leading-[1.1] tracking-tight lg:text-[2.5rem] xl:text-[2.75rem]"
              style={{ color: service.accent }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
            >
              {service.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="mt-3 max-w-sm text-[0.85rem] leading-relaxed lg:text-[0.925rem]"
              style={{ color: service.accent, opacity: 0.7 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
            >
              {service.description}
            </motion.p>

            {/* CTA */}
            <motion.a
              href="#"
              className="group/cta mt-5 inline-flex w-fit items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: service.accent }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, duration: 0.5, ease: EASE }}
            >
              Explore Service
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-300 group-hover/cta:scale-110"
                style={{ backgroundColor: `${service.accent}18` }}
              >
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:rotate-45"
                  strokeWidth={2.2}
                  style={{ color: service.accent }}
                />
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile strip (vertical accordion) ────────────────────── */

function MobileStrip({
  service,
  isActive,
  onActivate,
}: {
  service: (typeof SERVICES)[number];
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.div
      className="overflow-hidden rounded-2xl"
      style={{ backgroundColor: service.tint }}
      animate={{ height: isActive ? 420 : 64 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Header row — always visible */}
      <button
        onClick={onActivate}
        className="flex w-full items-center gap-4 px-5 py-4"
      >
        <span
          className="text-[10px] font-mono tracking-[0.3em]"
          style={{ color: service.accent, opacity: 0.45 }}
        >
          {service.number}
        </span>
        <span
          className="font-display text-sm font-bold tracking-tight"
          style={{ color: service.accent }}
        >
          {service.title}
        </span>

        <motion.div
          className="ml-auto"
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ color: service.accent, opacity: 0.4 }}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="px-5 pb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="90vw"
              />
            </div>

            {/* Description */}
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: service.accent, opacity: 0.75 }}
            >
              {service.description}
            </p>

            {/* CTA */}
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: service.accent }}
            >
              Explore Service
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                style={{ backgroundColor: `${service.accent}15` }}
              >
                <ArrowUpRight
                  className="h-3 w-3"
                  strokeWidth={2.2}
                  style={{ color: service.accent }}
                />
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main component ───────────────────────────────────────── */

export default function FilmstripAccordion() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Desktop: horizontal filmstrip */}
      <div className="hidden lg:flex h-[620px] gap-[5px]">
        {SERVICES.map((service, i) => (
          <Strip
            key={service.id}
            service={service}
            isActive={active === i}
            onActivate={() => setActive(i)}
          />
        ))}
      </div>

      {/* Mobile / Tablet: vertical accordion */}
      <div className="flex flex-col gap-2 lg:hidden">
        {SERVICES.map((service, i) => (
          <MobileStrip
            key={service.id}
            service={service}
            isActive={active === i}
            onActivate={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
