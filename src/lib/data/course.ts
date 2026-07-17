import type { Course, Lesson, Module } from "@/lib/types/lms";
import { MODULE1_LESSON_CONTENT } from "./module1-lessons";

/** Helper to create lesson stubs for modules 2–12 */
function lesson(
  id: string,
  slug: string,
  title: string,
  description: string,
  objectives: string[],
  durationMinutes: number,
  order: number,
  type: Lesson["type"] = "reading"
): Lesson {
  return { id, slug, title, description, objectives, durationMinutes, order, type };
}

const module1Lessons: Lesson[] = [
  {
    id: "m1-l1",
    slug: "what-is-quantum-computing",
    title: "What Is Quantum Computing?",
    description: "Define quantum computing, superposition, and workforce relevance.",
    objectives: [
      "Explain superposition and measurement in plain language",
      "Describe how quantum programs differ from classical software",
      "Identify realistic vs overhyped quantum use cases",
    ],
    durationMinutes: 25,
    type: "reading",
    order: 1,
    content: MODULE1_LESSON_CONTENT["what-is-quantum-computing"],
  },
  {
    id: "m1-l2",
    slug: "classical-vs-quantum-information",
    title: "Classical vs Quantum Information",
    description: "Compare bits and qubits, no-cloning, and decoherence.",
    objectives: [
      "Contrast classical and quantum information capacity",
      "State the no-cloning theorem and its engineering impact",
      "Explain why NISQ devices require statistical workflows",
    ],
    durationMinutes: 30,
    type: "reading",
    order: 2,
    content: MODULE1_LESSON_CONTENT["classical-vs-quantum-information"],
  },
  {
    id: "m1-l3",
    slug: "the-quantum-computing-stack",
    title: "The Quantum Computing Stack",
    description: "Map hardware, SDKs, algorithms, and enterprise layers.",
    objectives: [
      "Name five layers of the quantum stack",
      "Relate SDK/cloud skills to workforce roles",
      "Understand transpilation and calibration at a high level",
    ],
    durationMinutes: 28,
    type: "reading",
    order: 3,
    content: MODULE1_LESSON_CONTENT["the-quantum-computing-stack"],
  },
  {
    id: "m1-l3b",
    slug: "quantum-technology-landscape",
    title: "Classes of Quantum Computing Technology",
    description: "Compare superconducting, trapped-ion, photonic, neutral-atom, topological, and spin platforms.",
    objectives: [
      "Name six major quantum hardware modality classes",
      "Explain tradeoffs in temperature, fidelity, connectivity, and scaling",
      "Match cloud backends and employers to physical platforms",
      "Choose appropriate hardware for a given application scenario",
    ],
    durationMinutes: 35,
    type: "interactive",
    order: 4,
    content: MODULE1_LESSON_CONTENT["quantum-technology-landscape"],
  },
  {
    id: "m1-l4",
    slug: "nisq-era-and-roadmap",
    title: "NISQ Era and Industry Roadmap",
    description: "Navigate noise, error mitigation, and fault-tolerance timelines.",
    objectives: [
      "Define NISQ and its constraints on algorithms",
      "Differentiate error mitigation from error correction",
      "Connect roadmap milestones to learning priorities",
    ],
    durationMinutes: 22,
    type: "reading",
    order: 5,
    content: MODULE1_LESSON_CONTENT["nisq-era-and-roadmap"],
  },
  {
    id: "m1-l5",
    slug: "workforce-demand-and-roles",
    title: "Workforce Demand and Roles",
    description: "Explore hiring trends, role families, and portfolio strategies.",
    objectives: [
      "Identify major quantum employers and role types",
      "List skills commonly screened in interviews",
      "Plan a portfolio project aligned to target roles",
    ],
    durationMinutes: 20,
    type: "reading",
    order: 6,
    content: MODULE1_LESSON_CONTENT["workforce-demand-and-roles"],
  },
  {
    id: "m1-l6",
    slug: "module-1-knowledge-check",
    title: "Module 1 Knowledge Check",
    description: "Review, reflect, and prepare for Module 2.",
    objectives: [
      "Answer conceptual review questions",
      "Map the end-to-end quantum workflow",
      "Commit to a personalized learning path",
    ],
    durationMinutes: 15,
    type: "quiz",
    order: 7,
    content: MODULE1_LESSON_CONTENT["module-1-knowledge-check"],
  },
];

const modules: Module[] = [
  {
    id: "mod-1",
    slug: "foundations-of-quantum-computing",
    title: "Foundations of Quantum Computing",
    description: "Core concepts, technology classes, stack literacy, NISQ context, and career orientation.",
    order: 1,
    lessons: module1Lessons,
  },
  {
    id: "mod-2",
    slug: "linear-algebra-for-quantum",
    title: "Linear Algebra for Quantum Computing",
    description: "Vectors, matrices, eigenvalues, and Hilbert space intuition for developers.",
    order: 2,
    lessons: [
      lesson("m2-l1", "vectors-and-inner-products", "Vectors and Inner Products", "Complex vectors and ⟨ψ|φ⟩.", ["Compute inner products", "Normalize states"], 30, 1),
      lesson("m2-l2", "matrices-and-operators", "Matrices and Operators", "Linear operators as quantum gates.", ["Apply matrices to state vectors", "Identify unitary matrices"], 35, 2),
      lesson("m2-l3", "eigenvalues-and-eigenvectors", "Eigenvalues and Eigenvectors", "Measurement outcomes as eigenvalues.", ["Find eigenvalues of Pauli matrices", "Connect observables to measurement"], 40, 3),
      lesson("m2-l4", "tensor-products", "Tensor Products", "Multi-qubit state spaces.", ["Build |00⟩, |01⟩ basis", "Understand exponential dimension"], 35, 4),
      lesson("m2-l5", "linear-algebra-lab-prep", "Linear Algebra Lab Prep", "NumPy patterns for quantum states.", ["Use NumPy for statevectors", "Prepare for Lab 2"], 25, 5, "lab-ref"),
    ],
  },
  {
    id: "mod-3",
    slug: "qubits-and-quantum-states",
    title: "Qubits and Quantum States",
    description: "Bloch sphere, density matrices, and pure vs mixed states.",
    order: 3,
    lessons: [
      lesson("m3-l1", "single-qubit-states", "Single-Qubit States", "Statevector representation.", ["Write |ψ⟩ in computational basis", "Compute measurement probabilities"], 30, 1),
      lesson("m3-l2", "bloch-sphere-visualization", "Bloch Sphere Visualization", "Geometric picture of qubits.", ["Map states to Bloch coordinates", "Use QWA Bloch simulation"], 25, 2, "interactive"),
      lesson("m3-l3", "density-matrices", "Density Matrices", "Mixed states and decoherence.", ["Construct density matrix ρ", "Compute purity Tr(ρ²)"], 35, 3),
      lesson("m3-l4", "partial-trace-and-purity", "Partial Trace and Purity", "Subsystem analysis.", ["Perform partial trace", "Detect entanglement via purity"], 30, 4),
      lesson("m3-l5", "state-tomography-intro", "State Tomography Introduction", "Reconstructing ρ from measurements.", ["Outline tomography protocol", "Connect to calibration careers"], 28, 5),
    ],
  },
  {
    id: "mod-4",
    slug: "quantum-gates-and-circuits",
    title: "Quantum Gates and Circuits",
    description: "Pauli, Hadamard, CNOT, and circuit composition in Qiskit.",
    order: 4,
    lessons: [
      lesson("m4-l1", "pauli-and-hadamard-gates", "Pauli and Hadamard Gates", "X, Y, Z, H on the Bloch sphere.", ["Apply H|0⟩", "Predict measurement statistics"], 30, 1),
      lesson("m4-l2", "phase-and-rotation-gates", "Phase and Rotation Gates", "Rz, Rx, Ry parameterization.", ["Compose rotation sequences", "Relate angles to Bloch motion"], 32, 2),
      lesson("m4-l3", "two-qubit-gates", "Two-Qubit Gates", "CNOT, CZ, and entangling gates.", ["Build Bell state circuit", "Read coupling maps"], 35, 3),
      lesson("m4-l4", "circuit-diagrams-and-universality", "Circuit Diagrams and Universality", "Gate sets and decomposition.", ["Draw circuits in Qiskit", "Explain universality"], 28, 4),
      lesson("m4-l5", "transpilation-basics", "Transpilation Basics", "Mapping to hardware native gates.", ["Run transpiler on sample circuit", "Interpret optimization levels"], 30, 5),
      lesson("m4-l6", "circuit-design-workshop", "Circuit Design Workshop", "Design a swap test circuit.", ["Implement swap test", "Document shot histograms"], 40, 6, "lab-ref"),
    ],
  },
  {
    id: "mod-5",
    slug: "entanglement-and-bell-states",
    title: "Entanglement and Bell States",
    description: "EPR pairs, Bell inequalities, and teleportation protocol.",
    order: 5,
    lessons: [
      lesson("m5-l1", "product-vs-entangled-states", "Product vs Entangled States", "Separability criteria.", ["Identify entangled statevectors", "Use Schmidt decomposition intro"], 30, 1),
      lesson("m5-l2", "bell-states-and-measurements", "Bell States and Measurements", "Four maximally entangled bases.", ["Prepare |Φ+⟩", "Analyze correlated outcomes"], 32, 2),
      lesson("m5-l3", "bell-inequality-overview", "Bell Inequality Overview", "Local realism vs quantum mechanics.", ["Explain CHSH setup", "Interpret violation significance"], 35, 3),
      lesson("m5-l4", "quantum-teleportation", "Quantum Teleportation", "Protocol steps and classical bits.", ["Trace qubit state transfer", "Count classical communication cost"], 38, 4),
      lesson("m5-l5", "entanglement-in-workforce", "Entanglement in Workforce Projects", "Networking, cryptography, and simulation.", ["Name industry use of entanglement", "Avoid sci-fi misconceptions"], 22, 5),
    ],
  },
  {
    id: "mod-6",
    slug: "quantum-algorithms-deutsch-grover",
    title: "Quantum Algorithms I — Deutsch & Grover",
    description: "Oracle models, Deutsch-Jozsa, and Grover search.",
    order: 6,
    lessons: [
      lesson("m6-l1", "oracle-model", "The Oracle Model", "Black-box functions in circuits.", ["Encode oracles as unitaries", "Compare query complexity"], 28, 1),
      lesson("m6-l2", "deutsch-jozsa-algorithm", "Deutsch-Jozsa Algorithm", "Constant vs balanced detection.", ["Implement DJ circuit", "Analyze single-shot advantage context"], 35, 2),
      lesson("m6-l3", "grover-search-intuition", "Grover Search Intuition", "Amplitude amplification geometry.", ["Explain inversion about average", "Estimate iteration count"], 32, 3),
      lesson("m6-l4", "grover-implementation", "Grover Implementation", "Build Grover in Qiskit.", ["Code 2-qubit Grover", "Compare to classical search"], 40, 4, "lab-ref"),
      lesson("m6-l5", "query-complexity-and-limits", "Query Complexity and Limits", "When oracles don't help business.", ["Assess problem fit", "Communicate limits to stakeholders"], 25, 5),
    ],
  },
  {
    id: "mod-7",
    slug: "quantum-algorithms-shor-vqe",
    title: "Quantum Algorithms II — Shor & VQE",
    description: "Factoring overview, phase estimation, and variational methods.",
    order: 7,
    lessons: [
      lesson("m7-l1", "shors-algorithm-overview", "Shor's Algorithm Overview", "Factoring and cryptography impact.", ["Outline QFT + period finding", "Connect to PQC migration"], 35, 1),
      lesson("m7-l2", "quantum-phase-estimation", "Quantum Phase Estimation", "Eigenphase extraction.", ["Build QPE circuit sketch", "Relate to chemistry applications"], 38, 2),
      lesson("m7-l3", "variational-principle", "The Variational Principle", "Ground-state energy bounds.", ["Explain Rayleigh-Ritz quantum", "Choose ansätze"], 30, 3),
      lesson("m7-l4", "vqe-workflow", "VQE Workflow", "Hybrid loops in practice.", ["Diagram classical optimizer loop", "Interpret convergence plots"], 35, 4),
      lesson("m7-l5", "qaoa-introduction", "QAOA Introduction", "Optimization on NISQ hardware.", ["Define cost Hamiltonian", "Compare QAOA vs classical heuristics"], 32, 5),
    ],
  },
  {
    id: "mod-8",
    slug: "quantum-error-correction",
    title: "Quantum Error Correction",
    description: "Noise models, stabilizers, surface codes, and mitigation.",
    order: 8,
    lessons: [
      lesson("m8-l1", "noise-models", "Noise Models", "Depolarizing, amplitude damping.", ["Apply noise channels in simulation", "Read backend calibration data"], 30, 1),
      lesson("m8-l2", "stabilizer-formalism", "Stabilizer Formalism", "Pauli group and syndromes.", ["Identify stabilizer codes", "Connect to surface code intuition"], 35, 2),
      lesson("m8-l3", "surface-code-overview", "Surface Code Overview", "Logical qubits and thresholds.", ["Explain code distance", "Track industry QEC milestones"], 32, 3),
      lesson("m8-l4", "error-mitigation-techniques", "Error Mitigation Techniques", "ZNE, M3, readout correction.", ["Run mitigation in Qiskit", "Report improved expectation values"], 38, 4, "lab-ref"),
      lesson("m8-l5", "reliability-engineering", "Reliability Engineering for Quantum Jobs", "SLAs, shot budgets, and QA.", ["Design validation harness", "Document reproducibility"], 28, 5),
    ],
  },
  {
    id: "mod-9",
    slug: "nisq-hardware-calibration",
    title: "NISQ Hardware, Modalities & Calibration",
    description: "Cross-platform hardware literacy, device topology, calibration, and modality-specific cloud workflows.",
    order: 9,
    lessons: [
      lesson("m9-l1", "device-topologies", "Device Topologies", "Coupling maps and routing.", ["Read IBM backend properties", "Insert SWAP for connectivity"], 30, 1),
      lesson("m9-l2", "calibration-data", "Calibration Data", "T1, T2, gate error rates.", ["Interpret backend reports", "Choose optimal qubits"], 32, 2),
      lesson("m9-l3", "randomized-benchmarking", "Randomized Benchmarking", "Gate fidelity metrics.", ["Explain RB decay curves", "Compare vendors fairly"], 28, 3),
      lesson("m9-l4", "pulse-level-control", "Pulse-Level Control", "OpenPulse introduction.", ["Identify when pulses matter", "Collaborate with hardware teams"], 35, 4),
      lesson("m9-l5", "hardware-career-paths", "Hardware Career Paths", "Lab roles adjacent to software.", ["Map cryo/FPGA career paths", "Plan cross-training"], 22, 5),
    ],
  },
  {
    id: "mod-10",
    slug: "quantum-software-stack",
    title: "Quantum Software Stack — Qiskit",
    description: "Qiskit patterns, Aer, Runtime, and CI integration.",
    order: 10,
    lessons: [
      lesson("m10-l1", "qiskit-ecosystem", "Qiskit Ecosystem Overview", "Terra, Aer, Ignis, Nature, Runtime.", ["Navigate Qiskit packages", "Pick tools per task"], 28, 1),
      lesson("m10-l2", "simulators-vs-hardware", "Simulators vs Hardware", "Statevector, shot, noise sim.", ["Benchmark same circuit both ways", "Estimate cost and queue time"], 30, 2),
      lesson("m10-l3", "qiskit-runtime", "Qiskit Runtime", "Sessions, primitives, optimization.", ["Use Estimator primitive", "Reduce latency in hybrid loops"], 35, 3),
      lesson("m10-l4", "testing-quantum-code", "Testing Quantum Code", "Unit tests and snapshots.", ["Write deterministic simulator tests", "Integrate into GitHub Actions"], 32, 4),
      lesson("m10-l5", "packaging-and-deployment", "Packaging and Deployment", "Deliver quantum microservices.", ["Structure Python packages", "Secure API keys"], 30, 5),
      lesson("m10-l6", "capstone-lab-prep", "Capstone Lab Prep", "Plan final project circuit.", ["Define success metrics", "Select backend target"], 25, 6, "lab-ref"),
    ],
  },
  {
    id: "mod-11",
    slug: "industry-applications",
    title: "Industry Applications",
    description: "Chemistry, optimization, finance, ML, and logistics case studies.",
    order: 11,
    lessons: [
      lesson("m11-l1", "quantum-chemistry", "Quantum Chemistry on Quantum Computers", "Molecular Hamiltonians and VQE.", ["Encode H₂ molecule", "Interpret energy curves"], 35, 1),
      lesson("m11-l2", "optimization-and-logistics", "Optimization and Logistics", "QUBO, QAOA, and supply chain.", ["Formulate small QUBO", "Compare classical baseline"], 32, 2),
      lesson("m11-l3", "quantum-machine-learning", "Quantum Machine Learning", "Feature maps and kernels.", ["Build parameterized classifier", "Assess NISQ feasibility"], 38, 3),
      lesson("m11-l4", "finance-and-risk", "Finance and Risk", "Portfolio optimization prototypes.", ["Discuss Amplitude Estimation use", "Address regulatory constraints"], 30, 4),
      lesson("m11-l5", "building-business-cases", "Building Business Cases", "ROI, pilots, and kill criteria.", ["Write one-page executive summary", "Define measurable pilot KPIs"], 28, 5),
    ],
  },
  {
    id: "mod-12",
    slug: "career-capstone",
    title: "Career Capstone",
    description: "Portfolio project, interview prep, and certification roadmap.",
    order: 12,
    lessons: [
      lesson("m12-l1", "capstone-project-design", "Capstone Project Design", "Select problem and metrics.", ["Draft project charter", "Align with target employer"], 35, 1),
      lesson("m12-l2", "portfolio-and-resume", "Portfolio and Resume", "Showcase quantum work effectively.", ["Publish README with results", "Quantify impact metrics"], 30, 2),
      lesson("m12-l3", "interview-preparation", "Interview Preparation", "Technical and behavioral prep.", ["Whiteboard Bell state prep", "Explain noise mitigation choice"], 32, 3),
      lesson("m12-l4", "certification-and-next-steps", "Certification and Next Steps", "IBM, Microsoft, and continuous learning.", ["Pick certification path", "Join professional communities"], 25, 4),
    ],
  },
];

export const QUANTUM_WORKFORCE_COURSE: Course = {
  id: "course-qwd",
  slug: "quantum-computing-workforce-development",
  title: "Quantum Computing for Workforce Development",
  subtitle: "College & university curriculum — from qubit theory to industry-ready skills",
  description:
    "An undergraduate- and graduate-level workforce program covering quantum foundations, linear algebra, algorithms, error mitigation, Qiskit software engineering, and career capstone planning. Built for community colleges, universities, and continuing-education scholars pursuing quantum software, applications, and cloud roles.",
  level: "beginner",
  audience: "college-university",
  prerequisites: [
    "College algebra or equivalent mathematics",
    "Introductory programming (Python recommended)",
    "Basic probability and vectors (linear algebra module included)",
  ],
  totalHours: 85,
  modules,
  tags: ["College & University", "Hardware Modalities", "Qiskit", "Workforce", "NISQ", "Capstone"],
};

/** Data access helpers — swap implementation for Firebase/Supabase later */
export function getCourse(): Course {
  return QUANTUM_WORKFORCE_COURSE;
}

export function getModuleBySlug(moduleSlug: string): Module | undefined {
  return QUANTUM_WORKFORCE_COURSE.modules.find((m) => m.slug === moduleSlug);
}

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = getModuleBySlug(moduleSlug);
  const les = mod?.lessons.find((l) => l.slug === lessonSlug);
  return mod && les ? { module: mod, lesson: les } : undefined;
}

export function getTotalLessonCount(): number {
  return QUANTUM_WORKFORCE_COURSE.modules.reduce((n, m) => n + m.lessons.length, 0);
}

export function getAllLessons(): { module: Module; lesson: Lesson }[] {
  return QUANTUM_WORKFORCE_COURSE.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ module, lesson }))
  );
}
