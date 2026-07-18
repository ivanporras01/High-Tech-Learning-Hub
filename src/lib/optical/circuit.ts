import type { Complex, StateVector } from "@/lib/quantum/state";
import { add, magnitude, mul, prob0, prob1 } from "@/lib/quantum/state";

const c = (re: number, im = 0): Complex => ({ re, im });

export type OpticalElementId = "beam-splitter" | "phase-upper" | "phase-lower" | "mirror-swap";

export type OpticalElement = { id: OpticalElementId; phase?: number };

const INV_SQRT2 = 1 / Math.SQRT2;

function applyMatrix(state: StateVector, m: [Complex, Complex][]): StateVector {
  const [a0, a1] = state;
  return [add(mul(m[0][0], a0), mul(m[0][1], a1)), add(mul(m[1][0], a0), mul(m[1][1], a1))];
}

export function beamSplitterMatrix(): [Complex, Complex][] {
  return [[c(INV_SQRT2), c(INV_SQRT2)], [c(INV_SQRT2), c(-INV_SQRT2)]];
}

export function phaseLowerMatrix(phi: number): [Complex, Complex][] {
  const e = { re: Math.cos(phi), im: Math.sin(phi) };
  return [[c(1), c(0)], [c(0), e]];
}

export function elementMatrix(el: OpticalElement): [Complex, Complex][] {
  switch (el.id) {
    case "beam-splitter":
      return beamSplitterMatrix();
    case "phase-upper": {
      const e = { re: Math.cos(el.phase ?? 0), im: Math.sin(el.phase ?? 0) };
      return [[e, c(0)], [c(0), c(1)]];
    }
    case "phase-lower":
      return phaseLowerMatrix(el.phase ?? 0);
    case "mirror-swap":
      return [[c(0), c(1)], [c(1), c(0)]];
  }
}

export function applyElement(state: StateVector, el: OpticalElement): StateVector {
  return applyMatrix(state, elementMatrix(el));
}

export function evolveOpticalCircuit(elements: OpticalElement[], initial: StateVector = [c(1, 0), c(0, 0)]) {
  return elements.reduce((s, el) => applyElement(s, el), initial);
}

export function machZehnderPreset(phase: number): OpticalElement[] {
  return [{ id: "beam-splitter" }, { id: "phase-lower", phase }, { id: "beam-splitter" }];
}

export function stateToKetString(state: StateVector): string {
  const fmt = (z: Complex) => {
    if (Math.abs(z.im) < 1e-6) return z.re.toFixed(3);
    return `${z.re.toFixed(3)}${z.im >= 0 ? "+" : ""}${z.im.toFixed(3)}i`;
  };
  return `${fmt(state[0])}|path₀⟩ + ${fmt(state[1])}|path₁⟩`;
}

export function machZehnderTheory(phase: number) {
  const pUpper = Math.cos(phase / 2) ** 2;
  return { pUpper, pLower: 1 - pUpper };
}

export function quantumAnalogue(elements: OpticalElement[]): string {
  if (elements.length === 1 && elements[0].id === "beam-splitter") {
    return "Dual-rail Hadamard — one 50:50 beam splitter implements H on path-encoded qubits.";
  }
  if (elements.length === 3 && elements.every((e, i) => ["beam-splitter", "phase-lower", "beam-splitter"][i] === e.id || (i === 1 && e.id === "phase-lower"))) {
    return "Mach–Zehnder interferometer — phase φ controls interference at the second beam splitter.";
  }
  return "Linear optical network — used in Xanadu, PsiQuantum, and photonic quantum computing.";
}

export function amplitudeIntensity(state: StateVector) {
  return { upper: magnitude(state[0]) ** 2, lower: magnitude(state[1]) ** 2 };
}

export function elementShortLabel(el: OpticalElement): string {
  switch (el.id) {
    case "beam-splitter":
      return "BS";
    case "phase-upper":
      return "φ₀";
    case "phase-lower":
      return "φ₁";
    case "mirror-swap":
      return "↕";
  }
}
