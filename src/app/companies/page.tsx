import type { Metadata } from "next";
import Link from "next/link";
import { COMPANIES } from "@/lib/data/companies";

export const metadata: Metadata = {
  title: "Quantum Employers",
  description: "Major quantum computing companies, focus areas, and career links.",
};

export default function CompaniesPage() {
  return (
    <div className="qwa-container py-12">
      <header>
        <span className="qwa-badge">Industry Landscape</span>
        <h1 className="mt-4 text-3xl font-bold text-[var(--qwa-fg)] sm:text-4xl">Quantum Employers</h1>
        <p className="mt-4 max-w-3xl text-[var(--qwa-fg-muted)]">
          Profiles of leading quantum hardware, cloud, and software organizations hiring college and
          university graduates. Use these overviews to align capstone projects and interview preparation
          with employer focus areas.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {COMPANIES.map((company) => (
          <article key={company.id} className="qwa-glass-card">
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--qwa-violet)] to-[var(--qwa-accent)] text-lg font-bold text-white"
                aria-hidden="true"
              >
                {company.logoInitials}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[var(--qwa-fg)]">{company.name}</h2>
                <p className="text-sm text-[var(--qwa-cyan)]">{company.tagline}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-[var(--qwa-fg-muted)]">{company.overview}</p>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-medium text-[var(--qwa-fg)]">Headquarters</dt>
                <dd className="text-[var(--qwa-fg-muted)]">{company.headquarters}</dd>
              </div>
              <div>
                <dt className="font-medium text-[var(--qwa-fg)]">Founded</dt>
                <dd className="text-[var(--qwa-fg-muted)]">{company.founded}</dd>
              </div>
              {company.employees && (
                <div className="sm:col-span-2">
                  <dt className="font-medium text-[var(--qwa-fg)]">Employees</dt>
                  <dd className="text-[var(--qwa-fg-muted)]">{company.employees}</dd>
                </div>
              )}
            </dl>
            <div className="mt-4 flex flex-wrap gap-2">
              {company.focusAreas.map((area) => (
                <span key={area} className="qwa-badge">
                  {area}
                </span>
              ))}
            </div>
            <a
              href={company.careersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="qwa-btn-secondary mt-6 inline-flex text-sm"
            >
              View Careers →
            </a>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/workforce" className="qwa-btn-primary">
          Explore Career Paths
        </Link>
      </div>
    </div>
  );
}
