"use client";

import { useEffect, useRef } from "react";

type Orbit = {
  radius: number;
  tilt: number;
  speed: number;
  phase: number;
  color: [number, number, number];
  dotCount: number;
};

type Wave = {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  alpha: number;
};

/** Canvas overlay — orbiting qubits, interference ripples, amplitude pulses */
export function QuantumFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let frameId = 0;
    let time = 0;
    const orbits: Orbit[] = [
      { radius: 0.22, tilt: -0.35, speed: 0.004, phase: 0, color: [34, 211, 238], dotCount: 3 },
      { radius: 0.28, tilt: 0.55, speed: -0.003, phase: 1.2, color: [167, 139, 250], dotCount: 2 },
      { radius: 0.18, tilt: 0.15, speed: 0.0055, phase: 2.4, color: [232, 121, 249], dotCount: 2 },
    ];
    const waves: Wave[] = [];
    let waveTimer = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawnWave(w: number, h: number) {
      waves.push({
        x: w * (0.3 + Math.random() * 0.4),
        y: h * (0.25 + Math.random() * 0.35),
        radius: 0,
        maxRadius: Math.min(w, h) * (0.15 + Math.random() * 0.2),
        speed: 0.6 + Math.random() * 0.4,
        alpha: 0.35,
      });
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = w / 2;
      const cy = h * 0.42;
      const base = Math.min(w, h);

      ctx!.clearRect(0, 0, w, h);
      time += 1;
      waveTimer += 1;

      if (waveTimer > 180 && waves.length < 4) {
        spawnWave(w, h);
        waveTimer = 0;
      }

      for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += wave.speed;
        const t = wave.radius / wave.maxRadius;
        const alpha = wave.alpha * (1 - t) * (1 - t);
        if (alpha <= 0.01) {
          waves.splice(i, 1);
          continue;
        }
        ctx!.beginPath();
        ctx!.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(34, 211, 238, ${alpha * 0.5})`;
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }

      const sphereR = base * 0.12;
      const pulse = 0.85 + 0.15 * Math.sin(time * 0.02);
      ctx!.beginPath();
      ctx!.arc(cx, cy, sphereR * pulse, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(56, 189, 248, ${0.08 + 0.04 * Math.sin(time * 0.03)})`;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      const angle = time * 0.008;
      const ax = cx + Math.cos(angle) * sphereR * 0.85;
      const ay = cy - Math.sin(angle * 0.7) * sphereR * 0.55;
      ctx!.beginPath();
      ctx!.moveTo(cx, cy);
      ctx!.lineTo(ax, ay);
      ctx!.strokeStyle = "rgba(34, 211, 238, 0.35)";
      ctx!.lineWidth = 2;
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.arc(ax, ay, 4, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(34, 211, 238, 0.55)";
      ctx!.fill();

      for (const orbit of orbits) {
        const r = base * orbit.radius;
        ctx!.beginPath();
        ctx!.ellipse(cx, cy, r, r * Math.cos(orbit.tilt), orbit.tilt, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${orbit.color[0]}, ${orbit.color[1]}, ${orbit.color[2]}, 0.15)`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        for (let d = 0; d < orbit.dotCount; d++) {
          const a = time * orbit.speed + orbit.phase + (d * Math.PI * 2) / orbit.dotCount;
          const ox = cx + Math.cos(a) * r;
          const oy = cy + Math.sin(a) * r * Math.cos(orbit.tilt);
          const glow = 0.5 + 0.5 * Math.sin(a * 3 + time * 0.05);
          ctx!.beginPath();
          ctx!.arc(ox, oy, 3 + glow * 2, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${orbit.color[0]}, ${orbit.color[1]}, ${orbit.color[2]}, ${0.35 + glow * 0.4})`;
          ctx!.fill();
        }
      }

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

  return <canvas ref={canvasRef} className="qwa-quantum-field-canvas" aria-hidden="true" />;
}
