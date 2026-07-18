"use client";

import { useMemo, useState } from "react";
import {
  evolveOpticalCircuit,
  machZehnderPreset,
  machZehnderTheory,
  quantumAnalogue,
  stateToKetString,
  elementShortLabel,
  type OpticalElement,
  type OpticalElementId,
} from "@/lib/optical/circuit";
import { KET0, prob0, prob1 } from "@/lib/quantum/state";
import { ProbabilityBars } from "@/components/visuals/probability-bars";

const PRESETS = [
  { id: "mach-zehnder", label: "Mach–Zehnder", desc: "Quantum interference controls output port" },
  { id: "dual-rail-h", label: "Dual-rail H", desc: "One beam splitter = Hadamard gate" },
  { id: "custom", label: "Build circuit", desc: "Add beam splitters and phase plates" },
] as const;

function OpticalDiagram({ elements, phase, pUpper, pLower }: { elements: OpticalElement[]; phase: number; pUpper: number; pLower: number }) {
  const w = 640;
  const y0 = 60;
  const y1 = 140;
  const xStart = 40;
  const xEnd = w - 40;
  const slot = elements.length > 0 ? (xEnd - xStart - 80) / (elements.length + 1) : 120;

  return (
    <svg viewBox="0 0 640 200" className="w-full" role="img" aria-label="Optical circuit">
      <circle cx={xStart - 10} cy={y0} r={8} fill="#22d3ee" opacity="0.8" />
      <line x1={xStart} y1={y0} x2={xEnd} y2={y0} stroke={`rgba(34,211,238,${0.3 + pUpper * 0.7})`} strokeWidth={2 + pUpper * 6} />
      <line x1={xStart} y1={y1} x2={xEnd} y2={y1} stroke={`rgba(167,139,250,${0.3 + pLower * 0.7})`} strokeWidth={2 + pLower * 6} />
      {elements.map((el, i) => {
        const x = xStart + 60 + i * slot;
        if (el.id === "beam-splitter") {
          return (
            <g key={i}>
              <rect x={x - 14} y={y0 - 8} width={28} height={y1 - y0 + 16} rx={4} fill="rgba(167,139,250,0.15)" stroke="#a78bfa" strokeWidth={1.5} />
              <line x1={x - 10} y1={y0} x2={x + 10} y2={y1} stroke="#a78bfa" strokeWidth={1.5} />
              <line x1={x - 10} y1={y1} x2={x + 10} y2={y0} stroke="#a78bfa" strokeWidth={1.5} />
            </g>
          );
        }
        const y = el.id === "phase-upper" ? y0 : y1;
        return (
          <g key={i}>
            <rect x={x - 18} y={y - 14} width={36} height={28} rx={6} fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth={1.5} />
            <text x={x} y={y + 4} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight="bold">φ</text>
            <text x={x} y={188} textAnchor="middle" fill="#94a3b8" fontSize={9}>{Math.round(((el.phase ?? phase) * 180) / Math.PI)}°</text>
          </g>
        );
      })}
      <text x={xEnd + 16} y={y0 + 4} textAnchor="middle" fill="#22d3ee" fontSize={10}>{(pUpper * 100).toFixed(0)}%</text>
      <text x={xEnd + 16} y={y1 + 4} textAnchor="middle" fill="#a78bfa" fontSize={10}>{(pLower * 100).toFixed(0)}%</text>
    </svg>
  );
}

export function OpticalCircuitSimulator() {
  const [preset, setPreset] = useState<(typeof PRESETS)[number]["id"]>("mach-zehnder");
  const [phase, setPhase] = useState(Math.PI / 2);
  const [custom, setCustom] = useState<OpticalElement[]>([]);

  const elements = useMemo(() => {
    if (preset === "mach-zehnder") return machZehnderPreset(phase);
    if (preset === "dual-rail-h") return [{ id: "beam-splitter" as const }];
    return custom;
  }, [preset, phase, custom]);

  const state = useMemo(() => evolveOpticalCircuit(elements), [elements]);
  const pUpper = prob0(state);
  const pLower = prob1(state);
  const theory = preset === "mach-zehnder" ? machZehnderTheory(phase) : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.id} type="button" onClick={() => setPreset(p.id)} className={`rounded-lg border px-3 py-2 text-left text-sm ${preset === p.id ? "border-[var(--qwa-cyan)] bg-[var(--qwa-cyan)]/10 text-[var(--qwa-cyan)]" : "border-[var(--qwa-border)] text-[var(--qwa-fg-muted)]"}`}>
            <span className="font-semibold">{p.label}</span>
            <span className="mt-0.5 block text-xs opacity-80">{p.desc}</span>
          </button>
        ))}
      </div>
      <div className="qwa-glass-card !p-4">
        <label className="text-sm font-semibold">Phase φ: {Math.round((phase * 180) / Math.PI)}°</label>
        <input type="range" min={0} max={Math.PI * 2} step={0.01} value={phase} onChange={(e) => setPhase(parseFloat(e.target.value))} className="mt-2 w-full accent-[var(--qwa-cyan)]" />
        {theory && <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">P(path₀) = cos²(φ/2) → {(theory.pUpper * 100).toFixed(1)}% / {(theory.pLower * 100).toFixed(1)}%</p>}
      </div>
      {preset === "custom" && (
        <div className="flex flex-wrap gap-2">
          {(["beam-splitter", "phase-lower"] as OpticalElementId[]).map((id) => (
            <button key={id} type="button" className="qwa-btn-secondary text-xs" onClick={() => setCustom((prev) => [...prev, id === "phase-lower" ? { id, phase } : { id }])}>+ {id === "beam-splitter" ? "BS" : "φ"}</button>
          ))}
          <button type="button" className="qwa-btn-secondary text-xs opacity-70" onClick={() => setCustom([])}>Reset</button>
        </div>
      )}
      <div className="qwa-glass-card !p-4">
        <OpticalDiagram elements={elements} phase={phase} pUpper={pUpper} pLower={pLower} />
        <p className="mt-2 font-mono text-xs text-[var(--qwa-cyan)]">{elements.map(elementShortLabel).join(" → ") || "Input |path₀⟩"}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="qwa-glass-card !p-4">
          <p className="font-mono text-sm text-[var(--qwa-cyan)]">{stateToKetString(state)}</p>
          <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">{quantumAnalogue(elements)}</p>
        </div>
        <ProbabilityBars prob0={pUpper} prob1={pLower} title="Measurement probabilities" />
      </div>
    </div>
  );
}
