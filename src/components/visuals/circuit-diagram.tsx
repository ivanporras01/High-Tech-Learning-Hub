"use client";

import type { GateId } from "@/lib/quantum/state";

const GATE_COLORS: Record<string, string> = {
  H: "#38bdf8",
  X: "#f87171",
  Y: "#a78bfa",
  Z: "#34d399",
  S: "#fb923c",
  T: "#fbbf24",
  Rx: "#818cf8",
  Ry: "#22d3ee",
  Rz: "#e879f9",
  CNOT: "#94a3b8",
  M: "#64748b",
};

interface CircuitDiagramProps {
  /** Single-qubit gate sequence on wire q0 */
  gates: { id: GateId | "M"; label?: string }[];
  qubits?: number;
  title?: string;
}

/** SVG quantum circuit diagram — college-level gate notation */
export function CircuitDiagram({ gates, qubits = 1, title }: CircuitDiagramProps) {
  const cellW = 52;
  const wireY = 48;
  const pad = 24;
  const width = pad * 2 + Math.max(gates.length, 1) * cellW + 40;
  const height = qubits * 56 + pad;

  return (
    <figure className="qwa-glass-card !p-4">
      {title && (
        <figcaption className="mb-3 text-sm font-semibold text-[var(--qwa-fg)]">{title}</figcaption>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-full"
        role="img"
        aria-label={title ?? "Quantum circuit diagram"}
      >
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
          </marker>
        </defs>

        {Array.from({ length: qubits }, (_, q) => {
          const y = wireY + q * 56;
          return (
            <g key={q}>
              <text x={8} y={y + 4} fill="#94a3b8" fontSize={11} fontFamily="monospace">
                q{q}
              </text>
              <line
                x1={pad}
                y1={y}
                x2={width - pad}
                y2={y}
                stroke="#475569"
                strokeWidth={1.5}
                markerEnd="url(#arrow)"
              />
            </g>
          );
        })}

        {gates.map((gate, i) => {
          const x = pad + 20 + i * cellW;
          const y = wireY;
          const color = GATE_COLORS[gate.id] ?? "#94a3b8";
          const label = gate.label ?? gate.id;

          if (gate.id === "M") {
            return (
              <g key={i}>
                <rect x={x - 14} y={y - 16} width={28} height={32} rx={4} fill="#334155" stroke="#64748b" />
                <text x={x} y={y + 5} textAnchor="middle" fill="#f1f5f9" fontSize={12} fontFamily="sans-serif">
                  M
                </text>
              </g>
            );
          }

          return (
            <g key={i}>
              <rect
                x={x - 18}
                y={y - 18}
                width={36}
                height={36}
                rx={6}
                fill={color}
                fillOpacity={0.2}
                stroke={color}
                strokeWidth={1.5}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill={color}
                fontSize={label.length > 2 ? 10 : 13}
                fontWeight="bold"
                fontFamily="monospace"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
