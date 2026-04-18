"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Current from "./primitives/Current";
import GlassLayers from "./primitives/GlassLayers";
import Sediment from "./primitives/Sediment";
import FogField from "./primitives/FogField";
import Lattice from "./primitives/Lattice";
import SerifFragment from "./primitives/SerifFragment";
import EditorialEyebrow from "./primitives/EditorialEyebrow";

const EASE = [0.22, 1, 0.36, 1] as const;

type ServiceDef = {
  index: string;
  title: string;
  adjective: string;
  material: string;
  description: string;
  primitive: React.ComponentType<{ className?: string }>;
};

const SERVICES: ServiceDef[] = [
  {
    index: "01",
    title: "Adaptive Intelligence",
    adjective: "currents",
    material: "that listen",
    description:
      "Production AI systems — co-pilots, forecasting, retrieval, agents — tuned to the decisions your business actually makes, not someone else's benchmark.",
    primitive: Current,
  },
  {
    index: "02",
    title: "Structural Resilience",
    adjective: "glass",
    material: "that shields",
    description:
      "Zero-trust perimeters, identity graphs, and threat response designed as layered transparency. What's visible is cleaner. What's protected is invisible.",
    primitive: GlassLayers,
  },
  {
    index: "03",
    title: "Granular Order",
    adjective: "sediment",
    material: "that settles",
    description:
      "Pipelines, warehouses, and semantic layers that turn scattered signal into ordered rows — observable, governed, replayable when the answer needs to be exact.",
    primitive: Sediment,
  },
  {
    index: "04",
    title: "Ambient Infrastructure",
    adjective: "fog",
    material: "that supports",
    description:
      "Distributed, self-healing platforms — Kubernetes, multi-cloud, edge — engineered to fade into the background while the product stays forward.",
    primitive: FogField,
  },
  {
    index: "05",
    title: "Modular Construction",
    adjective: "lattice",
    material: "that snaps true",
    description:
      "Precision-built engineering: event-driven cores, service meshes, contract-tested modules. Pieces that belong to each other.",
    primitive: Lattice,
  },
];

export default function StudioServices() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const clamped = Math.max(0, Math.min(0.9999, v));
      const idx = Math.floor(clamped * SERVICES.length);
      setActive(idx);
    });
  }, [scrollYProgress]);

  const activeService = SERVICES[active];
  const ActiveVisual = activeService.primitive;

  const jumpTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const totalScroll = el.offsetHeight - window.innerHeight;
    const target =
      window.scrollY + rect.top + (i / SERVICES.length) * totalScroll + 4;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      id="studio-services"
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      {/* DESKTOP sticky orchestrator */}
      <div className="sticky top-0 hidden h-screen md:block">
        <div className="mx-auto grid h-full w-full max-w-[1400px] grid-cols-12 items-center gap-8 px-12">
          {/* LEFT — service list */}
          <div className="col-span-5 flex flex-col">
            <EditorialEyebrow index="03" label="Five Materials" />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="studio-display mt-10 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.02] text-[color:var(--s-ink)]"
            >
              Five disciplines,{" "}
              <SerifFragment className="text-[color:var(--s-amber)]">
                five materials
              </SerifFragment>
              . One quiet system.
            </motion.h2>

            <div className="mt-12 space-y-1">
              {SERVICES.map((s, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={s.index}
                    onClick={() => jumpTo(i)}
                    className="group relative w-full border-b border-[color:var(--s-line)] py-5 text-left"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--s-muted)]">
                        {s.index}
                      </span>
                      <div className="flex-1">
                        <div
                          className={`studio-display text-[clamp(1.25rem,1.6vw,1.6rem)] leading-tight transition-colors duration-500 ${
                            isActive
                              ? "text-[color:var(--s-ink)]"
                              : "text-[color:var(--s-muted)] group-hover:text-[color:var(--s-ink-2)]"
                          }`}
                        >
                          {s.title}
                        </div>
                        <div
                          className={`mt-1 text-[12px] transition-opacity duration-500 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <span className="studio-serif text-[color:var(--s-amber)]">
                            {s.adjective}
                          </span>
                          <span className="text-[color:var(--s-ink-2)]">
                            {" "}
                            {s.material}
                          </span>
                        </div>
                      </div>
                      <motion.span
                        aria-hidden
                        initial={false}
                        animate={{
                          width: isActive ? 28 : 12,
                          opacity: isActive ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="h-px bg-[color:var(--s-ink)]"
                      />
                    </div>
                    {isActive && (
                      <motion.span
                        layoutId="studio-services-rail"
                        transition={{ duration: 0.6, ease: EASE }}
                        className="absolute -left-3 top-1/2 h-8 w-[2px] -translate-y-1/2 bg-[color:var(--s-amber)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — active material panel */}
          <div className="col-span-7 flex h-full items-center">
            <div className="relative w-full overflow-hidden rounded-sm border border-[color:var(--s-line)] bg-[color:var(--s-pearl)] shadow-[0_40px_80px_-40px_rgba(28,26,23,0.35)]">
              <div className="relative aspect-[4/3] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <ActiveVisual />
                  </motion.div>
                </AnimatePresence>

                {/* frame chrome */}
                <div className="pointer-events-none absolute inset-0 z-[2]">
                  <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-ink-2)]">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--s-amber)]" />
                    Field · {activeService.index}
                  </div>
                  <div className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
                    {activeService.adjective}
                  </div>
                  {/* corner ticks */}
                  {["left-2 top-2", "right-2 top-2", "left-2 bottom-2", "right-2 bottom-2"].map((p, i) => (
                    <span
                      key={i}
                      className={`absolute ${p} h-3 w-3`}
                      style={{
                        borderTopWidth: p.includes("top") ? 1 : 0,
                        borderBottomWidth: p.includes("bottom") ? 1 : 0,
                        borderLeftWidth: p.includes("left") ? 1 : 0,
                        borderRightWidth: p.includes("right") ? 1 : 0,
                        borderColor: "var(--s-ink-2)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* caption band */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cap-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="relative z-[3] grid grid-cols-12 items-start gap-6 border-t border-[color:var(--s-line)] bg-[color:var(--s-bone)] px-6 py-6"
                >
                  <div className="col-span-5">
                    <div className="studio-display text-[clamp(1.1rem,1.4vw,1.5rem)] leading-tight text-[color:var(--s-ink)]">
                      {activeService.title}
                    </div>
                    <div className="mt-1 studio-serif text-[14px] text-[color:var(--s-amber)]">
                      — {activeService.adjective} {activeService.material}
                    </div>
                  </div>
                  <p className="col-span-6 text-[13.5px] leading-relaxed text-[color:var(--s-ink-2)]">
                    {activeService.description}
                  </p>
                  <a
                    href="#studio-cta"
                    className="group col-span-1 flex items-center justify-end gap-1 text-[color:var(--s-ink-2)] transition-colors hover:text-[color:var(--s-amber)]"
                  >
                    <ArrowUpRight size={18} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE stacked view */}
      <div className="md:hidden">
        <div className="px-6 py-16">
          <EditorialEyebrow index="03" label="Five Materials" />
          <h2 className="studio-display mt-8 text-[2rem] leading-[1] text-[color:var(--s-ink)]">
            Five disciplines,{" "}
            <SerifFragment className="text-[color:var(--s-amber)]">
              five materials
            </SerifFragment>
            .
          </h2>
        </div>
        <div className="space-y-10 px-6 pb-20">
          {SERVICES.map((s) => {
            const Visual = s.primitive;
            return (
              <div
                key={s.index}
                className="overflow-hidden rounded-sm border border-[color:var(--s-line)] bg-[color:var(--s-pearl)]"
              >
                <div className="relative aspect-[5/4]">
                  <Visual />
                </div>
                <div className="border-t border-[color:var(--s-line)] bg-[color:var(--s-bone)] p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
                    {s.index}
                  </div>
                  <div className="studio-display mt-2 text-[1.4rem] leading-tight text-[color:var(--s-ink)]">
                    {s.title}
                  </div>
                  <div className="mt-1 studio-serif text-[14px] text-[color:var(--s-amber)]">
                    — {s.adjective} {s.material}
                  </div>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-[color:var(--s-ink-2)]">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
