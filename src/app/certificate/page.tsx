"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { QwaLogo } from "@/components/ui/qwa-logo";
import { useScholar } from "@/components/providers/scholar-provider";
import { isModule1Complete } from "@/lib/scholar/auth";

export default function CertificatePage() {
  const { scholar, progress, loading } = useScholar();
  const router = useRouter();
  const eligible = isModule1Complete(progress);

  useEffect(() => {
    if (!loading && !scholar) router.replace("/login?next=/certificate");
  }, [loading, scholar, router]);

  if (loading || !scholar) return null;

  if (!eligible) {
    return (
      <div className="qwa-container max-w-lg py-16 text-center">
        <h1 className="text-2xl font-bold">Certificate not yet available</h1>
        <p className="mt-4 text-[var(--qwa-fg-muted)]">Complete all Module 1 lessons to earn your Foundations Certificate.</p>
        <Link href="/course/foundations-of-quantum-computing" className="qwa-btn-primary mt-8 inline-flex">Continue Module 1</Link>
      </div>
    );
  }

  const date = progress.certificateIssuedAt
    ? new Date(progress.certificateIssuedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : new Date().toLocaleDateString();

  return (
    <div className="qwa-container py-12">
      <div className="mb-6 flex items-center justify-between qwa-no-print">
        <Link href="/dashboard" className="text-sm text-[var(--qwa-accent)] hover:underline">← Dashboard</Link>
        <button type="button" onClick={() => window.print()} className="qwa-btn-primary text-sm">Print / Save PDF</button>
      </div>
      <article className="qwa-certificate mx-auto max-w-3xl border-2 border-[var(--qwa-cyan)]/40 bg-[var(--qwa-surface)] p-10 text-center">
        <QwaLogo size={72} variant="full" className="mx-auto" />
        <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-[var(--qwa-cyan)]">Certificate of Completion</p>
        <h1 className="mt-4 text-3xl font-black qwa-text-gradient sm:text-4xl">Quantum Workforce Academy</h1>
        <p className="mt-2 text-lg text-[var(--qwa-fg-muted)]">Foundations of Quantum Computing</p>
        <p className="mt-10 text-sm text-[var(--qwa-fg-muted)]">This certifies that</p>
        <p className="mt-2 text-4xl font-bold text-[var(--qwa-fg)]">{scholar.fullName}</p>
        {scholar.institution && <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{scholar.institution}</p>}
        <p className="mt-8 max-w-xl mx-auto text-[var(--qwa-fg-muted)]">
          has successfully completed Module 1 — covering qubits, classical vs quantum computing, the quantum stack,
          technology classes, NISQ context, and workforce orientation.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm">
          <div>
            <p className="text-[var(--qwa-fg-muted)]">Date</p>
            <p className="font-semibold">{date}</p>
          </div>
          <div>
            <p className="text-[var(--qwa-fg-muted)]">Certificate ID</p>
            <p className="font-mono font-semibold text-[var(--qwa-cyan)]">{progress.certificateId}</p>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--qwa-border)] pt-6 text-xs text-[var(--qwa-fg-muted)]">
          Quantum Workforce Academy · High Tech Learning Hub · Workforce Development Platform
        </div>
      </article>
    </div>
  );
}
