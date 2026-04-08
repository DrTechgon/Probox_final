"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    heading: "Slide One",
    subtext: "A short placeholder description for the first slide.",
    buttonLabel: "Learn More",
    videoSrc: "/videos/AI_Abstract_Background_Video_Generation.mp4",
  },
  {
    id: 2,
    heading: "Slide Two",
    subtext: "A short placeholder description for the second slide.",
    buttonLabel: "Get Started",
    videoSrc: "/videos/cybersec.mp4",
  },
  {
    id: 3,
    heading: "Slide Three",
    subtext: "A short placeholder description for the third slide.",
    buttonLabel: "Explore",
  },
];

const AUTOPLAY_MS = 6000;
const TRANSITION_EASE = [0.22, 1, 0.36, 1];

const wrapIndex = (index, total) => ((index % total) + total) % total;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pointerIdleTimeoutRef = useRef(null);

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
      if (index === current) {
        return;
      }

      const forwardDistance = (index - current + total) % total;
      const backwardDistance = (current - index + total) % total;

      paginate(index, forwardDistance <= backwardDistance ? 1 : -1);
    },
    [current, paginate, total]
  );

  useEffect(() => {
    if (isPaused || total <= 1) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      paginate(current + 1, 1);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [current, isPaused, paginate, total]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      }

      if (event.key === "ArrowRight") {
        nextSlide();
      }
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
            scale: 0.985,
            filter: "blur(10px)",
          },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : {
            x: { duration: 0.9, ease: TRANSITION_EASE },
            opacity: { duration: 0.55, ease: "easeOut" },
            scale: { duration: 0.9, ease: TRANSITION_EASE },
            filter: { duration: 0.55, ease: "easeOut" },
          },
    },
    exit: (customDirection) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : {
            x: customDirection > 0 ? "-6%" : "6%",
            opacity: 0,
            scale: 1.015,
            filter: "blur(12px)",
            transition: {
              x: { duration: 0.75, ease: TRANSITION_EASE },
              opacity: { duration: 0.4, ease: "easeOut" },
              scale: { duration: 0.75, ease: TRANSITION_EASE },
              filter: { duration: 0.4, ease: "easeOut" },
            },
          },
  };

  const contentVariants = {
    hidden: {},
    visible: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0 }
        : {
            delayChildren: 0.12,
            staggerChildren: 0.08,
          },
    },
  };

  const contentItemVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : {
            duration: 0.6,
            ease: TRANSITION_EASE,
          },
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
      className="relative h-screen w-full select-none overflow-hidden"
      onMouseMove={pauseWhilePointerMoves}
      onMouseLeave={resumeAutoplay}
      aria-roledescription="carousel"
      aria-label="Hero carousel"
    >
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 overflow-hidden bg-white"
          >
            {activeSlide.videoSrc ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={activeSlide.videoSrc} type="video/mp4" />
              </video>
            ) : null}

            {!activeSlide.videoSrc ? <div className="hero-noise absolute inset-0 opacity-20" /> : null}

            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center"
            >
              <motion.span
                variants={contentItemVariants}
                className="mb-5 inline-block rounded-full border border-slate-900/10 bg-slate-900/[0.04] px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-400"
              >
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </motion.span>

              <motion.h1
                variants={contentItemVariants}
                className="max-w-3xl text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-900"
              >
                {activeSlide.heading}
              </motion.h1>

              <motion.p
                variants={contentItemVariants}
                className="mx-auto mt-5 max-w-md text-[clamp(0.875rem,1.5vw,1.125rem)] leading-relaxed text-slate-400 sm:mt-6"
              >
                {activeSlide.subtext}
              </motion.p>

              <motion.div variants={contentItemVariants} className="mt-9 sm:mt-10">
                <button className="rounded-full border border-slate-900/15 bg-slate-900/[0.05] px-8 py-3.5 text-[0.8rem] font-medium tracking-wide text-slate-700 transition-all duration-300 hover:border-slate-900/25 hover:bg-slate-900/[0.1] hover:text-slate-900">
                  {activeSlide.buttonLabel}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-5 sm:px-8 lg:px-12">
        <button
          onClick={prevSlide}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/[0.08] bg-slate-900/[0.04] text-slate-400 backdrop-blur-md transition-all duration-300 hover:border-slate-900/20 hover:bg-slate-900/[0.08] hover:text-slate-900 sm:h-12 sm:w-12"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.5} />
        </button>

        <button
          onClick={nextSlide}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-900/[0.08] bg-slate-900/[0.04] text-slate-400 backdrop-blur-md transition-all duration-300 hover:border-slate-900/20 hover:bg-slate-900/[0.08] hover:text-slate-900 sm:h-12 sm:w-12"
          aria-label="Next slide"
        >
          <ArrowRight className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.5} />
        </button>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:bottom-12">
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
                  width: isActive ? 28 : 3,
                  backgroundColor: isActive
                    ? "rgba(15, 23, 42, 1)"
                    : "rgba(15, 23, 42, 0.2)",
                }}
                transition={{ duration: 0.35, ease: TRANSITION_EASE }}
                className="block h-[3px] rounded-full"
              />
            </button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-slate-100/60 to-transparent" />
    </section>
  );
}
