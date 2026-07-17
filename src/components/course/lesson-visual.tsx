"use client";

import dynamic from "next/dynamic";
import type { LessonVisual } from "@/lib/types/lms";
import type { GateId } from "@/lib/quantum/state";

const GatePlayground = dynamic(
  () => import("@/components/visuals/gate-playground").then((m) => m.GatePlayground),
  { ssr: false, loading: () => <VisualSkeleton label="Loading gate playground…" /> }
);

const CircuitDiagram = dynamic(
  () => import("@/components/visuals/circuit-diagram").then((m) => m.CircuitDiagram),
  { ssr: false }
);

const ProbabilityBars = dynamic(
  () => import("@/components/visuals/probability-bars").then((m) => m.ProbabilityBars),
  { ssr: false }
);

const TechnologyLandscape = dynamic(
  () => import("@/components/visuals/technology-landscape").then((m) => m.TechnologyLandscape),
  { ssr: false, loading: () => <VisualSkeleton label="Loading technology landscape…" /> }
);

function VisualSkeleton({ label }: { label: string }) {
  return (
    <div className="qwa-glass-card flex h-48 items-center justify-center text-sm text-[var(--qwa-fg-muted)]">
      {label}
    </div>
  );
}

interface LessonVisualBlockProps {
  visual: LessonVisual;
}

/** Renders embedded lesson visuals — Bloch sphere, gates, circuits */
export function LessonVisualBlock({ visual }: LessonVisualBlockProps) {
  const { type, title, caption, props } = visual;
  const initialGates = (props?.initialGates as GateId[]) ?? [];

  let content: React.ReactNode = null;

  switch (type) {
    case "gate-playground":
    case "bloch-sphere":
      content = (
        <GatePlayground
          title={title ?? "Gate Playground"}
          initialGates={initialGates}
        />
      );
      break;
    case "gate-sequence-demo":
      content = (
        <GatePlayground
          title={title ?? "Gate sequence demo"}
          initialGates={initialGates.length ? initialGates : ["H"]}
        />
      );
      break;
    case "circuit-diagram":
      content = (
        <CircuitDiagram
          title={title}
          gates={(props?.gates as { id: GateId | "M"; label?: string }[]) ?? [{ id: "H" }, { id: "M" }]}
        />
      );
      break;
    case "probability-chart":
      content = (
        <ProbabilityBars
          title={title}
          prob0={(props?.prob0 as number) ?? 0.5}
          prob1={(props?.prob1 as number) ?? 0.5}
        />
      );
      break;
    case "technology-landscape":
      content = (
        <TechnologyLandscape
          title={title ?? "Quantum technology classes"}
          compact={(props?.compact as boolean) ?? false}
        />
      );
      break;
    default:
      content = null;
  }

  if (!content) return null;

  return (
    <figure className="my-8">
      {content}
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--qwa-fg-muted)]">{caption}</figcaption>
      )}
    </figure>
  );
}
