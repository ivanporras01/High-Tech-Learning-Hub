"use client";

import type { EvolutionStep } from "@/lib/quantum/state";
import {
  blochDerivation,
  formatComplex,
  formatMatrixCell,
  vectorColumnTex,
} from "@/lib/quantum/state";

interface GateMathPanelProps {
  steps: EvolutionStep[];
  activeStepIndex: number;
  onStepSelect?: (index: number) => void;
}

function Matrix2x2({ m, label }: { m: [import("@/lib/quantum/state").Complex, import("@/lib/quantum/state").Complex][]; label: string }) {
  return (
    <div className="inline-block">
      <p className="mb-1 text-xs font-semibold text-[var(--qwa-violet)]">{label}</p>
      <div className="grid grid-cols-2 gap-1 rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-2 font-mono text-xs">
        {m.flat().map((cell, i) => (
          <span key={i} className="min-w-[4.5rem] text-center text-[var(--qwa-cyan)]">
            {formatMatrixCell(cell)}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Step-by-step unitary application and Bloch vector verification */
export function GateMathPanel({ steps, activeStepIndex, onStepSelect }: GateMathPanelProps) {
  const step = steps[activeStepIndex] ?? steps[steps.length - 1];
  const state = step.stateAfter;
  const deriv = blochDerivation(state);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">
          Mathematical verification
        </p>
        <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">
          Each gate is a 2×2 unitary U. The state updates as |ψ&apos;⟩ = U|ψ⟩. Bloch coordinates follow
          from α, β in |ψ⟩ = α|0⟩ + β|1⟩.
        </p>
      </div>

      {/* Step selector */}
      <div className="flex flex-wrap gap-2">
        {steps.map((s) => (
          <button
            key={s.index}
            type="button"
            onClick={() => onStepSelect?.(s.index)}
            className={`rounded-lg border px-2 py-1 font-mono text-xs transition ${
              activeStepIndex === s.index
                ? "border-[var(--qwa-cyan)] bg-[var(--qwa-cyan)]/15 text-[var(--qwa-cyan)]"
                : "border-[var(--qwa-border)] text-[var(--qwa-fg-muted)]"
            }`}
          >
            {s.index === 0 ? "|0⟩" : s.gateLabel}
          </button>
        ))}
        {steps.length > 0 && (
          <span className="self-center text-xs text-[var(--qwa-fg-muted)]">+ M</span>
        )}
      </div>

      {/* Active step detail */}
      <div className="rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4">
        {step.gate !== "initial" && step.matrix && (
          <div className="mb-4 flex flex-wrap items-start gap-6">
            <Matrix2x2 m={step.matrix} label={`U = ${step.gateLabel}`} />
            <div className="text-sm text-[var(--qwa-fg-muted)]">
              <p className="font-semibold text-[var(--qwa-fg)]">Matrix × vector</p>
              <p className="mt-2 font-mono text-xs leading-relaxed text-[var(--qwa-cyan)]">
                |ψ&apos;⟩ = U|ψ⟩
              </p>
              <p className="mt-2 font-mono text-xs">Before: {vectorColumnTex(step.stateBefore)}</p>
              <p className="mt-1 font-mono text-xs">After: {vectorColumnTex(step.stateAfter)}</p>
            </div>
          </div>
        )}

        {step.gate === "initial" && (
          <p className="mb-3 text-sm text-[var(--qwa-fg-muted)]">
            Initial state |0⟩ = 1·|0⟩ + 0·|1⟩ → vector [1, 0]ᵀ, Bloch north pole (0, 0, 1).
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase text-[var(--qwa-fg)]">Statevector</p>
            <p className="mt-1 font-mono text-sm text-[var(--qwa-cyan)]">{vectorColumnTex(state)}</p>
            <p className="mt-2 font-mono text-xs text-[var(--qwa-fg-muted)]">
              α = {deriv.alpha}
              <br />
              β = {deriv.beta}
            </p>
            <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">Born rule: {deriv.normCheck}</p>
            <p className="mt-1 text-xs text-[var(--qwa-fg-muted)]">
              P(|0⟩) = |α|² = {step.p0.toFixed(4)} · P(|1⟩) = |β|² = {step.p1.toFixed(4)}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-[var(--qwa-fg)]">Bloch vector (computed)</p>
            <ul className="mt-1 space-y-1 font-mono text-xs text-[var(--qwa-fg-muted)]">
              <li>
                x = {deriv.xExpr} = 2·Re({deriv.alpha}*·{deriv.beta}) ={" "}
                <strong className="text-[var(--qwa-cyan)]">{deriv.x.toFixed(4)}</strong>
              </li>
              <li>
                y = {deriv.yExpr} = 2·Im({deriv.alpha}*·{deriv.beta}) ={" "}
                <strong className="text-[var(--qwa-cyan)]">{deriv.y.toFixed(4)}</strong>
              </li>
              <li>
                z = {deriv.zExpr} = |α|² − |β|² ={" "}
                <strong className="text-[var(--qwa-cyan)]">{deriv.z.toFixed(4)}</strong>
              </li>
            </ul>
            <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">
              Sphere point: ({step.bloch.x.toFixed(3)}, {step.bloch.y.toFixed(3)}, {step.bloch.z.toFixed(3)})
            </p>
          </div>
        </div>
      </div>

      {/* Full evolution chain */}
      {steps.length > 1 && (
        <details className="rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[var(--qwa-fg)]">
            Full circuit evolution (all steps)
          </summary>
          <ol className="mt-3 space-y-3 text-sm">
            {steps.slice(1).map((s) => (
              <li key={s.index} className="border-l-2 border-[var(--qwa-violet)] pl-3">
                <span className="font-mono font-bold text-[var(--qwa-cyan)]">{s.gateLabel}</span>
                <span className="text-[var(--qwa-fg-muted)]"> → {vectorColumnTex(s.stateAfter)}</span>
                <span className="block text-xs text-[var(--qwa-fg-muted)]">
                  Bloch ({s.bloch.x.toFixed(3)}, {s.bloch.y.toFixed(3)}, {s.bloch.z.toFixed(3)})
                </span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  );
}
