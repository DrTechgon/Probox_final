"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { aiServices, EASE, ACCENT } from "./data";

/* ── Animation variants ── */
const previewVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: EASE, staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as const },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: EASE },
  },
};

const tagContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const tagItem = {
  initial: { opacity: 0, scale: 0.9, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
};

/* ── Service list item ── */
function ServiceTab({
  service,
  isActive,
  onHover,
  onTap,
  index,
}: {
  service: (typeof aiServices)[number];
  isActive: boolean;
  onHover: (i: number) => void;
  onTap: (i: number) => void;
  index: number;
}) {
  const Icon = service.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(index)}
      onClick={() => onTap(index)}
      className={`group relative flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 ease-out ${
        isActive
          ? "border-slate-300 bg-white shadow-[0_4px_24px_rgba(201,133,69,0.05)]"
          : "border-transparent bg-transparent hover:bg-white/60"
      }`}
      whileTap={{ scale: 0.985 }}
    >
      {/* Spotlight glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(180px circle at ${mouseX}px ${mouseY}px, rgba(201,133,69,0.08), transparent 80%)
          `,
        }}
      />

      {/* Active accent bar */}
      <motion.div
        className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-[#c98545]"
        initial={false}
        animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.3, ease: EASE }}
      />

      {/* Icon */}
      <div
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-[#c98545]/10 text-[#c98545]"
            : "bg-slate-100 text-slate-400 group-hover:bg-[#c98545]/5 group-hover:text-slate-600"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>

      {/* Title */}
      <span
        className={`relative z-10 text-[0.95rem] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
          isActive
            ? "text-slate-900"
            : "text-slate-500 group-hover:text-slate-700"
        }`}
      >
        {service.title}
      </span>

      {/* Arrow */}
      <ArrowUpRight
        className={`relative z-10 ml-auto h-4 w-4 shrink-0 transition-all duration-300 ${
          isActive
            ? "translate-x-0 text-[#c98545] opacity-100"
            : "-translate-x-1 text-slate-300 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
        }`}
        strokeWidth={2}
      />
    </motion.button>
  );
}

/* ── 3D Tilt Card ── */
function TiltCard({
  children,
  bgGradient,
}: {
  children: React.ReactNode;
  bgGradient: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5 - rect.left / rect.width);
    y.set(e.clientY / rect.height - 0.5 - rect.top / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative z-10 flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_8px_40px_rgba(15,23,42,0.04)] lg:p-10"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-30`}
      />
      <motion.div
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10 flex h-full flex-col"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Preview panel ── */
function PreviewPanel({
  service,
}: {
  service: (typeof aiServices)[number];
}) {
  const Icon = service.icon;

  return (
    <motion.div
      key={service.id}
      variants={previewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex h-full flex-col"
    >
      <motion.div variants={staggerItem} className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c98545]/10 shadow-[inset_0_0_12px_rgba(201,133,69,0.1)]">
          <Icon className="h-7 w-7 text-[#c98545]" strokeWidth={1.6} />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#c98545]/20 to-transparent" />
      </motion.div>

      <motion.h3
        variants={staggerItem}
        className="text-2xl font-bold tracking-[-0.02em] text-slate-900 md:text-3xl"
      >
        {service.title}
      </motion.h3>

      <motion.p
        variants={staggerItem}
        className={`mt-2 text-base font-medium ${service.accentText}`}
      >
        {service.brief}
      </motion.p>

      <motion.p
        variants={staggerItem}
        className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-slate-500"
      >
        {service.description}
      </motion.p>

      <motion.div
        className="mt-6 flex flex-wrap gap-2"
        variants={tagContainer}
        initial="initial"
        animate="animate"
      >
        {service.capabilities.map((cap) => (
          <motion.span
            key={cap}
            variants={tagItem}
            className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-slate-600 shadow-sm backdrop-blur-sm"
          >
            {cap}
          </motion.span>
        ))}
      </motion.div>

      <motion.div variants={staggerItem} className="mt-auto pt-8">
        <a
          href="#"
          className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#d79a5d] bg-[#c98545] px-6 py-3 text-sm font-semibold text-[#0f2145] shadow-[0_12px_28px_rgba(201,133,69,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(201,133,69,0.30)]"
        >
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
          <span className="relative z-10">Explore This Service</span>
          <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#8a531f] transition duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
}

/* ── Mobile accordion item ── */
function MobileAccordionItem({
  service,
  isActive,
  onTap,
  index,
}: {
  service: (typeof aiServices)[number];
  isActive: boolean;
  onTap: (i: number) => void;
  index: number;
}) {
  const Icon = service.icon;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => onTap(index)}
        className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-300 ${
          isActive ? "bg-gradient-to-r from-[#c98545]/5 to-transparent" : ""
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
            isActive
              ? "bg-[#c98545]/10 text-[#c98545]"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <span
          className={`text-sm font-semibold transition-colors duration-300 ${
            isActive ? "text-slate-900" : "text-slate-600"
          }`}
        >
          {service.title}
        </span>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="ml-auto"
        >
          <svg
            className="h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-slate-100 px-5 pb-5 pt-4">
              <p
                className={`text-sm font-medium ${service.accentText}`}
              >
                {service.brief}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                {service.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] font-medium text-slate-500 shadow-sm"
                  >
                    {cap}
                  </span>
                ))}
              </div>
              <a
                href="#"
                className="group mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#d79a5d] bg-[#c98545] px-5 py-2.5 text-xs font-semibold text-[#0f2145] shadow-[0_10px_24px_rgba(201,133,69,0.22)] transition-all duration-300 hover:bg-[#b87435]"
              >
                <span>Learn More</span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-[#8a531f] transition duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.2} />
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main section ── */
export default function AICapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActive, setMobileActive] = useState<number | null>(null);

  const activeService = aiServices[activeIndex];

  const handleMobileTap = (index: number) => {
    setMobileActive((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 text-slate-900 md:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.12),_transparent_52%)]" />

      {/* Dynamic glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService.id + "-glow"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`pointer-events-none absolute -right-40 top-40 h-80 w-80 rounded-full blur-3xl ${activeService.glowColor}`}
        />
      </AnimatePresence>

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
              AI Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-display text-4xl font-bold tracking-tight md:text-6xl"
          >
            What We Build
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
          >
            Six core disciplines. One integrated approach to building AI that
            delivers real business value.
          </motion.p>
        </div>

        {/* Desktop: Split panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="hidden md:block"
        >
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 lg:gap-8 perspective-[2000px]">
            {/* Left — Service tabs */}
            <div className="relative z-20 flex flex-col gap-1.5 rounded-3xl border border-slate-200/70 bg-white/50 p-3 shadow-[0_8px_40px_rgba(15,23,42,0.04)] backdrop-blur-sm">
              {aiServices.map((service, index) => (
                <ServiceTab
                  key={service.id}
                  service={service}
                  isActive={index === activeIndex}
                  onHover={setActiveIndex}
                  onTap={setActiveIndex}
                  index={index}
                />
              ))}
            </div>

            {/* Right — 3D preview */}
            <TiltCard
              bgGradient={`${activeService.colorFrom} ${activeService.colorTo}`}
            >
              <AnimatePresence mode="wait">
                <PreviewPanel key={activeService.id} service={activeService} />
              </AnimatePresence>
            </TiltCard>
          </div>
        </motion.div>

        {/* Mobile: Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-10 flex flex-col gap-3 md:hidden"
        >
          {aiServices.map((service, index) => (
            <MobileAccordionItem
              key={service.id}
              service={service}
              isActive={mobileActive === index}
              onTap={handleMobileTap}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
