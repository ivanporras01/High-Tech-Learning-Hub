"use client";

import { useEffect, useRef } from "react";
import { BlochSphereBackground, QwaOrbitRings } from "./bloch-sphere-background";

type StarTint = "white" | "cyan" | "violet";

type Star = {
  bx: number;
  by: number;
  z: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  tint: StarTint;
  prevPx: number;
  prevPy: number;
};

const STAR_COUNT = 115;
const TINT_COLORS: Record<StarTint, [number, number, number]> = {
  white: [255, 255, 255],
  cyan: [34, 211, 238],
  violet: [167, 139, 250],
};

function pickTint(): StarTint {
  const r = Math.random();
  if (r < 0.18) return "cyan";
  if (r < 0.32) return "violet";
  return "white";
}

/**
 * Full-viewport quantum cosmos — starfield with purple/violet nebulae accents.
 * Adapted from NOVA STEM nova-universe pattern with quantum color palette.
 */
export function QuantumCosmosBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let stars: Star[] = [];
    let scrollBoost = 0;
    let parallaxX = 0;
    let parallaxY = 0;
    let targetParallaxX = 0;
    let targetParallaxY = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initStars() {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        bx: (Math.random() - 0.5) * 2,
        by: (Math.random() - 0.5) * 2,
        z: Math.random() * 0.95 + 0.05,
        radius: Math.random() * 2.4 + 0.5,
        opacity: Math.random() * 0.29 + 0.23,
        twinkleSpeed: Math.random() * 0.025 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        tint: pickTint(),
        prevPx: 0,
        prevPy: 0,
      }));
    }

    function projectStar(star: Star, cx: number, cy: number, spread: number) {
      const scale = spread / star.z;
      return {
        px: cx + star.bx * scale + parallaxX * (1 - star.z) * 1.72,
        py: cy + star.by * scale + parallaxY * (1 - star.z) * 1.72,
        size: star.radius * (1.4 / star.z) * 0.4,
      };
    }

    function draw(time: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h / 2;
      const spread = Math.min(w, h) * 0.55;

      parallaxX += (targetParallaxX - parallaxX) * 0.06;
      parallaxY += (targetParallaxY - parallaxY) * 0.06;
      scrollBoost *= 0.94;

      const speedMult = 1 + scrollBoost * 0.25;
      root!.style.setProperty("--qwa-parallax-x", `${parallaxX}px`);
      root!.style.setProperty("--qwa-parallax-y", `${parallaxY}px`);

      ctx!.clearRect(0, 0, w, h);

      for (const star of stars) {
        const warpSpeed = (0.001 + (1 - star.z) * 0.0025) * speedMult;
        star.z -= warpSpeed;

        if (star.z <= 0.02) {
          star.bx = (Math.random() - 0.5) * 2;
          star.by = (Math.random() - 0.5) * 2;
          star.z = 1;
          star.tint = pickTint();
          star.prevPx = cx;
          star.prevPy = cy;
        }

        const { px, py, size } = projectStar(star, cx, cy, spread);
        const depth = 1 - star.z;
        const twinkle =
          0.65 + 0.35 * Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = Math.min(1, star.opacity * twinkle * (0.35 + depth * 0.85));
        const [r, g, b] = TINT_COLORS[star.tint];

        if (depth > 0.7 && star.z < 0.6) {
          const streakLen = depth * speedMult * 3;
          const dx = px - star.prevPx;
          const dy = py - star.prevPy;
          const len = Math.hypot(dx, dy) || 1;
          ctx!.beginPath();
          ctx!.moveTo(px, py);
          ctx!.lineTo(px - (dx / len) * streakLen, py - (dy / len) * streakLen);
          ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.55})`;
          ctx!.lineWidth = size * 0.7;
          ctx!.stroke();
        }

        ctx!.beginPath();
        ctx!.arc(px, py, Math.max(0.6, size), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.fill();

        if (depth > 0.5) {
          ctx!.beginPath();
          ctx!.arc(px, py, size * 2.8, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.22})`;
          ctx!.fill();
        }

        star.prevPx = px;
        star.prevPy = py;
      }

      animationId = requestAnimationFrame(draw);
    }

    const onMouseMove = (e: MouseEvent) => {
      targetParallaxX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetParallaxY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };

    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      scrollBoost = Math.min(0.14, scrollBoost + delta * 0.0017);
    };

    const onWheel = (e: WheelEvent) => {
      scrollBoost = Math.min(0.14, scrollBoost + Math.abs(e.deltaY) * 0.00012);
    };

    resize();
    initStars();
    animationId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      initStars();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div ref={rootRef} className="qwa-cosmos-root" aria-hidden="true">
      <div className="qwa-cosmos-parallax">
        <div className="qwa-nebula qwa-nebula--cyan qwa-nebula-drift" />
        <div className="qwa-nebula qwa-nebula--violet qwa-nebula-drift-reverse" />
        <div className="qwa-nebula qwa-nebula--magenta qwa-nebula-pulse" />
        <div className="qwa-nebula qwa-nebula--amber qwa-nebula-drift" />
      </div>
      <QwaOrbitRings />
      <BlochSphereBackground />
      <canvas ref={canvasRef} className="qwa-cosmos-canvas" />
      <div className="qwa-cosmos-vignette" />
      <div className="qwa-cosmos-aurora" />
    </div>
  );
}

export function QuantumUniverseShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <QuantumCosmosBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
