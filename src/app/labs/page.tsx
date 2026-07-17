import Link from "next/link";
import type { Metadata } from "next";
import { LABS } from "@/lib/data/labs";

export const metadata: Metadata = {
  title: "Labs",
  description: "20 hands-on Qiskit labs for quantum workforce development.",
};

export default function LabsPage() {
  return (
    <div className="qwa-container py-12">
      <header>
        <h1 className="text-3xl font-bold text-[var(--qwa-fg)] sm:text-4xl">Hands-on Labs</h1>
        <p className="mt-4 max-w-2xl text-[var(--qwa-fg-muted)]">
          Build real Qiskit circuits — from Hello Quantum World to capstone projects. Labs 1–3 include
          full step-by-step instructions and code solutions.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
        {LABS.map((lab) => (
          <article key={lab.id} role="listitem">
            <Link href={`/labs/${lab.slug}`} className="qwa-glass-card block h-full">
              <span className="qwa-badge">{lab.difficulty}</span>
              <h2 className="mt-3 font-semibold text-[var(--qwa-fg)]">{lab.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-[var(--qwa-fg-muted)]">{lab.description}</p>
              <p className="mt-4 text-xs text-[var(--qwa-fg-muted)]">
                {lab.durationMinutes} min · {lab.tools.join(", ")}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
