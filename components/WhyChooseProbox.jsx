"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { Zap, BrainCircuit, ShieldCheck, Layers } from "lucide-react";

function ProboxWordmark() {
  return (
    <>
      <span className="sr-only">Probox</span>
      <span
        aria-hidden="true"
        className="relative inline-block h-[0.9em] w-[3.9em] overflow-hidden align-[-0.08em]"
      >
        <Image
          src="/brand/probox-logo-wordmark-transparent.png"
          alt=""
          width={953}
          height={266}
          className="absolute left-0 top-[-0.08em] h-[1.6em] w-auto max-w-none"
        />
      </span>
    </>
  );
}

/* ─── Feature data ─────────────────────────────────────────── */
const features = [
  {
    icon: Zap,
    title: "Performance First",
    description:
      "Every millisecond matters. We engineer systems optimised at the infrastructure level — from edge-cached APIs to zero-bloat frontends — so your products load instantly and scale without friction.",
    accent: "from-sky-400 to-blue-500",
    glowColor: "rgba(56,189,248,0.10)",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
    borderAccent: "border-sky-200/60",
  },
  {
    icon: BrainCircuit,
    title: "AI-Driven Systems",
    description:
      "We embed intelligence where it counts — predictive analytics, NLP pipelines, and computer vision modules that transform raw data into real-time decisions, not just dashboards.",
    accent: "from-violet-400 to-purple-500",
    glowColor: "rgba(139,92,246,0.10)",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    borderAccent: "border-violet-200/60",
  },
  {
    icon: ShieldCheck,
    title: "Security by Design",
    description:
      "Security isn't a patch — it's the foundation. Every system we build is hardened with zero-trust architecture, end-to-end encryption, and continuous threat monitoring baked into the CI/CD pipeline.",
    accent: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52,211,153,0.10)",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    borderAccent: "border-emerald-200/60",
  },
  {
    icon: Layers,
    title: "Built to Scale",
    description:
      "From startup MVPs to enterprise deployments handling millions of requests — our architectures grow with you. Microservices, auto-scaling infrastructure, and event-driven design ensure you never hit a ceiling.",
    accent: "from-amber-400 to-orange-500",
    glowColor: "rgba(251,191,36,0.10)",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    borderAccent: "border-amber-200/60",
  },
];

const EASE = [0.22, 1, 0.36, 1];

/* ─── Feature Card ─────────────────────────────────────────── */
function FeatureCard({ feature, index, activeIndex }) {
  const isActive = index === activeIndex;
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="group relative"
    >
      <motion.div
        animate={{
          scale: isActive ? 1 : 0.97,
          opacity: isActive ? 1 : 0.55,
        }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`relative overflow-hidden rounded-3xl border bg-white/80 backdrop-blur-sm p-8 md:p-10 transition-shadow duration-500 ${
          isActive
            ? `shadow-[0_8px_40px_rgba(15,23,42,0.06)] ${feature.borderAccent}`
            : "border-slate-200/50 shadow-none"
        } hover:shadow-[0_12px_48px_rgba(15,23,42,0.08)] hover:-translate-y-0.5`}
      >
        {/* Active glow backdrop */}
        <motion.div
          className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full blur-3xl"
          animate={{
            opacity: isActive ? 0.6 : 0,
            scale: isActive ? 1 : 0.5,
          }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ background: feature.glowColor }}
        />

        <div className="relative z-10">
          {/* Number badge + Icon row */}
          <div className="mb-6 flex items-center gap-4">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${feature.iconBg} transition-all duration-300 group-hover:scale-105`}
            >
              <Icon className={`h-6 w-6 ${feature.iconColor}`} strokeWidth={1.6} />
            </div>
            <span className="font-display text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
              0{index + 1}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200/80 to-transparent" />
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="mt-3 max-w-md text-[0.925rem] leading-relaxed text-slate-500">
            {feature.description}
          </p>

          {/* Bottom accent line */}
          <motion.div
            className={`mt-6 h-[2px] rounded-full bg-gradient-to-r ${feature.accent}`}
            animate={{ width: isActive ? "4rem" : "2rem" }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Scroll Progress Indicator ────────────────────────────── */
function ScrollProgress({ progress }) {
  const scaleY = useSpring(progress, { stiffness: 120, damping: 30 });

  return (
    <div className="absolute left-0 top-0 hidden h-full w-px md:block">
      {/* Track */}
      <div className="absolute inset-0 w-px bg-slate-200/60" />
      {/* Fill */}
      <motion.div
        className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-blue-400 via-violet-400 to-amber-400"
        style={{ scaleY, height: "100%" }}
      />
      {/* Active dot */}
      <motion.div
        className="absolute left-[-3px] h-[7px] w-[7px] rounded-full bg-slate-800 shadow-[0_0_8px_rgba(15,23,42,0.3)]"
        style={{ top: useTransform(scaleY, [0, 1], ["0%", "100%"]) }}
      />
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────── */
export default function WhyChooseProbox() {
  const sectionRef = useRef(null);
  const rightColRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* Scroll tracking for the right column */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Determine active card based on scroll position */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const segmentSize = 1 / features.length;
    const index = Math.min(
      Math.floor(latest / segmentSize),
      features.length - 1
    );
    setActiveIndex(index);
  });

  return (
    <section
      ref={sectionRef}
      id="why-probox"
      className="relative py-24 md:py-32 md:pb-48"
    >

      {/* ── Dynamic glow following active card ── */}
      {features.map((feature, i) => (
        <motion.div
          key={`glow-${i}`}
          className="pointer-events-none absolute right-20 h-72 w-72 rounded-full blur-[100px] md:right-40"
          animate={{
            opacity: activeIndex === i ? 0.7 : 0,
            y: `${i * 25}%`,
          }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            background: feature.glowColor,
            top: `${15 + i * 18}%`,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* ── Desktop: Two-column sticky layout ── */}
        <div className="hidden md:flex md:items-start md:gap-16 lg:gap-20">
          {/* LEFT — Sticky heading */}
          <div className="sticky top-[100px] w-1/2 lg:w-[41.666%] shrink-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {/* Label */}
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-400 shadow-sm">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c98545]" />
                  Why Probox
                </span>

                {/* Main heading */}
                <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 lg:text-5xl xl:text-[3.25rem]">
                  Why Choose <ProboxWordmark />
                </h2>

                {/* Description */}
                <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-slate-500">
                  We don&apos;t just build technology — we engineer competitive advantages that compound over time.
                </p>
              </motion.div>

              {/* Scroll progress indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12 flex items-center gap-3"
              >
                {features.map((f, i) => (
                  <motion.button
                    key={i}
                    className="group flex items-center gap-2"
                    animate={{
                      opacity: activeIndex === i ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`h-1 rounded-full bg-gradient-to-r ${f.accent}`}
                      animate={{
                        width: activeIndex === i ? "2rem" : "0.5rem",
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  </motion.button>
                ))}
              </motion.div>

              {/* Active feature label */}
              <motion.p
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="mt-4 text-xs font-medium uppercase tracking-[0.15em] text-slate-400"
              >
                {features[activeIndex].title}
              </motion.p>
            </div>

          {/* RIGHT — Feature cards with scroll progress */}
          <div ref={rightColRef} className="relative w-1/2 lg:w-[58.333%] pl-8">
            {/* Vertical progress line */}
            <ScrollProgress progress={scrollYProgress} />

            {/* Cards */}
            <div className="flex flex-col gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  activeIndex={activeIndex}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile: Stacked layout ── */}
        <div className="md:hidden">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10 text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-slate-400 shadow-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c98545]" />
              Why Probox
            </span>

            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-900">
              Why Choose <ProboxWordmark />
            </h2>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              We don&apos;t just build technology — we engineer competitive advantages that compound over time.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: EASE,
                  }}
                  className={`group relative overflow-hidden rounded-2xl border bg-white/80 backdrop-blur-sm p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] ${feature.borderAccent}`}
                >
                  {/* Glow */}
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-40 blur-3xl"
                    style={{ background: feature.glowColor }}
                  />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${feature.iconBg}`}
                      >
                        <Icon
                          className={`h-5 w-5 ${feature.iconColor}`}
                          strokeWidth={1.6}
                        />
                      </div>
                      <span className="font-display text-[0.65rem] font-medium uppercase tracking-[0.2em] text-slate-300">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold tracking-tight text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {feature.description}
                    </p>

                    <div
                      className={`mt-4 h-[2px] w-10 rounded-full bg-gradient-to-r ${feature.accent}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
