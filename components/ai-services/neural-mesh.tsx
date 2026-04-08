"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { EASE } from "./data";

/* ── Types ── */
interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
}

/* ── Constants ── */
const DOT_SPACING = 42;
const BASE_RADIUS = 1.4;
const MOUSE_RADIUS = 180;
const MAX_CONNECTION_DIST = 70;
const DOT_COLOR_R = 201;
const DOT_COLOR_G = 133;
const DOT_COLOR_B = 69;

export default function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef<Dot[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);

  /* ── Build dot grid ── */
  const buildGrid = useCallback(
    (width: number, height: number): Dot[] => {
      const dots: Dot[] = [];
      const cols = Math.floor(width / DOT_SPACING) + 1;
      const rows = Math.floor(height / DOT_SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * DOT_SPACING + (r % 2 === 0 ? 0 : DOT_SPACING / 2);
          const y = r * DOT_SPACING;
          dots.push({
            baseX: x,
            baseY: y,
            x,
            y,
            radius: BASE_RADIUS,
            opacity: 0.2,
          });
        }
      }
      return dots;
    },
    []
  );

  /* ── Render loop ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas || !container || !ctx) return;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dotsRef.current = buildGrid(rect.width, rect.height);
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    /* Mouse tracking */
    function handleMouseMove(e: MouseEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    /* Animation loop */
    function draw(timestamp: number) {
      if (!ctx || !canvas) return;
      timeRef.current = timestamp;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isMobile = mx < -9000;

      const dots = dotsRef.current;

      // Update dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        if (isMobile) {
          // Ambient wave on mobile / no mouse
          const wave =
            Math.sin(timestamp * 0.0008 + dot.baseX * 0.008) *
            Math.cos(timestamp * 0.0006 + dot.baseY * 0.006) *
            3;
          dot.x = dot.baseX + wave;
          dot.y = dot.baseY + wave * 0.6;
          dot.radius = BASE_RADIUS;
          dot.opacity = 0.18 + Math.sin(timestamp * 0.001 + i * 0.02) * 0.05;
        } else {
          const dx = mx - dot.baseX;
          const dy = my - dot.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const factor = 1 - dist / MOUSE_RADIUS;
            const push = factor * 12;
            // Push away from cursor
            dot.x = dot.baseX - (dx / dist) * push;
            dot.y = dot.baseY - (dy / dist) * push;
            dot.radius = BASE_RADIUS + factor * 2;
            dot.opacity = 0.2 + factor * 0.6;
          } else {
            // Ease back
            dot.x += (dot.baseX - dot.x) * 0.08;
            dot.y += (dot.baseY - dot.y) * 0.08;
            dot.radius += (BASE_RADIUS - dot.radius) * 0.08;
            dot.opacity += (0.18 - dot.opacity) * 0.08;
          }
        }
      }

      // Draw connections near mouse
      if (!isMobile) {
        for (let i = 0; i < dots.length; i++) {
          const a = dots[i];
          const da = Math.sqrt(
            (mx - a.x) * (mx - a.x) + (my - a.y) * (my - a.y)
          );
          if (da > MOUSE_RADIUS * 1.2) continue;

          for (let j = i + 1; j < dots.length; j++) {
            const b = dots[j];
            const db = Math.sqrt(
              (mx - b.x) * (mx - b.x) + (my - b.y) * (my - b.y)
            );
            if (db > MOUSE_RADIUS * 1.2) continue;

            const dist = Math.sqrt(
              (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)
            );
            if (dist < MAX_CONNECTION_DIST) {
              const lineOpacity =
                (1 - dist / MAX_CONNECTION_DIST) *
                Math.min(a.opacity, b.opacity) *
                0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${DOT_COLOR_R},${DOT_COLOR_G},${DOT_COLOR_B},${lineOpacity})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      // Draw dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR_R},${DOT_COLOR_G},${DOT_COLOR_B},${dot.opacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [buildGrid]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-slate-950 py-24 md:py-32"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Gradient fades at edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="mb-5 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-400 backdrop-blur-sm">
            Our Philosophy
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl"
        >
          Intelligence, Woven
          <br className="hidden sm:block" />
          Into Everything
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg"
        >
          We don&apos;t bolt AI onto existing systems. We architect it into the
          core — so intelligence isn&apos;t a feature, it&apos;s the foundation.
        </motion.p>
      </div>
    </section>
  );
}
