import { CATALOG_BY_ID } from "./catalog";
import { getPortWorldPosition, routeBeamPath } from "./geometry";
import {
  describePolarization,
  halfWavePlate,
  identity,
  jonesApply,
  jonesH,
  jonesToMw,
  phaseShift,
  polarizerH,
  polarizerV,
  powerToDbm,
  quarterWavePlate,
  type JonesMatrix,
  type JonesVector,
} from "./jones";
import type {
  BeamSegment,
  BenchDocument,
  Connection,
  PlacedComponent,
  PortSignal,
  SimulationResult,
} from "./types";

type InternalSignal = {
  jones: JonesVector;
  powerMw: number;
  wavelengthNm: number;
};

const MAX_HOPS = 40;

function portKey(instanceId: string, portId: string): string {
  return `${instanceId}::${portId}`;
}

function processThroughComponent(
  comp: PlacedComponent,
  benchWavelength: number,
  inPortId: string,
  incoming: InternalSignal
): { portId: string; signal: InternalSignal }[] {
  const p = comp.params;
  const outs: { portId: string; signal: InternalSignal }[] = [];

  const emit = (portId: string, matrix: JonesMatrix, frac: number) => {
    let j = jonesApply(matrix, incoming.jones);
    const scale = Math.sqrt(Math.max(0, frac));
    j = [
      { re: j[0].re * scale, im: j[0].im * scale },
      { re: j[1].re * scale, im: j[1].im * scale },
    ];
    outs.push({
      portId,
      signal: {
        jones: j,
        powerMw: jonesToMw(j, incoming.powerMw),
        wavelengthNm: incoming.wavelengthNm,
      },
    });
  };

  switch (comp.defId) {
    case "laser-diode":
    case "he-ne-laser":
      return [];

    case "bs-non-polarizing": {
      const t = p.tRatio ?? 0.5;
      emit("trans", identity(), t);
      emit("refl", identity(), 1 - t);
      break;
    }

    case "bs-polarizing": {
      const ext = 10 ** (-(p.extinctionDb ?? 25) / 10);
      emit("trans", [[{ re: 1, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: ext, im: 0 }]], 1);
      emit("refl", [[{ re: ext, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: 1, im: 0 }]], 1);
      break;
    }

    case "mirror-dielectric":
    case "mirror-silver":
      emit("out", identity(), (p.reflectivity ?? 96) / 100);
      break;

    case "pol-linear-h":
      emit("out", polarizerH(p.extinctionDb ?? 30), 1);
      break;
    case "pol-linear-v":
      emit("out", polarizerV(p.extinctionDb ?? 30), 1);
      break;
    case "hwp":
      emit("out", halfWavePlate(p.angleDeg ?? 0), 1);
      break;
    case "qwp":
      emit("out", quarterWavePlate(p.angleDeg ?? 0), 1);
      break;
    case "phase-shifter":
      emit("out", phaseShift(p.phaseDeg ?? 0), 1);
      break;

    case "lens-convex":
      emit("out", identity(), (p.transmission ?? 98) / 100);
      break;
    case "fiber-coupler":
      emit("out", identity(), (p.couplingEff ?? 75) / 100);
      break;

    case "filter-bandpass": {
      const center = p.centerNm ?? 780;
      const bw = p.bandwidthNm ?? 10;
      const delta = Math.abs(benchWavelength - center);
      const t = delta <= bw / 2 ? 0.95 : Math.max(0.01, 0.95 - (delta - bw / 2) / bw);
      emit("out", identity(), t);
      break;
    }

    case "isolator":
      if (inPortId === "in") emit("out", identity(), 0.99);
      break;

    case "power-meter":
    case "camera-beam":
    case "beam-block":
      break;

    default:
      emit("out", identity(), 1);
  }

  return outs;
}

function laserSignal(comp: PlacedComponent): InternalSignal {
  return {
    jones: jonesH(),
    powerMw: comp.params.powerMw ?? 10,
    wavelengthNm: comp.params.wavelengthNm ?? 780,
  };
}

export function simulateBench(doc: BenchDocument): SimulationResult {
  const warnings: string[] = [];
  const portSignalsMap = new Map<string, InternalSignal>();
  const beamSegments: BeamSegment[] = [];
  let totalInputMw = 0;

  const compById = new Map(doc.components.map((c) => [c.instanceId, c]));

  const outConnections = new Map<string, Connection[]>();
  for (const conn of doc.connections) {
    const fk = portKey(conn.fromInstance, conn.fromPort);
    if (!outConnections.has(fk)) outConnections.set(fk, []);
    outConnections.get(fk)!.push(conn);
  }

  type QueueItem = { instanceId: string; portId: string; signal: InternalSignal; hops: number };
  const queue: QueueItem[] = [];

  for (const comp of doc.components) {
    if (!comp.enabled) continue;
    if (comp.defId === "laser-diode" || comp.defId === "he-ne-laser") {
      const sig = laserSignal(comp);
      totalInputMw += sig.powerMw;
      portSignalsMap.set(portKey(comp.instanceId, "out"), sig);
      queue.push({ instanceId: comp.instanceId, portId: "out", signal: sig, hops: 0 });
    }
  }

  if (totalInputMw === 0) {
    warnings.push("Add a laser source (L780P010 or HNL210L) and connect it to your optical chain.");
  }

  while (queue.length > 0) {
    const { instanceId, portId, signal, hops } = queue.shift()!;
    if (hops >= MAX_HOPS) {
      warnings.push("Maximum optical hops reached — check for unintended feedback loops.");
      break;
    }

    const comp = compById.get(instanceId);
    if (!comp) continue;

    const connections = outConnections.get(portKey(instanceId, portId)) ?? [];

    for (const conn of connections) {
      const fromPos = getPortWorldPosition(comp, conn.fromPort);
      const toComp = compById.get(conn.toInstance);
      if (!fromPos || !toComp || !toComp.enabled) continue;

      const toPos = getPortWorldPosition(toComp, conn.toPort);
      if (!toPos) continue;

      beamSegments.push({
        connectionId: conn.id,
        powerMw: signal.powerMw,
        wavelengthNm: signal.wavelengthNm,
        points: routeBeamPath(fromPos, toPos),
      });

      const targetPort = CATALOG_BY_ID[toComp.defId]?.ports.find((p) => p.id === conn.toPort);
      if (!targetPort) continue;

      portSignalsMap.set(portKey(conn.toInstance, conn.toPort), signal);

      if (targetPort.kind === "input" || targetPort.kind === "bidirectional") {
        const outputs = processThroughComponent(toComp, doc.wavelengthNm, conn.toPort, signal);
        for (const out of outputs) {
          portSignalsMap.set(portKey(toComp.instanceId, out.portId), out.signal);
          queue.push({
            instanceId: toComp.instanceId,
            portId: out.portId,
            signal: out.signal,
            hops: hops + 1,
          });
        }
      } else {
        queue.push({
          instanceId: conn.toInstance,
          portId: conn.toPort,
          signal,
          hops: hops + 1,
        });
      }
    }
  }

  const portSignals: PortSignal[] = Array.from(portSignalsMap.entries()).map(([pk, sig]) => {
    const [instanceId, portId] = pk.split("::");
    return {
      instanceId,
      portId,
      powerMw: sig.powerMw,
      polarization: describePolarization(sig.jones),
      phaseDeg: (Math.atan2(sig.jones[0].im, sig.jones[0].re) * 180) / Math.PI,
    };
  });

  const detectorReadings = doc.components
    .filter((c) => c.defId === "power-meter" || c.defId === "camera-beam")
    .map((c) => {
      const sig = portSignalsMap.get(portKey(c.instanceId, "in"));
      const mw = sig?.powerMw ?? 0;
      return {
        instanceId: c.instanceId,
        label: CATALOG_BY_ID[c.defId]?.name ?? "Detector",
        powerMw: mw,
        powerDbm: powerToDbm(mw),
      };
    });

  return { portSignals, beamSegments, totalInputMw, detectorReadings, warnings };
}

export function tryDualRailFromBench(doc: BenchDocument): {
  pUpper: number;
  pLower: number;
  phaseDeg: number;
} | null {
  const phases = doc.components.filter((c) => c.defId === "phase-shifter");
  const bs = doc.components.filter((c) => c.defId === "bs-non-polarizing");
  if (bs.length >= 2 && phases.length >= 1) {
    const phi = ((phases[0].params.phaseDeg ?? 0) * Math.PI) / 180;
    const pUpper = Math.cos(phi / 2) ** 2;
    return { pUpper, pLower: 1 - pUpper, phaseDeg: phases[0].params.phaseDeg ?? 0 };
  }
  return null;
}

export function newEmptyBench(name = "Untitled bench"): BenchDocument {
  return { name, wavelengthNm: 780, gridMm: 10, components: [], connections: [] };
}

export function addConnection(
  doc: BenchDocument,
  fromInstance: string,
  fromPort: string,
  toInstance: string,
  toPort: string
): BenchDocument {
  if (fromInstance === toInstance) return doc;
  const dup = doc.connections.some(
    (c) => c.fromInstance === fromInstance && c.fromPort === fromPort && c.toInstance === toInstance && c.toPort === toPort
  );
  if (dup) return doc;
  return {
    ...doc,
    connections: [
      ...doc.connections,
      { id: crypto.randomUUID(), fromInstance, fromPort, toInstance, toPort },
    ],
  };
}

export function removeConnection(doc: BenchDocument, connectionId: string): BenchDocument {
  return { ...doc, connections: doc.connections.filter((c) => c.id !== connectionId) };
}

export function removeComponent(doc: BenchDocument, instanceId: string): BenchDocument {
  return {
    ...doc,
    components: doc.components.filter((c) => c.instanceId !== instanceId),
    connections: doc.connections.filter((c) => c.fromInstance !== instanceId && c.toInstance !== instanceId),
  };
}

export { createInstance, defaultParams } from "./catalog";
