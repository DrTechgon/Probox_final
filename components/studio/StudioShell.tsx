"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

/*
  StudioShell — the ambient backdrop for the /studio route.
  Inherits the repo's Framer Motion + scroll pattern (see PageBackground.tsx)
  but strips it back to a restrained editorial drift:
  - a scroll-driven warm neutral gradient (bone → pearl → fog → bone)
  - one soft cursor-following light pool on desktop
  - paper grain + baseline hairline grid for texture
*/

const STOPS: [number, string][] = [
  [0, "#faf7f2"],
  [0.28, "#f3efe7"],
  [0.55, "#eeeae1"],
  [0.8, "#f1ede5"],
  [1, "#faf7f2"],
];

function hex(h: string) {
  const n = h.replace("#", "");
  return [
    parseInt(n.slice(0, 2), 16),
    parseInt(n.slice(2, 4), 16),
    parseInt(n.slice(4, 6), 16),
  ];
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function colorAt(t: number) {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const [ta, ca] = STOPS[i];
    const [tb, cb] = STOPS[i + 1];
    if (t >= ta && t <= tb) {
      const k = (t - ta) / (tb - ta);
      const [r1, g1, b1] = hex(ca);
      const [r2, g2, b2] = hex(cb);
      return `rgb(${Math.round(lerp(r1, r2, k))}, ${Math.round(
        lerp(g1, g2, k)
      )}, ${Math.round(lerp(b1, b2, k))})`;
    }
  }
  return STOPS[0][1];
}

export default function StudioShell({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (bgRef.current) bgRef.current.style.backgroundColor = colorAt(v);
    });
  }, [scrollYProgress]);

  /* cursor light */
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { damping: 40, stiffness: 120 });
  const sy = useSpring(my, { damping: 40, stiffness: 120 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  const gx = useTransform(sx, (v) => `${v - 360}px`);
  const gy = useTransform(sy, (v) => `${v - 360}px`);

  return (
    <div className="studio-root relative min-h-screen">
      {/* scroll-driven warm base */}
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundColor: STOPS[0][1] }}
      />

      {/* paper grain */}
      <div
        aria-hidden
        className="studio-paper pointer-events-none fixed inset-0 z-0 opacity-80 mix-blend-multiply"
      />

      {/* soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 40%, rgba(28,26,23,0.05) 100%)",
        }}
      />

      {/* cursor light pool */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-0 hidden md:block"
          style={{
            x: gx,
            y: gy,
            width: 720,
            height: 720,
            background:
              "radial-gradient(closest-side, rgba(168,121,74,0.10), rgba(168,121,74,0) 70%)",
            filter: "blur(20px)",
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
