import type { BlochCoords } from "@/lib/quantum/state";

type Keyframe = BlochCoords & { label: string };

const KEYFRAMES: Keyframe[] = [
  { x: 0, y: 0, z: 1, label: "|0⟩" },
  { x: 1, y: 0, z: 0, label: "|+⟩" },
  { x: 0, y: 1, z: 0, label: "|i⟩" },
  { x: -1, y: 0, z: 0, label: "|-⟩" },
  { x: 0, y: 0, z: -1, label: "|1⟩" },
  { x: 0.707, y: 0.707, z: 0, label: "|ψ⟩" },
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

export function drawAmbientBloch(ctx: CanvasRenderingContext2D, w: number, h: number, now: number) {
  const mobile = w < 768;
  const cx = mobile ? w * 0.5 : w * 0.74;
  const cy = mobile ? h * 0.32 : h * 0.48;
  const R = Math.min(w, h) * (mobile ? 0.26 : 0.24);

  const cycleMs = KEYFRAMES.length * 2800;
  const elapsed = now % cycleMs;
  const segMs = cycleMs / KEYFRAMES.length;
  const segIdx = Math.floor(elapsed / segMs);
  const t = (elapsed % segMs) / segMs;
  const eased = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
  const from = KEYFRAMES[segIdx % KEYFRAMES.length];
  const to = KEYFRAMES[(segIdx + 1) % KEYFRAMES.length];
  const bloch = lerpBloch(from, to, eased);
  const label = eased < 0.2 ? from.label : to.label;

  const glow = ctx.createRadialGradient(cx, cy, R * 0.15, cx, cy, R * 1.8);
  glow.addColorStop(0, "rgba(0, 180, 216, 0.22)");
  glow.addColorStop(0.45, "rgba(118, 87, 232, 0.14)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(cx - R * 2.2, cy - R * 2.2, R * 4.4, R * 4.4);

  ctx.lineWidth = 1.5;
  for (let ring = 0; ring < 3; ring++) {
    ctx.beginPath();
    for (let a = 0; a <= 64; a++) {
      const θ = (a / 64) * Math.PI * 2;
      let p: BlochCoords;
      if (ring === 0) p = { x: Math.cos(θ), y: Math.sin(θ), z: 0 };
      else if (ring === 1) p = { x: Math.cos(θ), y: 0, z: Math.sin(θ) };
      else p = { x: 0, y: Math.cos(θ), z: Math.sin(θ) };
      const { sx, sy } = project(cx, cy, R, p);
      if (a === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.strokeStyle = ring === 0 ? "rgba(0, 180, 216, 0.4)" : "rgba(148, 163, 184, 0.22)";
    ctx.stroke();
  }

  ctx.beginPath();
  for (let a = 0; a <= 64; a++) {
    const θ = (a / 64) * Math.PI * 2;
    const { sx, sy } = project(cx, cy, R, { x: Math.cos(θ), y: 0, z: Math.sin(θ) });
    if (a === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  }
  ctx.strokeStyle = "rgba(118, 87, 232, 0.6)";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const north = project(cx, cy, R, { x: 0, y: 0, z: 1 });
  const south = project(cx, cy, R, { x: 0, y: 0, z: -1 });
  ctx.fillStyle = "rgba(0, 180, 216, 0.9)";
  ctx.beginPath();
  ctx.arc(north.sx, north.sy, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(118, 87, 232, 0.9)";
  ctx.beginPath();
  ctx.arc(south.sx, south.sy, 6, 0, Math.PI * 2);
  ctx.fill();

  const tip = project(cx, cy, R, bloch);
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(tip.sx, tip.sy);
  ctx.strokeStyle = "rgba(110, 231, 249, 0.95)";
  ctx.lineWidth = 3.5;
  ctx.shadowColor = "#00b4d8";
  ctx.shadowBlur = 22;
  ctx.stroke();
  ctx.fillStyle = "#6ee7f9";
  ctx.beginPath();
  ctx.arc(tip.sx, tip.sy, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#f1f5f9";
  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "600 14px ui-monospace, monospace";
  ctx.fillStyle = "rgba(110, 231, 249, 0.95)";
  ctx.fillText(label, cx - R * 0.45, cy + R + 32);
}
