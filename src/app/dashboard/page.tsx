import Link from "next/link";
import type { Metadata } from "next";
import { getCourse, getTotalLessonCount } from "@/lib/data/course";
import { getMockProgress } from "@/lib/data/progress";

export const metadata: Metadata = {
  title: "Scholar Dashboard",
  description: "Track your progress as a quantum workforce scholar — lessons, labs, XP, and badges.",
};

export default function DashboardPage() {
  const progress = getMockProgress();
  const course = getCourse();
  const totalLessons = getTotalLessonCount();
  const completedCount = progress.completedLessonIds.length;
  const percentComplete = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="qwa-container py-12">
      <header>
        <h1 className="text-3xl font-bold text-[var(--qwa-fg)]">Scholar Dashboard</h1>
        <p className="mt-2 text-[var(--qwa-fg-muted)]">
          Your scholar hub — track modules, labs, and capstone progress.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "XP", value: progress.xp.toLocaleString() },
          { label: "Day Streak", value: progress.streakDays.toString() },
          { label: "Lessons Done", value: `${completedCount}/${totalLessons}` },
          { label: "Progress", value: `${percentComplete}%` },
        ].map(({ label, value }) => (
          <div key={label} className="qwa-glass-card text-center">
            <p className="text-2xl font-bold qwa-text-gradient">{value}</p>
            <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{label}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <section className="mt-10 qwa-glass-card" aria-labelledby="progress-heading">
        <h2 id="progress-heading" className="text-lg font-semibold text-[var(--qwa-fg)]">
          Course Progress
        </h2>
        <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{course.title}</p>
        <div
          className="mt-4 h-3 overflow-hidden rounded-full bg-[var(--qwa-border)]"
          role="progressbar"
          aria-valuenow={percentComplete}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Course completion ${percentComplete} percent`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--qwa-purple)] to-[var(--qwa-cyan)]"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </section>

      {/* Badges */}
      <section className="mt-10" aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="text-xl font-semibold text-[var(--qwa-fg)]">
          Badges
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {progress.badges.map((badge) => (
            <div key={badge.id} className="qwa-glass-card">
              <span className="text-2xl" aria-hidden="true">🏅</span>
              <h3 className="mt-2 font-semibold text-[var(--qwa-fg)]">{badge.name}</h3>
              <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{badge.description}</p>
              {badge.earnedAt && (
                <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">Earned {badge.earnedAt}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="mt-10 flex flex-wrap gap-4">
        <Link href="/course/foundations-of-quantum-computing/workforce-demand-and-roles" className="qwa-btn-primary">
          Continue Learning
        </Link>
        <Link href="/labs/hello-quantum-world" className="qwa-btn-secondary">
          Open Lab 1
        </Link>
      </section>
    </div>
  );
}
