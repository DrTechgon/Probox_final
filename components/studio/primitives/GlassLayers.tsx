"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/*
  GlassLayers — three translucent panes that shift in depth with the cursor.
  Metaphor for Cybersecurity: shielded transparency, structural resilience.
*/

export default function GlassLayers({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { damping: 20, stiffness: 140, mass: 0.4 });
  const sy = useSpring(my, { damping: 20, stiffness: 140, mass: 0.4 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set((e.clientX - cx) / r.width);
      my.set((e.clientY - cy) / r.height);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my]);

  const x1 = useTransform(sx, (v) => v * -24);
  const y1 = useTransform(sy, (v) => v * -14);
  const x2 = useTransform(sx, (v) => v * -12);
  const y2 = useTransform(sy, (v) => v * -8);
  const x3 = useTransform(sx, (v) => v * 12);
  const y3 = useTransform(sy, (v) => v * 8);

  return (
    <div ref={wrapRef} className={`absolute inset-0 ${className}`} aria-hidden>
      {/* anchor grid etched behind the glass */}
      <div className="absolute inset-6 border border-[color:var(--s-line)] opacity-40" />
      <div className="studio-dots absolute inset-6 opacity-40" />

      {/* pane 3 — back */}
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute inset-x-[14%] inset-y-[18%] rounded-sm border border-[color:var(--s-line)] bg-[rgba(255,255,255,0.35)] backdrop-blur-[2px]"
      >
        <div className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
          Layer 03
        </div>
      </motion.div>

      {/* pane 2 — middle */}
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute inset-x-[22%] inset-y-[28%] rounded-sm border border-[color:var(--s-line)] bg-[rgba(255,255,255,0.55)] backdrop-blur-[3px] shadow-[0_20px_60px_-30px_rgba(28,26,23,0.25)]"
      >
        <div className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
          Layer 02
        </div>
      </motion.div>

      {/* pane 1 — front */}
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute inset-x-[30%] inset-y-[38%] rounded-sm border border-[color:var(--s-ink-2)] bg-[rgba(255,255,255,0.75)] backdrop-blur-[4px] shadow-[0_30px_80px_-30px_rgba(28,26,23,0.35)]"
      >
        <div className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-ink-2)]">
          Layer 01 · Verified
        </div>
        <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-[color:var(--s-amber)]" />
      </motion.div>
    </div>
  );
}
