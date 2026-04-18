"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import EditorialEyebrow from "./primitives/EditorialEyebrow";
import SerifFragment from "./primitives/SerifFragment";

const EASE = [0.22, 1, 0.36, 1] as const;

const VALUES = [
  { label: "Intent", line: "Every build starts with the question nobody asked." },
  { label: "Rigor", line: "The tests others skip are the ones we write first." },
  { label: "Care", line: "Craft is the interface you don't notice." },
  { label: "Ship", line: "A system that runs beats a system that was planned." },
];

/*
  StudioWhy — particles scattered across the composition self-organise into
  four precise horizontal rules, one per value, as you scroll.
  Each line's label materialises once the settlement completes.
*/
export default function StudioWhy() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 40%"],
  });
  const progress = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 90,
  });

  useMotionValueEvent(progress, "change", (v) => {
    progRef.current = Math.max(0, Math.min(1, v));
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    type P = {
      sx: number; sy: number; // scatter anchor
      tx: number; ty: number; // target (line) anchor
      x: number; y: number;   // current render position
      jx: number; jy: number; // jitter amplitude
      phase: number;
    };
    let particles: P[] = [];
    const ROWS = 4;
    const PER_ROW = 68;

    const build = () => {
      const r = stage.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = [];
      const marginY = h * 0.16;
      const usableH = h - marginY * 2;
      for (let row = 0; row < ROWS; row++) {
        const ty = marginY + (row / (ROWS - 1)) * usableH;
        for (let i = 0; i < PER_ROW; i++) {
          const tx = (i / (PER_ROW - 1)) * (w - 80) + 40;
          particles.push({
            sx: Math.random() * w,
            sy: Math.random() * h,
            tx,
            ty,
            x: 0,
            y: 0,
            jx: (Math.random() - 0.5) * 4,
            jy: (Math.random() - 0.5) * 2.5,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);

      const p = progRef.current;
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      for (let k = 0; k < particles.length; k++) {
        const q = particles[k];
        // lerp scatter → target with ambient jitter scaling down as we settle
        const wobble = (1 - eased) * 0.6 + 0.4;
        const x = q.sx + (q.tx - q.sx) * eased + Math.sin(t + q.phase) * q.jx * wobble;
        const y = q.sy + (q.ty - q.sy) * eased + Math.cos(t * 0.7 + q.phase) * q.jy * wobble;

        const alpha = 0.25 + eased * 0.55;
        ctx.fillStyle = `rgba(28,26,23,${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.3 + eased * 0.8, 0, Math.PI * 2);
        ctx.fill();
        q.x = x;
        q.y = y;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-[1400px] px-6 pt-10 pb-24 md:px-12 md:pt-20 md:pb-32"
    >
      <EditorialEyebrow index="04" label="Operating principles" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="studio-display mt-10 max-w-3xl text-[clamp(2rem,6vw,5rem)] leading-[0.95] text-[color:var(--s-ink)] md:mt-14"
      >
        Order, drawn out of{" "}
        <SerifFragment className="text-[color:var(--s-amber)]">friction</SerifFragment>.
      </motion.h2>

      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[color:var(--s-ink-2)]">
        Scroll slowly. What begins as scatter resolves into the four
        principles we ship by.
      </p>

      {/* stage */}
      <div
        ref={stageRef}
        className="relative mt-16 aspect-[16/9] w-full overflow-hidden rounded-sm border border-[color:var(--s-line)] bg-[color:var(--s-pearl)] md:mt-24"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* value labels — positioned along the rows */}
        <div className="pointer-events-none absolute inset-0">
          {VALUES.map((v, i) => {
            const topPct = 16 + (i / (VALUES.length - 1)) * 68;
            return (
              <div
                key={v.label}
                className="absolute flex w-full items-baseline justify-between px-6"
                style={{ top: `${topPct}%`, transform: "translateY(-50%)" }}
              >
                <ValueLabel index={i} label={v.label} />
                <ValueLine index={i} text={v.line} />
              </div>
            );
          })}
        </div>

        {/* paper grain on stage */}
        <div aria-hidden className="studio-paper pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply" />

        {/* corner ticks */}
        {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map(
          (p, i) => (
            <span
              key={i}
              className={`pointer-events-none absolute ${p} h-3 w-3`}
              style={{
                borderTopWidth: p.includes("top") ? 1 : 0,
                borderBottomWidth: p.includes("bottom") ? 1 : 0,
                borderLeftWidth: p.includes("left") ? 1 : 0,
                borderRightWidth: p.includes("right") ? 1 : 0,
                borderColor: "var(--s-ink-2)",
              }}
            />
          )
        )}
      </div>
    </section>
  );
}

function ValueLabel({ index, label }: { index: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.4 + index * 0.15 }}
      className="flex items-baseline gap-3 bg-[color:var(--s-pearl)] pr-3"
    >
      <span className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--s-muted)]">
        0{index + 1}
      </span>
      <span className="studio-display text-[clamp(1rem,1.8vw,1.75rem)] text-[color:var(--s-ink)]">
        {label}
      </span>
    </motion.div>
  );
}

function ValueLine({ index, text }: { index: number; text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.55 + index * 0.15 }}
      className="studio-serif max-w-[320px] bg-[color:var(--s-pearl)] pl-3 text-right text-[13px] text-[color:var(--s-ink-2)]"
    >
      {text}
    </motion.p>
  );
}
