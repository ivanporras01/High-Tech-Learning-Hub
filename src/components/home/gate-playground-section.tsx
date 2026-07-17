"use client";

import dynamic from "next/dynamic";
import type { GateId } from "@/lib/quantum/state";

const GatePlayground = dynamic(
  () => import("@/components/visuals/gate-playground").then((m) => m.GatePlayground),
  { ssr: false, loading: () => <div className="qwa-glass-card h-[420px] animate-pulse" aria-busy="true" /> }
);

interface GatePlaygroundSectionProps {
  title?: string;
  initialGates?: GateId[];
}

/** Client wrapper — dynamic imports with ssr:false must live in Client Components */
export function GatePlaygroundSection({ title, initialGates }: GatePlaygroundSectionProps) {
  return <GatePlayground title={title} initialGates={initialGates} />;
}
