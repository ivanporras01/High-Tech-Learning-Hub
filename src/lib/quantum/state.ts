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
