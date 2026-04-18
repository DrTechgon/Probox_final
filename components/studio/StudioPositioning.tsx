"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import EditorialEyebrow from "./primitives/EditorialEyebrow";
import SerifFragment from "./primitives/SerifFragment";

const EASE = [0.22, 1, 0.36, 1] as const;

const METRICS: { index: string; value: string; label: string }[] = [
  { index: "M.01", value: "09 yrs", label: "Engineering discipline" },
  { index: "M.02", value: "40+", label: "Production teams shipped" },
  { index: "M.03", value: "6", label: "Distinct disciplines, one stack" },
];

const MARQUEE_TOKENS = [
  "Fabric",
  "Current",
  "Lattice",
  "Field",
  "Signal",
  "Sediment",
  "Fog",
  "Glass",
];

export default function StudioPositioning() {
  return (
    <section className="relative mx-auto w-full max-w-[1400px] px-6 pt-20 pb-10 md:px-12 md:pt-32 md:pb-16">
      <EditorialEyebrow index="02" label="Brief · A quiet studio" />

      <div className="mt-10 grid grid-cols-12 gap-6 md:mt-16 md:gap-10">
        <div className="col-span-12 md:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: EASE }}
            className="studio-display text-[clamp(2rem,6vw,5rem)] leading-[0.95] text-[color:var(--s-ink)]"
          >
            A quiet studio for{" "}
            <SerifFragment className="text-[color:var(--s-amber)]">
              systems
            </SerifFragment>{" "}
            that must hold.
          </motion.h2>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="col-span-12 self-end md:col-span-4"
        >
          <div className="border-l border-[color:var(--s-line)] pl-5">
            <p className="studio-serif text-[clamp(1.1rem,1.5vw,1.4rem)] leading-[1.4] text-[color:var(--s-ink-2)]">
              “We choose materials that endure over effects that impress. What
              you notice is the outcome; what holds it up is invisible.”
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--s-muted)]">
              — Studio note
            </p>
          </div>
        </motion.aside>
      </div>

      {/* metric trio */}
      <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden border-t border-[color:var(--s-line)] md:mt-28 md:grid-cols-3">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
            className="relative border-b border-[color:var(--s-line)] py-10 md:border-b-0 md:border-r md:py-14 md:last:border-r-0 md:px-8"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
              {m.index}
            </span>
            <div className="mt-4 studio-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] text-[color:var(--s-ink)]">
              {m.value}
            </div>
            <div className="mt-3 max-w-xs text-[13px] text-[color:var(--s-ink-2)]">
              {m.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* studio marquee */}
      <StudioMarquee items={MARQUEE_TOKENS} />
    </section>
  );
}

/* ------------------------------------------------------------
   StudioMarquee
   Scroll-velocity-driven, styled for the light editorial palette.
   Pattern mirrors components/ui/velocity-marquee.jsx with tokens
   retuned for bone/graphite with amber punctuation.
------------------------------------------------------------ */
function StudioMarquee({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll();
  const scrollVel = useVelocity(scrollY);
  const smoothVel = useSpring(scrollVel, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVel, [0, 1000], [0, 3.5], {
    clamp: false,
  });
  const baseX = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    const s = delta / 1000;
    const move = 48 * s * (1 + Math.abs(velocityFactor.get()));
    baseX.set(baseX.get() - move);
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const doubled = [...items, ...items];

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative mt-20 overflow-hidden border-t border-[color:var(--s-line)] py-10 md:mt-28 md:py-14"
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        style={{ x }}
      >
        {doubled.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="studio-display mx-5 inline-flex items-center gap-5 text-[clamp(2rem,6vw,5rem)] uppercase leading-none tracking-[-0.035em] text-[color:var(--s-ink)] md:mx-8"
          >
            {word}
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--s-amber)]"
            />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  const wrapped = ((((v - min) % range) + range) % range) + min;
  return wrapped;
}
