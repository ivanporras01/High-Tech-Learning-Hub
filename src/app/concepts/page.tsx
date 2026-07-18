import Link from "next/link";
import type { Metadata } from "next";
import { QUANTUM_CONCEPTS, lessonPath } from "@/lib/data/quantum-concepts";

export const metadata: Metadata = {
  title: "Quantum Concepts Guide",
  description:
    "Superposition, entanglement, teleportation, gates, measurement, interference, and more — explained with links to full lessons and simulations.",
};

export default function ConceptsPage() {
  return (
    <div className="qwa-section">
      <div className="qwa-container max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">
          Foundations · Every scholar starts here
        </p>
        <h1 className="mt-2 text-4xl font-black text-[var(--qwa-fg)] sm:text-5xl">
          Quantum Computing Concepts
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--qwa-fg-muted)]">
          Superposition, entanglement, teleportation, measurement, gates, and more — each concept explained in
          plain language with links to full lessons, visuals, and interactive simulations.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/course/foundations-of-quantum-computing/what-is-quantum-computing" className="qwa-btn-primary">
            Start with Module 1
          </Link>
          <Link href="/simulations/bloch-sphere" className="qwa-btn-secondary">
            Open Bloch Sphere
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {QUANTUM_CONCEPTS.map((concept) => (
            <article
              key={concept.id}
              id={concept.id}
              className="qwa-glass-card qwa-card-glow scroll-mt-24"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  {concept.symbol && (
                    <span className="font-mono text-2xl text-[var(--qwa-cyan)]">{concept.symbol}</span>
                  )}
                  <h2 className="mt-1 text-xl font-bold text-[var(--qwa-fg)]">{concept.title}</h2>
                </div>
                <Link
                  href={lessonPath(concept.primaryLesson)}
                  className="shrink-0 rounded-lg border border-[var(--qwa-cyan)]/40 px-3 py-1.5 text-xs font-semibold text-[var(--qwa-cyan)] hover:bg-[var(--qwa-cyan)]/10"
                >
                  Full lesson →
                </Link>
              </div>

              <p className="mt-3 text-sm font-medium text-[var(--qwa-violet)] dark:text-[var(--qwa-cyan)]">
                {concept.summary}
              </p>

              <div className="qwa-prose mt-4 !text-sm">
                <p>{concept.explanation}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--qwa-fg-muted)]">Key points</p>
                <ul className="mt-2 space-y-1 text-sm text-[var(--qwa-fg-muted)]">
                  {concept.keyPoints.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-[var(--qwa-cyan)]">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {concept.misconceptions && concept.misconceptions.length > 0 && (
                <div className="mt-4 rounded-lg border border-amber-500/25 bg-amber-500/5 px-3 py-2">
                  <p className="text-xs font-bold uppercase text-amber-300/90">Common misconceptions</p>
                  <ul className="mt-1 space-y-1 text-xs text-[var(--qwa-fg-muted)]">
                    {concept.misconceptions.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--qwa-border)] pt-4">
                {concept.relatedLessons?.map((rel) => (
                  <Link
                    key={rel.lessonSlug}
                    href={lessonPath(rel)}
                    className="qwa-badge text-[10px] hover:border-[var(--qwa-cyan)]/50 hover:text-[var(--qwa-cyan)]"
                  >
                    {rel.title}
                  </Link>
                ))}
                {concept.simulationHref && (
                  <Link
                    href={concept.simulationHref}
                    className="qwa-badge border-[var(--qwa-violet)]/40 text-[var(--qwa-violet)] text-[10px] hover:opacity-80"
                  >
                    Simulation ↗
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 qwa-glass-card text-center">
          <h2 className="text-xl font-bold text-[var(--qwa-fg)]">Ready to go deeper?</h2>
          <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">
            Register as a Scholar to track progress, complete Module 1, and earn your Foundations Certificate.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/register" className="qwa-btn-primary">Register as Scholar</Link>
            <Link href="/course" className="qwa-btn-secondary">View full curriculum</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
