"use client";

import { useMemo, useRef, useState } from "react";
import {
  BENCH_PRESETS,
  CATALOG_BY_ID,
  CATEGORY_LABELS,
  OPTICAL_CATALOG,
  addConnection,
  benchToSvg,
  createInstance,
  getPortWorldPosition,
  hitTestComponent,
  hitTestPort,
  removeComponent,
  rotateComponent,
  simulateBench,
  snapToGrid,
  svgToBench,
  tryDualRailFromBench,
  type BenchDocument,
  type ComponentCategory,
} from "@/lib/optical/bench";
import { ProbabilityBars } from "@/components/visuals/probability-bars";
import { machZehnderTheory } from "@/lib/optical/circuit";

const SCALE = 2.2;
const ORIGIN = { x: 80, y: 220 };

function beamColor(wavelengthNm: number, powerMw: number): string {
  let r = 120;
  let g = 180;
  let b = 255;
  if (wavelengthNm < 450) {
    r = 140;
    g = 80;
    b = 255;
  } else if (wavelengthNm < 550) {
    r = 80;
    g = 255;
    b = 180;
  } else if (wavelengthNm < 600) {
    r = 255;
    g = 220;
    b = 80;
  } else if (wavelengthNm < 700) {
    r = 255;
    g = 100;
    b = 80;
  } else {
    r = 255;
    g = 80;
    b = 100;
  }
  const alpha = Math.min(1, 0.25 + Math.sqrt(powerMw) * 0.15);
  return `rgba(${r},${g},${b},${alpha})`;
}

function ComponentGlyph({ defId, selected }: { defId: string; selected: boolean }) {
  const def = CATALOG_BY_ID[defId];
  const stroke = selected ? "#22d3ee" : def?.color ?? "#94a3b8";
  const w = def?.width ?? 40;
  const h = def?.height ?? 40;

  return (
    <g>
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={6}
        fill="rgba(15,23,42,0.85)"
        stroke={stroke}
        strokeWidth={selected ? 2.5 : 1.5}
      />
      {defId.includes("laser") && (
        <>
          <polygon points={`${-w / 4},0 ${w / 4},${-h / 6} ${w / 4},${h / 6}`} fill={stroke} opacity={0.9} />
          <circle cx={w / 3} cy={0} r={4} fill="#fef08a" />
        </>
      )}
      {defId.includes("bs") && (
        <>
          <line x1={-w / 4} y1={-h / 4} x2={w / 4} y2={h / 4} stroke={stroke} strokeWidth={2} />
          <line x1={-w / 4} y1={h / 4} x2={w / 4} y2={-h / 4} stroke={stroke} strokeWidth={2} />
        </>
      )}
      {defId.includes("mirror") && (
        <line x1={-w / 3} y1={h / 3} x2={w / 3} y2={-h / 3} stroke={stroke} strokeWidth={3} />
      )}
      {(defId.includes("pol") || defId === "hwp" || defId === "qwp") && (
        <rect x={-w / 6} y={-h / 3} width={w / 3} height={(h * 2) / 3} fill={stroke} opacity={0.35} rx={2} />
      )}
      {defId.includes("phase") && (
        <text textAnchor="middle" dominantBaseline="middle" fill="#fbbf24" fontSize={14} fontWeight="bold">
          φ
        </text>
      )}
      {defId.includes("lens") && (
        <path d={`M ${-w / 4} ${-h / 3} Q 0 0 ${-w / 4} ${h / 3} M ${w / 4} ${-h / 3} Q 0 0 ${w / 4} ${h / 3}`} stroke={stroke} fill="none" strokeWidth={2} />
      )}
      {defId.includes("power-meter") && (
        <>
          <circle cx={0} cy={0} r={h / 4} fill={stroke} opacity={0.5} />
          <text textAnchor="middle" y={h / 2 + 2} fill="#94a3b8" fontSize={8}>
            mW
          </text>
        </>
      )}
      {defId.includes("filter") && (
        <rect x={-w / 8} y={-h / 3} width={w / 4} height={(h * 2) / 3} fill="#34d399" opacity={0.5} rx={2} />
      )}
      {defId.includes("block") && (
        <rect x={-w / 3} y={-h / 3} width={(w * 2) / 3} height={(h * 2) / 3} fill="#0f172a" stroke="#475569" />
      )}
      <text y={-h / 2 - 6} textAnchor="middle" fill="#94a3b8" fontSize={8} fontWeight="600">
        {def?.sku ?? defId}
      </text>
    </g>
  );
}

export function OpticalBenchSimulator() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [bench, setBench] = useState<BenchDocument>(() => BENCH_PRESETS[0].build());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wireMode, setWireMode] = useState(false);
  const [wireStart, setWireStart] = useState<{ instanceId: string; portId: string } | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [catalogFilter, setCatalogFilter] = useState<ComponentCategory | "all">("all");
  const [activeTab, setActiveTab] = useState<"bench" | "quantum">("bench");

  const sim = useMemo(() => simulateBench(bench), [bench]);
  const dualRail = useMemo(() => tryDualRailFromBench(bench), [bench]);
  const selected = bench.components.find((c) => c.instanceId === selectedId) ?? null;
  const selectedDef = selected ? CATALOG_BY_ID[selected.defId] : null;

  const maxDetectorPower = Math.max(...sim.detectorReadings.map((d) => d.powerMw), 0.001);

  const loadPreset = (presetId: string) => {
    const p = BENCH_PRESETS.find((x) => x.id === presetId);
    if (p) {
      setBench(p.build());
      setSelectedId(null);
      setWireStart(null);
    }
  };

  const updateSelectedParam = (key: string, value: number) => {
    if (!selectedId) return;
    setBench((prev) => ({
      ...prev,
      components: prev.components.map((c) =>
        c.instanceId === selectedId ? { ...c, params: { ...c.params, [key]: value } } : c
      ),
    }));
  };

  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const loc = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    const benchPt = svgToBench({ x: loc.x, y: loc.y }, ORIGIN, SCALE);

    if (wireMode) {
      const hit = hitTestPort(bench.components, benchPt.x, benchPt.y, 12);
      if (!hit) return;
      if (!wireStart) {
        setWireStart({ instanceId: hit.comp.instanceId, portId: hit.portId });
      } else {
        setBench((prev) =>
          addConnection(prev, wireStart.instanceId, wireStart.portId, hit.comp.instanceId, hit.portId)
        );
        setWireStart(null);
      }
      return;
    }

    const hitComp = hitTestComponent(bench.components, benchPt.x, benchPt.y);
    if (hitComp) {
      setSelectedId(hitComp.instanceId);
      setDraggingId(hitComp.instanceId);
      setDragOffset({ x: benchPt.x - hitComp.x, y: benchPt.y - hitComp.y });
    } else {
      setSelectedId(null);
    }
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingId) return;
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const loc = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    const benchPt = svgToBench({ x: loc.x, y: loc.y }, ORIGIN, SCALE);
    const nx = snapToGrid(benchPt.x - dragOffset.x, bench.gridMm);
    const ny = snapToGrid(benchPt.y - dragOffset.y, bench.gridMm);
    setBench((prev) => ({
      ...prev,
      components: prev.components.map((c) => (c.instanceId === draggingId ? { ...c, x: nx, y: ny } : c)),
    }));
  };

  const handleSvgMouseUp = () => setDraggingId(null);

  const addFromCatalog = (defId: string) => {
    const inst = createInstance(defId, snapToGrid(40, bench.gridMm), snapToGrid(0, bench.gridMm));
    if (!inst) return;
    setBench((prev) => ({ ...prev, components: [...prev.components, inst] }));
    setSelectedId(inst.instanceId);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setBench((prev) => removeComponent(prev, selectedId));
    setSelectedId(null);
  };

  const rotateSelected = () => {
    if (!selectedId) return;
    setBench((prev) => ({
      ...prev,
      components: prev.components.map((c) => (c.instanceId === selectedId ? rotateComponent(c) : c)),
    }));
  };

  const filteredCatalog =
    catalogFilter === "all"
      ? OPTICAL_CATALOG
      : OPTICAL_CATALOG.filter((c) => c.category === catalogFilter);

  const theoryPhase = selected?.defId === "phase-shifter" ? selected.params.phaseDeg ?? 0 : dualRail?.phaseDeg ?? 90;
  const theory = machZehnderTheory((theoryPhase * Math.PI) / 180);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">Presets</span>
        {BENCH_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => loadPreset(p.id)}
            className="rounded-lg border border-[var(--qwa-border)] px-2.5 py-1.5 text-xs text-[var(--qwa-fg-muted)] hover:border-[var(--qwa-cyan)] hover:text-[var(--qwa-cyan)]"
            title={p.description}
          >
            {p.name}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => {
              setWireMode((w) => !w);
              setWireStart(null);
            }}
            className={`qwa-btn-secondary text-xs ${wireMode ? "!border-[var(--qwa-cyan)] !text-[var(--qwa-cyan)]" : ""}`}
          >
            {wireMode ? "🔗 Wiring…" : "🔗 Wire ports"}
          </button>
          <button type="button" onClick={rotateSelected} disabled={!selectedId} className="qwa-btn-secondary text-xs">
            ↻ Rotate
          </button>
          <button type="button" onClick={deleteSelected} disabled={!selectedId} className="qwa-btn-secondary text-xs">
            ✕ Delete
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[220px_1fr_260px]">
        {/* Catalog palette */}
        <aside className="qwa-glass-card !p-3 max-h-[520px] overflow-y-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">Thorlabs Catalog</p>
          <select
            value={catalogFilter}
            onChange={(e) => setCatalogFilter(e.target.value as ComponentCategory | "all")}
            className="mt-2 w-full rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] px-2 py-1.5 text-xs"
          >
            <option value="all">All categories</option>
            {(Object.keys(CATEGORY_LABELS) as ComponentCategory[]).map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
          <ul className="mt-3 space-y-1.5">
            {filteredCatalog.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => addFromCatalog(item.id)}
                  className="w-full rounded-lg border border-[var(--qwa-border)] px-2 py-2 text-left transition hover:border-[var(--qwa-cyan)]/50 hover:bg-[var(--qwa-cyan)]/5"
                >
                  <span className="block text-[10px] font-mono text-[var(--qwa-cyan)]">{item.sku}</span>
                  <span className="block text-xs font-semibold text-[var(--qwa-fg)]">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Bench canvas */}
        <div className="qwa-glass-card !p-2 overflow-hidden">
          <div className="mb-2 flex items-center justify-between px-2 text-xs text-[var(--qwa-fg-muted)]">
            <span>{bench.name} · λ = {bench.wavelengthNm} nm · grid {bench.gridMm} mm</span>
            <label className="flex items-center gap-2">
              λ bench
              <input
                type="number"
                min={350}
                max={1600}
                value={bench.wavelengthNm}
                onChange={(e) => setBench((p) => ({ ...p, wavelengthNm: Number(e.target.value) }))}
                className="w-16 rounded border border-[var(--qwa-border)] bg-transparent px-1 py-0.5 text-xs"
              />
            </label>
          </div>
          <svg
            ref={svgRef}
            viewBox="0 0 900 440"
            className="w-full cursor-crosshair select-none rounded-xl bg-[#020617]/80"
            onMouseDown={handleSvgMouseDown}
            onMouseMove={handleSvgMouseMove}
            onMouseUp={handleSvgMouseUp}
            onMouseLeave={handleSvgMouseUp}
            role="img"
            aria-label="Optical bench layout"
          >
            {/* Grid */}
            {Array.from({ length: 45 }).map((_, i) => (
              <line
                key={`gv-${i}`}
                x1={ORIGIN.x + i * bench.gridMm * SCALE}
                y1={0}
                x2={ORIGIN.x + i * bench.gridMm * SCALE}
                y2={440}
                stroke="rgba(148,163,184,0.06)"
                strokeWidth={1}
              />
            ))}
            {Array.from({ length: 22 }).map((_, i) => (
              <line
                key={`gh-${i}`}
                x1={0}
                y1={i * 20}
                x2={900}
                y2={i * 20}
                stroke="rgba(148,163,184,0.04)"
                strokeWidth={1}
              />
            ))}

            {/* Beam paths */}
            {sim.beamSegments.map((seg) => {
              const pts = seg.points.map((p) => benchToSvg(p, ORIGIN, SCALE));
              const d = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
              const width = 1.5 + (seg.powerMw / maxDetectorPower) * 6;
              return (
                <path
                  key={seg.connectionId}
                  d={d}
                  fill="none"
                  stroke={beamColor(seg.wavelengthNm, seg.powerMw)}
                  strokeWidth={width}
                  strokeLinecap="round"
                  className="qwa-beam-path"
                />
              );
            })}

            {/* Wire preview */}
            {wireStart && (
              <circle
                cx={benchToSvg(getPortWorldPosition(
                  bench.components.find((c) => c.instanceId === wireStart.instanceId)!,
                  wireStart.portId
                ) ?? { x: 0, y: 0 }, ORIGIN, SCALE).x}
                cy={benchToSvg(getPortWorldPosition(
                  bench.components.find((c) => c.instanceId === wireStart.instanceId)!,
                  wireStart.portId
                ) ?? { x: 0, y: 0 }, ORIGIN, SCALE).y}
                r={8}
                fill="none"
                stroke="#22d3ee"
                strokeWidth={2}
                strokeDasharray="4 2"
              />
            )}

            {/* Components */}
            {bench.components.map((comp) => {
              const pos = benchToSvg({ x: comp.x, y: comp.y }, ORIGIN, SCALE);
              const def = CATALOG_BY_ID[comp.defId];
              return (
                <g
                  key={comp.instanceId}
                  transform={`translate(${pos.x}, ${pos.y}) rotate(${comp.rotation})`}
                  style={{ cursor: draggingId === comp.instanceId ? "grabbing" : "grab" }}
                >
                  <ComponentGlyph defId={comp.defId} selected={selectedId === comp.instanceId} />
                  {def?.ports.map((port) => {
                    const wp = getPortWorldPosition(comp, port.id);
                    if (!wp) return null;
                    const sp = benchToSvg(wp, ORIGIN, SCALE);
                    const relX = sp.x - pos.x;
                    const relY = sp.y - pos.y;
                    return (
                      <circle
                        key={port.id}
                        cx={relX}
                        cy={relY}
                        r={wireMode ? 7 : 4}
                        fill={wireMode ? "rgba(34,211,238,0.35)" : "rgba(34,211,238,0.6)"}
                        stroke="#22d3ee"
                        strokeWidth={1}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
          {wireMode && (
            <p className="mt-2 px-2 text-xs text-[var(--qwa-cyan)]">
              Click an output port, then click a destination input port to connect. Click Wire again to exit.
            </p>
          )}
        </div>

        {/* Inspector + readouts */}
        <aside className="space-y-3">
          <div className="qwa-glass-card !p-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">Properties</p>
            {selected && selectedDef ? (
              <div className="mt-2 space-y-2">
                <p className="font-semibold text-sm">{selectedDef.name}</p>
                <p className="text-[10px] font-mono text-[var(--qwa-fg-muted)]">{selectedDef.sku}</p>
                <p className="text-xs text-[var(--qwa-fg-muted)]">{selectedDef.description}</p>
                {selectedDef.params.map((param) => (
                  <label key={param.key} className="block text-xs">
                    {param.label}
                    {param.unit ? ` (${param.unit})` : ""}:{" "}
                    <span className="font-mono text-[var(--qwa-cyan)]">
                      {selected.params[param.key]?.toFixed(param.step < 1 ? 2 : 0)}
                    </span>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={selected.params[param.key] ?? param.default}
                      onChange={(e) => updateSelectedParam(param.key, parseFloat(e.target.value))}
                      className="mt-1 w-full accent-[var(--qwa-cyan)]"
                    />
                  </label>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">Select a component on the bench to edit parameters.</p>
            )}
          </div>

          <div className="qwa-glass-card !p-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">Detectors</p>
            {sim.detectorReadings.length === 0 ? (
              <p className="mt-2 text-xs text-[var(--qwa-fg-muted)]">Add PM100D or DCC1545M sensors and wire them into your chain.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {sim.detectorReadings.map((d) => (
                  <li key={d.instanceId} className="rounded-lg border border-[var(--qwa-border)] px-3 py-2">
                    <p className="text-xs text-[var(--qwa-fg-muted)]">{d.label}</p>
                    <p className="text-lg font-bold qwa-text-gradient">{d.powerMw.toFixed(3)} mW</p>
                    <p className="text-[10px] font-mono text-[var(--qwa-fg-muted)]">
                      {Number.isFinite(d.powerDbm) ? `${d.powerDbm.toFixed(2)} dBm` : "—"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {sim.warnings.length > 0 && (
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
              {sim.warnings.map((w) => (
                <p key={w}>{w}</p>
              ))}
            </div>
          )}
        </aside>
      </div>

      {/* Quantum readout tab */}
      <div className="qwa-glass-card !p-4">
        <div className="flex gap-2 border-b border-[var(--qwa-border)] pb-3">
          {(["bench", "quantum"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                activeTab === tab
                  ? "bg-[var(--qwa-cyan)]/15 text-[var(--qwa-cyan)]"
                  : "text-[var(--qwa-fg-muted)]"
              }`}
            >
              {tab === "bench" ? "Bench summary" : "Quantum dual-rail view"}
            </button>
          ))}
        </div>

        {activeTab === "bench" ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <p className="text-[var(--qwa-fg-muted)]">Total source power</p>
              <p className="text-xl font-bold">{sim.totalInputMw.toFixed(2)} mW</p>
            </div>
            <div>
              <p className="text-[var(--qwa-fg-muted)]">Components</p>
              <p className="text-xl font-bold">{bench.components.length}</p>
            </div>
            <div>
              <p className="text-[var(--qwa-fg-muted)]">Connections</p>
              <p className="text-xl font-bold">{bench.connections.length}</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {dualRail ? (
              <>
                <div>
                  <p className="text-sm text-[var(--qwa-fg-muted)]">
                    Mach–Zehnder / dual-rail analogue detected. Phase φ = {dualRail.phaseDeg.toFixed(0)}°
                  </p>
                  <p className="mt-2 font-mono text-sm text-[var(--qwa-cyan)]">
                    P(path₀) = cos²(φ/2) = {(theory.pUpper * 100).toFixed(1)}%
                  </p>
                  <p className="font-mono text-sm text-[var(--qwa-violet)]">
                    P(path₁) = sin²(φ/2) = {(theory.pLower * 100).toFixed(1)}%
                  </p>
                </div>
                <ProbabilityBars prob0={theory.pUpper} prob1={theory.pLower} title="Dual-rail measurement" />
              </>
            ) : (
              <p className="text-sm text-[var(--qwa-fg-muted)]">
                Add at least two beam splitters and a phase shifter (Mach–Zehnder topology) to see the photonic qubit
                dual-rail probability view.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
