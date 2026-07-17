/** Single-qubit state and gate math for visualizations */

export type Complex = { re: number; im: number };

export type StateVector = [Complex, Complex];

export type GateId = "I" | "X" | "Y" | "Z" | "H" | "S" | "T" | "Rx" | "Ry" | "Rz";

export type BlochCoords = { x: number; y: number; z: number };

const c = (re: number, im = 0): Complex => ({ re, im });

export function add(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function mul(a: Complex, b: Complex): Complex {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

export function scale(v: Complex, s: number): Complex {
  return { re: v.re * s, im: v.im * s };
}

export function conj(v: Complex): Complex {
  return { re: v.re, im: -v.im };
}

export function magnitude(v: Complex): number {
  return Math.sqrt(v.re * v.re + v.im * v.im);
}

export const KET0: StateVector = [c(1, 0), c(0, 0)];
export const KET1: StateVector = [c(0, 0), c(1, 0)];

/** Gate unitaries (standard computational basis) */
export function gateMatrix(id: GateId, angle = Math.PI / 2): [Complex, Complex][] {
  const i = c(0, 1);
  const one = c(1, 0);
  const zero = c(0, 0);
  const half = (a: number) => c(Math.cos(a / 2), 0);
  const halfSin = (a: number) => c(Math.sin(a / 2), 0);

  switch (id) {
    case "I":
      return [[one, zero], [zero, one]];
    case "X":
      return [[zero, one], [one, zero]];
    case "Y":
      return [[zero, scale(i, -1)], [i, zero]];
    case "Z":
      return [[one, zero], [zero, scale(one, -1)]];
    case "H":
      return [
        [scale(one, 1 / Math.SQRT2), scale(one, 1 / Math.SQRT2)],
        [scale(one, 1 / Math.SQRT2), scale(one, -1 / Math.SQRT2)],
      ];
    case "S":
      return [[one, zero], [zero, i]];
    case "T":
      return [[one, zero], [zero, { re: Math.cos(Math.PI / 4), im: Math.sin(Math.PI / 4) }]];
    case "Rx":
      return [
        [half(angle), scale(halfSin(angle), -1)],
        [scale(halfSin(angle), -1), half(angle)],
      ];
    case "Ry":
      return [
        [half(angle), scale(halfSin(angle), -1)],
        [halfSin(angle), half(angle)],
      ];
    case "Rz": {
      const e = { re: Math.cos(angle / 2), im: Math.sin(angle / 2) };
      return [
        [conj(e), zero],
        [zero, e],
      ];
    }
  }
}

export function applyGate(state: StateVector, id: GateId, angle = Math.PI / 2): StateVector {
  const m = gateMatrix(id, angle);
  const α = state[0];
  const β = state[1];
  return [
    add(mul(m[0][0], α), mul(m[0][1], β)),
    add(mul(m[1][0], α), mul(m[1][1], β)),
  ];
}

export function applyCircuit(state: StateVector, gates: { id: GateId; angle?: number }[]): StateVector {
  return gates.reduce((s, g) => applyGate(s, g.id, g.angle ?? Math.PI / 2), state);
}

export function prob0(state: StateVector): number {
  return magnitude(state[0]) ** 2;
}

export function prob1(state: StateVector): number {
  return magnitude(state[1]) ** 2;
}

/** Bloch vector from statevector (|ψ⟩ = α|0⟩ + β|1⟩) */
export function toBloch(state: StateVector): BlochCoords {
  const α = state[0];
  const β = state[1];
  const αc = conj(α);
  return {
    x: 2 * (mul(αc, β).re),
    y: 2 * (mul(αc, β).im),
    z: magnitude(α) ** 2 - magnitude(β) ** 2,
  };
}

export function formatAmplitude(v: Complex): string {
  if (Math.abs(v.im) < 1e-6) return v.re.toFixed(3);
  const sign = v.im >= 0 ? "+" : "-";
  return `${v.re.toFixed(2)} ${sign} ${Math.abs(v.im).toFixed(2)}i`;
}

export function stateLabel(state: StateVector): string {
  const α = state[0];
  const β = state[1];
  if (magnitude(β) < 1e-6) return "|0⟩";
  if (magnitude(α) < 1e-6) return "|1⟩";
  return `${formatAmplitude(α)}|0⟩ + ${formatAmplitude(β)}|1⟩`;
}

export function formatComplex(v: Complex, precision = 4): string {
  const re = v.re;
  const im = v.im;
  if (Math.abs(im) < 1e-8) return re.toFixed(precision);
  if (Math.abs(re) < 1e-8) return im >= 0 ? `${im.toFixed(precision)}i` : `${im.toFixed(precision)}i`;
  const sign = im >= 0 ? "+" : "-";
  return `${re.toFixed(precision)} ${sign} ${Math.abs(im).toFixed(precision)}i`;
}

export function gateDisplayLabel(id: GateId, angle = Math.PI / 2): string {
  if (id === "Rx" || id === "Ry" || id === "Rz") {
    const deg = ((angle * 180) / Math.PI).toFixed(0);
    return `${id}(${deg}°)`;
  }
  return id;
}

export function vectorKet(state: StateVector): string {
  const α = formatComplex(state[0]);
  const β = formatComplex(state[1]);
  return `[ ${α} ]\\n[ ${β} ]`;
}

export function vectorColumnTex(state: StateVector): string {
  return `|ψ⟩ = ${formatComplex(state[0])}|0⟩ + ${formatComplex(state[1])}|1⟩`;
}

export function norm(state: StateVector): number {
  return Math.sqrt(prob0(state) + prob1(state));
}

export type EvolutionStep = {
  index: number;
  gate: GateId | "initial" | "measure";
  gateLabel: string;
  matrix?: [Complex, Complex][];
  stateBefore: StateVector;
  stateAfter: StateVector;
  bloch: BlochCoords;
  p0: number;
  p1: number;
};

export function computeEvolution(
  gates: GateId[],
  rotationAngle = Math.PI / 2
): EvolutionStep[] {
  const steps: EvolutionStep[] = [];
  let s = KET0;
  steps.push({
    index: 0,
    gate: "initial",
    gateLabel: "|0⟩",
    stateBefore: KET0,
    stateAfter: KET0,
    bloch: toBloch(KET0),
    p0: 1,
    p1: 0,
  });

  gates.forEach((g, i) => {
    const angle = g === "Rx" || g === "Ry" || g === "Rz" ? rotationAngle : Math.PI / 2;
    const before = s;
    const m = gateMatrix(g, angle);
    s = applyGate(before, g, angle);
    steps.push({
      index: i + 1,
      gate: g,
      gateLabel: gateDisplayLabel(g, angle),
      matrix: m,
      stateBefore: before,
      stateAfter: s,
      bloch: toBloch(s),
      p0: prob0(s),
      p1: prob1(s),
    });
  });

  return steps;
}

/** Human-readable Bloch coordinate derivation from amplitudes */
export function blochDerivation(state: StateVector): {
  alpha: string;
  beta: string;
  xExpr: string;
  yExpr: string;
  zExpr: string;
  x: number;
  y: number;
  z: number;
  normCheck: string;
} {
  const α = state[0];
  const β = state[1];
  const αcβ = mul(conj(α), β);
  const p0 = magnitude(α) ** 2;
  const p1 = magnitude(β) ** 2;
  return {
    alpha: formatComplex(α),
    beta: formatComplex(β),
    xExpr: "2·Re(α*β)",
    yExpr: "2·Im(α*β)",
    zExpr: "|α|² − |β|²",
    x: 2 * αcβ.re,
    y: 2 * αcβ.im,
    z: p0 - p1,
    normCheck: `|α|² + |β|² = ${p0.toFixed(4)} + ${p1.toFixed(4)} = ${(p0 + p1).toFixed(4)}`,
  };
}

export function formatMatrixCell(v: Complex): string {
  return formatComplex(v, 3);
}
