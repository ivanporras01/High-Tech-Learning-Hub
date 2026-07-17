"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { BlochCoords } from "@/lib/quantum/state";

interface BlochSphereViewProps {
  bloch: BlochCoords;
  height?: number;
  label?: string;
}

/** 3D Bloch sphere with state vector arrow — drag to orbit camera */
export function BlochSphereView({ bloch, height = 320, label }: BlochSphereViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blochRef = useRef(bloch);
  blochRef.current = bloch;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050816);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const sphereGeom = new THREE.SphereGeometry(1, 36, 28);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    scene.add(new THREE.Mesh(sphereGeom, wireMat));

    // Equator ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.008, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.5 })
    );
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const axisColors = [0xef4444, 0x22c55e, 0x3b82f6];
    const axisLabels = ["X", "Y", "Z"];
    [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach(([x, y, z], i) => {
      const mat = new THREE.LineBasicMaterial({ color: axisColors[i] });
      const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x * 1.15, y * 1.15, z * 1.15)];
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
    });

    const arrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, 0),
      1,
      0x22d3ee,
      0.1,
      0.07
    );
    scene.add(arrow);

    // |0⟩ and |1⟩ poles
    const poleGeom = new THREE.SphereGeometry(0.04, 12, 12);
    const north = new THREE.Mesh(poleGeom, new THREE.MeshBasicMaterial({ color: 0xf8fafc }));
    north.position.set(0, 0, 1.02);
    scene.add(north);
    const south = new THREE.Mesh(poleGeom, new THREE.MeshBasicMaterial({ color: 0xa78bfa }));
    south.position.set(0, 0, -1.02);
    scene.add(south);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    let rotY = 0.7;
    let rotX = 0.35;
    let dragging = false;
    let prevX = 0;
    let prevY = 0;

    const resize = () => {
      const w = container.clientWidth;
      const h = height;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onUp = () => { dragging = false; };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      rotY += (e.clientX - prevX) * 0.008;
      rotX += (e.clientY - prevY) * 0.008;
      rotX = Math.max(-1.2, Math.min(1.2, rotX));
      prevX = e.clientX;
      prevY = e.clientY;
    };

    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);
    resize();

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const b = blochRef.current;
      const dir = new THREE.Vector3(b.x, b.y, b.z).normalize();
      if (dir.lengthSq() > 0.01) {
        arrow.setDirection(dir);
        arrow.setLength(1, 0.1, 0.07);
      }
      const r = 2.6;
      camera.position.set(
        r * Math.sin(rotY) * Math.cos(rotX),
        r * Math.sin(rotX) + 0.3,
        r * Math.cos(rotY) * Math.cos(rotX)
      );
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      sphereGeom.dispose();
      wireMat.dispose();
    };
  }, [height]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-xl border border-[var(--qwa-border)]"
      style={{ height }}
      role="img"
      aria-label={label ?? "Bloch sphere showing qubit state vector"}
    />
  );
}
