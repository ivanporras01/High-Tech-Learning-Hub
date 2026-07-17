"use client";

import { useMemo, useState } from "react";
import {
  KET0,
  applyGate,
  computeEvolution,
  gateDisplayLabel,
  prob0,
  prob1,
  stateLabel,
  toBloch,
  type GateId,
  type StateVector,
} from "@/lib/quantum/state";
import { BlochSphereView } from "./bloch-sphere-view";
import { CircuitDiagram } from "./circuit-diagram";
import { GateMathPanel } from "./gate-math-panel";
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
 * Interactive gate lab — circuit detail, Bloch sphere, and step-by-step matrix/vector math.
 */
export function GatePlayground({ title = "Gate Playground", initialGates = [] }: GatePlaygroundProps) {
  const [gates, setGates] = useState<GateId[]>(initialGates);
  const [rotationAngle, setRotationAngle] = useState(Math.PI / 2);
  const [mathStep, setMathStep] = useState(0);

  const state: StateVector = useMemo(() => {
    let s = KET0;
    for (const g of gates) {
      s = applyGate(s, g, g === "Rx" || g === "Ry" || g === "Rz" ? rotationAngle : Math.PI / 2);
    }
    return s;
  }, [gates, rotationAngle]);

  const evolution = useMemo(
    () => computeEvolution(gates, rotationAngle),
    [gates, rotationAngle]
  );

  const bloch = toBloch(state);

  const circuitGates = useMemo(
    () => [
      { id: "I" as GateId, label: "|0⟩" },
      ...gates.map((id) => ({
        id,
        label: gateDisplayLabel(
          id,
          id === "Rx" || id === "Ry" || id === "Rz" ? rotationAngle : Math.PI / 2
        ),
      })),
      { id: "M" as const },
    ],
    [gates, rotationAngle]
  );

  const apply = (id: GateId) => {
    setGates((prev) => [...prev, id]);
    setMathStep(gates.length + 1);
  };
  const undo = () => {
    setGates((prev) => prev.slice(0, -1));
    setMathStep(Math.max(0, gates.length - 1));
  };
  const reset = () => {
    setGates([]);
    setMathStep(0);
  };

  const circuitNotation =
    gates.length === 0
      ? "|0⟩ — M"
      : `|0⟩ — ${gates.map((g) => gateDisplayLabel(g, g === "Rx" || g === "Ry" || g === "Rz" ? rotationAngle : Math.PI / 2)).join(" — ")} — M`;

  return (
    <section className="qwa-glass-card border border-[var(--qwa-violet)]/30 !p-5 sm:!p-6">
      <h3 className="text-lg font-bold text-[var(--qwa-fg)]">{title}</h3>
      <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">
        Build a circuit from |0⟩. Each click applies U|ψ⟩ — verify the statevector, Bloch vector, and
        Born probabilities step by step.
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
            Rotation angle θ: {((rotationAngle * 180) / Math.PI).toFixed(0)}° (
            {(rotationAngle / Math.PI).toFixed(2)}π rad)
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

      {/* Detailed circuit notation */}
      <div className="mt-4 rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-3">
        <p className="text-xs font-bold uppercase text-[var(--qwa-fg-muted)]">Circuit (time →)</p>
        <p className="mt-1 font-mono text-sm text-[var(--qwa-cyan)]">{circuitNotation}</p>
        <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">
          {gates.length} gate{gates.length !== 1 ? "s" : ""} before measurement · qubit wire q0
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <BlochSphereView bloch={bloch} label="Bloch sphere (matches math panel below)" />
        <div className="space-y-4">
          <CircuitDiagram gates={circuitGates} title="Diagram — q0" />
          <ProbabilityBars prob0={prob0(state)} prob1={prob1(state)} title="Measurement (Born rule)" />
        </div>
      </div>

      <div className="mt-6">
        <GateMathPanel
          steps={evolution}
          activeStepIndex={mathStep}
          onStepSelect={setMathStep}
        />
      </div>

      <div className="mt-4 rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4 font-mono text-sm">
        <p className="text-xs uppercase tracking-wider text-[var(--qwa-fg-muted)]">Final state</p>
        <p className="mt-1 text-[var(--qwa-cyan)]">{stateLabel(state)}</p>
      </div>
    </section>
  );
}
