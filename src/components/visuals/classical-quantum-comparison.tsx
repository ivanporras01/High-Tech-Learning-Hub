"use client";

/** Side-by-side classical bit vs qubit + advantages/disadvantages for scholars */
export function ClassicalQuantumComparison() {
  return (
    <div className="space-y-6">
      {/* Bit vs Qubit */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--qwa-fg-muted)]">
            Classical bit
          </p>
          <p className="mt-2 font-mono text-2xl font-bold text-[var(--qwa-fg)]">0 or 1</p>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-[var(--qwa-fg-muted)]">
            <li>Definite state at all times</li>
            <li>Copy freely (RAM, USB, network)</li>
            <li>Read without changing the value</li>
            <li>n bits → exactly n bits of readable info</li>
            <li>Logic gates: AND, OR, NOT, NAND…</li>
          </ul>
        </div>
        <div className="rounded-xl border border-[var(--qwa-cyan)]/40 bg-[var(--qwa-cyan)]/5 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">
            Quantum bit (qubit)
          </p>
          <p className="mt-2 font-mono text-sm font-bold text-[var(--qwa-cyan)]">
            |ψ⟩ = α|0⟩ + β|1⟩
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-[var(--qwa-fg-muted)]">
            <li>Superposition until measured</li>
            <li>|α|² + |β|² = 1 (normalization)</li>
            <li>Measurement → 0 or 1 (Born rule)</li>
            <li>Cannot clone unknown states</li>
            <li>Gates: unitary rotations (H, X, Rx…)</li>
          </ul>
        </div>
      </div>

      {/* Advantages */}
      <div className="rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4">
        <p className="text-sm font-bold text-[var(--qwa-cyan)]">Advantages of quantum computing</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            "Exponential state space — n qubits span 2ⁿ amplitudes for interference",
            "Interference — wrong answers cancel, correct paths amplify",
            "Entanglement — correlations impossible classically",
            "Quantum simulation — natively models molecules & materials",
            "Specific speedups — Shor (factoring), Grover (search), VQE/QAOA (hybrid)",
            "Randomness — certified random bits from measurement",
          ].map((item) => (
            <li key={item} className="flex gap-2 text-sm text-[var(--qwa-fg-muted)]">
              <span className="text-[var(--qwa-cyan)]" aria-hidden="true">+</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Disadvantages */}
      <div className="rounded-xl border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] p-4">
        <p className="text-sm font-bold text-[var(--qwa-magenta)]">Disadvantages &amp; limitations</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {[
            "Not universal speedup — most everyday tasks stay classical",
            "Measurement collapse — only one n-bit outcome per run",
            "Noise & decoherence — NISQ devices need error mitigation",
            "Hardware cost — cryogenics, lasers, vacuum, calibration teams",
            "Queue latency & cost — cloud access is scarce and billed per shot",
            "Algorithm design — only some problems have proven quantum advantage",
          ].map((item) => (
            <li key={item} className="flex gap-2 text-sm text-[var(--qwa-fg-muted)]">
              <span className="text-[var(--qwa-magenta)]" aria-hidden="true">−</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-xs text-[var(--qwa-fg-muted)]">
        Workforce insight: hybrid classical–quantum workflows dominate near-term value — not
        &ldquo;replace all computers.&rdquo;
      </p>
    </div>
  );
}
