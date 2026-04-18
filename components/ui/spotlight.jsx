"use client";

import { useEffect, useRef } from "react";

export default function Spotlight({
  className = "",
  color = "rgba(201, 133, 69, 0.18)",
  size = 520,
  children,
}) {
  const wrapRef = useRef(null);
  const glowRef = useRef(null);
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0, op: 0 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const glow = glowRef.current;
    if (!wrap || !glow) return;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      target.current.x = e.clientX - r.left;
      target.current.y = e.clientY - r.top;
      target.current.op = 1;
      if (!frame.current) {
        frame.current = requestAnimationFrame(apply);
      }
    };

    const onLeave = () => {
      target.current.op = 0;
      if (!frame.current) {
        frame.current = requestAnimationFrame(apply);
      }
    };

    const apply = () => {
      frame.current = 0;
      const { x, y, op } = target.current;
      glow.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      glow.style.opacity = String(op);
    };

    wrap.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [size]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-0 rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}, transparent 65%)`,
          filter: "blur(8px)",
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
