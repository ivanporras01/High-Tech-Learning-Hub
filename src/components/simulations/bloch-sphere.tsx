"use client";

import { GatePlayground } from "@/components/visuals/gate-playground";

/** Full-page Bloch sphere + gate lab for /simulations/bloch-sphere */
export function BlochSphere() {
  return (
    <GatePlayground
      title="Bloch Sphere & Gate Explorer"
      initialGates={[]}
    />
  );
}

export const BlochSphereSimulation = BlochSphere;
