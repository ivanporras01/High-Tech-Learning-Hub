import type { ComponentDef } from "./types";

const T_RATIO = { key: "tRatio", label: "T ratio", min: 0.01, max: 0.99, step: 0.01, default: 0.5 };
const ANGLE = { key: "angleDeg", label: "Angle", unit: "°", min: 0, max: 360, step: 1, default: 0 };
const PHASE = { key: "phaseDeg", label: "Phase shift", unit: "°", min: 0, max: 360, step: 1, default: 0 };
const FOCAL = { key: "focalMm", label: "Focal length", unit: "mm", min: 10, max: 500, step: 5, default: 50 };
const POWER = { key: "powerMw", label: "Output power", unit: "mW", min: 0.01, max: 500, step: 0.1, default: 10 };
const WAVELENGTH = { key: "wavelengthNm", label: "Wavelength", unit: "nm", min: 350, max: 1600, step: 1, default: 780 };

export const OPTICAL_CATALOG: ComponentDef[] = [
  {
    id: "laser-diode",
    sku: "L780P010",
    name: "Laser Diode",
    category: "sources",
    description: "CW laser source — adjustable wavelength and power (Thorlabs-style bench laser).",
    width: 48,
    height: 32,
    color: "#ef4444",
    ports: [{ id: "out", label: "OUT", offset: { x: 24, y: 0 }, direction: "east", kind: "output" }],
    params: [POWER, { ...WAVELENGTH, default: 780 }],
  },
  {
    id: "he-ne-laser",
    sku: "HNL210L",
    name: "HeNe Laser",
    category: "sources",
    description: "632.8 nm HeNe — stable alignment reference source.",
    width: 56,
    height: 36,
    color: "#dc2626",
    ports: [{ id: "out", label: "OUT", offset: { x: 28, y: 0 }, direction: "east", kind: "output" }],
    params: [{ ...POWER, default: 5 }, { ...WAVELENGTH, default: 633, min: 632, max: 634 }],
  },
  {
    id: "bs-non-polarizing",
    sku: "BS014",
    name: "50:50 Beam Splitter",
    category: "beamsplitters",
    description: "Non-polarizing cube/beam splitter — T:R adjustable.",
    width: 40,
    height: 40,
    color: "#a78bfa",
    ports: [
      { id: "in", label: "IN", offset: { x: -20, y: 0 }, direction: "west", kind: "input" },
      { id: "trans", label: "T", offset: { x: 20, y: 0 }, direction: "east", kind: "output" },
      { id: "refl", label: "R", offset: { x: 0, y: -20 }, direction: "north", kind: "output" },
    ],
    params: [T_RATIO],
  },
  {
    id: "bs-polarizing",
    sku: "PBS251",
    name: "Polarizing BS",
    category: "beamsplitters",
    description: "Transmits p-pol, reflects s-pol at the diagonal interface.",
    width: 40,
    height: 40,
    color: "#8b5cf6",
    ports: [
      { id: "in", label: "IN", offset: { x: -20, y: 0 }, direction: "west", kind: "input" },
      { id: "trans", label: "P", offset: { x: 20, y: 0 }, direction: "east", kind: "output" },
      { id: "refl", label: "S", offset: { x: 0, y: -20 }, direction: "north", kind: "output" },
    ],
    params: [{ key: "extinctionDb", label: "Extinction", unit: "dB", min: 10, max: 40, step: 1, default: 25 }],
  },
  {
    id: "mirror-dielectric",
    sku: "BB1-E02",
    name: "Dielectric Mirror",
    category: "mirrors",
    description: "Broadband dielectric mirror @ 45° — high reflectivity.",
    width: 36,
    height: 36,
    color: "#64748b",
    ports: [
      { id: "in", label: "IN", offset: { x: -18, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 0, y: -18 }, direction: "north", kind: "output" },
    ],
    params: [
      { key: "reflectivity", label: "R", unit: "%", min: 90, max: 99.9, step: 0.1, default: 99 },
      ANGLE,
    ],
  },
  {
    id: "mirror-silver",
    sku: "PF10-03-P01",
    name: "Protected Silver Mirror",
    category: "mirrors",
    description: "Protected silver mirror for visible/NIR benches.",
    width: 32,
    height: 32,
    color: "#94a3b8",
    ports: [
      { id: "in", label: "IN", offset: { x: -16, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 0, y: -16 }, direction: "north", kind: "output" },
    ],
    params: [{ key: "reflectivity", label: "R", unit: "%", min: 85, max: 98, step: 0.5, default: 96 }],
  },
  {
    id: "pol-linear-h",
    sku: "LPVIS100",
    name: "Linear Polarizer (H)",
    category: "polarization",
    description: "Wire-grid polarizer — transmits horizontal polarization.",
    width: 28,
    height: 36,
    color: "#22d3ee",
    ports: [
      { id: "in", label: "IN", offset: { x: -14, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 14, y: 0 }, direction: "east", kind: "output" },
    ],
    params: [{ key: "extinctionDb", label: "Extinction", unit: "dB", min: 20, max: 45, step: 1, default: 30 }],
  },
  {
    id: "pol-linear-v",
    sku: "LPVIS100-90",
    name: "Linear Polarizer (V)",
    category: "polarization",
    description: "Vertical transmission axis polarizer.",
    width: 28,
    height: 36,
    color: "#06b6d4",
    ports: [
      { id: "in", label: "IN", offset: { x: -14, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 14, y: 0 }, direction: "east", kind: "output" },
    ],
    params: [{ key: "extinctionDb", label: "Extinction", unit: "dB", min: 20, max: 45, step: 1, default: 30 }],
  },
  {
    id: "hwp",
    sku: "WPH10M-780",
    name: "Half-Wave Plate",
    category: "polarization",
    description: "λ/2 retarder — rotates linear polarization (fast axis angle).",
    width: 28,
    height: 36,
    color: "#fbbf24",
    ports: [
      { id: "in", label: "IN", offset: { x: -14, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 14, y: 0 }, direction: "east", kind: "output" },
    ],
    params: [ANGLE],
  },
  {
    id: "qwp",
    sku: "WPQ10M-780",
    name: "Quarter-Wave Plate",
    category: "polarization",
    description: "λ/4 retarder — converts between linear and circular polarization.",
    width: 28,
    height: 36,
    color: "#f59e0b",
    ports: [
      { id: "in", label: "IN", offset: { x: -14, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 14, y: 0 }, direction: "east", kind: "output" },
    ],
    params: [ANGLE],
  },
  {
    id: "phase-shifter",
    sku: "PSH-780",
    name: "Phase Shifter",
    category: "phase",
    description: "Adjustable OPD / piezo phase plate for interferometry.",
    width: 32,
    height: 28,
    color: "#eab308",
    ports: [
      { id: "in", label: "IN", offset: { x: -16, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 16, y: 0 }, direction: "east", kind: "output" },
    ],
    params: [PHASE],
  },
  {
    id: "lens-convex",
    sku: "LA1131",
    name: "Plano-Convex Lens",
    category: "lenses",
    description: "Focus/collimate Gaussian beams — focal length adjustable.",
    width: 24,
    height: 40,
    color: "#38bdf8",
    ports: [
      { id: "in", label: "IN", offset: { x: -12, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 12, y: 0 }, direction: "east", kind: "output" },
    ],
    params: [FOCAL, { key: "transmission", label: "T", unit: "%", min: 90, max: 99.9, step: 0.1, default: 98 }],
  },
  {
    id: "filter-bandpass",
    sku: "FL780-10",
    name: "Bandpass Filter",
    category: "filters",
    description: "Narrowband filter — wavelength-dependent transmission.",
    width: 20,
    height: 36,
    color: "#34d399",
    ports: [
      { id: "in", label: "IN", offset: { x: -10, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 10, y: 0 }, direction: "east", kind: "output" },
    ],
    params: [
      { key: "centerNm", label: "Center λ", unit: "nm", min: 400, max: 1550, step: 1, default: 780 },
      { key: "bandwidthNm", label: "BW", unit: "nm", min: 1, max: 50, step: 0.5, default: 10 },
    ],
  },
  {
    id: "isolator",
    sku: "IO-780-APC",
    name: "Faraday Isolator",
    category: "filters",
    description: "One-way transmission — protects laser from back-reflections.",
    width: 40,
    height: 32,
    color: "#10b981",
    ports: [
      { id: "in", label: "IN", offset: { x: -20, y: 0 }, direction: "west", kind: "input" },
      { id: "out", label: "OUT", offset: { x: 20, y: 0 }, direction: "east", kind: "output" },
    ],
    params: [{ key: "isolationDb", label: "Isolation", unit: "dB", min: 20, max: 40, step: 1, default: 30 }],
  },
  {
    id: "power-meter",
    sku: "PM100D",
    name: "Power Meter",
    category: "detectors",
    description: "Photodiode power sensor with calibrated readout.",
    width: 36,
    height: 36,
    color: "#4ade80",
    ports: [{ id: "in", label: "IN", offset: { x: -18, y: 0 }, direction: "west", kind: "input" }],
    params: [{ key: "rangeMw", label: "Range", unit: "mW", min: 1, max: 1000, step: 1, default: 100 }],
  },
  {
    id: "camera-beam",
    sku: "DCC1545M",
    name: "Beam Profiler",
    category: "detectors",
    description: "CMOS beam profiler — intensity profile at focal plane.",
    width: 40,
    height: 40,
    color: "#86efac",
    ports: [{ id: "in", label: "IN", offset: { x: -20, y: 0 }, direction: "west", kind: "input" }],
    params: [{ key: "exposureUs", label: "Exposure", unit: "µs", min: 100, max: 50000, step: 100, default: 5000 }],
  },
  {
    id: "beam-block",
    sku: "BEAM-BLK",
    name: "Beam Block",
    category: "detectors",
    description: "Safety beam dump — absorbs stray power.",
    width: 24,
    height: 24,
    color: "#1e293b",
    ports: [{ id: "in", label: "IN", offset: { x: -12, y: 0 }, direction: "west", kind: "input" }],
    params: [],
  },
  {
    id: "fiber-coupler",
    sku: "PAFA-X7-FC",
    name: "Fiber Collimator",
    category: "lenses",
    description: "FC/APC fiber collimator — couples free-space to fiber.",
    width: 32,
    height: 32,
    color: "#60a5fa",
    ports: [
      { id: "in", label: "IN", offset: { x: -16, y: 0 }, direction: "west", kind: "bidirectional" },
      { id: "out", label: "OUT", offset: { x: 16, y: 0 }, direction: "east", kind: "bidirectional" },
    ],
    params: [{ key: "couplingEff", label: "Coupling η", unit: "%", min: 50, max: 95, step: 1, default: 75 }],
  },
];

export const CATALOG_BY_ID = Object.fromEntries(OPTICAL_CATALOG.map((c) => [c.id, c])) as Record<
  string,
  ComponentDef
>;

export const CATEGORY_LABELS: Record<ComponentDef["category"], string> = {
  sources: "Sources",
  beamsplitters: "Beam Splitters",
  mirrors: "Mirrors",
  polarization: "Polarization",
  phase: "Phase / Delay",
  lenses: "Lenses & Fiber",
  detectors: "Detectors",
  filters: "Filters & Isolators",
};

export function defaultParams(def: ComponentDef): Record<string, number> {
  return Object.fromEntries(def.params.map((p) => [p.key, p.default]));
}

export function createInstance(defId: string, x: number, y: number): import("./types").PlacedComponent | null {
  const def = CATALOG_BY_ID[defId];
  if (!def) return null;
  return {
    instanceId: crypto.randomUUID(),
    defId,
    x,
    y,
    rotation: 0,
    params: defaultParams(def),
    enabled: true,
  };
}
