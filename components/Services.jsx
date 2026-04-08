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
      <div className="relative z-10 pt-20 pb-14 md:pt-32 md:pb-20">
        <div className="relative mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-400 shadow-sm">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="text-4xl font-bold tracking-tight md:text-6xl"
            >
              <span className="inline-flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2">
                <span>What</span>
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
                <span>Does</span>
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
            >
              We deliver cutting-edge technology solutions that transform
              businesses and accelerate growth across every vertical.
            </motion.p>
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
