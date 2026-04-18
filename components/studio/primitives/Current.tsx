"use client";

import { useEffect, useRef } from "react";

/*
  Current — horizontal streamlines that undulate out of phase.
  Metaphor for AI: fluid adaptation, a current that listens and aligns.
*/

export default function Current({ className = "" }: { className?: string }) {
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
    let lines: { y: number; phase: number; amp: number; freq: number }[] = [];

    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(18, Math.floor(h / 18));
      lines = Array.from({ length: count }, (_, i) => ({
        y: (i + 1) * (h / (count + 1)),
        phase: Math.random() * Math.PI * 2,
        amp: 10 + Math.random() * 22,
        freq: 0.6 + Math.random() * 0.8,
      }));
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    let t = 0;
    const loop = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        ctx.beginPath();
        const segs = 32;
        for (let s = 0; s <= segs; s++) {
          const x = (s / segs) * (w + 80) - 40;
          const k = s / segs;
          const env = Math.sin(k * Math.PI); // fades at edges
          const y =
            l.y +
            Math.sin(t * l.freq + l.phase + k * 4.2) * l.amp * env +
            Math.sin(t * 0.5 + k * 2 + l.phase) * 4 * env;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = 0.06 + (i / lines.length) * 0.08;
        ctx.strokeStyle = `rgba(28,26,23,${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
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
