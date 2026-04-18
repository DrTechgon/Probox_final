"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import Magnetic from "@/components/ui/magnetic";

const EASE = [0.22, 1, 0.36, 1];

export default function ProboxHero() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-[#fbf6ec]">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/videos/AI_Abstract_Background_Video_Generation.mp4"
        bgImageSrc="/website/why-probox-control-room.jpg"
        title="Intelligence Engineered"
        date="Probox · Live Reel"
        scrollToExpand="Scroll to unveil"
        textBlend={false}
      >
        <div className="max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-slate-800 shadow-sm backdrop-blur-md"
          >
            <Sparkles className="h-3 w-3 text-[#c98545]" strokeWidth={2} />
            AI · Security · Cloud · Shipped
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-[-0.02em] text-slate-950"
          >
            Systems that ship, scale, and
            <span className="block bg-gradient-to-r from-[#8a531f] via-[#c98545] to-[#e8a869] bg-clip-text text-transparent">
              stay standing.
            </span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-600"
          >
            Probox engineers intelligence, security, and cloud infrastructure
            for teams who refuse to choose between speed and soundness. From
            first prototype to global scale, we build platforms that hold.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-slate-600"
          >
            AI co-pilots, zero-trust perimeters, observable pipelines — stitched
            into one coherent stack, observed end-to-end, and accountable to
            the outcomes your business cares about.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5"
          >
            <Magnetic strength={0.45} radius={120}>
              <Link
                href="#services"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#d79a5d] bg-[#c98545] px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_40px_rgba(201,133,69,0.35)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(201,133,69,0.5)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 translate-x-[-105%] bg-gradient-to-r from-[#d4a060] via-[#e8a869] to-[#d4a060] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                />
                <span className="relative z-10">See what we ship</span>
                <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#8a531f] transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              </Link>
            </Magnetic>

            <Link
              href="#why-probox"
              className="group inline-flex items-center gap-2 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-slate-700 transition-colors duration-500 hover:text-slate-950"
            >
              <span className="inline-block h-[1px] w-6 bg-slate-400 transition-all duration-500 group-hover:w-10 group-hover:bg-[#c98545]" />
              Why teams pick Probox
            </Link>
          </motion.div>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
