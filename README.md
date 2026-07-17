# Quantum Workforce Academy

College & university quantum computing LMS — **visual-first** curriculum with Bloch sphere, quantum gates, circuit diagrams, and Qiskit labs.

> **GitHub:** [ivanporras01/High-Tech-Learning-Hub](https://github.com/ivanporras01/High-Tech-Learning-Hub)

## What This Is

- **Higher education** — community college, university, continuing ed (not K-12, no buddies, no gamified missions)
- **Graphic-first** — Three.js Bloch sphere, gate playground, SVG circuits, probability charts in lessons
- **Workforce-ready** — 12 modules, 20 Qiskit labs, career paths, employer profiles

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → try the **Gate Playground** on the homepage or `/simulations/bloch-sphere`.

## Visual Components (`src/components/visuals/`)

| Component | Purpose |
|-----------|---------|
| `gate-playground.tsx` | Full interactive lab: gates + 3D Bloch + circuit + probabilities |
| `bloch-sphere-view.tsx` | Three.js Bloch sphere renderer |
| `circuit-diagram.tsx` | SVG quantum circuit notation |
| `probability-bars.tsx` | P(\|0⟩) / P(\|1⟩) Born rule chart |
| `technology-landscape.tsx` | Six hardware modality classes — interactive comparison |

Lessons embed visuals via `LessonContent.visuals[]` in `module1-lessons.ts`. Technology data lives in `src/lib/data/quantum-technologies.ts`.

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage with live Gate Playground |
| `/course` | 12-module catalog |
| `/technologies` | Six quantum hardware classes — superconducting, ion, photonic, etc. |
| `/simulations` | Visual learning hub |
| `/simulations/bloch-sphere` | Full gate + Bloch experience |
| `/labs` | 20 Qiskit labs |
| `/dashboard` | Scholar dashboard — progress, XP, badges |
| `/workforce` | Career paths |
| `/companies` | Quantum employers (+ `/companies/[slug]`) |
| `/news` | Industry headlines |
| `/admin` | Platform overview (stub) |

## Stack

Next.js 16 · React 19 · Tailwind 4 · Three.js · Chart.js · TypeScript

## Data Layer

Static content in `src/lib/data/` — structured for future Firebase/Supabase. Module 1 has full lesson text + visuals (including technology landscape lesson); other modules have outlines.

## Git (High-Tech-Learning-Hub)

When ready to publish:

```powershell
cd C:\Users\Laptop9\Documents\GitHub\quantum-workforce-academy
git init
git remote add origin https://github.com/ivanporras01/High-Tech-Learning-Hub.git
git add .
git commit -m "Initial Quantum Workforce Academy MVP"
git push -u origin main
```

## Build

```bash
npm run build
npm run start
```
