"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { processSteps, EASE } from "./data";

/* ── Desktop step node ── */
function StepNode({
  step,
  index,
  isActive,
  isPast,
}: {
  step: (typeof processSteps)[number];
  index: number;
  isActive: boolean;
  isPast: boolean;
}) {
  const Icon = step.icon;

  return (
    <div className="group flex flex-1 flex-col items-center text-center">
      {/* Circle */}
      <motion.div
        className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
          isActive
            ? "border-[#c98545] bg-[#c98545] text-white shadow-[0_8px_24px_rgba(201,133,69,0.3)]"
            : isPast
              ? "border-[#c98545]/40 bg-[#c98545]/10 text-[#c98545]"
              : "border-slate-200 bg-white text-slate-400"
        }`}
        animate={{
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </motion.div>

      {/* Step number */}
      <motion.span
        className="mt-4 font-display text-[0.65rem] font-medium uppercase tracking-[0.2em] text-slate-300"
        animate={{ color: isActive ? "#c98545" : undefined }}
        transition={{ duration: 0.3 }}
      >
        Step {step.number}
      </motion.span>

      {/* Title */}
      <motion.h3
        className="mt-1.5 font-display text-base font-bold tracking-tight text-slate-900"
        animate={{ opacity: isActive || isPast ? 1 : 0.5 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {step.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="mx-auto mt-2 max-w-[180px] text-[0.8rem] leading-relaxed text-slate-500"
        animate={{ opacity: isActive ? 1 : 0.4 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {step.description}
      </motion.p>
    </div>
  );
}

/* ── Mobile timeline item ── */
function MobileTimelineItem({
  step,
  index,
  total,
}: {
  step: (typeof processSteps)[number];
  index: number;
  total: number;
}) {
  const Icon = step.icon;
  const isLast = index === total - 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="relative flex gap-5 pb-10"
    >
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#c98545] bg-[#c98545]/10 text-[#c98545]">
          <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
        </div>
        {!isLast && (
          <div className="mt-2 h-full w-px bg-gradient-to-b from-[#c98545]/30 to-slate-200/40" />
        )}
      </div>

      {/* Content */}
      <div className="pt-1.5">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#c98545]">
          Step {step.number}
        </span>
        <h3 className="mt-1 font-display text-base font-bold tracking-tight text-slate-900">
          {step.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function AIProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.7", "end 0.5"],
  });

  /* Map scroll progress to active step */
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const segmentSize = 1 / processSteps.length;
    const index = Math.min(
      Math.floor(latest / segmentSize),
      processSteps.length - 1
    );
    setActiveStep(Math.max(0, index));
  });

  /* Animated line progress */
  const lineProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24rem] bg-[radial-gradient(circle_at_bottom,_rgba(148,163,184,0.08),_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Section header */}
        <div className="mb-14 text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-400 shadow-sm">
              Our Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-display text-4xl font-bold tracking-tight md:text-6xl"
          >
            From Concept to Production
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
          >
            A proven five-stage methodology that turns AI potential into deployed
            value.
          </motion.p>
        </div>

        {/* Desktop: Horizontal stepper */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="hidden md:block"
        >
          <div className="relative">
            {/* Background line */}
            <div className="absolute left-[10%] right-[10%] top-[28px] h-[2px] bg-slate-200/60" />
            {/* Animated progress line */}
            <motion.div
              className="absolute left-[10%] top-[28px] h-[2px] bg-gradient-to-r from-[#c98545] to-[#c98545]/60"
              style={{ width: lineProgress }}
            />

            {/* Step nodes */}
            <div className="relative flex">
              {processSteps.map((step, index) => (
                <StepNode
                  key={step.number}
                  step={step}
                  index={index}
                  isActive={activeStep === index}
                  isPast={index < activeStep}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden">
          {processSteps.map((step, index) => (
            <MobileTimelineItem
              key={step.number}
              step={step}
              index={index}
              total={processSteps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
