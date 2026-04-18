"use client";

import { motion } from "framer-motion";

/*
  FogField — slow-drifting atmospheric blobs that hide and reveal a faint
  skeleton. Metaphor for Cloud: distributed, ambient, unseen support.
*/

const EASE = [0.4, 0, 0.6, 1] as const;

export default function FogField({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* subtle wire skeleton underneath */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
      >
        <g stroke="rgba(28,26,23,0.18)" fill="none" strokeWidth="0.7">
          <circle cx="120" cy="90" r="22" />
          <circle cx="260" cy="150" r="30" />
          <circle cx="180" cy="210" r="18" />
          <circle cx="320" cy="80" r="14" />
          <circle cx="70" cy="190" r="16" />
          <line x1="120" y1="90" x2="260" y2="150" />
          <line x1="260" y1="150" x2="180" y2="210" />
          <line x1="260" y1="150" x2="320" y2="80" />
          <line x1="180" y1="210" x2="70" y2="190" />
          <line x1="120" y1="90" x2="320" y2="80" />
        </g>
      </svg>

      {/* drifting fog */}
      {[
        { size: 420, x: "10%", y: "20%", dur: 22, delay: 0, tint: "rgba(240,236,228,0.85)" },
        { size: 380, x: "55%", y: "15%", dur: 26, delay: 2, tint: "rgba(232,227,216,0.8)" },
        { size: 500, x: "30%", y: "55%", dur: 30, delay: 4, tint: "rgba(250,247,242,0.9)" },
        { size: 320, x: "70%", y: "60%", dur: 24, delay: 1, tint: "rgba(232,227,216,0.75)" },
      ].map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ opacity: 0.4 }}
          animate={{
            x: [0, 30, -10, 0],
            y: [0, -20, 10, 0],
            opacity: [0.7, 0.9, 0.75, 0.7],
          }}
          transition={{ duration: b.dur, repeat: Infinity, ease: EASE, delay: b.delay }}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background: `radial-gradient(closest-side, ${b.tint}, transparent 70%)`,
            filter: "blur(30px)",
          }}
        />
      ))}

      {/* label */}
      <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
        Ambient · distributed
      </div>
    </div>
  );
}
