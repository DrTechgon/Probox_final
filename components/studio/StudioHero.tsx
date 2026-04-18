"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";
import LiquidGrid from "./primitives/LiquidGrid";
import SerifFragment from "./primitives/SerifFragment";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StudioHero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* cursor-magnetic particle grid */}
      <LiquidGrid />

      {/* top corner marks */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="studio-baseline absolute inset-x-12 top-20 bottom-28 opacity-60" />
      </div>

      {/* header wordmark (keeps it from colliding with the root Navbar) */}
      <div className="pointer-events-none absolute left-6 top-24 z-20 md:left-12 md:top-28">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-6 bg-[color:var(--s-ink-2)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-ink-2)]">
            Probox / Studio
          </span>
        </motion.div>
      </div>

      {/* right corner: field annotation */}
      <div className="pointer-events-none absolute right-6 top-24 z-20 hidden max-w-[220px] text-right md:right-12 md:top-28 md:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          className="space-y-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
            Field 01 · Liquid Grid
          </span>
          <p className="studio-serif text-[13px] leading-snug text-[color:var(--s-ink-2)]">
            Observed between rest and structure. Matter that listens before
            it aligns.
          </p>
        </motion.div>
      </div>

      {/* main editorial composition */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1400px] flex-col justify-center px-6 pt-40 md:px-12 md:pt-48">
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 md:col-span-10">
            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
              }}
              className="studio-display text-[clamp(2.75rem,10vw,9rem)] leading-[0.86] tracking-[-0.04em] text-[color:var(--s-ink)]"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
                }}
                className="block"
              >
                We engineer
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
                }}
                className="block"
              >
                <SerifFragment className="text-[color:var(--s-amber)]" delay={0.5}>
                  invisible
                </SerifFragment>{" "}
                <span className="text-[color:var(--s-ink)]">precision.</span>
              </motion.span>
            </motion.h1>
          </div>

          <div className="col-span-12 mt-10 grid grid-cols-12 gap-6 md:mt-16">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
              className="col-span-12 max-w-xl text-[15px] leading-relaxed text-[color:var(--s-ink-2)] md:col-span-5 md:col-start-1 md:text-[17px]"
            >
              Intelligence, security, and cloud systems — shaped like quiet
              matter. Built for teams that refuse to choose between speed and
              soundness.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
              className="pointer-events-auto col-span-12 flex flex-wrap items-center gap-5 md:col-span-6 md:col-start-7 md:justify-end"
            >
              <Magnetic strength={0.32} radius={120}>
                <a
                  href="#studio-services"
                  className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--s-ink)] px-7 py-4 text-[13px] font-medium uppercase tracking-[0.22em] text-[color:var(--s-bone)] transition-colors hover:bg-[color:var(--s-amber)]"
                >
                  Begin the field tour
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--s-bone)] text-[color:var(--s-ink)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={14} strokeWidth={1.75} />
                  </span>
                </a>
              </Magnetic>

              <a
                href="#studio-cta"
                className="group inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.22em] text-[color:var(--s-ink-2)]"
              >
                <span className="relative">
                  Start a project
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-50 bg-[color:var(--s-ink-2)] transition-transform duration-500 group-hover:scale-x-100" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 1.3 }}
          className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-3"
        >
          <span aria-hidden className="h-5 w-px bg-[color:var(--s-ink-2)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[color:var(--s-muted)]">
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
