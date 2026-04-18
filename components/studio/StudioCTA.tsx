"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";
import EditorialEyebrow from "./primitives/EditorialEyebrow";
import SerifFragment from "./primitives/SerifFragment";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StudioCTA() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const draw = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);
  const glow = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const dotX = useTransform(scrollYProgress, [0.1, 0.55], ["0%", "100%"]);

  return (
    <section
      id="studio-cta"
      ref={ref}
      className="relative mx-auto w-full max-w-[1400px] px-6 py-28 md:px-12 md:py-40"
    >
      <EditorialEyebrow index="07" label="Signal" />

      {/* drawn hairline */}
      <div className="relative mt-10 md:mt-16">
        <motion.div
          style={{ scaleX: draw }}
          className="h-px origin-left bg-[color:var(--s-ink-2)]"
        />
        <motion.span
          aria-hidden
          style={{ left: dotX, opacity: glow }}
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--s-amber)] shadow-[0_0_24px_rgba(168,121,74,0.6)]"
        />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 1, ease: EASE }}
        className="studio-display mt-14 max-w-5xl text-[clamp(2.25rem,8vw,7rem)] leading-[0.92] tracking-[-0.035em] text-[color:var(--s-ink)] md:mt-20"
      >
        Build the{" "}
        <SerifFragment className="text-[color:var(--s-amber)]">
          quiet
        </SerifFragment>{" "}
        engine behind what ships next.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="mt-10 max-w-xl text-[15px] leading-relaxed text-[color:var(--s-ink-2)] md:text-[17px]"
      >
        If you're standing up a new system — or rescuing one that's drifting —
        we'd like to hear the constraint, not the spec. The first conversation
        is free and usually the most useful.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        className="mt-10 flex flex-wrap items-center gap-6"
      >
        <Magnetic strength={0.32} radius={130}>
          <a
            href="mailto:hello@probox.example"
            className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--s-ink)] px-8 py-4 text-[13px] font-medium uppercase tracking-[0.22em] text-[color:var(--s-bone)] transition-colors hover:bg-[color:var(--s-amber)]"
          >
            Start a project
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--s-bone)] text-[color:var(--s-ink)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </span>
          </a>
        </Magnetic>

        <a
          href="/#careers"
          className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.22em] text-[color:var(--s-ink-2)]"
        >
          <span className="relative">
            Open careers
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-50 bg-[color:var(--s-ink-2)] transition-transform duration-500 group-hover:scale-x-100" />
          </span>
          <ArrowUpRight size={14} strokeWidth={1.5} />
        </a>
      </motion.div>

      {/* footnote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 1, ease: EASE, delay: 0.6 }}
        className="mt-20 grid grid-cols-12 gap-6 border-t border-[color:var(--s-line)] pt-10 md:mt-28"
      >
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
            Location
          </div>
          <div className="mt-2 text-[14px] text-[color:var(--s-ink-2)]">
            Remote-first · anchored in Mumbai
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
            Availability
          </div>
          <div className="mt-2 text-[14px] text-[color:var(--s-ink-2)]">
            Two engagements open, Q2 onward
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
            Response
          </div>
          <div className="mt-2 text-[14px] text-[color:var(--s-ink-2)]">
            Within 48 hours, by a principal — not a form
          </div>
        </div>
      </motion.div>
    </section>
  );
}
