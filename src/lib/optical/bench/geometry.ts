import type { PortDirection, PlacedComponent, Vec2 } from "./types";
import { CATALOG_BY_ID } from "./catalog";

const DIR_VECTORS: Record<PortDirection, Vec2> = {
  east: { x: 1, y: 0 },
  west: { x: -1, y: 0 },
  north: { x: 0, y: -1 },
  south: { x: 0, y: 1 },
};

function rotatePoint(p: Vec2, deg: number): Vec2 {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos };
}

function rotateDirection(dir: PortDirection, deg: number): PortDirection {
  const order: PortDirection[] = ["east", "south", "west", "north"];
  const idx = order.indexOf(dir);
  const steps = Math.round(deg / 90) % 4;
  return order[(idx + steps + 4) % 4];
}

export function getPortWorldPosition(comp: PlacedComponent, portId: string): Vec2 | null {
  const def = CATALOG_BY_ID[comp.defId];
  if (!def) return null;
  const port = def.ports.find((p) => p.id === portId);
  if (!port) return null;
  const rotated = rotatePoint(port.offset, comp.rotation);
  return { x: comp.x + rotated.x, y: comp.y + rotated.y };
}

export function getPortDirection(comp: PlacedComponent, portId: string): PortDirection | null {
  const def = CATALOG_BY_ID[comp.defId];
  const port = def?.ports.find((p) => p.id === portId);
  if (!port) return null;
  return rotateDirection(port.direction, comp.rotation);
}

export function snapToGrid(value: number, gridMm: number): number {
  return Math.round(value / gridMm) * gridMm;
}

/** Orthogonal routing between two bench points (Manhattan paths) */
export function routeBeamPath(from: Vec2, to: Vec2): Vec2[] {
  const mid: Vec2 = { x: to.x, y: from.y };
  if (Math.abs(from.x - to.x) < 2 && Math.abs(from.y - to.y) < 2) {
    return [from, to];
  }
  if (Math.abs(from.y - to.y) < 2) {
    return [from, to];
  }
  if (Math.abs(from.x - to.x) < 2) {
    return [from, to];
  }
  return [from, mid, to];
}

export function portDirectionVector(dir: PortDirection): Vec2 {
  return DIR_VECTORS[dir];
}

export function benchToSvg(benchMm: Vec2, origin: Vec2, scale: number): Vec2 {
  return {
    x: origin.x + benchMm.x * scale,
    y: origin.y + benchMm.y * scale,
  };
}

export function svgToBench(svg: Vec2, origin: Vec2, scale: number): Vec2 {
  return {
    x: (svg.x - origin.x) / scale,
    y: (svg.y - origin.y) / scale,
  };
}

export function rotateComponent(comp: PlacedComponent): PlacedComponent {
  return { ...comp, rotation: (comp.rotation + 90) % 360 };
}

export function componentBounds(comp: PlacedComponent): { minX: number; minY: number; maxX: number; maxY: number } {
  const def = CATALOG_BY_ID[comp.defId];
  const hw = (def?.width ?? 40) / 2;
  const hh = (def?.height ?? 40) / 2;
  return { minX: comp.x - hw, minY: comp.y - hh, maxX: comp.x + hw, maxY: comp.y + hh };
}

export function hitTestComponent(components: PlacedComponent[], x: number, y: number): PlacedComponent | null {
  for (let i = components.length - 1; i >= 0; i--) {
    const b = componentBounds(components[i]);
    if (x >= b.minX && x <= b.maxX && y >= b.minY && y <= b.maxY) return components[i];
  }
  return null;
}

export function hitTestPort(
  components: PlacedComponent[],
  x: number,
  y: number,
  toleranceMm = 8
): { comp: PlacedComponent; portId: string } | null {
  for (const comp of components) {
    const def = CATALOG_BY_ID[comp.defId];
    if (!def) continue;
    for (const port of def.ports) {
      const pos = getPortWorldPosition(comp, port.id);
      if (!pos) continue;
      const d = Math.hypot(pos.x - x, pos.y - y);
      if (d <= toleranceMm) return { comp, portId: port.id };
    }
  }
  return null;
}
