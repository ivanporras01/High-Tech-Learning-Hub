"use client";

import dynamic from "next/dynamic";

const TechnologyLandscape = dynamic(
  () => import("@/components/visuals/technology-landscape").then((m) => m.TechnologyLandscape),
  { ssr: false, loading: () => <div className="qwa-glass-card h-96 animate-pulse" aria-busy="true" /> }
);

const TechnologyComparisonTable = dynamic(
  () => import("@/components/visuals/technology-landscape").then((m) => m.TechnologyComparisonTable),
  { ssr: false }
);

export function TechnologiesVisuals({ title }: { title?: string }) {
  return (
    <>
      <TechnologyLandscape title={title} />
      <section className="mt-12">
        <h2 className="text-xl font-bold text-[var(--qwa-fg)]">At-a-glance comparison</h2>
        <div className="mt-6">
          <TechnologyComparisonTable />
        </div>
      </section>
    </>
  );
}
