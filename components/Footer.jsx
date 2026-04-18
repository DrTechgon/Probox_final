"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronUp,
  Mail,
  Linkedin,
  Twitter,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PointerArrow } from "@/components/ui/pointer-arrow";

const EASE = [0.22, 1, 0.36, 1];

/* ─── Navigation Data ────────────────────────────────────────── */
const NAV_CLUSTERS = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "#" },
      { label: "About", href: "#" },
      { label: "Careers", href: "#careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Solutions", href: "/ai-services-v2" },
      { label: "Cybersecurity", href: "#" },
      { label: "DevOps", href: "#" },
      { label: "Cloud", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: "mailto:hello@proboxinfotech.com" },
      { label: "LinkedIn", href: "#" },
      { label: "Twitter / X", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: Mail, label: "Email", href: "mailto:hello@proboxinfotech.com" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

/* ═══════════════════════════════════════════════════════════════
   PARTICLE FIELD — interactive constellation that drifts + reacts
   ═══════════════════════════════════════════════════════════════ */
function FooterParticleField({ containerRef }) {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles = [];
    let animationId = 0;
    let t = 0;

    const PARTICLE_COUNT = 75;
    const CONNECTION_DISTANCE = 155;
    const MOUSE_INFLUENCE = 260;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          baseR: Math.random() * 1.6 + 1.2,
          r: 0,
          phase: Math.random() * Math.PI * 2,
          drift: 0.4 + Math.random() * 0.6,
        });
      }
    };

    resize();
    seed();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(container);

    const animate = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(t * p.drift + p.phase) * 0.05;
        p.y += p.vy + Math.cos(t * p.drift + p.phase) * 0.05;

        // Wrap edges
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Mouse magnetic pull
        let glow = 0;
        if (mActive) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_INFLUENCE && dist > 0.001) {
            glow = 1 - dist / MOUSE_INFLUENCE;
            const force = glow * glow * 1.8;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        p.r = p.baseR + Math.sin(t * 2 + p.phase) * 0.35 + glow * 3.2;

        // Color blend: deep slate -> warm brand near cursor
        const mix = glow;
        const r = Math.round(71 + (201 - 71) * mix);
        const g = Math.round(85 + (133 - 85) * mix);
        const b = Math.round(105 + (69 - 105) * mix);
        const alpha = 0.65 + glow * 0.35;

        // Outer halo for particles near cursor
        if (glow > 0.08) {
          const haloAlpha = glow * 0.38;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,133,69,${haloAlpha})`;
          ctx.fill();

          // Inner bright core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212,160,96,${glow * 0.22})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }

      // Particle-to-particle connections
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const dist = Math.sqrt(dist2);
            const baseAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.32;
            let warm = 0;
            if (mActive) {
              const mdA = Math.hypot(a.x - mx, a.y - my);
              const mdB = Math.hypot(b.x - mx, b.y - my);
              const nearest = Math.min(mdA, mdB);
              if (nearest < MOUSE_INFLUENCE) {
                warm = 1 - nearest / MOUSE_INFLUENCE;
              }
            }
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            if (warm > 0.05) {
              ctx.strokeStyle = `rgba(201,133,69,${Math.min(0.85, baseAlpha + warm * 0.6)})`;
              ctx.lineWidth = 0.95 + warm * 0.6;
            } else {
              ctx.strokeStyle = `rgba(100,116,139,${baseAlpha})`;
              ctx.lineWidth = 0.8;
            }
            ctx.stroke();
          }
        }
      }

      // Cursor-to-particle threads
      if (mActive) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < MOUSE_INFLUENCE * MOUSE_INFLUENCE) {
            const dist = Math.sqrt(dist2);
            const t01 = 1 - dist / MOUSE_INFLUENCE;
            const alpha = t01 * 0.75;
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(201,133,69,${alpha})`;
            ctx.lineWidth = 0.6 + t01 * 1.2;
            ctx.stroke();
          }
        }

        // Bright cursor anchor node
        const pulse = 0.5 + Math.sin(t * 5) * 0.5;
        ctx.beginPath();
        ctx.arc(mx, my, 26 + pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,133,69,${0.06 + pulse * 0.05})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mx, my, 14, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(201,133,69,0.18)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mx, my, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,160,96,0.95)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      ro.disconnect();
    };
  }, [prefersReducedMotion, containerRef]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full md:block"
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   CURSOR GLOW — dual-tone radial light that follows the cursor
   ═══════════════════════════════════════════════════════════════ */
function FooterCursorGlow({ containerRef }) {
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const prefersReducedMotion = useReducedMotion();

  const springConfig = { damping: 28, stiffness: 110, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 40, stiffness: 70, mass: 1.0 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  const handleMouseMove = useCallback(
    (e) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [containerRef, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-600);
    mouseY.set(-600);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [prefersReducedMotion, containerRef, handleMouseMove, handleMouseLeave]);

  if (prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none absolute z-[2] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(201,133,69,0.22) 0%, rgba(201,133,69,0.09) 30%, rgba(201,133,69,0.03) 55%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(10px)",
          mixBlendMode: "multiply",
        }}
      />
      <motion.div
        className="pointer-events-none absolute z-[2] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 720,
          height: 720,
          background:
            "radial-gradient(circle, rgba(140,130,200,0.12) 0%, rgba(140,130,200,0.04) 40%, transparent 65%)",
          borderRadius: "50%",
          filter: "blur(28px)",
        }}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC WRAPPER — attracts content toward cursor
   ═══════════════════════════════════════════════════════════════ */
function Magnetic({ children, strength = 0.2, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReducedMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAV CLUSTER — column of magnetic links with underline trail
   ═══════════════════════════════════════════════════════════════ */
function FooterNavCluster({ title, links, clusterIndex }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: clusterIndex * 0.08, ease: EASE }}
    >
      <div className="flex items-center gap-2.5">
        <span className="h-1 w-1 rounded-full bg-[#c98545]" />
        <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
          {title}
        </h4>
      </div>
      <ul className="mt-5 space-y-3.5">
        {links.map((link, i) => (
          <li key={link.label}>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: clusterIndex * 0.08 + (i + 1) * 0.05,
                ease: EASE,
              }}
            >
              <Magnetic strength={0.15} className="inline-block">
                <Link
                  href={link.href}
                  className="group relative inline-flex items-center gap-1.5 text-[0.95rem] text-slate-600 transition-colors duration-250 hover:text-slate-900"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 rounded-full bg-gradient-to-r from-[#c98545] via-[#d4a060] to-[#c98545]/30 shadow-[0_1px_6px_rgba(201,133,69,0.35)] transition-all duration-300 ease-out group-hover:w-full" />
                  </span>
                  <ArrowUpRight className="h-3 w-3 -translate-x-1 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-50" />
                </Link>
              </Magnetic>
            </motion.div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   AMBIENT GRADIENT LINE — slow-flowing horizontal accent
   ═══════════════════════════════════════════════════════════════ */
function AmbientLine() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,133,69,0.45), rgba(212,160,96,0.3), transparent)",
          }}
          animate={{ x: ["-33%", "433%"] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SOCIAL ICON BUTTON — rounded square with magnetic hover
   ═══════════════════════════════════════════════════════════════ */
function SocialIcon({ icon: Icon, label, href, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.4 + index * 0.08,
        ease: EASE,
      }}
    >
      <Magnetic strength={0.3}>
        <motion.a
          href={href}
          aria-label={label}
          className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/60 bg-white/50 text-slate-500 backdrop-blur-md transition-all duration-300 hover:border-[#c98545]/40 hover:text-[#8a531f] hover:shadow-[0_8px_24px_rgba(201,133,69,0.18)]"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.94 }}
        >
          {/* Hover gradient fill */}
          <span className="absolute inset-0 bg-gradient-to-br from-[#c98545]/0 via-[#d4a060]/0 to-[#c98545]/0 opacity-0 transition-opacity duration-300 group-hover:from-[#c98545]/10 group-hover:via-[#d4a060]/10 group-hover:to-[#c98545]/10 group-hover:opacity-100" />
          {/* Inner glow */}
          <span className="absolute inset-0 rounded-2xl opacity-0 shadow-[inset_0_0_20px_rgba(201,133,69,0.2)] transition-opacity duration-300 group-hover:opacity-100" />
          <Icon className="relative z-10 h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
        </motion.a>
      </Magnetic>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BRAND BLOCK — logo integrated seamlessly into the footer flow
   ═══════════════════════════════════════════════════════════════ */
function BrandBlock({ inView }) {
  return (
    <div className="relative">
      {/* Ambient halo — diffuse warm glow behind logo, no container */}
      <motion.div
        className="pointer-events-none absolute -left-20 -top-16 -z-10 h-[360px] w-[480px]"
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0 blur-[90px]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(201,133,69,0.18) 0%, rgba(212,160,96,0.08) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Logo with shimmer sweep */}
      <motion.div
        className="relative inline-block"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      >
        <Image
          src="/brand/probox-logo-wordmark-transparent.png"
          alt="Probox Infotech"
          width={953}
          height={266}
          className="h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(201,133,69,0.2)] sm:h-[72px] md:h-20"
          priority={false}
        />
        {/* Shimmer sweep over logo */}
        <motion.div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="absolute inset-y-0 w-20 -skew-x-12"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
            }}
            animate={{ x: ["-100px", "460px"] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Gradient accent line with live shimmer */}
      <motion.div
        className="relative mt-7 h-[2px] w-24 overflow-hidden rounded-full"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        style={{ originX: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#c98545] via-[#d4a060] to-[#c98545]/30" />
        <motion.div
          className="absolute inset-y-0 w-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
          }}
          animate={{ x: ["-40px", "100px"] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
        className="mt-6 max-w-md font-display text-[1.1rem] leading-relaxed text-slate-700 md:text-[1.2rem]"
      >
        Engineering{" "}
        <span className="bg-gradient-to-r from-[#c98545] to-[#d4a060] bg-clip-text font-semibold text-transparent">
          intelligent systems
        </span>{" "}
        for a digital-first world.
      </motion.p>

      {/* Meta row: status + location */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
        className="mt-7 flex flex-wrap items-center gap-3"
      >
        {/* Status pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/60 px-3 py-1.5 text-[0.72rem] font-medium text-emerald-700 backdrop-blur-sm">
          <span className="relative flex h-1.5 w-1.5">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
              animate={{ scale: [1, 2.2, 1], opacity: [0.7, 0, 0.7] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          Available for new projects
        </div>

        {/* Location pill */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/60 bg-white/50 px-3 py-1.5 text-[0.72rem] font-medium text-slate-500 backdrop-blur-sm">
          <MapPin className="h-3 w-3" />
          Global · Remote-first
        </div>
      </motion.div>

      {/* Social icons inline with brand */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
        className="mt-8 flex items-center gap-3"
      >
        {SOCIAL_LINKS.map((social, i) => (
          <SocialIcon
            key={social.label}
            icon={social.icon}
            label={social.label}
            href={social.href}
            index={i}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO CTA — massive closing statement with ripple button
   ═══════════════════════════════════════════════════════════════ */
function HeroCTA({ ctaRef, inView }) {
  const [ripple, setRipple] = useState(null);

  const handleRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
    });
  };

  return (
    <div className="relative text-center">
      {/* Eyebrow label */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-500 shadow-sm backdrop-blur-sm"
      >
        <Sparkles className="h-3 w-3 text-[#c98545]" />
        Let&apos;s collaborate
      </motion.div>

      {/* Huge display heading */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[4.5rem]"
      >
        Let&apos;s build something{" "}
        <span className="relative inline-block">
          <span className="relative z-10 bg-gradient-to-r from-[#c98545] via-[#d4a060] to-[#c98545] bg-clip-text text-transparent">
            exceptional
          </span>
          {/* Underline accent */}
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#c98545]/60 to-transparent"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
          />
        </span>
        .
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
        className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-slate-500 md:text-[1.1rem]"
      >
        Ready to transform your vision into reality? Let&apos;s talk about what
        we can create together.
      </motion.p>

      {/* Premium CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        className="mt-10"
      >
        <Magnetic strength={0.25}>
          <motion.a
            ref={ctaRef}
            href="mailto:hello@proboxinfotech.com"
            onClick={handleRipple}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#c98545]/30 bg-gradient-to-r from-[#c98545] to-[#d4a060] px-10 py-4 text-[0.95rem] font-semibold text-white shadow-[0_16px_48px_rgba(201,133,69,0.3)] transition-all duration-500 hover:shadow-[0_22px_64px_rgba(201,133,69,0.4)]"
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Gradient shift overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#d4a060] to-[#c98545] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {/* Inner glow pulse */}
            <span className="absolute inset-0 rounded-full opacity-0 shadow-[inset_0_0_24px_rgba(255,255,255,0.2)] transition-opacity duration-300 group-hover:opacity-100" />

            {/* Ripple */}
            <AnimatePresence>
              {ripple && (
                <motion.span
                  key={ripple.id}
                  className="absolute rounded-full bg-white/25"
                  initial={{
                    width: 0,
                    height: 0,
                    left: ripple.x,
                    top: ripple.y,
                    x: "-50%",
                    y: "-50%",
                  }}
                  animate={{
                    width: 500,
                    height: 500,
                    opacity: [0.6, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  onAnimationComplete={() => setRipple(null)}
                />
              )}
            </AnimatePresence>

            {/* Shine sweep */}
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <span className="relative z-10">Start a conversation</span>
            <span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/25 transition-all duration-300 group-hover:rotate-45 group-hover:bg-white/35">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </motion.a>
        </Magnetic>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BACK TO TOP — smooth scroll-to-top pill
   ═══════════════════════════════════════════════════════════════ */
function BackToTop() {
  return (
    <Magnetic strength={0.3}>
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="group relative inline-flex items-center gap-2 rounded-full border border-slate-200/50 bg-white/60 px-4 py-2 text-[0.75rem] font-medium text-slate-500 backdrop-blur-sm transition-all duration-300 hover:border-[#c98545]/30 hover:bg-white/80 hover:text-slate-700 hover:shadow-[0_6px_24px_rgba(201,133,69,0.12)]"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
      >
        <ChevronUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        Back to top
      </motion.button>
    </Magnetic>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN FOOTER
   ═══════════════════════════════════════════════════════════════ */
export default function Footer() {
  const footerRef = useRef(null);
  const heroRef = useRef(null);
  const brandRef = useRef(null);
  const ctaRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const heroVisible = useInView(heroRef, { amount: 0.3 });
  const brandInView = useInView(brandRef, { once: true, amount: 0.2 });

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* ── Transition zone: layered SVG curves ── */}
      <div className="pointer-events-none relative -mt-px">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,20 C360,100 1080,100 1440,20 V100 H0 Z"
            fill="rgba(255,255,255,0.25)"
          />
          <path
            d="M0,50 C480,100 960,100 1440,50 V100 H0 Z"
            fill="rgba(255,255,255,0.35)"
          />
        </svg>
        <div className="h-12 bg-gradient-to-b from-white/25 to-transparent" />
      </div>

      {/* ── Interactive particle constellation ── */}
      <FooterParticleField containerRef={footerRef} />

      {/* ── Cursor-reactive dual glow ── */}
      <FooterCursorGlow containerRef={footerRef} />

      <PointerArrow
        active={heroVisible}
        color="rgba(201, 133, 69, 1)"
        containerRef={footerRef}
        targetRef={ctaRef}
      />

      {/* ── Background decorations ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(100,116,139,0.35) 1px, transparent 1.2px)",
            backgroundSize: "34px 34px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
        />
        {/* Large warm ambient blob — upper right */}
        <motion.div
          className="absolute -right-48 top-0 h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(201,133,69,0.22) 0%, rgba(201,133,69,0.08) 40%, transparent 70%)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Cool ambient blob — lower left */}
        <motion.div
          className="absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, rgba(140,130,200,0.16) 0%, rgba(140,130,200,0.05) 45%, transparent 70%)",
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Center accent */}
        <div
          className="absolute left-1/2 top-1/4 h-[360px] w-[760px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,133,69,0.1) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-16 md:px-8 md:pb-14 md:pt-24">
        {/* ─── 1. HERO CTA STATEMENT ─── */}
        <div ref={heroRef} className="mb-20 md:mb-28">
          <HeroCTA ctaRef={ctaRef} inView={heroInView} />
        </div>

        {/* ─── 2. AMBIENT SEPARATOR ─── */}
        <AmbientLine />

        {/* ─── 3. BRAND BLOCK + NAV CLUSTERS ─── */}
        <div
          ref={brandRef}
          className="mt-16 grid gap-16 md:mt-20 md:grid-cols-12 md:gap-10"
        >
          {/* Brand block — 6 columns, integrated seamlessly */}
          <div className="md:col-span-6">
            <BrandBlock inView={brandInView} />
          </div>

          {/* Nav clusters — 6 columns */}
          <div className="md:col-span-6 md:pt-2">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {NAV_CLUSTERS.map((cluster, i) => (
                <FooterNavCluster
                  key={cluster.title}
                  title={cluster.title}
                  links={cluster.links}
                  clusterIndex={i}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── 4. BOTTOM BAR ─── */}
        <div className="mt-20 md:mt-24">
          <AmbientLine />

          <div className="flex flex-col items-center justify-between gap-5 pt-6 md:flex-row">
            <p className="text-[0.78rem] text-slate-400">
              &copy; {new Date().getFullYear()} Probox Infotech. Crafted with
              intent.
            </p>

            <div className="flex items-center gap-6">
              <Magnetic strength={0.15}>
                <Link
                  href="#"
                  className="text-[0.78rem] text-slate-400 transition-colors duration-200 hover:text-slate-700"
                >
                  Privacy Policy
                </Link>
              </Magnetic>
              <span className="h-3 w-px bg-slate-200/70" />
              <Magnetic strength={0.15}>
                <Link
                  href="#"
                  className="text-[0.78rem] text-slate-400 transition-colors duration-200 hover:text-slate-700"
                >
                  Terms of Service
                </Link>
              </Magnetic>
              <span className="h-3 w-px bg-slate-200/70" />
              <BackToTop />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
