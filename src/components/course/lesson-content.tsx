"use client";

import type { LessonContent } from "@/lib/types/lms";
import { LessonVisualBlock } from "./lesson-visual";

interface LessonContentViewProps {
  content: LessonContent;
}

/** Renders structured lesson body with embedded Bloch/gate/circuit visuals */
export function LessonContentView({ content }: LessonContentViewProps) {
  const topVisuals = content.visuals?.filter((v) => v.afterSection === undefined) ?? [];
  const visualsBySection = new Map<number, typeof content.visuals>();
  content.visuals?.forEach((v) => {
    if (v.afterSection !== undefined) {
      const list = visualsBySection.get(v.afterSection) ?? [];
      list.push(v);
      visualsBySection.set(v.afterSection, list);
    }
  });

  return (
    <article className="space-y-10">
      {topVisuals.map((visual, i) => (
        <LessonVisualBlock key={`top-${i}`} visual={visual} />
      ))}

      <div className="qwa-prose">
        {content.sections.map((section, index) => (
          <div key={section.heading}>
            <section aria-labelledby={section.heading.replace(/\s+/g, "-").toLowerCase()}>
              <h2 id={section.heading.replace(/\s+/g, "-").toLowerCase()}>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
            {visualsBySection.get(index)?.map((visual, i) => (
              <LessonVisualBlock key={`sec-${index}-${i}`} visual={visual} />
            ))}
          </div>
        ))}
      </div>

      <aside className="qwa-glass-card" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="text-lg font-semibold text-[var(--qwa-fg)]">
          Summary
        </h2>
        <p className="mt-2 text-[var(--qwa-fg-muted)]">{content.summary}</p>
      </aside>

      <aside className="qwa-glass-card border-l-4 border-l-[var(--qwa-cyan)]" aria-labelledby="career-heading">
        <h2 id="career-heading" className="text-lg font-semibold text-[var(--qwa-fg)]">
          Career Insight
        </h2>
        <p className="mt-2 text-[var(--qwa-fg-muted)]">{content.careerInsight}</p>
      </aside>

      <section aria-labelledby="glossary-heading">
        <h2 id="glossary-heading" className="text-lg font-semibold text-[var(--qwa-fg)]">
          Glossary
        </h2>
        <dl className="mt-4 space-y-4">
          {content.glossary.map(({ term, definition }) => (
            <div key={term} className="qwa-glass-card !p-4">
              <dt className="font-semibold text-[var(--qwa-violet)] dark:text-[var(--qwa-cyan)]">{term}</dt>
              <dd className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="references-heading">
        <h2 id="references-heading" className="text-lg font-semibold text-[var(--qwa-fg)]">
          References
        </h2>
        <ul className="mt-4 space-y-2" role="list">
          {content.references.map((ref) => (
            <li key={ref.url}>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--qwa-accent)] underline-offset-2 hover:underline"
              >
                {ref.title}
              </a>
              {ref.author && (
                <span className="text-sm text-[var(--qwa-fg-muted)]"> — {ref.author}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
