"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import EditorialEyebrow from "./primitives/EditorialEyebrow";
import SerifFragment from "./primitives/SerifFragment";

const EASE = [0.22, 1, 0.36, 1] as const;

const STAGES = [
  {
    index: "i",
    label: "Discovery",
    material: "Fog",
    display: "Ambiguity,",
    accent: "honestly.",
    body:
      "We begin by mapping what you actually have — signals, constraints, the parts nobody owns. No theatre, no 40-slide decks. Clarity before motion.",
  },
  {
    index: "ii",
    label: "Design",
    material: "Structure",
    display: "Structure,",
    accent: "then ornament.",
    body:
      "Architectures as blueprints. Contracts before code. The boring decisions made carefully, so the interesting ones can move fast later.",
  },
  {
    index: "iii",
    label: "Deploy",
    material: "Precision",
    display: "Precision,",
    accent: "with receipts.",
    body:
      "Systems shipped with observability, runbooks, and hand-off. Your team owns what we leave behind.",
  },
];

type StageIndex = 0 | 1 | 2;

export default function StudioProcess() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const prog = useSpring(scrollYProgress, { damping: 30, stiffness: 90 });

  /* Per-stage opacity ramps */
  const fogOp = useTransform(prog, [0, 0.28, 0.42], [1, 1, 0]);
  const structOp = useTransform(prog, [0.22, 0.5, 0.7], [0, 1, 0]);
  const precOp = useTransform(prog, [0.58, 0.8, 1], [0, 1, 1]);

  /* Structure stroke-dash draw */
  const structDraw = useTransform(prog, [0.22, 0.58], [0, 1]);
  /* Precision fill */
  const precFill = useTransform(prog, [0.58, 0.95], [0, 1]);

  /* Stage index for caption */
  const captionIdx = useTransform<number, StageIndex>(prog, (v) => {
    if (v < 0.38) return 0;
    if (v < 0.72) return 1;
    return 2;
  });

  /* Stage-indicator dot position */
  const dotY = useTransform(prog, (v) => `${v * 100}%`);

  return (
    <section
      ref={ref}
      className="relative w-full"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid h-full w-full max-w-[1400px] grid-cols-12 items-center gap-8 px-6 md:px-12">
          {/* LEFT — stage visual */}
          <div className="col-span-12 md:col-span-7">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-sm border border-[color:var(--s-line)] bg-[color:var(--s-pearl)]">
              {/* Layer — Fog (Discovery) */}
              <motion.div style={{ opacity: fogOp }} className="absolute inset-0">
                <FogLayer />
              </motion.div>

              {/* Layer — Structure (Design) */}
              <motion.div style={{ opacity: structOp }} className="absolute inset-0">
                <StructureLayer draw={structDraw} />
              </motion.div>

              {/* Layer — Precision (Deploy) */}
              <motion.div style={{ opacity: precOp }} className="absolute inset-0">
                <PrecisionLayer fill={precFill} />
              </motion.div>

              {/* frame chrome */}
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-ink-2)]">
                <motion.span
                  className="h-2 w-2 rounded-full bg-[color:var(--s-amber)]"
                />
                <StageTag prog={prog} />
              </div>
              <div className="pointer-events-none absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
                Transformation
              </div>
            </div>
          </div>

          {/* RIGHT — stage copy */}
          <div className="col-span-12 md:col-span-5">
            <EditorialEyebrow index="05" label="Process · Fog to Precision" />

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="studio-display mt-8 text-[clamp(1.75rem,4vw,3.25rem)] leading-[1] text-[color:var(--s-ink)]"
            >
              We move matter from{" "}
              <SerifFragment className="text-[color:var(--s-amber)]">
                fog
              </SerifFragment>
              {" "}to{" "}
              <SerifFragment className="text-[color:var(--s-amber)]">
                form
              </SerifFragment>
              .
            </motion.h2>

            {/* stage captions crossfade */}
            <div className="relative mt-10 min-h-[220px]">
              {STAGES.map((s, i) => (
                <StageCaption key={s.index} stage={s} activeIdx={captionIdx} i={i} />
              ))}
            </div>

            {/* scrub rail */}
            <div className="mt-10 flex items-center gap-4">
              <div className="relative h-px w-full bg-[color:var(--s-line)]">
                <motion.span
                  aria-hidden
                  style={{ left: dotY }}
                  className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--s-amber)]"
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
                i · ii · iii
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageTag({ prog }: { prog: MotionValue<number> }) {
  const label = useTransform<number, string>(prog, (v) =>
    v < 0.38 ? "Stage · Fog" : v < 0.72 ? "Stage · Structure" : "Stage · Precision"
  );
  return <motion.span>{label}</motion.span>;
}

function StageCaption({
  stage,
  activeIdx,
  i,
}: {
  stage: (typeof STAGES)[number];
  activeIdx: MotionValue<StageIndex>;
  i: number;
}) {
  const opacity = useTransform(activeIdx, (v) => (v === i ? 1 : 0));
  const y = useTransform(activeIdx, (v) => (v === i ? 0 : 8));

  return (
    <motion.div
      style={{ opacity, y }}
      transition={{ duration: 0.6, ease: EASE }}
      className="absolute inset-0"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
          {stage.index}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-ink-2)]">
          {stage.label}
        </span>
      </div>
      <h3 className="studio-display mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight text-[color:var(--s-ink)]">
        {stage.display}{" "}
        <span className="studio-serif text-[color:var(--s-amber)]">
          {stage.accent}
        </span>
      </h3>
      <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[color:var(--s-ink-2)]">
        {stage.body}
      </p>
    </motion.div>
  );
}

/* ─── Layers ─────────────────────────────────────────── */

function FogLayer() {
  return (
    <div className="absolute inset-0">
      {[
        { size: 420, x: "10%", y: "20%" },
        { size: 380, x: "55%", y: "30%" },
        { size: 500, x: "25%", y: "55%" },
        { size: 340, x: "65%", y: "58%" },
      ].map((b, i) => (
        <motion.div
          key={i}
          aria-hidden
          animate={{ x: [0, 20, -10, 0], y: [0, -16, 10, 0] }}
          transition={{
            duration: 18 + i * 3,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.x,
            top: b.y,
            background:
              "radial-gradient(closest-side, rgba(232,227,216,0.95), transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      ))}
      <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
        Ambiguity · signal diffuse
      </div>
    </div>
  );
}

function StructureLayer({ draw }: { draw: MotionValue<number> }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke="rgba(28,26,23,0.5)" strokeWidth="0.8" fill="none">
        {[
          "M 60 60 L 440 60",
          "M 60 120 L 440 120",
          "M 60 180 L 440 180",
          "M 60 240 L 440 240",
          "M 60 300 L 440 300",
          "M 60 340 L 440 340",
          "M 60 60 L 60 340",
          "M 140 60 L 140 340",
          "M 220 60 L 220 340",
          "M 300 60 L 300 340",
          "M 380 60 L 380 340",
          "M 440 60 L 440 340",
          "M 60 60 L 440 340",
          "M 440 60 L 60 340",
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            pathLength={1}
            style={{ pathLength: draw }}
            strokeDasharray="1 1"
          />
        ))}
      </g>
      <text
        x="60"
        y="380"
        fill="rgba(28,26,23,0.6)"
        fontSize="9"
        letterSpacing="3"
        style={{ fontFamily: "monospace", textTransform: "uppercase" }}
      >
        Blueprint · contracts first
      </text>
    </svg>
  );
}

function PrecisionLayer({ fill }: { fill: MotionValue<number> }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* base grid */}
      <g stroke="rgba(28,26,23,0.25)" strokeWidth="0.5" fill="none">
        <rect x="60" y="60" width="380" height="280" />
        <line x1="60" y1="200" x2="440" y2="200" />
        <line x1="250" y1="60" x2="250" y2="340" />
      </g>
      {/* filled modules */}
      {[
        { x: 60, y: 60, w: 190, h: 140 },
        { x: 250, y: 60, w: 190, h: 70 },
        { x: 250, y: 130, w: 95, h: 70 },
        { x: 60, y: 200, w: 95, h: 140 },
        { x: 155, y: 200, w: 190, h: 70 },
        { x: 345, y: 200, w: 95, h: 140 },
        { x: 155, y: 270, w: 95, h: 70 },
      ].map((m, i) => (
        <motion.rect
          key={i}
          x={m.x}
          y={m.y}
          width={m.w}
          height={m.h}
          fill="rgba(28,26,23,0.08)"
          stroke="rgba(28,26,23,0.6)"
          strokeWidth="0.8"
          style={{ opacity: fill }}
        />
      ))}
      {/* accent */}
      <motion.circle
        cx="345"
        cy="165"
        r="6"
        fill="rgba(168,121,74,1)"
        style={{ opacity: fill }}
      />
      <text
        x="60"
        y="380"
        fill="rgba(28,26,23,0.7)"
        fontSize="9"
        letterSpacing="3"
        style={{ fontFamily: "monospace", textTransform: "uppercase" }}
      >
        Shipped · observable
      </text>
    </svg>
  );
}
