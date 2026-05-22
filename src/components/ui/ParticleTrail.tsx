import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export default function ParticleTrail({ max = 80 }: { max?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);
  const runningRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    function spawn(x: number, y: number) {
      if (particlesRef.current.length > max) return;
      const p = {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        life: 1,
        size: 2 + Math.random() * 3,
        hue: 10 + Math.random() * 20, // reddish hues
      };
      particlesRef.current.push(p);
    }

    let rafId: number;

    function tick() {
      ctx.clearRect(0, 0, w, h);
      const ps = particlesRef.current;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.x += p.vx;
        p.y += p.vy - 0.2 * (1 - p.life);
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 0.02;
        if (p.life <= 0) {
          ps.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 70%, 55%, ${p.life * 0.9})`;
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    }

    runningRef.current = true;
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      spawn(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      runningRef.current = false;
      window.removeEventListener("mousemove", onMove as any);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, [reduced, max]);

  // Position fixed canvas on top with pointer-events: none
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed left-0 top-0 z-[1000]"
      style={{ width: "100%", height: "100%", inset: 0 }}
    />
  );
}
