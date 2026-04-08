"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  Rocket,
  Zap,
  Cpu,
  X,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];
const EASE_OUT = [0.16, 1, 0.3, 1];

/* ─── Role Data ──────────────────────────────────────────────── */
const roles = [
  {
    title: "AI Engineer",
    impact: "Design intelligent systems that transform how businesses operate",
    tags: ["AI/ML", "Python", "LLMs", "Research"],
    accent: "from-blue-400 to-indigo-500",
    glowColor: "rgba(99,102,241,0.12)",
    dotColor: "bg-indigo-400",
    iconBg: "bg-indigo-50",
  },
  {
    title: "Senior DevOps Engineer",
    impact: "Architect infrastructure that scales to millions seamlessly",
    tags: ["Cloud", "K8s", "CI/CD", "Terraform"],
    accent: "from-cyan-400 to-teal-500",
    glowColor: "rgba(34,211,238,0.12)",
    dotColor: "bg-cyan-400",
    iconBg: "bg-cyan-50",
  },
  {
    title: "UI/UX Designer",
    impact: "Craft interfaces that users love and competitors envy",
    tags: ["Figma", "Design Systems", "Prototyping"],
    accent: "from-amber-400 to-orange-500",
    glowColor: "rgba(251,191,36,0.12)",
    dotColor: "bg-amber-400",
    iconBg: "bg-amber-50",
  },
  {
    title: "Full Stack Developer",
    impact: "Build end-to-end products that move fast and don't break",
    tags: ["React", "Node", "TypeScript", "APIs"],
    accent: "from-emerald-400 to-green-500",
    glowColor: "rgba(52,211,153,0.12)",
    dotColor: "bg-emerald-400",
    iconBg: "bg-emerald-50",
  },
  {
    title: "Cybersecurity Analyst",
    impact: "Protect systems and data against tomorrow's threats today",
    tags: ["Security", "Pen Testing", "Zero Trust"],
    accent: "from-rose-400 to-pink-500",
    glowColor: "rgba(251,113,133,0.12)",
    dotColor: "bg-rose-400",
    iconBg: "bg-rose-50",
  },
  {
    title: "Product Manager",
    impact: "Drive product vision from ideation to market impact",
    tags: ["Strategy", "Analytics", "Roadmap"],
    accent: "from-violet-400 to-purple-500",
    glowColor: "rgba(167,139,250,0.12)",
    dotColor: "bg-violet-400",
    iconBg: "bg-violet-50",
  },
];

/* ─── Why Join Data ──────────────────────────────────────────── */
const whyJoinItems = [
  {
    icon: Cpu,
    title: "Work on Real AI Systems",
    description:
      "Not toy demos. Production-grade AI powering real businesses at scale.",
    accent: "from-blue-400 to-indigo-400",
    delay: 0,
  },
  {
    icon: Rocket,
    title: "Ownership & Autonomy",
    description:
      "Own your domain end-to-end. Ship decisions, not just code.",
    accent: "from-amber-400 to-orange-400",
    delay: 0.1,
  },
  {
    icon: Zap,
    title: "High-Growth Environment",
    description:
      "Grow faster than you thought possible alongside exceptional people.",
    accent: "from-emerald-400 to-teal-400",
    delay: 0.2,
  },
  {
    icon: Sparkles,
    title: "Cutting-Edge Stack",
    description:
      "The latest tools, frameworks, and infrastructure — no legacy baggage.",
    accent: "from-violet-400 to-purple-400",
    delay: 0.3,
  },
];

/* ─── Culture Phrases ────────────────────────────────────────── */
const culturePhrases = [
  "Ship fast",
  "Think deeply",
  "Build boldly",
  "Stay curious",
  "Move mountains",
  "Break ceilings",
  "Own outcomes",
  "Learn relentlessly",
  "Challenge norms",
  "Create impact",
  "Dream bigger",
  "Execute sharper",
];

/* ─── Floating Abstract Shapes ───────────────────────────────── */
function FloatingShapes() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large soft blob - top left */}
      <motion.div
        className="absolute -left-32 -top-20 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0.02) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 30, -20, 15, 0],
          y: [0, -25, 20, -10, 0],
          scale: [1, 1.05, 0.97, 1.03, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Medium blob - right */}
      <motion.div
        className="absolute -right-20 top-1/4 h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,133,69,0.05) 0%, rgba(201,133,69,0.02) 50%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, -25, 20, -15, 0],
          y: [0, 20, -30, 15, 0],
          scale: [1, 0.97, 1.04, 0.98, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Small accent blob - center */}
      <motion.div
        className="absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 20, -30, 10, 0],
          y: [0, -15, 25, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* ─── Role Card ──────────────────────────────────────────────── */
function RoleCard({ role, index, expandedIndex, onToggle }) {
  const isExpanded = expandedIndex === index;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      data-testid={`role-card-${index}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className="group relative"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggle(index);
        }}
        className={`relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ${
          isExpanded
            ? "border-slate-200/80 bg-white/90 shadow-[0_8px_40px_rgba(15,23,42,0.08)]"
            : "border-slate-200/50 bg-white/60 shadow-[0_2px_16px_rgba(15,23,42,0.04)] hover:border-slate-200/80 hover:bg-white/80 hover:shadow-[0_8px_32px_rgba(15,23,42,0.07)] hover:-translate-y-[3px] hover:scale-[1.015]"
        } backdrop-blur-xl`}
      >
        {/* Glow on hover */}
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500 ${
            isExpanded ? "opacity-60" : "opacity-0 group-hover:opacity-50"
          }`}
          style={{ background: role.glowColor }}
        />

        {/* Main card content */}
        <div className="relative z-10 p-6 md:p-7">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Department dot + tags row */}
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${role.dotColor}`}
                />
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-slate-200/70 bg-slate-50/80 px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                {role.title}
              </h3>

              {/* Impact statement */}
              <p className="mt-1.5 text-[0.85rem] leading-relaxed text-slate-500">
                {role.impact}
              </p>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200/60 bg-slate-50/80"
            >
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className={`mt-4 h-[2px] rounded-full bg-gradient-to-r ${role.accent}`}
            animate={{ width: isExpanded ? "5rem" : "2.5rem" }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="relative z-10 border-t border-slate-100/80 px-6 pb-7 pt-5 md:px-7">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Responsibilities */}
                  <div>
                    <h4 className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-slate-400">
                      What you will do
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Lead and execute high-impact projects",
                        "Collaborate across teams to ship fast",
                        "Mentor and grow alongside your peers",
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.06, ease: EASE }}
                          className="flex items-start gap-2 text-[0.85rem] leading-relaxed text-slate-600"
                        >
                          <span
                            className={`mt-2 inline-block h-1 w-1 shrink-0 rounded-full ${role.dotColor}`}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="mb-3 text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-slate-400">
                      What we look for
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Strong fundamentals and deep curiosity",
                        "Bias for action and ownership mindset",
                        "Excellent communication skills",
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.06, ease: EASE }}
                          className="flex items-start gap-2 text-[0.85rem] leading-relaxed text-slate-600"
                        >
                          <span
                            className={`mt-2 inline-block h-1 w-1 shrink-0 rounded-full ${role.dotColor}`}
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Apply CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, ease: EASE }}
                  className="mt-6"
                >
                  <button
                    data-testid={`apply-btn-${index}`}
                    className={`group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${role.accent} px-6 py-2.5 text-[0.8rem] font-semibold text-white shadow-lg shadow-slate-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/10`}
                  >
                    Apply Now
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Why Join Card ──────────────────────────────────────────── */
function WhyJoinCard({ item, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const Icon = item.icon;

  // Slight parallax offset per card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30 + index * 8, -20 - index * 5]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      data-testid={`why-join-card-${index}`}
      style={{ y: smoothY }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: item.delay, ease: EASE }}
      className={`group relative ${
        index % 2 === 1 ? "md:mt-12" : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 p-7 shadow-[0_4px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-500 hover:border-slate-200/80 hover:bg-white/90 hover:shadow-[0_12px_48px_rgba(15,23,42,0.08)]">
        {/* Glow */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
          style={{
            background: `linear-gradient(135deg, ${
              item.accent.includes("blue")
                ? "rgba(99,102,241,0.15)"
                : item.accent.includes("amber")
                ? "rgba(251,191,36,0.15)"
                : item.accent.includes("emerald")
                ? "rgba(52,211,153,0.15)"
                : "rgba(167,139,250,0.15)"
            }, transparent)`,
          }}
        />

        <div className="relative z-10">
          <div
            className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} shadow-lg shadow-slate-900/5`}
          >
            <Icon className="h-5 w-5 text-white" strokeWidth={1.8} />
          </div>

          <h3 className="font-display text-lg font-bold tracking-tight text-slate-900">
            {item.title}
          </h3>

          <p className="mt-2 text-[0.875rem] leading-relaxed text-slate-500">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Infinite Marquee ───────────────────────────────────────── */
function CultureMarquee() {
  const doubled = [...culturePhrases, ...culturePhrases];

  return (
    <div
      data-testid="culture-marquee"
      className="relative overflow-hidden py-10"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-slate-50/90 to-transparent md:w-40" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-slate-50/90 to-transparent md:w-40" />

      {/* Row 1 - left to right */}
      <div className="mb-4 flex">
        <motion.div
          className="flex shrink-0 gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" },
          }}
        >
          {doubled.map((phrase, i) => (
            <span
              key={`r1-${i}`}
              className="inline-flex shrink-0 items-center rounded-full border border-slate-200/60 bg-white/70 px-5 py-2.5 text-[0.8rem] font-semibold tracking-wide text-slate-700 shadow-[0_2px_8px_rgba(15,23,42,0.03)] backdrop-blur-sm transition-all duration-300 hover:border-slate-300/80 hover:bg-white hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
            >
              {phrase}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 - right to left */}
      <div className="flex">
        <motion.div
          className="flex shrink-0 gap-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" },
          }}
        >
          {[...doubled].reverse().map((phrase, i) => (
            <span
              key={`r2-${i}`}
              className="inline-flex shrink-0 items-center rounded-full border border-slate-200/60 bg-white/70 px-5 py-2.5 text-[0.8rem] font-semibold tracking-wide text-slate-600 shadow-[0_2px_8px_rgba(15,23,42,0.03)] backdrop-blur-sm transition-all duration-300 hover:border-slate-300/80 hover:bg-white hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
            >
              {phrase}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── CTA Button with Ripple ─────────────────────────────────── */
function CTAButton() {
  const [ripple, setRipple] = useState(null);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    });
  };

  return (
    <motion.button
      data-testid="explore-roles-cta"
      onClick={handleClick}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#c98545]/30 bg-gradient-to-r from-[#c98545] to-[#d4a060] px-10 py-4 text-[0.9rem] font-semibold text-white shadow-[0_12px_40px_rgba(201,133,69,0.25)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(201,133,69,0.35)]"
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient shift overlay */}
      <span className="absolute inset-0 bg-gradient-to-r from-[#d4a060] to-[#c98545] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Glow pulse */}
      <span className="absolute inset-0 rounded-full opacity-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] transition-opacity duration-300 group-hover:opacity-100" />

      {/* Ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/20"
            initial={{
              width: 0,
              height: 0,
              left: ripple.x,
              top: ripple.y,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              width: 400,
              height: 400,
              opacity: [0.5, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => setRipple(null)}
          />
        )}
      </AnimatePresence>

      <span className="relative z-10">Explore Open Roles</span>
      <ArrowUpRight className="relative z-10 h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════════════ */
export default function Careers() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.3 });
  const [expandedRole, setExpandedRole] = useState(null);

  const handleToggle = (index) => {
    setExpandedRole((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="careers"
      data-testid="careers-section"
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Animated background shapes */}
      <FloatingShapes />

      {/* Subtle dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">
        {/* ══════════════════════════════════════════════════════════
           1. SECTION INTRO
           ══════════════════════════════════════════════════════════ */}
        <div ref={introRef} className="mb-20 text-center md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-400 shadow-sm backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c98545]" />
              Careers
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl lg:text-7xl"
          >
            Build the Future
            <br />
            <span className="bg-gradient-to-r from-[#c98545] via-[#d4a060] to-[#c98545] bg-clip-text text-transparent">
              With Us
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mx-auto mt-6 max-w-lg text-[1rem] leading-relaxed text-slate-500 md:text-lg"
          >
            Join a team where ambition meets execution. We build technology
            that matters — and we need exceptional people to do it.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={introInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="mx-auto mt-10 h-px w-20 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          />
        </div>

        {/* ══════════════════════════════════════════════════════════
           2. INTERACTIVE ROLE EXPLORER
           ══════════════════════════════════════════════════════════ */}
        <div className="mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10 flex items-center gap-3"
          >
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Open Positions
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200/80 to-transparent" />
            <span className="rounded-full border border-slate-200/60 bg-white/60 px-3 py-1 text-[0.7rem] font-medium text-slate-400 backdrop-blur-sm">
              {roles.length} roles
            </span>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {roles.map((role, index) => (
              <RoleCard
                key={role.title}
                role={role}
                index={index}
                expandedIndex={expandedRole}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
           3. WHY JOIN US
           ══════════════════════════════════════════════════════════ */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-400 shadow-sm backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400" />
              Why Join
            </span>

            <h3 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              More than a job
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-slate-500">
              An environment designed for people who want to do extraordinary work.
            </p>
          </motion.div>

          {/* Asymmetric grid with parallax */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyJoinItems.map((item, index) => (
              <WhyJoinCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
           4. CULTURE / TEAM VIBE STRIP
           ══════════════════════════════════════════════════════════ */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <CultureMarquee />
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════
           5. CTA BLOCK
           ══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative text-center"
        >
          {/* Background glow behind CTA */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[rgba(201,133,69,0.06)] via-[rgba(99,102,241,0.04)] to-[rgba(167,139,250,0.06)] blur-[80px]" />

          <div className="relative">
            <p className="mb-8 text-xl font-semibold tracking-tight text-slate-800 md:text-2xl">
              We&apos;re always looking for exceptional people
            </p>

            <CTAButton />

            <p className="mt-6 text-[0.8rem] text-slate-400">
              Remote-first &middot; Competitive equity &middot; Unlimited growth
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
