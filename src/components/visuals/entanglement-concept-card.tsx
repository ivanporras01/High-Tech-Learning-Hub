"use client";

/** Bell-state correlation concept card — workforce-level entanglement intuition */
export function EntanglementConceptCard({ title }: { title?: string }) {
  const correlations = [
    { state: "|Φ⁺⟩ = (|00⟩ + |11⟩)/√2", m00: "50%", m01: "0%", m10: "0%", m11: "50%" },
    { state: "Classical correlated coins", m00: "25%", m01: "25%", m10: "25%", m11: "25%" },
  ];

  return (
    <figure className="qwa-glass-card !p-5">
      {title && (
        <figcaption className="mb-4 text-sm font-semibold text-[var(--qwa-fg)]">{title}</figcaption>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-bg-elevated)] p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--qwa-cyan)]">
            Bell state |Φ⁺⟩
          </p>
          <p className="font-mono text-sm text-[var(--qwa-fg)]">H on q0 → CNOT(q0, q1)</p>
          <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">
            Joint outcomes are perfectly correlated: always 00 or 11, never 01 or 10 — even though each qubit alone looks random.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--qwa-border)] text-left text-[var(--qwa-fg-muted)]">
                <th className="pb-2 pr-3">State type</th>
                <th className="pb-2 px-2">|00⟩</th>
                <th className="pb-2 px-2">|01⟩</th>
                <th className="pb-2 px-2">|10⟩</th>
                <th className="pb-2 px-2">|11⟩</th>
              </tr>
            </thead>
            <tbody>
              {correlations.map((row) => (
                <tr key={row.state} className="border-b border-[var(--qwa-border)]/50">
                  <td className="py-2 pr-3 text-xs text-[var(--qwa-fg)]">{row.state.split("=")[0]}</td>
                  <td className="px-2 py-2 font-mono">{row.m00}</td>
                  <td className="px-2 py-2 font-mono">{row.m01}</td>
                  <td className="px-2 py-2 font-mono">{row.m10}</td>
                  <td className="px-2 py-2 font-mono">{row.m11}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-[var(--qwa-fg-muted)]">
        Entanglement = joint correlations that cannot be explained by any local hidden-variable story.
      </p>
    </figure>
  );
}
