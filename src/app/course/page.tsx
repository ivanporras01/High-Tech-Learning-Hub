import Link from "next/link";
import type { Metadata } from "next";
import { getCourse, getTotalLessonCount } from "@/lib/data/course";

export const metadata: Metadata = {
  title: "Course Overview",
  description: "Quantum Computing for Workforce Development — 12 modules, 60+ lessons.",
};

export default function CoursePage() {
  const course = getCourse();
  const lessonCount = getTotalLessonCount();

  return (
    <div className="qwa-container py-12">
      <header>
        <span className="qwa-badge">{course.level} · {course.totalHours} hours</span>
        <h1 className="mt-4 text-3xl font-bold text-[var(--qwa-fg)] sm:text-4xl">{course.title}</h1>
        <p className="mt-2 text-xl text-[var(--qwa-violet)] dark:text-[var(--qwa-cyan)]">{course.subtitle}</p>
        <p className="mt-6 max-w-3xl text-[var(--qwa-fg-muted)]">{course.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {course.tags.map((tag) => (
            <span key={tag} className="qwa-badge">{tag}</span>
          ))}
        </div>
        <p className="mt-4 text-sm text-[var(--qwa-fg-muted)]">
          {course.modules.length} modules · {lessonCount} lessons · 20 labs
        </p>
        <Link
          href="/concepts"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[var(--qwa-cyan)]/30 bg-[var(--qwa-cyan)]/5 px-4 py-3 text-sm text-[var(--qwa-cyan)] hover:bg-[var(--qwa-cyan)]/10"
        >
          New to quantum? Start with the Concepts Guide — superposition, entanglement, teleportation, and more →
        </Link>
      </header>

      <section className="mt-12" aria-labelledby="modules-heading">
        <h2 id="modules-heading" className="text-2xl font-bold text-[var(--qwa-fg)]">
          Curriculum
        </h2>
        <div className="mt-8 space-y-4">
          {course.modules.map((mod) => (
            <article key={mod.id} className="qwa-glass-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-sm font-medium text-[var(--qwa-fg-muted)]">
                    Module {mod.order}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--qwa-fg)]">{mod.title}</h3>
                  <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{mod.description}</p>
                  <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">
                    {mod.lessons.length} lessons
                  </p>
                </div>
                <Link
                  href={`/course/${mod.slug}`}
                  className="qwa-btn-secondary shrink-0"
                  aria-label={`Open module ${mod.order}: ${mod.title}`}
                >
                  View Lessons
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
