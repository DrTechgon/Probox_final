"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "./data";

export default function AICTA() {
  return (
    <section id="contact" className="relative bg-white py-24 md:py-32">
      <div className="relative mx-auto max-w-4xl px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-3xl border border-[#d79a5d]/15 bg-gradient-to-br from-[#f7f2eb] to-white p-12 text-center shadow-[0_8px_40px_rgba(201,133,69,0.06)] md:p-16"
        >
          {/* Decorative radial */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(201,133,69,0.08),_transparent_60%)]" />
          {/* Noise texture */}
          <div className="hero-noise pointer-events-none absolute inset-0 opacity-[0.03]" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-5xl"
            >
              Ready to Put AI to Work?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg"
            >
              Let&apos;s talk about where AI fits in your business — no jargon,
              no slide decks, just a real conversation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="mt-8"
            >
              <a
                href="mailto:hello@proboxinfotech.com"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#d79a5d] bg-[#c98545] px-8 py-4 text-base font-semibold text-[#0f2145] shadow-[0_16px_30px_rgba(201,133,69,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(201,133,69,0.32)]"
              >
                <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                <span className="relative z-10">Start a Conversation</span>
                <span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#8a531f] transition duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
              className="mt-6 text-sm text-slate-400"
            >
              Or reach us at{" "}
              <a
                href="mailto:hello@proboxinfotech.com"
                className="underline underline-offset-4 transition-colors hover:text-[#c98545]"
              >
                hello@proboxinfotech.com
              </a>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
