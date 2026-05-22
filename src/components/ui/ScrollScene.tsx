import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface ScrollSceneProps {
  id: string;
  children: ReactNode;
  className?: string;
  stack?: boolean;
  stackIndex?: number;
  bgClassName?: string;
  compact?: boolean;
  // speed: lower values make the retreat/scale/fade effect slower/more subtle
  speed?: number;
  // bgParallax: fraction of scroll applied to the background layer (0 = no move,
  // 0.2 = background moves at 20% of the content movement). Lower values give
  // the Cayenne-like slow background motion.
  bgParallax?: number;
  // multi-layer background: optional layers of additional background divs.
  // Each layer may specify a className (Tailwind classes) and a parallax
  // multiplier to move at a different speed.
  bgLayers?: Array<{
    className?: string;
    parallax?: number; // fraction multiplier for this layer
    initialOpacity?: number;
  }>;
  // cinematic zoom: slight zoom-in when the section becomes active (1 = no zoom)
  zoom?: number;
  // overlay intensity for a full-screen cinematic transition (0 = off)
  overlayIntensity?: number;
  // mouse-follow glow
  enableGlow?: boolean;
  glowColor?: string;
  glowSize?: number; // px
}

export function ScrollScene({
  id,
  children,
  className = "",
  stack = true,
  stackIndex = 0,
  bgClassName = "",
  compact = false,
  // reduce default speed for a noticeably slower effect
  // reduce default speed for a noticeably slower effect
  speed = 0.35,
  // subtler by default
  bgParallax = 0.12,
  bgLayers = undefined,
  zoom = 1.02,
  overlayIntensity = 0.06,
  // disable glow by default; can be enabled per-section via prop
  enableGlow = false,
  // darker, almost black-red
  glowColor = "rgba(100,12,18,0.9)",
  glowSize = 100,
}: ScrollSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgLayerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!stack || compact || reduced) return;
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    let rafId: number;

    const tick = () => {
      const vh = window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top;

      // If not yet in view, reset
      if (sectionTop >= vh) {
        inner.style.transform = "translateY(0px) scale(1)";
        inner.style.opacity = "1";
        if (bgRef.current) bgRef.current.style.transform = "translateY(0px)";
        return;
      }

      const rawProgress = Math.min(Math.abs(sectionTop) / vh, 1);
      const progress = rawProgress * speed;

      // Content motion
      const retreatY = progress * vh * 0.12;
      const baseScale = 1 - progress * 0.03;
      const contentOpacity = 1 - progress * 0.18;

      const zoomT = Math.max(0, Math.min(1, 1 - rawProgress * 1.2));
      const zoomScale = 1 + (zoom - 1) * zoomT;
      const finalScale = baseScale * zoomScale;

      inner.style.transform = `translateY(-${retreatY}px) scale(${finalScale})`;
      inner.style.opacity = String(contentOpacity);

      // Primary background movement and fade (ease-out)
      if (bgRef.current) {
        if (bgParallax > 0) {
          const bgY = rawProgress * vh * bgParallax;
          bgRef.current.style.transform = `translateY(-${bgY}px)`;
        }
        const t = Math.max(0, Math.min(1, rawProgress));
        const eased = 1 - Math.pow(1 - t, 3);
        const bgOpacity = Math.max(0, Math.min(1, 1 - eased));
        bgRef.current.style.opacity = String(bgOpacity);
      }

      // Additional background layers
      if (bgLayers && bgLayers.length) {
        bgLayers.forEach((layer, i) => {
          const ref = bgLayerRefs.current[i];
          if (!ref) return;
          const par = layer.parallax ?? (bgParallax * (0.5 + i * 0.25));
          const y = rawProgress * vh * par;
          ref.style.transform = `translateY(-${y}px)`;
          const initOp = layer.initialOpacity ?? 1;
          const t2 = Math.max(0, Math.min(1, rawProgress));
          const eased2 = 1 - Math.pow(1 - t2, 3);
          ref.style.opacity = String(Math.max(0, Math.min(1, initOp * (1 - eased2))));
        });
      }

      // Fullscreen cinematic overlay
      if (overlayRef.current && overlayIntensity > 0) {
        const t = Math.max(0, Math.min(1, rawProgress));
        const eased = 1 - Math.pow(1 - t, 3);
        const overlayVal = eased * overlayIntensity;
        overlayRef.current.style.background = `rgba(0,0,0,${overlayVal})`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [stack, compact, reduced, bgLayers, speed, bgParallax, zoom, overlayIntensity]);

  // Mouse-follow glow
  useEffect(() => {
    if (!enableGlow || reduced) return;
    const glow = glowRef.current;
    if (!glow) return;

    let rafId: number | null = null;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX - glowSize / 2;
      const y = e.clientY - glowSize / 2;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!glow) return;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        glow.style.opacity = "1";
      });
    };

    const onLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!glow) return;
        glow.style.opacity = "0";
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enableGlow, reduced, glowSize]);

  return (
    <section
      id={id}
      ref={sectionRef}
      style={
        stack
          ? { position: "sticky", top: 0, zIndex: 10 + stackIndex }
          : undefined
      }
      // Make each stacked section at least 100svh so it can occupy the
      // viewport and opt into CSS scroll snapping (snap-start).
      className={`relative ${stack && !compact ? "min-h-[100svh] snap-start" : ""} overflow-hidden ${className}`}
      // Ensure the browser accounts for the fixed header when scrolling to
      // these sections (so they truly fill the visible area).
      // The value here matches the header height in Nav.tsx (approx 4rem);
      // adjust if your header size changes.
      aria-label={id}
    >
      {/* Background color layer — stays fixed inside section */}
      <div
        ref={bgRef}
        className={`pointer-events-none absolute inset-0 -z-10 ${bgClassName} will-change-transform`}
        aria-hidden
      />

      {/* Additional layered background divs (for heavy multi-layer depth) */}
      {bgLayers && bgLayers.map((layer, i) => (
        <div
          key={i}
          ref={(el) => { bgLayerRefs.current[i] = el ?? null; }}
          className={`pointer-events-none absolute inset-0 -z-20 ${layer.className ?? ""} will-change-transform`}
          style={{ opacity: layer.initialOpacity ?? 1 }}
          aria-hidden
        />
      ))}

      {/* Fullscreen cinematic overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 -z-5"
        style={{ background: "transparent", transition: "background 220ms linear" }}
        aria-hidden
      />

      {/* Mouse-follow glow */}
      {enableGlow ? (
        <div
          ref={glowRef}
          className="pointer-events-none fixed left-0 top-0 -z-10 rounded-full blur-sm"
          style={{
            width: glowSize,
            height: glowSize,
            background: `radial-gradient(circle at 40% 35%, ${glowColor} 0%, rgba(0,0,0,0.0) 55%)`,
            transform: `translate3d(-9999px,-9999px,0)`,
            transition: "transform 90ms linear, opacity 150ms linear",
            opacity: 0,
          }}
          aria-hidden
        />
      ) : null}

      {/* Inner content — this retreats upward as the next section slides in */}
      <div
        ref={innerRef}
        className="relative z-10 h-full w-full will-change-transform py-16 md:py-20"
        style={{ transformOrigin: "center top", scrollMarginTop: "4rem" }}
      >
        {children}
      </div>
    </section>
  );
}
