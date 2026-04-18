"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/*
  Lattice — a grid of modular blocks that stagger-assemble into precision.
  Metaphor for Engineering: modular, composable, built to hold.
*/

const COLS = 9;
const ROWS = 6;

export default function Lattice({ className = "" }: { className?: string }) {
  const cells = useMemo(() => {
    const arr: { i: number; j: number; k: number; dx: number; dy: number }[] = [];
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLS; i++) {
        arr.push({
          i,
          j,
          k: j * COLS + i,
          dx: (Math.random() - 0.5) * 80,
          dy: (Math.random() - 0.5) * 80,
        });
      }
    }
    return arr;
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden>
      <div className="absolute inset-[12%]">
        <div className="relative grid h-full w-full" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)`, gap: "6px" }}>
          {cells.map((c) => {
            const edge =
              c.i === 0 || c.j === 0 || c.i === COLS - 1 || c.j === ROWS - 1;
            return (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, x: c.dx, y: c.dy, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (c.i + c.j) * 0.03,
                }}
                className={`rounded-[2px] ${
                  edge
                    ? "border border-[color:var(--s-ink-2)]"
                    : "border border-[color:var(--s-line)] bg-[rgba(255,255,255,0.55)]"
                }`}
              />
            );
          })}
        </div>
        {/* registration marks */}
        <div className="pointer-events-none absolute -inset-2">
          {[
            "left-0 top-0",
            "right-0 top-0",
            "left-0 bottom-0",
            "right-0 bottom-0",
          ].map((pos, i) => (
            <span
              key={i}
              className={`absolute ${pos} h-3 w-3 border-[color:var(--s-ink-2)]`}
              style={{
                borderTopWidth: pos.includes("top") ? 1 : 0,
                borderBottomWidth: pos.includes("bottom") ? 1 : 0,
                borderLeftWidth: pos.includes("left") ? 1 : 0,
                borderRightWidth: pos.includes("right") ? 1 : 0,
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-[-24px] left-0 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
          Assembly · precise
        </div>
      </div>
    </div>
  );
}
