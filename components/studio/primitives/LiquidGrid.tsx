"use client";

import { useEffect, useRef } from "react";

/*
  LiquidGrid — a canvas field where particles drift softly at rest
  but snap toward a precise grid as the cursor approaches.
  Familiar matter (fog-dust) behaving with hidden order.
*/

type Props = {
  className?: string;
  density?: number;
};

export default function LiquidGrid({ className = "", density = 44 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const cellSize = isMobile ? density * 1.35 : density;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    type P = {
      hx: number;
      hy: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      seed: number;
      col: number;
      row: number;
    };
    let particles: P[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / cellSize) + 1;
      rows = Math.ceil(h / cellSize) + 1;
      const offsetX = (w - (cols - 1) * cellSize) / 2;
      const offsetY = (h - (rows - 1) * cellSize) / 2;

      particles = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const hx = offsetX + i * cellSize;
          const hy = offsetY + j * cellSize;
          particles.push({
            hx,
            hy,
            x: hx + (Math.random() - 0.5) * cellSize * 0.9,
            y: hy + (Math.random() - 0.5) * cellSize * 0.9,
            vx: 0,
            vy: 0,
            seed: Math.random() * Math.PI * 2,
            col: i,
            row: j,
          });
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      mouse.x = x;
      mouse.y = y;
      mouse.active = x >= 0 && x <= r.width && y >= 0 && y <= r.height;
    };

    const onLeave = () => {
      mouse.active = false;
    };

    build();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const ATTRACT_RADIUS = isMobile ? 170 : 260;
    const INFLUENCE = isMobile ? 0.09 : 0.11;
    const DRIFT = cellSize * 0.42;
    const DAMP = 0.82;

    let t = 0;
    const loop = () => {
      t += prefersReduced ? 0 : 0.008;
      ctx.clearRect(0, 0, w, h);

      for (let k = 0; k < particles.length; k++) {
        const p = particles[k];
        const tx_drift = p.hx + Math.sin(t + p.seed) * DRIFT;
        const ty_drift = p.hy + Math.cos(t * 0.8 + p.seed * 1.3) * DRIFT;

        let targetX = tx_drift;
        let targetY = ty_drift;
        let snap = 0;
        if (mouse.active) {
          const dx = mouse.x - p.hx;
          const dy = mouse.y - p.hy;
          const dist = Math.hypot(dx, dy);
          if (dist < ATTRACT_RADIUS) {
            snap = 1 - dist / ATTRACT_RADIUS;
            snap = snap * snap;
            targetX = tx_drift * (1 - snap) + p.hx * snap;
            targetY = ty_drift * (1 - snap) + p.hy * snap;
          }
        }

        p.vx += (targetX - p.x) * INFLUENCE;
        p.vy += (targetY - p.y) * INFLUENCE;
        p.vx *= DAMP;
        p.vy *= DAMP;
        p.x += p.vx;
        p.y += p.vy;

        const size = 1.1 + snap * 1.6;
        const alpha = 0.22 + snap * 0.55;
        ctx.fillStyle = `rgba(28,26,23,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      /* faint connection lines as particles align near cursor */
      if (mouse.active) {
        ctx.lineWidth = 0.55;
        for (let k = 0; k < particles.length; k++) {
          const p = particles[k];
          const dx = mouse.x - p.hx;
          const dy = mouse.y - p.hy;
          const dist = Math.hypot(dx, dy);
          if (dist > ATTRACT_RADIUS) continue;
          const str = 1 - dist / ATTRACT_RADIUS;
          if (p.col < cols - 1) {
            const n = particles[p.row * cols + p.col + 1];
            const a = str * str * 0.35;
            if (a > 0.03) {
              ctx.strokeStyle = `rgba(28,26,23,${a})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(n.x, n.y);
              ctx.stroke();
            }
          }
          if (p.row < rows - 1) {
            const n = particles[(p.row + 1) * cols + p.col];
            const a = str * str * 0.35;
            if (a > 0.03) {
              ctx.strokeStyle = `rgba(28,26,23,${a})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(n.x, n.y);
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
