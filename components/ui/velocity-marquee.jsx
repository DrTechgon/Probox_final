"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

/**
 * A huge display-type marquee that drifts based on scroll velocity.
 * Visually similar to the "infinite text strip" in premium portfolio sites.
 *
 * Props:
 *  - items:    string[] — words to repeat
 *  - baseSpeed: number — px/sec when idle (positive = left)
 *  - accentIndexes: number[] — indexes rendered as "outlined" text
 */
export default function VelocityMarquee({
  items = [],
  baseSpeed = 60,
  accentIndexes = [],
  className = "",
}) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const baseX = useMotionValue(0);

  useAnimationFrame((_, delta) => {
    const seconds = delta / 1000;
    const move = baseSpeed * seconds * (1 + Math.abs(velocityFactor.get()));
    baseX.set(baseX.get() - move);
  });

  // two copies side-by-side → translating by -50% lands on an identical frame
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const doubled = [...items, ...items];

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden py-10 md:py-16 ${className}`}
      aria-hidden
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        style={{ x }}
      >
        {doubled.map((word, i) => {
          const isAccent = accentIndexes.includes(i % items.length);
          return (
            <span
              key={`${word}-${i}`}
              className={`mx-6 inline-flex items-center gap-6 font-display text-[clamp(3rem,9vw,8rem)] font-bold uppercase leading-none tracking-[-0.04em] ${
                isAccent
                  ? "text-transparent [-webkit-text-stroke:1.5px_rgba(201,133,69,0.55)]"
                  : "text-slate-900"
              }`}
            >
              {word}
              <span
                aria-hidden
                className="inline-block h-3 w-3 rounded-full bg-[#c98545] shadow-[0_0_16px_rgba(201,133,69,0.6)]"
              />
            </span>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ─── helpers ─────────────────────────────────────────────── */
function wrap(min, max, v) {
  const range = max - min;
  const wrapped = ((((v - min) % range) + range) % range) + min;
  return wrapped;
}
