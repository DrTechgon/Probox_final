"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FilmstripAccordion from "@/components/ui/filmstrip-accordion";

const EASE = [0.22, 1, 0.36, 1];

export default function Services() {
  return (
    <section
      id="services"
      className="relative text-slate-900"
    >
      {/* ── Section header ── */}
      <div className="relative z-10 pt-10 pb-14 md:pt-16 md:pb-20">
        <div className="relative mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur-sm">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c98545] shadow-[0_0_8px_#c98545]" />
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl"
            >
              <span className="inline-flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2">
                <span className="text-slate-900">What</span>
                <span className="sr-only">Probox</span>
                <span
                  aria-hidden="true"
                  className="relative inline-block h-[0.9em] w-[3.9em] overflow-hidden align-[-0.08em]"
                >
                  <Image
                    src="/brand/probox-logo-wordmark-transparent.png"
                    alt=""
                    width={953}
                    height={266}
                    className="absolute left-0 top-[-0.08em] h-[1.6em] w-auto max-w-none"
                  />
                </span>
                <span className="bg-gradient-to-r from-slate-900 via-[#c98545] to-slate-900 bg-clip-text text-transparent">
                  Does
                </span>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
              className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-500 md:text-lg"
            >
              Cutting-edge technology, engineered with intent — we turn complex
              problems into systems that ship, scale, and stay reliable.
            </motion.p>

            {/* Decorative underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              className="mx-auto mt-10 h-px w-24 origin-center bg-gradient-to-r from-transparent via-slate-300 to-transparent"
            />
          </div>
        </div>
      </div>

      {/* ── Filmstrip accordion ── */}
      <div className="relative z-10 pb-20 md:pb-32">
        <FilmstripAccordion />
      </div>
    </section>
  );
}
