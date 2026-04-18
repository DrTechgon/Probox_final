"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.25,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#c98545] via-[#e8a869] to-[#38bdf8]"
      style={{
        scaleX,
        boxShadow: "0 0 14px rgba(201,133,69,0.55), 0 0 2px rgba(201,133,69,0.9)",
      }}
    />
  );
}
