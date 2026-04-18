"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Spotlight from "@/components/ui/spotlight";
import EditorialEyebrow from "./primitives/EditorialEyebrow";
import SerifFragment from "./primitives/SerifFragment";

const EASE = [0.22, 1, 0.36, 1] as const;

type Panel = {
  code: string;
  material: string;
  discipline: string;
  quote: string;
  metricLabel: string;
  metricValue: string;
};

const PANELS: Panel[] = [
  {
    code: "FN-01",
    material: "Pipeline",
    discipline: "Data & Observability",
    quote:
      "We turned a 14-hour nightly job into a 19-minute stream of events. The system now sleeps while it works.",
    metricLabel: "Latency",
    metricValue: "−92%",
  },
  {
    code: "FN-02",
    material: "Perimeter",
    discipline: "Identity & Access",
    quote:
      "Zero trust without ceremony. The auth graph fits on one page — and every path is proven.",
    metricLabel: "Tokens rotated / day",
    metricValue: "4,200",
  },
  {
    code: "FN-03",
    material: "Copilot",
    discipline: "Applied AI",
    quote:
      "An LLM agent that refuses the wrong answer better than it writes the right one.",
    metricLabel: "First-touch resolution",
    metricValue: "63%",
  },
  {
    code: "FN-04",
    material: "Fabric",
    discipline: "Platform",
    quote:
      "Multi-cloud as one surface, kept honest by contract tests that run in production.",
    metricLabel: "Availability",
    metricValue: "99.98%",
  },
  {
    code: "FN-05",
    material: "Atelier",
    discipline: "Handover",
    quote:
      "The team we shipped this with now ships it themselves. That was the point.",
    metricLabel: "Escalations post-handoff",
    metricValue: "0",
  },
];

export default function StudioImpact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const [dist, setDist] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const prog = useSpring(scrollYProgress, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      const vw = window.innerWidth;
      setDist(Math.max(0, rail.scrollWidth - vw + 96));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(prog, [0, 1], [0, -dist]);
  const progressBar = useTransform(prog, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="studio-impact"
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* header band */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-28 md:px-12 md:pt-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <EditorialEyebrow index="06" label="Field notes · Impact" />
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ duration: 0.9, ease: EASE }}
                className="studio-display mt-6 max-w-3xl text-[clamp(2rem,5vw,4rem)] leading-[1] text-[color:var(--s-ink)]"
              >
                Things we've shipped —{" "}
                <SerifFragment className="text-[color:var(--s-amber)]">
                  still running
                </SerifFragment>
                .
              </motion.h2>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
              {PANELS.length} fragments
            </div>
          </div>
        </div>

        {/* horizontal rail */}
        <Spotlight
          className="mt-10 flex-1"
          color="rgba(168,121,74,0.12)"
          size={520}
        >
          <div className="relative h-full w-full overflow-hidden">
            <motion.div
              ref={railRef}
              style={{ x }}
              className="flex h-full items-center gap-6 pl-6 pr-24 md:gap-10 md:pl-12"
            >
              {PANELS.map((p, i) => (
                <ImpactPanel key={p.code} panel={p} i={i} />
              ))}
              {/* tail card */}
              <div className="flex h-[62vh] min-w-[340px] max-w-[360px] flex-col justify-between rounded-sm border border-[color:var(--s-line)] bg-[color:var(--s-bone)] p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
                  End of rail
                </span>
                <div>
                  <p className="studio-serif text-[clamp(1.1rem,1.5vw,1.35rem)] leading-snug text-[color:var(--s-ink-2)]">
                    More work under NDA. Ask for the longer list.
                  </p>
                  <a
                    href="#studio-cta"
                    className="mt-6 inline-block text-[11px] font-medium uppercase tracking-[0.26em] text-[color:var(--s-ink)] underline-offset-4 hover:underline"
                  >
                    Request the dossier →
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </Spotlight>

        {/* scrub bar */}
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-12 md:px-12">
          <div className="flex items-center gap-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
              Scroll → drift
            </span>
            <div className="relative h-px flex-1 bg-[color:var(--s-line)]">
              <motion.div
                style={{ width: progressBar }}
                className="absolute left-0 top-0 h-full bg-[color:var(--s-ink)]"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
              01 — 05
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactPanel({ panel, i }: { panel: Panel; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
      className="relative flex h-[62vh] min-w-[460px] max-w-[520px] flex-col justify-between rounded-sm border border-[color:var(--s-line)] bg-[color:var(--s-pearl)] p-8 shadow-[0_30px_80px_-40px_rgba(28,26,23,0.35)]"
    >
      {/* corner ticks */}
      {["left-3 top-3", "right-3 top-3", "left-3 bottom-3", "right-3 bottom-3"].map(
        (pos) => (
          <span
            key={pos}
            aria-hidden
            className={`absolute ${pos} h-3 w-3`}
            style={{
              borderTopWidth: pos.includes("top") ? 1 : 0,
              borderBottomWidth: pos.includes("bottom") ? 1 : 0,
              borderLeftWidth: pos.includes("left") ? 1 : 0,
              borderRightWidth: pos.includes("right") ? 1 : 0,
              borderColor: "var(--s-ink-2)",
            }}
          />
        )
      )}

      <header>
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
            {panel.code}
          </span>
          <span className="studio-serif text-[14px] text-[color:var(--s-amber)]">
            {panel.material}
          </span>
        </div>
        <div className="studio-hairline mt-5" />
      </header>

      <div className="mt-6 flex-1">
        <p className="studio-serif text-[clamp(1.2rem,1.55vw,1.55rem)] leading-[1.3] text-[color:var(--s-ink)]">
          “{panel.quote}”
        </p>
      </div>

      <footer className="mt-6 flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
            Discipline
          </div>
          <div className="mt-1 text-[13px] font-medium text-[color:var(--s-ink-2)]">
            {panel.discipline}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
            {panel.metricLabel}
          </div>
          <div className="studio-display mt-1 text-[clamp(1.25rem,1.6vw,1.75rem)] leading-none text-[color:var(--s-ink)]">
            {panel.metricValue}
          </div>
        </div>
      </footer>
    </motion.article>
  );
}
