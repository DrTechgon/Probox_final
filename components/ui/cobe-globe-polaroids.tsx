"use client";

import { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";

interface PolaroidMarker {
  id: string;
  location: [number, number];
  image: string;
  caption: string;
  rotate: number;
}

interface GlobePolaoridsProps {
  markers?: PolaroidMarker[];
  className?: string;
  speed?: number;
}

const defaultMarkers: PolaroidMarker[] = [
  { id: "polaroid-sf", location: [37.78, -122.44], image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=160&h=160&fit=crop", caption: "San Francisco", rotate: -6 },
  { id: "polaroid-nyc", location: [40.71, -74.01], image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=160&h=160&fit=crop", caption: "New York", rotate: 5 },
  { id: "polaroid-tokyo", location: [35.68, 139.65], image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=160&h=160&fit=crop", caption: "Tokyo", rotate: -4 },
  { id: "polaroid-sydney", location: [-33.87, 151.21], image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=160&h=160&fit=crop", caption: "Sydney", rotate: 7 },
  { id: "polaroid-paris", location: [48.86, 2.35], image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=160&h=160&fit=crop", caption: "Paris", rotate: -5 },
  { id: "polaroid-london", location: [51.51, -0.13], image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=160&h=160&fit=crop", caption: "London", rotate: 4 },
];

export function GlobePolaroids({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
}: GlobePolaoridsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const polaroidRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const isPausedRef = useRef(false);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    isPausedRef.current = true;
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    isPausedRef.current = false;
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        };
      }
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let animationId: number;
    let phi = 0;

    function updatePolaroids(currentPhi: number, currentTheta: number) {
      const width = canvas.offsetWidth;
      if (!width) return;
      const cx = width / 2;
      const cy = width / 2;
      const radius = width * 0.47;

      for (const m of markers) {
        const el = polaroidRefs.current[m.id];
        if (!el) continue;

        // Cobe's exact marker convention:
        //   phi = (90 - lat) * π/180   (polar angle from north pole)
        //   theta = (lng + 180) * π/180
        //   base vector = [-sin(phi)cos(theta), cos(phi), sin(phi)sin(theta)]
        const pPolar = ((90 - m.location[0]) * Math.PI) / 180;
        const thetaAz = ((m.location[1] + 180) * Math.PI) / 180;
        const vx = -Math.sin(pPolar) * Math.cos(thetaAz);
        const vy = Math.cos(pPolar);
        const vz = Math.sin(pPolar) * Math.sin(thetaAz);

        // Y-rotation by state.phi (cobe's internal rotation: +sp on x, -sp on z)
        const cp = Math.cos(currentPhi);
        const sp = Math.sin(currentPhi);
        const x1 = vx * cp + vz * sp;
        const z1 = -vx * sp + vz * cp;

        // X-rotation by state.theta (tilt north pole toward camera)
        const ct = Math.cos(currentTheta);
        const st = Math.sin(currentTheta);
        const y2 = vy * ct - z1 * st;
        const z2 = vy * st + z1 * ct;

        const sx = cx + x1 * radius;
        const sy = cy - y2 * radius;
        const visible = z2 > 0;
        const zT = z2;

        const depth = Math.max(0, Math.min(1, zT));
        const opacity = visible ? 0.25 + 0.75 * depth : 0;

        el.style.transform = `translate3d(${sx}px, ${sy}px, 0) translate(-50%, calc(-100% - 12px)) rotate(${m.rotate}deg)`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(Math.round(zT * 1000));
      }
    }

    function init() {
      const width = canvas.offsetWidth;
      if (width === 0 || globe) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width,
        height: width,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.5,
        mapSamples: 16000,
        mapBrightness: 9,
        baseColor: [1, 1, 1],
        markerColor: [0.78, 0.52, 0.27],
        glowColor: [0.94, 0.93, 0.91],
        markers: markers.map((m) => ({ location: m.location, size: 0.05 })),
      });
      function animate() {
        if (!isPausedRef.current) phi += speed;
        const currentPhi = phi + phiOffsetRef.current + dragOffset.current.phi;
        const currentTheta = 0.2 + thetaOffsetRef.current + dragOffset.current.theta;
        globe!.update({ phi: currentPhi, theta: currentTheta });
        updatePolaroids(currentPhi, currentTheta);
        animationId = requestAnimationFrame(animate);
      }
      animate();
      setTimeout(() => canvas && (canvas.style.opacity = "1"));
    }

    if (canvas.offsetWidth > 0) {
      init();
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect();
          init();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (globe) globe.destroy();
    };
  }, [markers, speed]);

  return (
    <div ref={containerRef} className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1.2s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />

      {markers.map((m) => (
        <div
          key={m.id}
          ref={(el) => {
            polaroidRefs.current[m.id] = el;
          }}
          className="pointer-events-none absolute left-0 top-0"
          style={{
            willChange: "transform, opacity",
            opacity: 0,
          }}
        >
          <div
            className="bg-white p-1.5 pb-5 shadow-[0_8px_24px_rgba(15,23,42,0.18),0_2px_4px_rgba(15,23,42,0.08)]"
            style={{ width: 72 }}
          >
            <img
              src={m.image}
              alt={m.caption}
              draggable={false}
              style={{ display: "block", width: 60, height: 60, objectFit: "cover" }}
            />
            <div
              className="absolute bottom-1 left-0 right-0 text-center text-[9px] font-medium tracking-wide text-slate-700"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {m.caption}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
