"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCourse, getTotalLessonCount } from "@/lib/data/course";
import { useScholar } from "@/components/providers/scholar-provider";
import { isModule1Complete, module1ProgressPercent } from "@/lib/scholar/auth";

export function DashboardClient() {
  const { scholar, progress, loading } = useScholar();
  const router = useRouter();
  const course = getCourse();
  const totalLessons = getTotalLessonCount();
  const completedCount = progress?.completedLessonIds.length ?? 0;
  const percentComplete = Math.round((completedCount / totalLessons) * 100);
  const m1Pct = module1ProgressPercent(progress);
  const certReady = isModule1Complete(progress);

  useEffect(() => {
    if (!loading && !scholar) router.replace("/login?next=/dashboard");
  }, [loading, scholar, router]);

  if (loading || !scholar) return null;

  return (
    <div className="qwa-container py-12">
      <header>
        <p className="text-sm text-[var(--qwa-cyan)]">Welcome, {scholar.fullName}</p>
        <h1 className="text-3xl font-bold text-[var(--qwa-fg)]">Scholar Dashboard</h1>
        <p className="mt-2 text-[var(--qwa-fg-muted)]">{scholar.email}{scholar.institution ? ` · ${scholar.institution}` : ""}</p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Lessons Done", value: `${completedCount}/${totalLessons}` },
          { label: "Module 1", value: `${m1Pct}%` },
          { label: "Course Progress", value: `${percentComplete}%` },
          { label: "Certificate", value: certReady ? "Ready" : "In progress" },
        ].map(({ label, value }) => (
          <div key={label} className="qwa-glass-card text-center qwa-card-glow">
            <p className="text-2xl font-bold qwa-text-gradient">{value}</p>
            <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{label}</p>
          </div>
        ))}
      </div>

      <section className="mt-10 qwa-glass-card">
        <h2 className="text-lg font-semibold">Module 1 — Foundations Certificate</h2>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--qwa-border)]">
          <div className="h-full rounded-full bg-gradient-to-r from-[var(--qwa-violet)] to-[var(--qwa-cyan)] qwa-progress-shimmer" style={{ width: `${m1Pct}%` }} />
        </div>
        {certReady ? (
          <Link href="/certificate" className="qwa-btn-primary mt-6 inline-flex">View Certificate →</Link>
        ) : (
          <Link href="/course/foundations-of-quantum-computing" className="qwa-btn-secondary mt-6 inline-flex">Continue Module 1 ({m1Pct}%)</Link>
        )}
      </section>

      <section className="mt-10 flex flex-wrap gap-4">
        <Link href="/course" className="qwa-btn-primary">Course Catalog</Link>
        <Link href="/simulations/optical-circuits" className="qwa-btn-secondary">Optical Simulator</Link>
        <Link href="/labs/hello-quantum-world" className="qwa-btn-secondary">Lab 1</Link>
      </section>
    </div>
  );
}
