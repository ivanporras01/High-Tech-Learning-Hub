import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLabBySlug } from "@/lib/data/labs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLabBySlug(slug);
  return { title: lab?.title ?? "Lab" };
}

export default async function LabDetailPage({ params }: Props) {
  const { slug } = await params;
  const lab = getLabBySlug(slug);
  if (!lab) notFound();

  return (
    <div className="qwa-container py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--qwa-fg-muted)]">
        <Link href="/labs" className="hover:text-[var(--qwa-cyan)]">Labs</Link>
        <span aria-hidden="true"> / </span>
        <span>{lab.title}</span>
      </nav>

      <header className="mt-6">
        <span className="qwa-badge">{lab.difficulty} · {lab.durationMinutes} min</span>
        <h1 className="mt-4 text-3xl font-bold text-[var(--qwa-fg)]">{lab.title}</h1>
        <p className="mt-4 max-w-2xl text-[var(--qwa-fg-muted)]">{lab.description}</p>
      </header>

      <section className="mt-8 qwa-glass-card" aria-labelledby="lab-objectives">
        <h2 id="lab-objectives" className="text-lg font-semibold text-[var(--qwa-fg)]">Objectives</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-[var(--qwa-fg-muted)]" role="list">
          {lab.objectives.map((obj) => (
            <li key={obj}>{obj}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 qwa-glass-card" aria-labelledby="prerequisites">
        <h2 id="prerequisites" className="text-lg font-semibold text-[var(--qwa-fg)]">Prerequisites</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-[var(--qwa-fg-muted)]" role="list">
          {lab.prerequisites.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[var(--qwa-fg-muted)]">
          Tools: {lab.tools.join(" · ")}
        </p>
      </section>

      {lab.steps && (
        <section className="mt-10" aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="text-xl font-semibold text-[var(--qwa-fg)]">Steps</h2>
          <ol className="mt-6 space-y-4" role="list">
            {lab.steps.map((step) => (
              <li key={step.order} className="qwa-glass-card">
                <span className="text-sm font-medium text-[var(--qwa-violet)] dark:text-[var(--qwa-cyan)]">
                  Step {step.order}
                </span>
                <h3 className="mt-1 font-semibold text-[var(--qwa-fg)]">{step.title}</h3>
                <p className="mt-2 text-[var(--qwa-fg-muted)]">{step.instruction}</p>
                {step.hint && (
                  <p className="mt-2 text-sm italic text-[var(--qwa-fg-muted)]">Hint: {step.hint}</p>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {lab.starterCode && (
        <section className="mt-10" aria-labelledby="starter-code">
          <h2 id="starter-code" className="text-xl font-semibold text-[var(--qwa-fg)]">Starter Code</h2>
          <pre className="qwa-code-block mt-4 overflow-x-auto">
            <code>{lab.starterCode}</code>
          </pre>
        </section>
      )}

      {lab.solutionCode && (
        <section className="mt-10" aria-labelledby="solution-code">
          <h2 id="solution-code" className="text-xl font-semibold text-[var(--qwa-fg)]">Solution</h2>
          <pre className="qwa-code-block mt-4 overflow-x-auto">
            <code>{lab.solutionCode}</code>
          </pre>
        </section>
      )}

      {!lab.steps && (
        <div className="mt-10 qwa-glass-card text-center">
          <p className="text-[var(--qwa-fg-muted)]">
            Detailed steps and code for this lab will be published in an upcoming release. Complete Labs 1–3 first.
          </p>
        </div>
      )}
    </div>
  );
}
