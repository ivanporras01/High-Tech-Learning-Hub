"use client";

interface ProbabilityBarsProps {
  prob0: number;
  prob1: number;
  title?: string;
}

/** Measurement probability bar chart for |0⟩ and |1⟩ */
export function ProbabilityBars({ prob0, prob1, title }: ProbabilityBarsProps) {
  const p0 = Math.max(0, Math.min(1, prob0));
  const p1 = Math.max(0, Math.min(1, prob1));

  return (
    <figure className="qwa-glass-card !p-4">
      {title && <figcaption className="mb-3 text-sm font-semibold text-[var(--qwa-fg)]">{title}</figcaption>}
      <div className="space-y-4">
        {[
          { label: "|0⟩", prob: p0, color: "bg-cyan-400" },
          { label: "|1⟩", prob: p1, color: "bg-violet-400" },
        ].map(({ label, prob, color }) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-mono text-[var(--qwa-fg)]">{label}</span>
              <span className="text-[var(--qwa-fg-muted)]">{(prob * 100).toFixed(1)}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[var(--qwa-border)]">
              <div
                className={`h-full rounded-full ${color} transition-all duration-500`}
                style={{ width: `${prob * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--qwa-fg-muted)]">
        Born rule: measurement probability equals amplitude magnitude squared.
      </p>
    </figure>
  );
}
