"use client";

import { useState } from "react";
import { QUANTUM_MODALITIES, type ModalityId } from "@/lib/data/quantum-technologies";

interface TechnologyLandscapeProps {
  title?: string;
  /** Show compact grid only (for lesson embed) */
  compact?: boolean;
}

/**
 * Interactive comparison of quantum computing technology classes —
 * superconducting, trapped ion, photonic, neutral atom, topological, spin.
 */
export function TechnologyLandscape({ title, compact = false }: TechnologyLandscapeProps) {
  const [active, setActive] = useState<ModalityId>("superconducting");
  const selected = QUANTUM_MODALITIES.find((m) => m.id === active)!;

  return (
    <section className="qwa-glass-card border border-[var(--qwa-violet)]/25 !p-5 sm:!p-6">
      {title && <h3 className="text-lg font-bold text-[var(--qwa-fg)]">{title}</h3>}
      <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">
        There is no single &ldquo;quantum computer&rdquo; — scholars must know the major physical
        platforms, their tradeoffs, and which cloud backends use each modality.
      </p>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Quantum technology classes">
        {QUANTUM_MODALITIES.map((mod) => (
          <button
            key={mod.id}
            type="button"
            role="tab"
            aria-selected={active === mod.id}
            onClick={() => setActive(mod.id)}
            className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition sm:text-sm ${
              active === mod.id
                ? "border-[var(--qwa-cyan)] bg-[var(--qwa-cyan)]/10 text-[var(--qwa-cyan)]"
                : "border-[var(--qwa-border)] text-[var(--qwa-fg-muted)] hover:border-[var(--qwa-violet)]"
            }`}
          >
            {mod.name.replace(" Qubits", "").replace(" Quantum Computing", "")}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: selected.color }}
              aria-hidden
            />
            <div>
              <h4 className="text-xl font-bold text-[var(--qwa-fg)]">{selected.name}</h4>
              <p className="text-sm text-[var(--qwa-fg-muted)]">{selected.subtitle}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[var(--qwa-fg-muted)]">{selected.physicalBasis}</p>

          {!compact && (
            <>
              <dl className="mt-5 space-y-3 text-sm">
                <div>
                  <dt className="font-semibold text-[var(--qwa-fg)]">Environment</dt>
                  <dd className="text-[var(--qwa-fg-muted)]">{selected.operatingEnvironment}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--qwa-fg)]">Gate fidelity (typical)</dt>
                  <dd className="text-[var(--qwa-fg-muted)]">{selected.typicalGateFidelity}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--qwa-fg)]">Connectivity</dt>
                  <dd className="text-[var(--qwa-fg-muted)]">{selected.connectivity}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[var(--qwa-fg)]">Scaling approach</dt>
                  <dd className="text-[var(--qwa-fg-muted)]">{selected.scalingApproach}</dd>
                </div>
              </dl>

              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[var(--qwa-violet)]">
                Cloud access
              </p>
              <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{selected.cloudAccess.join(" · ")}</p>
            </>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4">
            <p className="text-xs font-bold uppercase text-[var(--qwa-cyan)]">Strengths</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-[var(--qwa-fg-muted)]">
              {selected.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4">
            <p className="text-xs font-bold uppercase text-[var(--qwa-magenta)]">Challenges</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-[var(--qwa-fg-muted)]">
              {selected.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          {!compact && (
            <div className="rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4">
              <p className="text-xs font-bold uppercase text-[var(--qwa-fg)]">Workforce roles</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.workforceRoles.map((r) => (
                  <span key={r} className="qwa-badge text-[10px]">
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-[var(--qwa-fg-muted)]">
                Leaders: {selected.leadingOrganizations.join(", ")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Side-by-side summary table for all modalities */
export function TechnologyComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--qwa-border)]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)]">
            <th className="p-3 font-semibold text-[var(--qwa-fg)]">Modality</th>
            <th className="p-3 font-semibold text-[var(--qwa-fg)]">Environment</th>
            <th className="p-3 font-semibold text-[var(--qwa-fg)]">Fidelity</th>
            <th className="p-3 font-semibold text-[var(--qwa-fg)]">Connectivity</th>
            <th className="p-3 font-semibold text-[var(--qwa-fg)]">Cloud</th>
          </tr>
        </thead>
        <tbody>
          {QUANTUM_MODALITIES.map((m) => (
            <tr key={m.id} className="border-b border-[var(--qwa-border)] last:border-0">
              <td className="p-3">
                <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="font-medium text-[var(--qwa-fg)]">{m.name.replace(" Qubits", "").replace(" Quantum Computing", "")}</span>
              </td>
              <td className="p-3 text-[var(--qwa-fg-muted)]">{m.operatingEnvironment}</td>
              <td className="p-3 text-[var(--qwa-fg-muted)]">{m.typicalGateFidelity}</td>
              <td className="p-3 text-[var(--qwa-fg-muted)]">{m.connectivity}</td>
              <td className="p-3 text-[var(--qwa-fg-muted)]">{m.cloudAccess[0]}{m.cloudAccess.length > 1 ? " +more" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
