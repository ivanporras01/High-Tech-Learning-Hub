import Link from "next/link";
import type { Metadata } from "next";
import { GatePlayground } from "@/components/visuals/gate-playground";
import { BlochSphere } from "@/components/simulations/bloch-sphere";

export const metadata: Metadata = {
  title: "Bloch Sphere Simulation",
  description: "Interactive Three.js Bloch sphere and quantum gate playground.",
};

export default function BlochSpherePage() {
  return (
    <div className="qwa-section">
      <div className="qwa-container max-w-5xl">
        <Link href="/simulations" className="text-sm text-[var(--qwa-accent)] hover:underline">
          ← All simulations
        </Link>
        <p className="mt-4 text-sm font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">
          Interactive Simulation
        </p>
        <h1 className="mt-2 text-4xl font-black text-[var(--qwa-fg)]">
          Bloch Sphere &amp; Quantum Gates
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--qwa-fg-muted)]">
          North pole = |0⟩, south pole = |1⟩, equator = equal superposition with phase. Apply unitaries
          and watch the state vector, circuit diagram, and Born-rule probabilities update together.
        </p>

        <div className="mt-10">
          <GatePlayground title="Full Gate Playground" />
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--qwa-fg)]">Three.js Bloch Explorer</h2>
          <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">
            Standalone WebGL visualization — drag to rotate, apply H/X/Y/Z or jump to |0⟩, |1⟩, |+⟩.
          </p>
          <div className="qwa-glass-card mt-6">
            <BlochSphere />
          </div>
        </section>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { gate: "H", note: "|0⟩ → +X equator — 50/50 measurement" },
            { gate: "X", note: "Bit flip — pole to pole (180°)" },
            { gate: "Ry(θ)", note: "Tilts vector toward |1⟩ by angle θ" },
          ].map(({ gate, note }) => (
            <div key={gate} className="qwa-glass-card !p-4">
              <p className="font-mono text-lg font-bold text-[var(--qwa-cyan)]">{gate}</p>
              <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{note}</p>
            </div>
          ))}
        </div>

        <Link
          href="/course/qubits-and-quantum-states/bloch-sphere-visualization"
          className="qwa-btn-secondary mt-10 inline-flex text-sm"
        >
          Related lesson: Bloch Sphere Visualization →
        </Link>
      </div>
    </div>
  );
}
