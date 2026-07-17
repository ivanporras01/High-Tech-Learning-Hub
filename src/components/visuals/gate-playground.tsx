"use client";

import { useMemo, useState } from "react";
import {
  KET0,
  applyGate,
  prob0,
  prob1,
  stateLabel,
  toBloch,
  type GateId,
  type StateVector,
} from "@/lib/quantum/state";
import { BlochSphereView } from "./bloch-sphere-view";
import { CircuitDiagram } from "./circuit-diagram";
import { ProbabilityBars } from "./probability-bars";

const GATE_BUTTONS: { id: GateId; label: string; desc: string }[] = [
  { id: "H", label: "H", desc: "Hadamard — superposition" },
  { id: "X", label: "X", desc: "Pauli-X — bit flip |0⟩↔|1⟩" },
  { id: "Y", label: "Y", desc: "Pauli-Y — flip + phase" },
  { id: "Z", label: "Z", desc: "Pauli-Z — phase flip" },
  { id: "S", label: "S", desc: "Phase π/2" },
  { id: "T", label: "T", desc: "Phase π/4" },
  { id: "Rx", label: "Rx", desc: "Rotate around X axis" },
  { id: "Ry", label: "Ry", desc: "Rotate around Y axis" },
  { id: "Rz", label: "Rz", desc: "Rotate around Z axis" },
];

interface GatePlaygroundProps {
  title?: string;
  initialGates?: GateId[];
}

/**
 * Interactive gate lab — apply gates, watch Bloch vector, circuit, and probabilities update.
 * Core visual learning tool for the college/university curriculum.
 */
export function GatePlayground({ title = "Gate Playground", initialGates = [] }: GatePlaygroundProps) {
  const [gates, setGates] = useState<GateId[]>(initialGates);
  const [rotationAngle, setRotationAngle] = useState(Math.PI / 2);

  const state: StateVector = useMemo(() => {
    let s = KET0;
    for (const g of gates) {
      s = applyGate(s, g, g === "Rx" || g === "Ry" || g === "Rz" ? rotationAngle : Math.PI / 2);
    }
    return s;
  }, [gates, rotationAngle]);

  const bloch = toBloch(state);
  const circuitGates = [...gates.map((id) => ({ id })), { id: "M" as const }];

  const apply = (id: GateId) => setGates((prev) => [...prev, id]);
  const undo = () => setGates((prev) => prev.slice(0, -1));
  const reset = () => setGates([]);

  return (
    <section className="qwa-glass-card border border-[var(--qwa-violet)]/30 !p-5 sm:!p-6">
      <h3 className="text-lg font-bold text-[var(--qwa-fg)]">{title}</h3>
      <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">
        Click gates to build a circuit starting from |0⟩. Watch the Bloch vector, amplitudes, and
        measurement probabilities update in real time.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {GATE_BUTTONS.map(({ id, label, desc }) => (
          <button
            key={id}
            type="button"
            onClick={() => apply(id)}
            title={desc}
            className="rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] px-3 py-2 font-mono text-sm font-bold text-[var(--qwa-cyan)] transition hover:border-[var(--qwa-cyan)] hover:bg-[var(--qwa-cyan)]/10"
          >
            {label}
          </button>
        ))}
        <button type="button" onClick={undo} className="qwa-btn-secondary !px-3 !py-2 text-xs">
          Undo
        </button>
        <button type="button" onClick={reset} className="qwa-btn-secondary !px-3 !py-2 text-xs">
          Reset |0⟩
        </button>
      </div>

      {(gates.includes("Rx") || gates.includes("Ry") || gates.includes("Rz")) && (
        <label className="mt-4 block">
          <span className="text-sm text-[var(--qwa-fg-muted)]">
            Rotation angle: {((rotationAngle * 180) / Math.PI).toFixed(0)}°
          </span>
          <input
            type="range"
            min={0}
            max={Math.PI * 2}
            step={0.05}
            value={rotationAngle}
            onChange={(e) => setRotationAngle(parseFloat(e.target.value))}
            className="mt-1 w-full accent-[var(--qwa-violet)]"
          />
        </label>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <BlochSphereView bloch={bloch} label="Current state on Bloch sphere" />
        <div className="space-y-4">
          <CircuitDiagram gates={circuitGates} title="Circuit (q0)" />
          <ProbabilityBars prob0={prob0(state)} prob1={prob1(state)} title="Measurement probabilities" />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4 font-mono text-sm">
        <p className="text-xs uppercase tracking-wider text-[var(--qwa-fg-muted)]">Statevector</p>
        <p className="mt-1 text-[var(--qwa-cyan)]">{stateLabel(state)}</p>
        <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">
          Bloch: x={bloch.x.toFixed(3)}, y={bloch.y.toFixed(3)}, z={bloch.z.toFixed(3)}
        </p>
      </div>
    </section>
  );
}
