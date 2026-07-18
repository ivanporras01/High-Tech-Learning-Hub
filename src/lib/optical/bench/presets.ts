import type { BenchDocument, Connection, PlacedComponent } from "./types";

function cid(): string {
  return crypto.randomUUID();
}

function conn(
  fromInstance: string,
  fromPort: string,
  toInstance: string,
  toPort: string
): Connection {
  return { id: cid(), fromInstance, fromPort, toInstance, toPort };
}

function comp(
  defId: string,
  x: number,
  y: number,
  rotation = 0,
  params: Record<string, number> = {}
): PlacedComponent {
  return {
    instanceId: cid(),
    defId,
    x,
    y,
    rotation,
    params,
    enabled: true,
  };
}

export type BenchPreset = {
  id: string;
  name: string;
  description: string;
  build: () => BenchDocument;
};

export const BENCH_PRESETS: BenchPreset[] = [
  {
    id: "mach-zehnder",
    name: "Mach–Zehnder Interferometer",
    description: "Classic MZI with adjustable phase arm — quantum dual-rail analogue.",
    build: () => {
      const laser = comp("laser-diode", -100, 0, 0, { powerMw: 10, wavelengthNm: 780 });
      const bs1 = comp("bs-non-polarizing", 0, 0, 0, { tRatio: 0.5 });
      const phase = comp("phase-shifter", 100, -50, 0, { phaseDeg: 90 });
      const detTrans = comp("power-meter", 200, -50, 0);
      const detRefl = comp("power-meter", 100, 50, 0);

      return {
        name: "Mach–Zehnder Interferometer",
        wavelengthNm: 780,
        gridMm: 10,
        components: [laser, bs1, phase, detTrans, detRefl],
        connections: [
          conn(laser.instanceId, "out", bs1.instanceId, "in"),
          conn(bs1.instanceId, "trans", phase.instanceId, "in"),
          conn(phase.instanceId, "out", detTrans.instanceId, "in"),
          conn(bs1.instanceId, "refl", detRefl.instanceId, "in"),
        ],
      };
    },
  },
  {
    id: "michelson",
    name: "Michelson Interferometer",
    description: "Split beam, reflect from two arms, recombine for interference fringes.",
    build: () => {
      const laser = comp("laser-diode", -100, 0, 0, { powerMw: 5, wavelengthNm: 633 });
      const bs = comp("bs-non-polarizing", 0, 0, 0, { tRatio: 0.5 });
      const m1 = comp("mirror-dielectric", 100, -70, 0, { reflectivity: 99 });
      const m2 = comp("mirror-dielectric", 100, 70, 180, { reflectivity: 99 });
      const phase = comp("phase-shifter", 100, 70, 0, { phaseDeg: 0 });
      const det = comp("power-meter", -60, -50, 0);

      return {
        name: "Michelson Interferometer",
        wavelengthNm: 633,
        gridMm: 10,
        components: [laser, bs, m1, m2, phase, det],
        connections: [
          conn(laser.instanceId, "out", bs.instanceId, "in"),
          conn(bs.instanceId, "refl", m1.instanceId, "in"),
          conn(bs.instanceId, "trans", phase.instanceId, "in"),
          conn(phase.instanceId, "out", m2.instanceId, "in"),
          conn(m1.instanceId, "out", bs.instanceId, "in"),
          conn(m2.instanceId, "out", bs.instanceId, "in"),
          conn(bs.instanceId, "refl", det.instanceId, "in"),
        ],
      };
    },
  },
  {
    id: "polarization-analyzer",
    name: "Polarization Analyzer",
    description: "HWP + polarizer chain — rotate and analyze polarization state.",
    build: () => {
      const laser = comp("he-ne-laser", -100, 0, 0, { powerMw: 2, wavelengthNm: 633 });
      const hwp = comp("hwp", 0, 0, 0, { angleDeg: 22.5 });
      const pol = comp("pol-linear-v", 80, 0, 0);
      const det = comp("power-meter", 160, 0, 0);

      return {
        name: "Polarization Analyzer",
        wavelengthNm: 633,
        gridMm: 10,
        components: [laser, hwp, pol, det],
        connections: [
          conn(laser.instanceId, "out", hwp.instanceId, "in"),
          conn(hwp.instanceId, "out", pol.instanceId, "in"),
          conn(pol.instanceId, "out", det.instanceId, "in"),
        ],
      };
    },
  },
  {
    id: "loqc-h-gate",
    name: "LOQC Hadamard (Dual-Rail)",
    description: "Single 50:50 BS implements H on path-encoded photonic qubit.",
    build: () => {
      const laser = comp("laser-diode", -80, 0, 0, { powerMw: 1, wavelengthNm: 780 });
      const bs = comp("bs-non-polarizing", 40, 0, 0, { tRatio: 0.5 });
      const d0 = comp("power-meter", 120, -40, 0);
      const d1 = comp("power-meter", 120, 40, 0);

      return {
        name: "LOQC Hadamard",
        wavelengthNm: 780,
        gridMm: 10,
        components: [laser, bs, d0, d1],
        connections: [
          conn(laser.instanceId, "out", bs.instanceId, "in"),
          conn(bs.instanceId, "trans", d0.instanceId, "in"),
          conn(bs.instanceId, "refl", d1.instanceId, "in"),
        ],
      };
    },
  },
  {
    id: "laser-lab-starter",
    name: "Laser Lab Starter",
    description: "Isolator + lens + filter — typical alignment chain before an experiment.",
    build: () => {
      const laser = comp("laser-diode", -120, 0, 0, { powerMw: 50, wavelengthNm: 780 });
      const iso = comp("isolator", -40, 0, 0);
      const lens = comp("lens-convex", 40, 0, 0, { focalMm: 75 });
      const filt = comp("filter-bandpass", 120, 0, 0, { centerNm: 780, bandwidthNm: 10 });
      const det = comp("camera-beam", 200, 0, 0);

      return {
        name: "Laser Lab Starter",
        wavelengthNm: 780,
        gridMm: 10,
        components: [laser, iso, lens, filt, det],
        connections: [
          conn(laser.instanceId, "out", iso.instanceId, "in"),
          conn(iso.instanceId, "out", lens.instanceId, "in"),
          conn(lens.instanceId, "out", filt.instanceId, "in"),
          conn(filt.instanceId, "out", det.instanceId, "in"),
        ],
      };
    },
  },
];

export function getPresetById(id: string): BenchPreset | undefined {
  return BENCH_PRESETS.find((p) => p.id === id);
}
