"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = {
  studio: [
    { label: "Work", href: "#studio-impact" },
    { label: "Services", href: "#studio-services" },
    { label: "Process", href: "/" },
    { label: "Careers", href: "/#careers" },
  ],
  contact: [
    { label: "hello@probox.example", href: "mailto:hello@probox.example" },
    { label: "LinkedIn", href: "#" },
    { label: "X / Twitter", href: "#" },
    { label: "Dossier", href: "#studio-cta" },
  ],
  shelf: [
    { label: "Main site", href: "/" },
    { label: "AI practice", href: "/ai-services-v2" },
    { label: "Press kit", href: "#" },
    { label: "Manifesto", href: "#" },
  ],
};

export default function StudioFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--s-line)] bg-[color:var(--s-bone)]">
      {/* residue canvas — calm drifting particles echoing the hero */}
      <ResidueCanvas />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-28 pb-14 md:px-12 md:pt-40">
        {/* closing fragment */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[color:var(--s-ink-2)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-ink-2)]">
              Probox · Studio
            </span>
          </div>
          <p className="studio-serif mt-6 text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.2] text-[color:var(--s-ink)]">
            A quiet practice for systems that must hold.
          </p>
        </motion.div>

        {/* hairline */}
        <div className="studio-hairline my-16 md:my-24" />

        {/* nav clusters */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
              Wordmark
            </div>
            <div className="studio-display mt-3 text-[clamp(2rem,4vw,3.25rem)] leading-[0.9] tracking-[-0.03em] text-[color:var(--s-ink)]">
              Probox
              <span className="studio-serif text-[color:var(--s-amber)]">/</span>
              Studio
            </div>
            <Magnetic strength={0.25} radius={100}>
              <a
                href="mailto:hello@probox.example"
                className="group mt-6 inline-flex items-center gap-2 text-[13px] font-medium text-[color:var(--s-ink-2)] underline-offset-4 hover:text-[color:var(--s-amber)] hover:underline"
              >
                hello@probox.example
                <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </div>

          <FooterCluster title="Studio" items={LINKS.studio} />
          <FooterCluster title="Contact" items={LINKS.contact} />
          <FooterCluster title="Shelf" items={LINKS.shelf} />
        </div>

        {/* bottom row */}
        <div className="mt-20 flex flex-wrap items-baseline justify-between gap-4 border-t border-[color:var(--s-line)] pt-6 text-[color:var(--s-muted)]">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} · Probox Infotech
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Edition · Studio · v1
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Field recording · Liquid grid at rest
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCluster({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="col-span-6 md:col-span-2">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--s-muted)]">
        {title}
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="group inline-flex items-center gap-1.5 text-[13px] text-[color:var(--s-ink-2)] transition-colors hover:text-[color:var(--s-ink)]"
            >
              <span className="relative">
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--s-ink)] transition-transform duration-500 group-hover:scale-x-100" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Quiet drifting particle field — no cursor interaction, just settled matter */
function ResidueCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    type P = { x: number; y: number; vx: number; vy: number; size: number; phase: number };
    let parts: P[] = [];

    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(40, Math.floor((w * h) / 24000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.08,
        size: 0.8 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize);

    let raf = 0;
    let t = 0;
    const loop = () => {
      t += prefersReduced ? 0 : 0.004;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        if (!prefersReduced) {
          p.x += p.vx + Math.sin(t + p.phase) * 0.06;
          p.y += p.vy + Math.cos(t * 0.5 + p.phase) * 0.04;
        }
        if (p.x < -2) p.x = w + 2;
        if (p.x > w + 2) p.x = -2;
        if (p.y < -2) p.y = h + 2;
        if (p.y > h + 2) p.y = -2;
        ctx.fillStyle = "rgba(28,26,23,0.22)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
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
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-48 w-full md:h-64"
    />
  );
}
