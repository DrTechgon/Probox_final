"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scrollytelling chapter divider.
 * Props:
 *  - chapter: e.g. "02"
 *  - label:   e.g. "What We Do"
 *  - tagline: e.g. "Services that compound"
 */
export default function SectionDivider({
  className = "",
  chapter,
  label,
  tagline,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.2, 0.75], [0, 1]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const hasLabel = Boolean(chapter || label);

  if (!hasLabel) {
    /* Legacy simple divider */
    return (
      <div
        ref={ref}
        className={`relative z-10 mx-auto flex w-full max-w-6xl items-center gap-4 px-6 py-10 md:px-8 ${className}`}
        aria-hidden
      >
        <motion.span
          style={{ scaleX: lineScale }}
          className="h-px flex-1 origin-right bg-gradient-to-r from-transparent via-slate-300 to-slate-300"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="shrink-0"
        >
          <Image
            src="/brand/probox-logo-transparent.png"
            alt=""
            width={48}
            height={48}
            className="h-7 w-7 opacity-60"
          />
        </motion.div>
        <motion.span
          style={{ scaleX: lineScale }}
          className="h-px flex-1 origin-left bg-gradient-to-l from-transparent via-slate-300 to-slate-300"
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:px-8 md:py-24 ${className}`}
      aria-hidden
    >
      <div className="flex items-center gap-5 md:gap-8">
        {/* Left: chapter badge */}
        <motion.div
          style={{ y: badgeY }}
          className="relative flex shrink-0 items-center gap-3"
        >
          <span className="font-display text-[0.7rem] font-medium uppercase tracking-[0.3em] text-slate-400">
            Chapter
          </span>
          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/70 bg-white/70 font-display text-sm font-bold text-slate-800 shadow-[0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c98545]/15 to-transparent"
            />
            <span className="relative">{chapter}</span>
          </span>
        </motion.div>

        {/* Middle: animated line */}
        <motion.span
          style={{ scaleX: lineScale }}
          className="relative h-px flex-1 origin-left overflow-hidden bg-gradient-to-r from-slate-300/60 via-slate-300 to-slate-300/60"
        >
          <span className="absolute inset-y-0 -left-1 w-8 bg-gradient-to-r from-[#c98545]/50 to-transparent blur-[2px]" />
        </motion.span>

        {/* Right: chapter text */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex shrink-0 items-center gap-3 text-right"
        >
          <div className="flex flex-col items-end">
            {label ? (
              <span className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
                {label}
              </span>
            ) : null}
            {tagline ? (
              <span className="mt-0.5 hidden font-display text-sm font-medium italic text-slate-400 sm:inline">
                {tagline}
              </span>
            ) : null}
          </div>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c98545] shadow-[0_0_10px_#c98545]" />
        </motion.div>
      </div>
    </div>
  );
}
