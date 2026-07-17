import Link from "next/link";
import { TechnologiesVisuals } from "@/components/technologies/technologies-visuals";
import { QUANTUM_MODALITIES } from "@/lib/data/quantum-technologies";

export const metadata = {
  title: "Quantum Technology Classes",
  description:
    "Compare superconducting, trapped-ion, photonic, neutral-atom, topological, and spin qubit platforms for college scholars.",
};

export default function TechnologiesPage() {
  return (
    <div className="qwa-section">
      <div className="qwa-container max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-wider text-[var(--qwa-accent)]">
          Hardware Landscape
        </p>
        <h1 className="mt-2 text-4xl font-black text-[var(--qwa-fg)]">
          Classes of Quantum Computing Technology
        </h1>
        <p className="mt-4 max-w-3xl text-[var(--qwa-fg-muted)]">
          Scholars must understand that quantum hardware is not monolithic. Each physical platform
          — superconducting circuits, trapped ions, photons, neutral atoms, topological systems, and
          semiconductor spins — makes different engineering tradeoffs. Your choice of cloud backend,
          SDK, and career path depends on this landscape.
        </p>

        <div className="mt-10">
          <TechnologiesVisuals title="Explore each technology class" />
        </div>

        <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUANTUM_MODALITIES.map((m) => (
            <div key={m.id} className="qwa-glass-card !p-4">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
              <h3 className="mt-2 font-bold text-[var(--qwa-fg)]">{m.name}</h3>
              <p className="mt-1 text-xs text-[var(--qwa-fg-muted)]">{m.leadingOrganizations.join(" · ")}</p>
            </div>
          ))}
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/course/foundations-of-quantum-computing/quantum-technology-landscape"
            className="qwa-btn-primary text-sm"
          >
            Module 1 Lesson →
          </Link>
          <Link href="/companies" className="qwa-btn-secondary text-sm">
            Employer profiles by modality →
          </Link>
        </div>
      </div>
    </div>
  );
}
