"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { differentiators, EASE } from "./data";

/* ── Animated counter hook ── */
function useCountUp(target: string, inView: boolean) {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!inView) return;

    // Parse the numeric part
    const numericMatch = target.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplay(target);
      return;
    }

    const numericStr = numericMatch[0];
    const numericVal = parseFloat(numericStr);
    const prefix = target.slice(0, target.indexOf(numericStr));
    const suffix = target.slice(target.indexOf(numericStr) + numericStr.length);
    const hasDecimal = numericStr.includes(".");
    const decimalPlaces = hasDecimal
      ? numericStr.split(".")[1].length
      : 0;

    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericVal * eased;

      setDisplay(
        prefix + current.toFixed(decimalPlaces) + suffix
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    }

    requestAnimationFrame(tick);
  }, [inView, target]);

  return display;
}

/* ── Stat card ── */
function StatCard({
  item,
  index,
}: {
  item: (typeof differentiators)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const displayStat = useCountUp(item.stat, inView);
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className={`group relative overflow-hidden rounded-3xl border border-[#d79a5d]/15 bg-white p-8 shadow-[0_4px_24px_rgba(201,133,69,0.04)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(201,133,69,0.08)] md:p-10 ${
        item.span === 2 ? "md:col-span-2" : "md:col-span-1"
      }`}
    >
      {/* Watermark icon */}
      <div className="pointer-events-none absolute -bottom-4 -right-4 text-slate-100 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-[-4px]">
        <Icon className="h-24 w-24" strokeWidth={0.8} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <span className="font-display text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl">
          {displayStat}
        </span>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#c98545]">
          {item.label}
        </p>
        <p className="mt-3 max-w-sm text-[0.925rem] leading-relaxed text-slate-500">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
export default function AIDifferentiators() {
  return (
    <section className="relative overflow-hidden bg-[#f7f2eb] py-20 md:py-28">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_rgba(201,133,69,0.06),_transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(201,133,69,0.04),_transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Section header */}
        <div className="mb-14 text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="mb-4 inline-block rounded-full border border-[#d79a5d]/20 bg-white px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-400 shadow-sm">
              Why Probox AI
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-display text-4xl font-bold tracking-tight md:text-6xl"
          >
            Built Different
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
          >
            Measurable advantages that set our AI delivery apart.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {differentiators.map((item, index) => (
            <StatCard key={item.label} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
