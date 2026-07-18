/** Jones calculus for polarization-resolved optical bench simulation */

export type C = { re: number; im: number };

export type JonesVector = [C, C];

export type JonesMatrix = [JonesVector, JonesVector];

const c = (re: number, im = 0): C => ({ re, im });

export function cAdd(a: C, b: C): C {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function cMul(a: C, b: C): C {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

export function cScale(s: number, a: C): C {
  return { re: s * a.re, im: s * a.im };
}

export function cAbs2(a: C): number {
  return a.re * a.re + a.im * a.im;
}

export function jonesPower(j: JonesVector): number {
  return cAbs2(j[0]) + cAbs2(j[1]);
}

export function jonesApply(m: JonesMatrix, v: JonesVector): JonesVector {
  return [
    cAdd(cMul(m[0][0], v[0]), cMul(m[0][1], v[1])),
    cAdd(cMul(m[1][0], v[0]), cMul(m[1][1], v[1])),
  ];
}

export function jonesScale(s: number, v: JonesVector): JonesVector {
  const k = Math.sqrt(s);
  return [cScale(k, v[0]), cScale(k, v[1])];
}

export function identity(): JonesMatrix {
  return [[c(1), c(0)], [c(0), c(1)]];
}

/** Horizontal linear polarization */
export function jonesH(): JonesVector {
  return [c(1), c(0)];
}

/** Vertical linear polarization */
export function jonesV(): JonesVector {
  return [c(0), c(1)];
}

/** +45° linear */
export function jonesD(): JonesVector {
  const k = 1 / Math.SQRT2;
  return [c(k), c(k)];
}

/** Right circular */
export function jonesR(): JonesVector {
  const k = 1 / Math.SQRT2;
  return [c(k), c(0, -k)];
}

export function polarizerH(extinctionDb = 30): JonesMatrix {
  const leak = 10 ** (-extinctionDb / 10);
  return [[c(1), c(0)], [c(0, 0), c(leak)]];
}

export function polarizerV(extinctionDb = 30): JonesMatrix {
  const leak = 10 ** (-extinctionDb / 10);
  return [[c(leak), c(0)], [c(0), c(1)]];
}

export function halfWavePlate(angleDeg: number): JonesMatrix {
  const t = (angleDeg * Math.PI) / 180;
  const c2 = Math.cos(2 * t);
  const s2 = Math.sin(2 * t);
  return [
    [c(c2), c(s2)],
    [c(s2), c(-c2)],
  ];
}

export function quarterWavePlate(angleDeg: number): JonesMatrix {
  const t = (angleDeg * Math.PI) / 180;
  const ct = Math.cos(t);
  const st = Math.sin(t);
  const i = c(0, 1);
  const oneMinusI = cAdd(c(1), cScale(-1, i));
  const m00 = cAdd(c(ct * ct), cMul(cScale(st * st, i), i));
  const m01 = cScale((1 - i.re) * st * ct, c(1)); // simplified λ/4 at angle
  const m10 = m01;
  const m11 = cAdd(c(st * st), cMul(cScale(ct * ct, i), i));
  // Standard QWP matrix at angle θ:
  const cos2 = ct * ct;
  const sin2 = st * st;
  const sincos = st * ct;
  return [
    [cAdd(c(cos2), cMul(c(sin2), i)), cScale((1 - 0) * sincos, c(1))],
    [cScale(sincos, c(1)), cAdd(c(sin2), cMul(c(cos2), i))],
  ];
}

export function phaseShift(phaseDeg: number): JonesMatrix {
  const rad = (phaseDeg * Math.PI) / 180;
  const e = { re: Math.cos(rad), im: Math.sin(rad) };
  return [[e, c(0)], [c(0), c(1)]];
}

export function describePolarization(j: JonesVector): "H" | "V" | "D" | "A" | "R" | "L" | "mixed" {
  const p = jonesPower(j);
  if (p < 1e-12) return "mixed";
  const h = cAbs2(j[0]);
  const v = cAbs2(j[1]);
  const ratio = h / (h + v + 1e-15);
  if (ratio > 0.95) return "H";
  if (ratio < 0.05) return "V";
  const cross = Math.abs(j[0].re * j[1].re + j[0].im * j[1].im);
  if (cross / p > 0.4) return "D";
  const circ = Math.abs(j[0].im * j[1].re - j[0].re * j[1].im);
  if (circ / p > 0.3) return j[0].im > 0 ? "L" : "R";
  return "mixed";
}

export function powerToDbm(mw: number): number {
  if (mw <= 0) return -Infinity;
  return 10 * Math.log10(mw);
}

export function jonesToMw(j: JonesVector, referenceMw: number): number {
  return referenceMw * jonesPower(j);
}
