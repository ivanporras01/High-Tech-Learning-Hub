import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCompanyBySlug } from "@/lib/data/companies";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  return { title: company?.name ?? "Company" };
}

export default async function CompanyDetailPage({ params }: Props) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  return (
    <div className="qwa-container py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--qwa-fg-muted)]">
        <Link href="/companies" className="hover:text-[var(--qwa-cyan)]">Companies</Link>
        <span aria-hidden="true"> / </span>
        <span>{company.name}</span>
      </nav>

      <header className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--qwa-purple)] to-[var(--qwa-cyan)] text-xl font-bold text-white"
          aria-hidden="true"
        >
          {company.logoInitials}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--qwa-fg)]">{company.name}</h1>
          <p className="mt-2 text-lg text-[var(--qwa-violet)] dark:text-[var(--qwa-cyan)]">{company.tagline}</p>
          <p className="mt-4 text-sm text-[var(--qwa-fg-muted)]">
            HQ: {company.headquarters} · Founded {company.founded}
            {company.employees && ` · ${company.employees}`}
          </p>
        </div>
      </header>

      <section className="mt-10 qwa-glass-card" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-lg font-semibold text-[var(--qwa-fg)]">Overview</h2>
        <p className="mt-4 leading-relaxed text-[var(--qwa-fg-muted)]">{company.overview}</p>
      </section>

      <section className="mt-8 qwa-glass-card" aria-labelledby="focus-heading">
        <h2 id="focus-heading" className="text-lg font-semibold text-[var(--qwa-fg)]">Focus Areas</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {company.focusAreas.map((area) => (
            <span key={area} className="qwa-badge">{area}</span>
          ))}
        </div>
      </section>

      <a
        href={company.careersUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="qwa-btn-primary mt-10 inline-flex"
      >
        View Careers at {company.name}
      </a>
    </div>
  );
}
