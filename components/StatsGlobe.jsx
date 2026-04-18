"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { GlobePolaroids } from "@/components/ui/cobe-globe-polaroids";

const EASE = [0.22, 1, 0.36, 1];

const stats = [
  {
    idx: "01",
    value: 120,
    suffix: "+",
    label: "Projects Delivered",
    detail: "Across SaaS, fintech, and AI platforms",
    accent: "#c98545",
    coord: "37.78°N",
  },
  {
    idx: "02",
    value: 28,
    suffix: "",
    label: "Countries Served",
    detail: "Six continents, one standard: production-ready",
    accent: "#38bdf8",
    coord: "51.51°N",
  },
  {
    idx: "03",
    value: 99,
    suffix: "%",
    label: "Client Retention",
    detail: "Relationships measured in years, not projects",
    accent: "#a78bfa",
    coord: "35.68°N",
  },
  {
    idx: "04",
    value: 12,
    suffix: "yrs",
    label: "Combined Expertise",
    detail: "Engineers who have built at real-world scale",
    accent: "#34d399",
    coord: "-33.87°S",
  },
];

const CITIES = [
  "SAN FRANCISCO",
  "NEW YORK",
  "LONDON",
  "PARIS",
  "BERLIN",
  "DUBAI",
  "BANGALORE",
  "SINGAPORE",
  "TOKYO",
  "SEOUL",
  "SYDNEY",
  "TORONTO",
  "AMSTERDAM",
  "ZÜRICH",
  "HELSINKI",
  "STOCKHOLM",
  "CAPE TOWN",
  "NAIROBI",
  "SÃO PAULO",
  "MEXICO CITY",
  "MUMBAI",
  "DELHI",
];

function Counter({ to, suffix = "", duration = 2.2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function CityMarquee({ reverse = false, duration = 90, opacity = 0.06 }) {
  const line = [...CITIES, ...CITIES];
  return (
    <div
      className="pointer-events-none relative overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {line.map((c, i) => (
          <span
            key={`${c}-${i}`}
            className="mx-8 text-[9rem] italic leading-none text-slate-900 md:text-[13rem]"
          >
            {c}
            <span className="mx-10 text-[#c98545]">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function StatsGlobe() {
  return (
    <section className="relative z-10 overflow-hidden py-28 md:py-40">
      {/* ─── Background city marquee wallpaper ───────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex flex-col justify-between py-16"
      >
        <CityMarquee duration={120} opacity={0.05} />
        <CityMarquee duration={140} opacity={0.04} reverse />
        <CityMarquee duration={110} opacity={0.05} />
      </div>

      {/* ─── Ambient warm wash ───────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px circle at 15% 25%, rgba(201,133,69,0.10), transparent 55%), radial-gradient(800px circle at 85% 80%, rgba(167,139,250,0.08), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* ─── Top editorial rule ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.3em] text-slate-500 md:mb-20"
        >
          <span className="flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-slate-400/60" />
            № 03 · Global Footprint
          </span>
          <span className="hidden md:inline">EST. MMXIV · VOL I</span>
          <span className="flex items-center gap-3">
            Shipping worldwide
            <span className="inline-block h-px w-8 bg-slate-400/60" />
          </span>
        </motion.div>

        {/* ─── Heading ──────────────────────────────────────── */}
        <div className="mx-auto mb-20 max-w-4xl text-center md:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-5xl leading-[1.02] tracking-tight text-slate-900 md:text-7xl"
          >
            <span className="font-bold">Building for teams</span>
            <br />
            <span
              className="bg-gradient-to-r from-[#c98545] via-[#e8a869] to-[#a78bfa] bg-clip-text italic text-transparent"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
            >
              across the world.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg"
          >
            From San Francisco to Sydney, Probox ships production-ready
            technology for companies that move fast.
          </motion.p>
        </div>

        {/* ─── Main layered composition ─────────────────────── */}
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* ── Globe paper tile ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative overflow-hidden rounded-[28px] border border-slate-900/5 bg-[linear-gradient(180deg,#fbf7f0_0%,#f3ede2_100%)] p-6 shadow-[0_40px_100px_-30px_rgba(120,80,40,0.25),0_10px_30px_-15px_rgba(15,23,42,0.08)] md:p-10"
          >
            {/* Corner metadata */}
            <div className="absolute left-6 top-6 flex items-center gap-2 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-slate-500 md:left-10 md:top-10">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c98545] shadow-[0_0_10px_#c98545]" />
              Live Map
            </div>
            <div className="absolute right-6 top-6 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-slate-400 md:right-10 md:top-10">
              Fig. I
            </div>

            {/* Corner tick marks (blueprint feel) */}
            {[
              "left-3 top-3",
              "right-3 top-3",
              "left-3 bottom-3",
              "right-3 bottom-3",
            ].map((pos, i) => (
              <span
                key={i}
                aria-hidden
                className={`absolute ${pos} h-3 w-3 border-slate-400/40`}
                style={{
                  borderTopWidth: pos.includes("top") ? 1 : 0,
                  borderBottomWidth: pos.includes("bottom") ? 1 : 0,
                  borderLeftWidth: pos.includes("left") ? 1 : 0,
                  borderRightWidth: pos.includes("right") ? 1 : 0,
                }}
              />
            ))}

            {/* Globe stage */}
            <div className="relative mx-auto mt-10 w-full max-w-[520px] md:mt-14">
              {/* Glow */}
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(201,133,69,0.28), rgba(167,139,250,0.14) 40%, transparent 70%)",
                }}
              />
              {/* Orbital rings */}
              <div
                aria-hidden
                className="absolute inset-[-8%] -z-10 rounded-full border border-slate-300/60"
              />
              <div
                aria-hidden
                className="absolute inset-[-18%] -z-10 rounded-full border border-dashed border-slate-300/40"
              />
              <div
                aria-hidden
                className="absolute inset-[-30%] -z-10 rounded-full border border-slate-200/50"
              />

              <GlobePolaroids />
            </div>

            {/* Bottom coord ticker */}
            <div className="mt-10 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
              <span>37.78°N · 122.44°W</span>
              <span className="hidden md:inline">∞ Always Shipping</span>
              <span>-33.87°S · 151.21°E</span>
            </div>
          </motion.div>

          {/* ── Stats monolith ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="relative overflow-hidden rounded-[28px] border border-slate-900/5 bg-[linear-gradient(180deg,#ffffff_0%,#f9f4ec_100%)] shadow-[0_40px_100px_-30px_rgba(120,80,40,0.22),0_10px_30px_-15px_rgba(15,23,42,0.08)]"
          >
            {/* Paper grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                background:
                  "radial-gradient(700px circle at 100% 0%, rgba(201,133,69,0.1), transparent 55%), radial-gradient(500px circle at 0% 100%, rgba(167,139,250,0.08), transparent 55%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c98545]/40 to-transparent"
            />

            {/* Header strip */}
            <div className="relative flex items-center justify-between border-b border-slate-900/10 px-8 py-6 md:px-10">
              <div className="flex items-center gap-2.5 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c98545] shadow-[0_0_10px_#c98545]" />
                By the Numbers
              </div>
              <div
                className="text-[0.7rem] italic text-slate-500"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                a decade in the making
              </div>
            </div>

            {/* Stat rows */}
            <ul className="relative divide-y divide-slate-900/10">
              {stats.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.08,
                    ease: EASE,
                  }}
                  className="group relative flex items-center gap-6 px-8 py-8 transition-colors duration-500 hover:bg-white/60 md:gap-8 md:px-10 md:py-10"
                >
                  {/* Accent bar (grows on hover) */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-1/2 h-10 w-[3px] -translate-y-1/2 transition-all duration-500 group-hover:h-20"
                    style={{
                      background: s.accent,
                      boxShadow: `0 0 18px ${s.accent}80`,
                    }}
                  />

                  {/* Index */}
                  <div className="w-10 shrink-0 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-slate-400">
                    {s.idx}
                  </div>

                  {/* Number */}
                  <div className="min-w-0 flex-1">
                    <div
                      className="font-display text-[4.5rem] font-bold leading-[0.95] tracking-tight md:text-[6rem]"
                      style={{
                        background: `linear-gradient(180deg, ${s.accent} 0%, #0f172a 140%)`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-3 flex items-baseline gap-3">
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-900">
                        {s.label}
                      </span>
                      <span className="h-px flex-1 bg-slate-900/10" />
                      <span
                        className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-slate-400"
                      >
                        {s.coord}
                      </span>
                    </div>
                    <p
                      className="mt-2 text-[0.95rem] italic leading-relaxed text-slate-500"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {s.detail}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Footer stamp */}
            <div className="relative flex items-center justify-between border-t border-slate-900/10 px-8 py-5 md:px-10">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-slate-400">
                Verified · Probox MMXXVI
              </span>
              <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-slate-400">
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
                />
                Live
              </span>
            </div>
          </motion.div>
        </div>

        {/* ─── Bottom editorial rule ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mt-16 flex items-center justify-center gap-4 text-[0.6rem] font-medium uppercase tracking-[0.3em] text-slate-400 md:mt-24"
        >
          <span className="inline-block h-px w-12 bg-slate-300" />
          Probox · Engineered · Secured · Scaled · Shipped
          <span className="inline-block h-px w-12 bg-slate-300" />
        </motion.div>
      </div>
    </section>
  );
}
