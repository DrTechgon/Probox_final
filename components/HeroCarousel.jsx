"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Magnetic from "@/components/ui/magnetic";

const slides = [
  {
    id: 1,
    eyebrow: "AI + Engineering",
    heading: "Intelligence, engineered.",
    subtext:
      "Production-grade AI systems that turn raw data into decisions — not dashboards.",
    buttonLabel: "Explore AI Solutions",
    videoSrc: "/videos/AI_Abstract_Background_Video_Generation.mp4",
  },
  {
    id: 2,
    eyebrow: "Secure by Design",
    heading: "Defense without the friction.",
    subtext:
      "Zero-trust architecture, continuous monitoring, and hardened pipelines — baked in from day zero.",
    buttonLabel: "See Our Approach",
    videoSrc: "/videos/cybersec.mp4",
  },
  {
    id: 3,
    eyebrow: "Cloud · Scale · Speed",
    heading: "Built to ship. Ready to scale.",
    subtext:
      "From prototype to millions of requests — infrastructure that grows with you, never holds you back.",
    buttonLabel: "Start Your Build",
  },
];

const TRUSTED_MARKS = [
  "Enterprise-grade",
  "ISO 27001 aligned",
  "Global delivery",
  "24 / 7 engineering",
  "SOC 2 minded",
  "Remote-first ops",
];

const AUTOPLAY_MS = 6500;
const TRANSITION_EASE = [0.22, 1, 0.36, 1];

const wrapIndex = (index, total) => ((index % total) + total) % total;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pointerIdleTimeoutRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Parallax + fade as user scrolls past hero */
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);

  const total = slides.length;
  const activeSlide = slides[current];

  const paginate = useCallback(
    (index, nextDirection) => {
      setDirection(nextDirection);
      setCurrent(wrapIndex(index, total));
    },
    [total]
  );

  const nextSlide = useCallback(() => {
    paginate(current + 1, 1);
  }, [current, paginate]);

  const prevSlide = useCallback(() => {
    paginate(current - 1, -1);
  }, [current, paginate]);

  const goToSlide = useCallback(
    (index) => {
      if (index === current) return;
      const forwardDistance = (index - current + total) % total;
      const backwardDistance = (current - index + total) % total;
      paginate(index, forwardDistance <= backwardDistance ? 1 : -1);
    },
    [current, paginate, total]
  );

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timeoutId = window.setTimeout(() => {
      paginate(current + 1, 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timeoutId);
  }, [current, isPaused, paginate, total]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") prevSlide();
      if (event.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (customDirection) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : {
            x: customDirection > 0 ? "8%" : "-8%",
            opacity: 0,
            scale: 1.04,
            filter: "blur(14px)",
          },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : {
            x: { duration: 1.1, ease: TRANSITION_EASE },
            opacity: { duration: 0.7, ease: "easeOut" },
            scale: { duration: 1.1, ease: TRANSITION_EASE },
            filter: { duration: 0.7, ease: "easeOut" },
          },
    },
    exit: (customDirection) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : {
            x: customDirection > 0 ? "-6%" : "6%",
            opacity: 0,
            scale: 0.98,
            filter: "blur(14px)",
            transition: {
              x: { duration: 0.9, ease: TRANSITION_EASE },
              opacity: { duration: 0.5, ease: "easeOut" },
              scale: { duration: 0.9, ease: TRANSITION_EASE },
              filter: { duration: 0.5, ease: "easeOut" },
            },
          },
  };

  const contentVariants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0 }
        : { delayChildren: 0.15, staggerChildren: 0.08 },
    },
  };

  const contentItemVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 28, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : { duration: 0.75, ease: TRANSITION_EASE },
    },
  };

  const pauseWhilePointerMoves = () => {
    setIsPaused(true);
    if (pointerIdleTimeoutRef.current) {
      window.clearTimeout(pointerIdleTimeoutRef.current);
    }
    pointerIdleTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 220);
  };

  const resumeAutoplay = () => {
    if (pointerIdleTimeoutRef.current) {
      window.clearTimeout(pointerIdleTimeoutRef.current);
      pointerIdleTimeoutRef.current = null;
    }
    setIsPaused(false);
  };

  useEffect(() => {
    return () => {
      if (pointerIdleTimeoutRef.current) {
        window.clearTimeout(pointerIdleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[680px] w-full select-none overflow-hidden"
      onMouseMove={pauseWhilePointerMoves}
      onMouseLeave={resumeAutoplay}
      aria-roledescription="carousel"
      aria-label="Hero carousel"
    >
      {/* ── Parallax media stage ── */}
      <motion.div
        className="absolute inset-0"
        style={
          prefersReducedMotion
            ? undefined
            : { y: mediaY, scale: mediaScale }
        }
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 overflow-hidden bg-[#0b1020]"
          >
            {activeSlide.videoSrc ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                key={activeSlide.videoSrc}
              >
                <source src={activeSlide.videoSrc} type="video/mp4" />
              </video>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_20%,rgba(201,133,69,0.35),transparent_45%),radial-gradient(900px_circle_at_80%_70%,rgba(56,189,248,0.28),transparent_45%)]" />
            )}
            <div className="hero-noise absolute inset-0 opacity-[0.35] mix-blend-overlay" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Cinematic vignette overlays ── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(4,8,20,0.7)_100%)]"
        style={prefersReducedMotion ? undefined : { opacity: overlayOpacity }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-[#f7f2eb]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-32 bg-gradient-to-b from-black/35 to-transparent"
      />

      {/* ── Corner brackets (production feel) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[3] hidden md:block"
      >
        <div className="absolute left-8 top-24 h-10 w-10 border-l border-t border-white/25" />
        <div className="absolute right-8 top-24 h-10 w-10 border-r border-t border-white/25" />
        <div className="absolute left-8 bottom-28 h-10 w-10 border-l border-b border-white/25" />
        <div className="absolute right-8 bottom-28 h-10 w-10 border-r border-b border-white/25" />
      </div>

      {/* ── Fixed meta chrome (top-left ID + top-right slide count) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 z-[4] hidden justify-between px-10 md:flex"
      >
        <div className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/60">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#c98545] shadow-[0_0_10px_#c98545]" />
          Probox · Live Reel
        </div>
        <div className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-white/60">
          Frame {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      {/* ── Slide content ── */}
      <motion.div
        className="relative z-[5] flex h-full w-full items-center justify-center px-6"
        style={
          prefersReducedMotion
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`content-${activeSlide.id}`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex max-w-4xl flex-col items-center text-center"
          >
            <motion.span
              variants={contentItemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white/75 backdrop-blur-md"
            >
              <Sparkles className="h-3 w-3 text-[#e8a869]" strokeWidth={2} />
              {activeSlide.eyebrow}
            </motion.span>

            <motion.h1
              variants={contentItemVariants}
              className="font-display text-balance text-[clamp(2.5rem,6.5vw,5.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.4)]"
            >
              {activeSlide.heading}
            </motion.h1>

            <motion.p
              variants={contentItemVariants}
              className="mx-auto mt-6 max-w-xl text-pretty text-[clamp(0.95rem,1.55vw,1.15rem)] leading-relaxed text-white/75"
            >
              {activeSlide.subtext}
            </motion.p>

            <motion.div
              variants={contentItemVariants}
              className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-6"
            >
              <Magnetic>
                <button className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#e8a869]/40 bg-[#c98545] px-8 py-4 text-[0.85rem] font-semibold text-white shadow-[0_16px_40px_rgba(201,133,69,0.4)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(201,133,69,0.55)]">
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-0 translate-x-[-105%] bg-gradient-to-r from-[#d4a060] via-[#e8a869] to-[#d4a060] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0"
                  />
                  <span className="relative z-10">{activeSlide.buttonLabel}</span>
                  <span className="relative z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#8a531f] transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </span>
                </button>
              </Magnetic>

              <button className="group inline-flex items-center gap-2 text-[0.85rem] font-semibold tracking-wide text-white/80 transition duration-300 hover:text-white">
                <span className="inline-block h-[1px] w-6 bg-white/60 transition-all duration-300 group-hover:w-10 group-hover:bg-[#e8a869]" />
                <span>Watch the story</span>
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Bottom chrome: nav arrows + scroll cue + dots ── */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6]">
        {/* Trusted strip */}
        <div className="pointer-events-auto relative mx-auto max-w-full overflow-hidden border-y border-white/10 bg-black/25 backdrop-blur-md">
          <div className="flex whitespace-nowrap">
            <div className="flex shrink-0 animate-marquee items-center gap-10 px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-white/65">
              {[...TRUSTED_MARKS, ...TRUSTED_MARKS].map((mark, i) => (
                <span key={i} className="inline-flex items-center gap-3">
                  <span className="inline-block h-1 w-1 rounded-full bg-[#c98545]" />
                  {mark}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8 md:px-12">
          <button
            onClick={prevSlide}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:h-12 sm:w-12"
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
          </button>

          {/* Scroll cue */}
          <div className="pointer-events-none flex flex-col items-center gap-2 text-white/75">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.3em]">
              Scroll
            </span>
            <div className="relative h-8 w-5 rounded-full border border-white/40">
              <span className="scroll-wheel-dot absolute left-1/2 top-1 h-1.5 w-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Dots */}
          <div className="pointer-events-auto flex items-center gap-3">
            {slides.map((slide, index) => {
              const isActive = index === current;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="group relative flex h-5 items-center justify-center"
                >
                  <motion.span
                    animate={{
                      width: isActive ? 32 : 6,
                      backgroundColor: isActive
                        ? "rgba(232,168,105,1)"
                        : "rgba(255,255,255,0.4)",
                    }}
                    transition={{ duration: 0.4, ease: TRANSITION_EASE }}
                    className="block h-[3px] rounded-full shadow-[0_0_8px_rgba(201,133,69,0.6)]"
                  />
                </button>
              );
            })}
          </div>

          <button
            onClick={nextSlide}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 sm:h-12 sm:w-12"
            aria-label="Next slide"
          >
            <ArrowRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
