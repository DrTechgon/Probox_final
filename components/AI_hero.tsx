"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { InteractiveRobotSpline } from "@/components/ui/interactive-3d-robot";

const ROBOT_SCENE_URL =
  "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function AIHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#f7f2eb]">
      {/* 3D Robot — pushed to the right on desktop */}
      <div className="absolute inset-0 z-0">
        <InteractiveRobotSpline
          scene={ROBOT_SCENE_URL}
          className="absolute inset-0 h-full w-full translate-x-[15%] scale-110 md:translate-x-[20%] [&_canvas]:[filter:sepia(1)_saturate(6.5)_hue-rotate(-16deg)_brightness(1.02)_contrast(1.04)]"
        />
      </div>

      {/* Fade overlay — stronger left side for text readability */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#f7f2eb] via-[#f7f2eb]/85 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#f7f2eb]/60 to-transparent" />

      {/* Content — left-aligned on desktop, centered on mobile */}
      <motion.div
        className="relative z-20 flex h-full flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-2xl">
          {/* Label */}
          <motion.p
            variants={fadeUp}
            className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#c98545]"
          >
            AI-Powered Solutions
          </motion.p>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-slate-950"
          >
            Intelligence That
            <br />
            Moves Your Business
            <br />
            Forward
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-[clamp(0.925rem,1.5vw,1.1rem)] leading-relaxed text-slate-600"
          >
            We design, build, and deploy AI systems that solve real problems
            — from predictive models to autonomous workflows.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-8">
            <a
              href="#"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#d79a5d] bg-[#c98545] px-7 py-3.5 text-sm font-semibold text-[#0f2145] shadow-[0_16px_30px_rgba(201,133,69,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(201,133,69,0.32)]"
            >
              <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
              <span className="relative z-10">Explore Our AI Services</span>
              <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#8a531f] transition duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-400/40 p-1.5">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-slate-500"
            animate={{ y: [0, 12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
