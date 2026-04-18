"use client";

import { motion } from "framer-motion";

type Props = {
  index?: string;
  label: string;
  align?: "left" | "center";
  className?: string;
};

export default function EditorialEyebrow({
  index,
  label,
  align = "left",
  className = "",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""} ${className}`}
    >
      {index && (
        <span className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--s-muted)]">
          {index}
        </span>
      )}
      <span aria-hidden className="h-px w-8 bg-[color:var(--s-line)]" />
      <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--s-ink-2)]">
        {label}
      </span>
    </motion.div>
  );
}
