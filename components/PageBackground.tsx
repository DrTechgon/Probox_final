"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* ─── Color interpolation helper ──────────────────────────── */

function lerpColor(a: string, b: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.substring(0, 2), 16),
      parseInt(h.substring(2, 4), 16),
      parseInt(h.substring(4, 6), 16),
    ];
  };
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}

/* ─── Scroll-driven color stops ───────────────────────────── */
// Warm ivory → soft peach → dusty lavender → back to warm
const COLOR_STOPS = [
  { at: 0.0, color: "#f7f2eb" },
  { at: 0.3, color: "#f5ede3" },
  { at: 0.55, color: "#f0ecf2" },
  { at: 0.8, color: "#eef0f4" },
  { at: 1.0, color: "#f3efe8" },
];

function getScrollColor(progress: number): string {
  for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
    const curr = COLOR_STOPS[i];
    const next = COLOR_STOPS[i + 1];
    if (progress >= curr.at && progress <= next.at) {
      const t = (progress - curr.at) / (next.at - curr.at);
      return lerpColor(curr.color, next.color, t);
    }
  }
  return COLOR_STOPS[COLOR_STOPS.length - 1].color;
}

/* ─── Blob configuration ──────────────────────────────────── */

interface BlobConfig {
  /** CSS color with alpha — kept subtle */
  color: string;
  /** Pixel diameter */
  size: number;
  /** Starting left % */
  x: string;
  /** Starting top in vh */
  yVh: number;
  /** Drift animation duration (s) */
  drift: number;
  /** Parallax multiplier — how much scroll displacement */
  parallax: number;
  /** Blur radius px */
  blur: number;
}

const BLOBS: BlobConfig[] = [
  // ── Back layer (slow parallax, large, very faint) ──
  {
    color: "rgba(201,133,69,0.055)",
    size: 700,
    x: "-5%",
    yVh: 8,
    drift: 28,
    parallax: -0.08,
    blur: 120,
  },
  {
    color: "rgba(160,140,200,0.04)",
    size: 650,
    x: "55%",
    yVh: 40,
    drift: 34,
    parallax: -0.06,
    blur: 110,
  },
  {
    color: "rgba(140,180,160,0.035)",
    size: 550,
    x: "25%",
    yVh: 75,
    drift: 30,
    parallax: -0.05,
    blur: 100,
  },

  // ── Mid layer (moderate parallax) ──
  {
    color: "rgba(201,133,69,0.045)",
    size: 400,
    x: "70%",
    yVh: 15,
    drift: 22,
    parallax: -0.15,
    blur: 90,
  },
  {
    color: "rgba(120,100,180,0.04)",
    size: 380,
    x: "10%",
    yVh: 50,
    drift: 26,
    parallax: -0.12,
    blur: 85,
  },

  // ── Front layer (faster parallax, smaller, subtlest) ──
  {
    color: "rgba(200,160,120,0.035)",
    size: 280,
    x: "45%",
    yVh: 25,
    drift: 18,
    parallax: -0.25,
    blur: 70,
  },
  {
    color: "rgba(150,130,190,0.03)",
    size: 260,
    x: "80%",
    yVh: 65,
    drift: 20,
    parallax: -0.22,
    blur: 65,
  },
];

/* Unique drift path per blob to avoid synchronized motion */
const DRIFT_PATHS = [
  { x: [0, 50, -35, 25, 0], y: [0, -40, 30, -20, 0], s: [1, 1.06, 0.94, 1.03, 1] },
  { x: [0, -40, 30, -20, 0], y: [0, 35, -25, 15, 0], s: [1, 0.95, 1.07, 0.97, 1] },
  { x: [0, 30, -45, 35, 0], y: [0, -30, 40, -25, 0], s: [1, 1.04, 0.96, 1.05, 1] },
  { x: [0, -35, 45, -30, 0], y: [0, 25, -35, 20, 0], s: [1, 0.97, 1.06, 0.95, 1] },
  { x: [0, 45, -25, 40, 0], y: [0, -45, 20, -30, 0], s: [1, 1.05, 0.93, 1.04, 1] },
  { x: [0, -30, 40, -25, 0], y: [0, 30, -40, 35, 0], s: [1, 0.96, 1.08, 0.97, 1] },
  { x: [0, 35, -30, 20, 0], y: [0, -25, 35, -15, 0], s: [1, 1.03, 0.95, 1.06, 1] },
];

/* ─── Parallax blob component ─────────────────────────────── */

function ParallaxBlob({
  config,
  index,
  scrollYProgress,
}: {
  config: BlobConfig;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const drift = DRIFT_PATHS[index % DRIFT_PATHS.length];

  // Parallax: translate Y based on scroll progress
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [0, config.parallax * 1200]
  );

  return (
    <motion.div
      className="pointer-events-none absolute rounded-full will-change-transform"
      style={{
        width: config.size,
        height: config.size,
        left: config.x,
        top: `${config.yVh}vh`,
        background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
        filter: `blur(${config.blur}px)`,
        y: yOffset,
      }}
      animate={{
        x: drift.x,
        y: drift.y,
        scale: drift.s,
      }}
      transition={{
        duration: config.drift,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Cursor glow component ───────────────────────────────── */

function CursorGlow() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const prefersReducedMotion = useReducedMotion();

  // Smooth spring follow so it doesn't feel jittery
  const springConfig = { damping: 35, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      mouseX.set(-500);
      mouseY.set(-500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[1] hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        width: 500,
        height: 500,
        background:
          "radial-gradient(circle, rgba(201,133,69,0.06) 0%, rgba(201,133,69,0.02) 35%, transparent 65%)",
        borderRadius: "50%",
        filter: "blur(10px)",
      }}
    />
  );
}

/* ─── Main PageBackground ─────────────────────────────────── */

export default function PageBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Drive the background color from scroll position
  useEffect(() => {
    if (prefersReducedMotion) {
      if (bgRef.current) {
        bgRef.current.style.backgroundColor = COLOR_STOPS[0].color;
      }
      return;
    }

    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (bgRef.current) {
        bgRef.current.style.backgroundColor = getScrollColor(v);
      }
    });

    return unsubscribe;
  }, [scrollYProgress, prefersReducedMotion]);

  return (
    <>
      {/* ── Base color layer (scroll-driven) ── */}
      <div
        ref={bgRef}
        className="pointer-events-none fixed inset-0 z-0"
        style={{ backgroundColor: COLOR_STOPS[0].color }}
      />

      {/* ── Film grain (consistent across page) ── */}
      <div className="hero-noise pointer-events-none fixed inset-0 z-0 opacity-[0.35]" />

      {/* ── Parallax blob field ── */}
      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {BLOBS.map((blob, i) => (
          <ParallaxBlob
            key={i}
            config={blob}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* ── Cursor glow ── */}
      <CursorGlow />
    </>
  );
}
