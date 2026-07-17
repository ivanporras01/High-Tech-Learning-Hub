import type { Metadata } from "next";
import Link from "next/link";
import { getCourse, getTotalLessonCount } from "@/lib/data/course";
import { LABS } from "@/lib/data/labs";
import { NEWS_ARTICLES } from "@/lib/data/news";
import { COMPANIES } from "@/lib/data/companies";
import { CAREER_PATHS } from "@/lib/data/workforce";

export const metadata: Metadata = {
  title: "Admin",
  description: "Platform administration overview for Quantum Workforce Academy.",
};

export default function AdminPage() {
  const course = getCourse();
  const lessonCount = getTotalLessonCount();

  const stats = [
    { label: "Modules", value: course.modules.length },
    { label: "Lessons", value: lessonCount },
    { label: "Labs", value: LABS.length },
    { label: "Companies", value: COMPANIES.length },
    { label: "Career Paths", value: CAREER_PATHS.length },
    { label: "News Articles", value: NEWS_ARTICLES.length },
  ];

  return (
    <div className="qwa-container py-12">
      <header>
        <span className="qwa-badge">Administration</span>
        <h1 className="mt-4 text-3xl font-bold text-[var(--qwa-fg)]">Platform Admin</h1>
        <p className="mt-4 max-w-3xl text-[var(--qwa-fg-muted)]">
          MVP admin overview for content and enrollment management. Full CRUD, auth, and analytics
          integration planned for Firebase / Supabase migration.
        </p>
      </header>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, value }) => (
          <div key={label} className="qwa-glass-card text-center">
            <p className="text-3xl font-bold qwa-text-gradient">{value}</p>
            <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{label}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="qwa-section-title">Content Management (Stub)</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { title: "Course Curriculum", desc: "12 modules, lesson metadata, publish flags", href: "/course" },
            { title: "Lab Library", desc: "20 labs with difficulty and module mapping", href: "/labs" },
            { title: "Workforce Data", desc: "Career paths, salary ranges, certifications", href: "/workforce" },
            { title: "Employer Profiles", desc: "Company overviews and career URLs", href: "/companies" },
            { title: "News Feed", desc: "Industry articles by category", href: "/news" },
            { title: "Scholar Dashboard", desc: "Mock progress — wire to auth store", href: "/dashboard" },
          ].map(({ title, desc, href }) => (
            <article key={title} className="qwa-glass-card">
              <h3 className="font-semibold text-[var(--qwa-fg)]">{title}</h3>
              <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">{desc}</p>
              <Link href={href} className="mt-4 inline-block text-sm text-[var(--qwa-accent)] hover:underline">
                View →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="qwa-glass-card mt-12 border-l-4 border-l-[var(--qwa-magenta)]">
        <h2 className="text-lg font-semibold text-[var(--qwa-fg)]">Integration Roadmap</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--qwa-fg-muted)]">
          <li>Firebase Auth + Firestore for scholar progress and enrollments</li>
          <li>Admin role-based access for content publishing</li>
          <li>Analytics pipeline for cohort completion and lab throughput</li>
          <li>CMS hooks for news and employer profile updates</li>
        </ul>
      </section>
    </div>
  );
}
