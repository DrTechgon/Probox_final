"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

/* ─── Placeholder role data ──────────────────────────────── */
const roles = [
  {
    title: "AI Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    accent: "from-violet-400 to-purple-500",
    glowColor: "rgba(139,92,246,0.15)",
    dotColor: "bg-violet-400",
  },
  {
    title: "Senior DevOps Engineer",
    department: "Infrastructure",
    type: "Full-time",
    location: "Remote",
    accent: "from-sky-400 to-blue-500",
    glowColor: "rgba(56,189,248,0.15)",
    dotColor: "bg-sky-400",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    location: "Hybrid",
    accent: "from-amber-400 to-orange-500",
    glowColor: "rgba(251,191,36,0.15)",
    dotColor: "bg-amber-400",
  },
  {
    title: "Full Stack Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    accent: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52,211,153,0.15)",
    dotColor: "bg-emerald-400",
  },
  {
    title: "Cybersecurity Analyst",
    department: "Security",
    type: "Full-time",
    location: "On-site",
    accent: "from-rose-400 to-pink-500",
    glowColor: "rgba(251,113,133,0.15)",
    dotColor: "bg-rose-400",
  },
  {
    title: "Product Manager",
    department: "Product",
    type: "Full-time",
    location: "Remote",
    accent: "from-cyan-400 to-teal-500",
    glowColor: "rgba(34,211,238,0.15)",
    dotColor: "bg-cyan-400",
  },
];

/* ─── Role Card ──────────────────────────────────────────── */
function RoleCard({ role, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.06]"
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: role.glowColor }}
      />

      <div className="relative z-10">
        {/* Department badge */}
        <div className="mb-4 flex items-center gap-2">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${role.dotColor}`}
          />
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-slate-400">
            {role.department}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold tracking-tight text-white md:text-xl">
          {role.title}
        </h3>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[0.75rem] text-slate-500">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" />
            {role.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {role.type}
          </span>
        </div>

        {/* Bottom accent line */}
        <div
          className={`mt-5 h-[2px] w-8 rounded-full bg-gradient-to-r ${role.accent} transition-all duration-500 group-hover:w-12`}
        />
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
export default function Careers() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const prefersReducedMotion = useReducedMotion();
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasInteractedRef = useRef(false);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  /* ── Track cursor position relative to the cards area ── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const cardsArea = overlayRef.current?.parentElement;
      if (!cardsArea) return;

      const rect = cardsArea.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);

      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        setHasInteracted(true);
      }
    };

    const handleMouseLeave = () => {
      mouseX.set(-500);
      mouseY.set(-500);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  /* ── Drive the radial mask on the overlay ── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const updateMask = () => {
      const x = smoothX.get();
      const y = smoothY.get();
      const mask = `radial-gradient(circle 200px at ${x}px ${y}px, transparent 0%, transparent 30%, rgba(0,0,0,0.9) 100%)`;
      overlay.style.maskImage = mask;
      overlay.style.webkitMaskImage = mask;
    };

    const unsubX = smoothX.on("change", updateMask);
    const unsubY = smoothY.on("change", updateMask);

    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="careers"
      className="relative bg-slate-950 py-24 md:py-32"
    >
      {/* ── Subtle grid pattern ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Ambient glow blobs ── */}
      <div className="pointer-events-none absolute left-1/4 top-20 h-[500px] w-[500px] rounded-full bg-[rgba(201,133,69,0.04)] blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-20 h-[400px] w-[400px] rounded-full bg-[rgba(139,92,246,0.03)] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* ── Header — always visible ── */}
        <div className="relative z-20 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-center"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c98545]" />
              Careers
            </span>

            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              Build what&apos;s next
            </h2>

            <p className="mx-auto mt-5 max-w-md text-[0.95rem] leading-relaxed text-slate-400">
              We&apos;re looking for people who want to do the best work of their
              career. Explore open roles below.
            </p>
          </motion.div>

          {/* Desktop hint — fades after first interaction */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            animate={{ opacity: hasInteracted ? 0 : 1 }}
            className="mt-8 hidden text-center text-[0.7rem] uppercase tracking-[0.2em] text-slate-600 md:block"
          >
            Move your cursor to explore
          </motion.p>
        </div>

        {/* ── Cards area with spotlight ── */}
        <div className="relative z-10">
          {/* Role cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role, index) => (
              <RoleCard key={role.title} role={role} index={index} />
            ))}
          </div>

          {/* Dark overlay with spotlight cutout — desktop only */}
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 z-20 hidden bg-slate-950/90 md:block"
            style={{
              maskImage:
                "radial-gradient(circle 200px at -500px -500px, transparent 0%, transparent 30%, rgba(0,0,0,0.9) 100%)",
              WebkitMaskImage:
                "radial-gradient(circle 200px at -500px -500px, transparent 0%, transparent 30%, rgba(0,0,0,0.9) 100%)",
            }}
          />

          {/* Warm cursor glow — desktop only */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-[400px] w-[400px] rounded-full md:block"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: "-50%",
              translateY: "-50%",
              background:
                "radial-gradient(circle, rgba(201,133,69,0.07) 0%, rgba(201,133,69,0.02) 40%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </div>

        {/* ── CTA — always visible ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="relative z-20 mt-14 text-center md:mt-16"
        >
          <a
            href="/careers"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-8 py-3.5 text-[0.8rem] font-medium tracking-wide text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-[#c98545]/30 hover:bg-white/[0.08] hover:text-white"
          >
            View all openings
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
