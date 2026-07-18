/** Thorlabs-style optical bench domain model */

export type Vec2 = { x: number; y: number };

export type PortDirection = "east" | "west" | "north" | "south";

export type PortDef = {
  id: string;
  label: string;
  /** Local offset from component center (mm on bench grid) */
  offset: Vec2;
  direction: PortDirection;
  kind: "input" | "output" | "bidirectional";
};

export type ParamDef = {
  key: string;
  label: string;
  unit?: string;
  min: number;
  max: number;
  step: number;
  default: number;
};

export type ComponentCategory =
  | "sources"
  | "beamsplitters"
  | "mirrors"
  | "polarization"
  | "phase"
  | "lenses"
  | "detectors"
  | "filters";

export type ComponentDef = {
  id: string;
  sku: string;
  name: string;
  category: ComponentCategory;
  description: string;
  width: number;
  height: number;
  ports: PortDef[];
  params: ParamDef[];
  color: string;
};

export type PlacedComponent = {
  instanceId: string;
  defId: string;
  x: number;
  y: number;
  /** degrees: 0 | 90 | 180 | 270 */
  rotation: number;
  params: Record<string, number>;
  enabled: boolean;
};

export type Connection = {
  id: string;
  fromInstance: string;
  fromPort: string;
  toInstance: string;
  toPort: string;
};

export type BenchDocument = {
  name: string;
  wavelengthNm: number;
  gridMm: number;
  components: PlacedComponent[];
  connections: Connection[];
};

export type PortSignal = {
  instanceId: string;
  portId: string;
  /** Optical power (mW) arriving at this port */
  powerMw: number;
  /** Stokes-like summary for display */
  polarization: "H" | "V" | "D" | "A" | "R" | "L" | "mixed";
  phaseDeg: number;
};

export type BeamSegment = {
  connectionId: string;
  powerMw: number;
  wavelengthNm: number;
  points: Vec2[];
};

export type SimulationResult = {
  portSignals: PortSignal[];
  beamSegments: BeamSegment[];
  totalInputMw: number;
  detectorReadings: { instanceId: string; label: string; powerMw: number; powerDbm: number }[];
  warnings: string[];
};
