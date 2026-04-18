"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  chapter: string;
  label: string;
  quote?: string;
};

export default function StudioDivider({ chapter, label, quote }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 md:py-36"
    >
      <div className="grid grid-cols-12 items-baseline gap-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-2 font-mono text-[11px] tracking-[0.3em] text-[color:var(--s-muted)]"
        >
          ch. {chapter}
        </motion.span>

        <div className="col-span-10">
          <motion.div
            style={{ scaleX: lineScale }}
            className="mb-8 h-px origin-left bg-[color:var(--s-line)]"
          />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="studio-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] text-[color:var(--s-ink)]"
          >
            {label}
          </motion.h2>
          {quote && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--s-muted)]"
            >
              <span className="studio-serif text-[color:var(--s-ink-2)]">— </span>
              {quote}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
