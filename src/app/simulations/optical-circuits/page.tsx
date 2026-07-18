import Link from "next/link";
import type { Metadata } from "next";
import { OpticalCircuitSimulator } from "@/components/simulations/optical-circuit-simulator";

export const metadata: Metadata = {
  title: "Optical Circuit Simulator",
  description: "Interactive photonic circuit simulator — Mach–Zehnder, dual-rail qubits, and quantum computing applications.",
};

export default function OpticalCircuitsPage() {
  return (
    <div className="qwa-section">
      <div className="qwa-container max-w-5xl">
        <Link href="/simulations" className="text-sm text-[var(--qwa-accent)] hover:underline">← All simulations</Link>
        <p className="mt-4 text-sm font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">Photonic Quantum Computing</p>
        <h1 className="mt-2 text-4xl font-black text-[var(--qwa-fg)]">Optical Circuit Simulator</h1>
        <p className="mt-4 max-w-2xl text-[var(--qwa-fg-muted)]">
          Beam splitters and phase shifters implement quantum gates on dual-rail photonic qubits — the same physics
          behind Xanadu, PsiQuantum, and linear optical quantum computing (LOQC).
        </p>
        <div className="mt-10">
          <OpticalCircuitSimulator />
        </div>
      </div>
    </div>
  );
}
