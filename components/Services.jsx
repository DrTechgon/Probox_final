"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Cpu,
  ShieldCheck,
  ServerCog,
  Cloud,
  BrainCircuit,
  Network,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    id: "ai",
    icon: BrainCircuit,
    title: "AI",
    brief: "Intelligent systems that automate, predict, and accelerate decisions.",
    description:
      "We build practical AI solutions that turn business data into action, from predictive models and smart assistants to workflow automation and insight engines that help teams move faster with confidence.",
    highlights: ["Predictive Models", "Workflow Automation", "Insight Engines"],
    colorFrom: "from-purple-500/10",
    colorTo: "to-fuchsia-500/10",
    glowColor: "bg-purple-500/[0.04]",
    accentText: "text-fuchsia-500",
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Cybersecurity Services",
    brief: "Security-first protection across your infrastructure, users, and data.",
    description:
      "From continuous monitoring and risk assessments to endpoint protection and access control, our cybersecurity services help you stay resilient against modern threats while maintaining compliance and business continuity.",
    highlights: ["Threat Monitoring", "Access Control", "Risk Assessments"],
    colorFrom: "from-emerald-500/10",
    colorTo: "to-teal-500/10",
    glowColor: "bg-teal-500/[0.04]",
    accentText: "text-teal-500",
  },
  {
    id: "managed-it",
    icon: ServerCog,
    title: "Managed IT Services",
    brief: "Reliable day-to-day IT operations backed by proactive support.",
    description:
      "We manage the systems behind your business with proactive maintenance, device monitoring, user support, patching, and performance oversight so your team can stay productive without firefighting IT issues.",
    highlights: ["Proactive Support", "Device Monitoring", "Patch Management"],
    colorFrom: "from-blue-500/10",
    colorTo: "to-indigo-500/10",
    glowColor: "bg-blue-500/[0.04]",
    accentText: "text-blue-500",
  },
  {
    id: "iiot",
    icon: Cpu,
    title: "IIOT Solutions",
    brief: "Connected industrial systems built for visibility, control, and uptime.",
    description:
      "We design and deploy IIOT environments that connect machines, sensors, and operations into one intelligent ecosystem, giving you real-time monitoring, predictive maintenance, and better control across the factory floor.",
    highlights: ["Smart Sensor Networks", "Real-Time Monitoring", "Predictive Maintenance"],
    colorFrom: "from-amber-500/10",
    colorTo: "to-orange-500/10",
    glowColor: "bg-orange-500/[0.04]",
    accentText: "text-orange-500",
  },
  {
    id: "network",
    icon: Network,
    title: "Network Management",
    brief: "Stable, secure connectivity managed for performance and uptime.",
    description:
      "We oversee your network environment end to end, from configuration and optimisation to monitoring and troubleshooting, ensuring your users, offices, and devices stay connected with minimal disruption.",
    highlights: ["Network Monitoring", "Performance Optimisation", "Issue Resolution"],
    colorFrom: "from-rose-500/10",
    colorTo: "to-pink-500/10",
    glowColor: "bg-rose-500/[0.04]",
    accentText: "text-rose-500",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Services",
    brief: "Flexible cloud environments designed for growth, resilience, and speed.",
    description:
      "Our cloud services cover migration, deployment, optimisation, and ongoing infrastructure support so you can scale securely, reduce operational friction, and make better use of modern cloud platforms.",
    highlights: ["Cloud Migration", "Serverless Architecture", "DevOps Pipelines"],
    colorFrom: "from-sky-500/10",
    colorTo: "to-cyan-500/10",
    glowColor: "bg-sky-500/[0.04]",
    accentText: "text-cyan-500",
  },
];

const EASE = [0.22, 1, 0.36, 1];

/* ── Preview panel animation variants ── */
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
    transition: { duration: 0.25, ease: "easeIn" },
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

const tagStaggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const tagStaggerItem = {
  initial: { opacity: 0, scale: 0.9, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

/* ── Service list item ── */
function ServiceItem({ service, isActive, onHover, onTap, index }) {
  const Icon = service.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
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
      {/* Hover Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              180px circle at ${mouseX}px ${mouseY}px,
              rgba(201,133,69,0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Active accent bar */}
      <motion.div
        className="absolute left-0 top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full bg-[#c98545]"
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          scaleY: isActive ? 1 : 0.3,
        }}
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
          isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"
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

/* ── Interactive 3D Card Wrapper ── */
function TiltCard({ children, bgGradient }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative z-10 flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_8px_40px_rgba(15,23,42,0.04)] lg:p-10"
    >
      {/* Background dynamic gradient layer */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-30`} />

      {/* Interactive hover glare */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${(x.get() + 0.5) * 100}% ${(y.get() + 0.5) * 100}%,
              rgba(255,255,255,0.8),
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Content wrapper with translateZ for parallax pop */}
      <motion.div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex h-full flex-col">
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ── Preview panel ── */
function PreviewPanel({ service }) {
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
      {/* Decorative icon */}
      <motion.div variants={staggerItem} className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c98545]/10 shadow-[inset_0_0_12px_rgba(201,133,69,0.1)]">
          <Icon className="h-7 w-7 text-[#c98545]" strokeWidth={1.6} />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#c98545]/20 to-transparent" />
      </motion.div>

      {/* Title */}
      <motion.h3
        variants={staggerItem}
        className="text-2xl font-bold tracking-[-0.02em] text-slate-900 md:text-3xl"
      >
        {service.title}
      </motion.h3>

      {/* Brief */}
      <motion.p variants={staggerItem} className={`mt-2 text-base font-medium ${service.accentText || "text-[#c98545]/80"}`}>
        {service.brief}
      </motion.p>

      {/* Description */}
      <motion.p
        variants={staggerItem}
        className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-slate-500"
      >
        {service.description}
      </motion.p>

      {/* Highlights */}
      <motion.div
        className="mt-6 flex flex-wrap gap-2"
        variants={tagStaggerContainer}
        initial="initial"
        animate="animate"
      >
        {service.highlights.map((tag) => (
          <motion.span
            key={tag}
            variants={tagStaggerItem}
            className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-slate-600 shadow-sm backdrop-blur-sm"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div variants={staggerItem} className="mt-auto pt-8">
        <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#d79a5d] bg-[#c98545] px-6 py-3 text-sm font-semibold text-[#0f2145] shadow-[0_12px_28px_rgba(201,133,69,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(201,133,69,0.30)]">
          <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
          <span className="relative z-10">Learn More</span>
          <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#8a531f] transition duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Mobile service accordion item ── */
function MobileServiceItem({ service, isActive, onTap, index }) {
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
            isActive ? "bg-[#c98545]/10 text-[#c98545]" : "bg-slate-100 text-slate-400"
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
              <p className={`text-sm font-medium ${service.accentText || "text-[#c98545]/80"}`}>
                {service.brief}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{service.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.7rem] font-medium text-slate-500 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="group mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#d79a5d] bg-[#c98545] px-5 py-2.5 text-xs font-semibold text-[#0f2145] shadow-[0_10px_24px_rgba(201,133,69,0.22)] transition-all duration-300 hover:bg-[#b87435]">
                <span>Learn More</span>
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/80 text-[#8a531f] transition duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-3 w-3" strokeWidth={2.2} />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main section ── */
export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActive, setMobileActive] = useState(null);

  const activeService = services[activeIndex];

  const handleMobileTap = (index) => {
    setMobileActive((prev) => (prev === index ? null : index));
  };

  return (
    <section id="services" className="relative bg-[#f8fafc] py-20 text-slate-900 md:py-28 overflow-hidden">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.16),_transparent_52%)]" />
      
      {/* Dynamic Glows behind the whole section tied to active service */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService.id + "-bgGlow1"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={`pointer-events-none absolute -right-40 top-40 h-80 w-80 rounded-full blur-3xl ${activeService.glowColor}`}
        />
        <motion.div
           key={activeService.id + "-bgGlow2"}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1 }}
           className={`pointer-events-none absolute -left-40 bottom-40 h-80 w-80 rounded-full blur-3xl bg-slate-300/[0.2]`}
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
              Our Services
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="text-4xl font-bold tracking-tight md:text-6xl"
          >
            <span className="inline-flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2">
              <span>What</span>
              <span className="sr-only">Probox</span>
              <span
                aria-hidden="true"
                className="relative inline-block h-[0.76em] w-[3.42em] overflow-hidden align-[-0.05em]"
              >
                <Image
                  src="/brand/probox-logo-wordmark-transparent.png"
                  alt=""
                  width={953}
                  height={266}
                  className="absolute left-0 top-[-0.16em] h-[1.42em] w-auto max-w-none"
                />
              </span>
              <span>Does</span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
          >
            We deliver cutting-edge technology solutions that transform businesses and accelerate
            growth across every vertical.
          </motion.p>
        </div>

        {/* ── Desktop: Split panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="hidden md:block"
        >
          <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 lg:gap-8 perspective-[2000px]">
            {/* Left — Service list */}
            <div className="flex flex-col gap-1.5 rounded-3xl border border-slate-200/70 bg-white/50 p-3 shadow-[0_8px_40px_rgba(15,23,42,0.04)] backdrop-blur-sm relative z-20">
              {services.map((service, index) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  isActive={index === activeIndex}
                  onHover={setActiveIndex}
                  onTap={setActiveIndex}
                  index={index}
                />
              ))}
            </div>

            {/* Right — 3D Interactive Preview panel */}
            <TiltCard bgGradient={`${activeService.colorFrom} ${activeService.colorTo}`}>
              <AnimatePresence mode="wait">
                <PreviewPanel key={activeService.id} service={activeService} />
              </AnimatePresence>
            </TiltCard>
          </div>
        </motion.div>

        {/* ── Mobile: Accordion ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-3 md:hidden z-10 relative"
        >
          {services.map((service, index) => (
            <MobileServiceItem
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
