"use client";

import { useEffect, useRef } from "react";

/*
  Sediment — particles settle from a chaotic cloud at the top into ordered
  horizontal rows at the bottom. Metaphor for Data: granular organisation.
*/

export default function Sediment({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    type P = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      targetY: number;
      targetX: number;
      phase: number;
    };
    let parts: P[] = [];

    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rows = 6;
      const perRow = Math.max(24, Math.floor(w / 26));
      parts = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < perRow; i++) {
          const targetX = ((i + 0.5) / perRow) * w;
          const targetY = h * 0.42 + j * (h * 0.085);
          parts.push({
            x: Math.random() * w,
            y: Math.random() * h * 0.35,
            vx: 0,
            vy: 0,
            targetX,
            targetY,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    let t = 0;
    const loop = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      for (let k = 0; k < parts.length; k++) {
        const p = parts[k];
        // ambient wobble
        const wob = Math.sin(t + p.phase) * 0.8;
        p.vx += (p.targetX + wob - p.x) * 0.04;
        p.vy += (p.targetY - p.y) * 0.04;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = "rgba(28,26,23,0.55)";
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
