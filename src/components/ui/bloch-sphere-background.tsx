"use client";

import { useEffect, useRef } from "react";
import type { BlochCoords } from "@/lib/quantum/state";

type Keyframe = BlochCoords & { label: string };

/** States scholars recognize — cycles through the Bloch sphere */
const KEYFRAMES: Keyframe[] = [
  { x: 0, y: 0, z: 1, label: "|0⟩" },
  { x: 1, y: 0, z: 0, label: "|+⟩  H|0⟩" },
  { x: 0, y: 1, z: 0, label: "|i⟩  S|+⟩" },
  { x: -1, y: 0, z: 0, label: "|-⟩" },
  { x: 0, y: 0, z: -1, label: "|1⟩  X|0⟩" },
  { x: 0.7, y: 0.7, z: 0, label: "Superposition" },
];

function lerpBloch(a: BlochCoords, b: BlochCoords, t: number): BlochCoords {
  const x = a.x + (b.x - a.x) * t;
  const y = a.y + (b.y - a.y) * t;
  const z = a.z + (b.z - a.z) * t;
  const len = Math.hypot(x, y, z) || 1;
  return { x: x / len, y: y / len, z: z / len };
}

function project(cx: number, cy: number, r: number, p: BlochCoords) {
  const tilt = 0.38;
  return {
    sx: cx + (p.x - p.z * tilt) * r,
    sy: cy - p.y * r - p.z * r * 0.22,
  };
}

/**
 * Large ambient Bloch sphere — state vector sweeps |0⟩ → |+⟩ → |i⟩ → |1⟩ …
 * NOVA-style decorative layer behind page content.
 */
export function BlochSphereBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frameId = 0;
    let start = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      const cx = w * 0.72;
      const cy = h * 0.44;
      const R = Math.min(w, h) * 0.22;

      const cycleMs = KEYFRAMES.length * 3200;
      const elapsed = (now - start) % cycleMs;
      const segMs = cycleMs / KEYFRAMES.length;
      const segIdx = Math.floor(elapsed / segMs);
      const t = (elapsed % segMs) / segMs;
      const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const from = KEYFRAMES[segIdx % KEYFRAMES.length];
      const to = KEYFRAMES[(segIdx + 1) % KEYFRAMES.length];
      const bloch = lerpBloch(from, to, eased);
      const label = eased < 0.15 ? from.label : to.label;

      // Soft glow halo
      const glow = ctx!.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.6);
      glow.addColorStop(0, "rgba(34, 211, 238, 0.07)");
      glow.addColorStop(0.5, "rgba(167, 139, 250, 0.04)");
      glow.addColorStop(1, "transparent");
      ctx!.fillStyle = glow;
      ctx!.fillRect(cx - R * 2, cy - R * 2, R * 4, R * 4);

      // Equator + meridians (3D wireframe)
      ctx!.lineWidth = 1;
      for (let ring = 0; ring < 3; ring++) {
        ctx!.beginPath();
        for (let a = 0; a <= 64; a++) {
          const θ = (a / 64) * Math.PI * 2;
          let p: BlochCoords;
          if (ring === 0) p = { x: Math.cos(θ), y: Math.sin(θ), z: 0 };
          else if (ring === 1) p = { x: Math.cos(θ), y: 0, z: Math.sin(θ) };
          else p = { x: 0, y: Math.cos(θ), z: Math.sin(θ) };
          const { sx, sy } = project(cx, cy, R, p);
          if (a === 0) ctx!.moveTo(sx, sy);
          else ctx!.lineTo(sx, sy);
        }
        ctx!.strokeStyle = ring === 0 ? "rgba(34, 211, 238, 0.18)" : "rgba(100, 116, 139, 0.12)";
        ctx!.stroke();
      }

      // Outer rim
      ctx!.beginPath();
      for (let a = 0; a <= 64; a++) {
        const θ = (a / 64) * Math.PI * 2;
        const p = { x: Math.cos(θ), y: 0, z: Math.sin(θ) };
        const { sx, sy } = project(cx, cy, R, p);
        if (a === 0) ctx!.moveTo(sx, sy);
        else ctx!.lineTo(sx, sy);
      }
      ctx!.strokeStyle = "rgba(167, 139, 250, 0.35)";
      ctx!.lineWidth = 2;
      ctx!.stroke();

      // |0⟩ / |1⟩ poles
      const north = project(cx, cy, R, { x: 0, y: 0, z: 1 });
      const south = project(cx, cy, R, { x: 0, y: 0, z: -1 });
      ctx!.fillStyle = "rgba(34, 211, 238, 0.55)";
      ctx!.beginPath();
      ctx!.arc(north.sx, north.sy, 5, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = "rgba(167, 139, 250, 0.55)";
      ctx!.beginPath();
      ctx!.arc(south.sx, south.sy, 5, 0, Math.PI * 2);
      ctx!.fill();

      // State vector |ψ⟩
      const tip = project(cx, cy, R, bloch);
      ctx!.beginPath();
      ctx!.moveTo(cx, cy);
      ctx!.lineTo(tip.sx, tip.sy);
      ctx!.strokeStyle = "rgba(34, 211, 238, 0.65)";
      ctx!.lineWidth = 3;
      ctx!.stroke();
      ctx!.fillStyle = "rgba(34, 211, 238, 0.9)";
      ctx!.shadowColor = "#22d3ee";
      ctx!.shadowBlur = 16;
      ctx!.beginPath();
      ctx!.arc(tip.sx, tip.sy, 7, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.shadowBlur = 0;

      ctx!.fillStyle = "rgba(241, 245, 249, 0.85)";
      ctx!.beginPath();
      ctx!.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx!.fill();

      // State label
      ctx!.font = "600 13px ui-monospace, monospace";
      ctx!.fillStyle = "rgba(34, 211, 238, 0.75)";
      ctx!.fillText(label, cx - R * 0.55, cy + R + 28);
      ctx!.font = "500 10px ui-sans-serif, system-ui, sans-serif";
      ctx!.fillStyle = "rgba(148, 163, 184, 0.55)";
      ctx!.fillText("Bloch sphere · live state", cx - R * 0.55, cy + R + 44);

      frameId = requestAnimationFrame(draw);
    }

    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="qwa-bloch-bg-canvas" aria-hidden="true" />;
}

/** NOVA-style orbit rings — CSS decorative layer */
export function QwaOrbitRings() {
  return (
    <div className="qwa-orbit-rings" aria-hidden="true">
      <div className="qwa-orbit-ring qwa-orbit-ring--1" />
      <div className="qwa-orbit-ring qwa-orbit-ring--2" />
      <div className="qwa-orbit-ring qwa-orbit-ring--3" />
      <div className="qwa-orbit-satellite qwa-orbit-satellite--a" />
      <div className="qwa-orbit-satellite qwa-orbit-satellite--b" />
    </div>
  );
}
