import Link from "next/link";
import type { Metadata } from "next";
import { OpticalBenchSimulator } from "@/components/simulations/optical-bench-simulator";

export const metadata: Metadata = {
  title: "Optical Bench Simulator",
  description:
    "Advanced Thorlabs-style optical bench — drag-and-drop components, Jones calculus, power meters, and photonic quantum readouts.",
};

export default function OpticalCircuitsPage() {
  return (
    <div className="qwa-section">
      <div className="qwa-container max-w-[1400px]">
        <Link href="/simulations" className="text-sm text-[var(--qwa-accent)] hover:underline">
          ← All simulations
        </Link>
        <p className="mt-4 text-sm font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">
          Photonic Quantum Computing
        </p>
        <h1 className="mt-2 text-4xl font-black text-[var(--qwa-fg)]">Optical Bench Simulator</h1>
        <p className="mt-4 max-w-3xl text-[var(--qwa-fg-muted)]">
          Build free-space optical circuits with a Thorlabs-style component catalog — lasers, beam splitters, mirrors,
          wave plates, filters, isolators, and calibrated power meters. Wire ports, adjust SKU parameters, and read
          detector power in mW/dBm. Switch to the quantum view for dual-rail LOQC analogues.
        </p>
        <div className="mt-8">
          <OpticalBenchSimulator />
        </div>
      </div>
    </div>
  );
}
