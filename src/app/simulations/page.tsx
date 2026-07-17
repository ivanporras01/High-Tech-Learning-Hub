import Link from "next/link";

const SIMULATIONS = [
  {
    href: "/simulations/bloch-sphere",
    title: "Bloch Sphere & Gate Playground",
    description: "3D Bloch sphere + H, X, Y, Z, S, T, Rx, Ry, Rz. Live circuit SVG and probability bars.",
    status: "Live",
  },
  {
    href: "/course/foundations-of-quantum-computing/what-is-quantum-computing",
    title: "Lesson-embedded visuals",
    description: "Gate demos and circuit diagrams inside Module 1 lessons.",
    status: "Live",
  },
  {
    href: "/labs/superposition-and-bloch",
    title: "Lab 2: Superposition & Bloch",
    description: "Match Qiskit Statevector output to the Bloch sphere position.",
    status: "Live",
  },
];

export const metadata = { title: "Simulations" };

export default function SimulationsPage() {
  return (
    <div className="qwa-section">
      <div className="qwa-container">
        <p className="text-sm font-bold uppercase tracking-wider text-[var(--qwa-accent)]">
          Visual Learning Hub
        </p>
        <h1 className="mt-2 text-4xl font-black text-[var(--qwa-fg)]">Quantum Simulations</h1>
        <p className="mt-4 max-w-2xl text-[var(--qwa-fg-muted)]">
          Graphic-first curriculum — Bloch sphere, gates, and circuits are the primary learning interface,
          not optional extras.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SIMULATIONS.map((sim) => (
            <Link key={sim.title} href={sim.href} className="qwa-glass-card block">
              <span className="qwa-badge border-[var(--qwa-cyan)]/40 text-[var(--qwa-cyan)]">{sim.status}</span>
              <h2 className="mt-3 text-lg font-bold text-[var(--qwa-fg)]">{sim.title}</h2>
              <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">{sim.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
