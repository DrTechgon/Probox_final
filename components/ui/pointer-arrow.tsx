"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

type PointerArrowProps = {
  active?: boolean;
  className?: string;
  color?: string;
  containerRef?: RefObject<HTMLElement | null>;
  targetRef: RefObject<HTMLElement | null>;
};

const FALLBACK_COLOR: RgbColor = { r: 201, g: 133, b: 69 };
const PROXIMITY_RADIUS = 380;
const MIN_VISIBLE_PROGRESS = 0.08;

function parseRgbColor(colorString: string | null): RgbColor | null {
  if (!colorString) return null;

  const match = colorString.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
  );

  if (!match) return null;

  return {
    r: Number.parseInt(match[1], 10),
    g: Number.parseInt(match[2], 10),
    b: Number.parseInt(match[3], 10),
  };
}

function getDistanceToRect(
  x: number,
  y: number,
  rect: DOMRect
): { distance: number; isInside: boolean } {
  const isInside =
    x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

  if (isInside) {
    return { distance: 0, isInside: true };
  }

  const dx = Math.max(rect.left - x, 0, x - rect.right);
  const dy = Math.max(rect.top - y, 0, y - rect.bottom);

  return {
    distance: Math.hypot(dx, dy),
    isInside: false,
  };
}

export function PointerArrow({
  active = true,
  className,
  color = "var(--foreground)",
  containerRef,
  targetRef,
}: PointerArrowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mousePosRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });
  const viewportRef = useRef({ width: 0, height: 0 });
  const resolvedColorRef = useRef<RgbColor>(FALLBACK_COLOR);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!active || prefersReducedMotion) return;

    const tempElement = document.createElement("div");
    tempElement.style.display = "none";
    document.body.appendChild(tempElement);

    const resolveColor = () => {
      tempElement.style.color = color;
      resolvedColorRef.current =
        parseRgbColor(getComputedStyle(tempElement).color) ?? FALLBACK_COLOR;
    };

    resolveColor();

    const observer = new MutationObserver(() => {
      resolveColor();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      observer.disconnect();
      tempElement.remove();
    };
  }, [active, color, prefersReducedMotion]);

  const drawArrow = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const targetElement = targetRef.current;
    const { x, y } = mousePosRef.current;

    if (!active || !canvas || !context || !targetElement || x === null || y === null) {
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    const isOffscreen =
      rect.bottom <= 0 ||
      rect.top >= window.innerHeight ||
      rect.right <= 0 ||
      rect.left >= window.innerWidth;

    if (isOffscreen) return;

    const { distance: proximityDistance, isInside } = getDistanceToRect(
      x,
      y,
      rect
    );

    if (isInside || proximityDistance > PROXIMITY_RADIUS) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(centerY - y, centerX - x);
    const endX = centerX - Math.cos(angle) * (rect.width / 2 + 14);
    const endY = centerY - Math.sin(angle) * (rect.height / 2 + 14);
    const midX = (x + endX) / 2;
    const midY = (y + endY) / 2;
    const offset = Math.min(220, Math.hypot(endX - x, endY - y) * 0.5);
    const tension = Math.max(-1, Math.min(1, (y - endY) / 220));
    const controlX = midX;
    const controlY = midY + offset * tension;
    const proximityProgress = 1 - proximityDistance / PROXIMITY_RADIUS;

    if (proximityProgress <= MIN_VISIBLE_PROGRESS) return;

    const opacity = Math.min(
      0.92,
      0.18 + Math.pow(proximityProgress, 0.75) * 0.72
    );

    if (opacity <= 0) return;

    const arrowColor = resolvedColorRef.current;
    context.strokeStyle = `rgba(${arrowColor.r}, ${arrowColor.g}, ${arrowColor.b}, ${opacity})`;
    context.lineWidth = 2;

    context.save();
    context.beginPath();
    context.moveTo(x, y);
    context.quadraticCurveTo(controlX, controlY, endX, endY);
    context.setLineDash([10, 5]);
    context.stroke();
    context.restore();

    const headAngle = Math.atan2(endY - controlY, endX - controlX);
    const headLength = 13;

    context.beginPath();
    context.moveTo(endX, endY);
    context.lineTo(
      endX - headLength * Math.cos(headAngle - Math.PI / 6),
      endY - headLength * Math.sin(headAngle - Math.PI / 6)
    );
    context.moveTo(endX, endY);
    context.lineTo(
      endX - headLength * Math.cos(headAngle + Math.PI / 6),
      endY - headLength * Math.sin(headAngle + Math.PI / 6)
    );
    context.stroke();
  }, [active, targetRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!active || !canvas || prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    contextRef.current = context;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      viewportRef.current = { width, height };
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const clearCanvas = () => {
      const { width, height } = viewportRef.current;
      context.clearRect(0, 0, width, height);
    };

    const handlePointerMove = (event: Event) => {
      const pointerEvent = event as PointerEvent;
      mousePosRef.current = { x: pointerEvent.clientX, y: pointerEvent.clientY };
    };

    const handlePointerLeave = () => {
      mousePosRef.current = { x: null, y: null };
      clearCanvas();
    };

    const pointerContainer = containerRef?.current;
    const moveTarget: HTMLElement | Window = pointerContainer ?? window;
    const leaveTarget = pointerContainer;

    resizeCanvas();

    moveTarget.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    leaveTarget?.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      clearCanvas();
      drawArrow();
      animationFrameIdRef.current = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameIdRef.current !== null) {
        window.cancelAnimationFrame(animationFrameIdRef.current);
      }

      moveTarget.removeEventListener("pointermove", handlePointerMove);
      leaveTarget?.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", resizeCanvas);
      clearCanvas();
    };
  }, [active, containerRef, drawArrow, prefersReducedMotion]);

  if (!active || prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-20 hidden h-full w-full md:block",
        className
      )}
    />
  );
}
