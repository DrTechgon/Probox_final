"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function SerifFragment({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.span
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.7 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      className={`studio-serif inline-block ${className}`}
    >
      {children}
    </motion.span>
  );
}
