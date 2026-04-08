"use client";

import { motion } from "framer-motion";
import { useCases, EASE } from "./data";

export default function AIUseCases() {
  return (
    <section className="relative overflow-hidden bg-[#f8fafc] py-20 md:py-28">
      {/* Background radials */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(201,133,69,0.05),_transparent_70%)]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,_rgba(148,163,184,0.08),_transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8">
        {/* Section header */}
        <div className="mb-14 text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-400 shadow-sm">
              Business Impact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            className="font-display text-4xl font-bold tracking-tight md:text-6xl"
          >
            AI in Action
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg"
          >
            Real results from real deployments across industries.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {useCases.map((uc, index) => {
            const Icon = uc.icon;
            // Stagger offset for asymmetric layout on desktop
            const isOffset = index % 2 === 1;

            return (
              <motion.div
                key={uc.id}
                initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: EASE,
                }}
                className={`group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 shadow-[0_8px_40px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(15,23,42,0.08)] md:p-10 ${
                  isOffset ? "md:mt-12" : ""
                }`}
              >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(201,133,69,0.06),_transparent_70%)] transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

                {/* Industry badge */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c98545]/8 text-[#c98545]">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {uc.industry}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-slate-200/60 to-transparent" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  {uc.title}
                </h3>

                {/* Problem → Solution */}
                <div className="mt-5 space-y-4">
                  <div>
                    <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-slate-300">
                      Challenge
                    </p>
                    <p className="text-[0.925rem] leading-relaxed text-slate-500">
                      {uc.problem}
                    </p>
                  </div>
                  <div className="h-px w-12 bg-gradient-to-r from-[#c98545]/30 to-transparent" />
                  <div>
                    <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-slate-300">
                      Solution
                    </p>
                    <p className="text-[0.925rem] leading-relaxed text-slate-500">
                      {uc.solution}
                    </p>
                  </div>
                </div>

                {/* Metric callout */}
                <div className="mt-8 flex items-baseline gap-3 border-t border-slate-100 pt-6">
                  <span className="font-display text-4xl font-bold tracking-tight text-[#c98545]">
                    {uc.metric}
                  </span>
                  <span className="text-sm font-medium text-slate-500">
                    {uc.metricLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
