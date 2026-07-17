import type { Metadata } from "next";
import Link from "next/link";
import { CareerSalaryChart, WorkforceGrowthChart } from "@/components/charts/career-stats-chart";
import { CAREER_PATHS, WORKFORCE_STATS } from "@/lib/data/workforce";

export const metadata: Metadata = {
  title: "Quantum Career Roadmap",
  description: "Salary ranges, skills, certifications, and role paths in the quantum workforce.",
};

export default function WorkforcePage() {
  return (
    <div className="qwa-container py-12">
      <header>
        <span className="qwa-badge">Career Development</span>
        <h1 className="mt-4 text-3xl font-bold text-[var(--qwa-fg)] sm:text-4xl">
          Quantum Workforce Careers
        </h1>
        <p className="mt-4 max-w-3xl text-[var(--qwa-fg-muted)]">
          Role families, compensation bands, and certification paths for college and university graduates
          entering the quantum economy. Data reflects industry workforce reports and pilot employer
          interviews and portfolio-ready quantum projects.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { stat: `$${WORKFORCE_STATS.globalInvestmentBillions}B+`, label: "Global investment" },
          { stat: `${WORKFORCE_STATS.annualJobGrowthPercent}%`, label: "Job growth (est.)" },
          { stat: WORKFORCE_STATS.openRolesEstimate.toLocaleString(), label: "Open roles (est.)" },
          { stat: `$${WORKFORCE_STATS.medianSalaryUsd.toLocaleString()}`, label: "Median salary (USD)" },
        ].map(({ stat, label }) => (
          <div key={label} className="qwa-glass-card text-center">
            <p className="text-2xl font-bold qwa-text-gradient">{stat}</p>
            <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="qwa-glass-card">
          <CareerSalaryChart />
        </div>
        <div className="qwa-glass-card">
          <WorkforceGrowthChart />
        </div>
      </div>

      <section className="mt-12" aria-labelledby="paths-heading">
        <h2 id="paths-heading" className="qwa-section-title">
          Career Paths
        </h2>
        <div className="mt-8 space-y-6">
          {CAREER_PATHS.map((path) => (
            <article key={path.id} className="qwa-glass-card">
              <h3 className="text-xl font-semibold text-[var(--qwa-fg)]">{path.title}</h3>
              <p className="mt-2 text-[var(--qwa-fg-muted)]">{path.description}</p>
              <p className="mt-3 text-sm font-medium text-[var(--qwa-cyan)]">
                ${path.salaryRange.min.toLocaleString()} – ${path.salaryRange.max.toLocaleString()}{" "}
                {path.salaryRange.currency}/{path.salaryRange.period}
              </p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-[var(--qwa-fg)]">Core Skills</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {path.skills.map((skill) => (
                    <span key={skill} className="qwa-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-[var(--qwa-fg)]">Certifications</p>
                <ul className="mt-2 space-y-1 text-sm text-[var(--qwa-fg-muted)]">
                  {path.certifications.map((cert) => (
                    <li key={cert.name}>
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--qwa-accent)] hover:underline"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}{" "}
                      — {cert.issuer}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-xs text-[var(--qwa-fg-muted)]">
                Related modules: {path.relatedModules.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="qwa-section-title">Top In-Demand Skills</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {WORKFORCE_STATS.topSkills.map((skill) => (
            <span key={skill} className="qwa-badge text-sm">
              {skill}
            </span>
          ))}
        </div>
        <Link href="/course" className="qwa-btn-primary mt-8 inline-flex">
          Start the Curriculum
        </Link>
      </section>
    </div>
  );
}
