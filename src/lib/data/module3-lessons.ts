import type { LessonContent } from "@/lib/types/lms";

/** Full lesson body content for Module 3 — Qubits and quantum states */
export const MODULE3_LESSON_CONTENT: Record<string, LessonContent> = {
  "single-qubit-states": {
    sections: [
      {
        heading: "The Statevector Formalism",
        body: "Every pure single-qubit state is a unit vector |ψ⟩ = α|0⟩ + β|1⟩ in ℂ², where α, β ∈ ℂ and |α|² + |β|² = 1. The kets |0⟩ = (1, 0)ᵀ and |1⟩ = (0, 1)ᵀ form the computational (Z) basis. Alternative bases — such as |+⟩ = (|0⟩ + |1⟩)/√2 and |−⟩ = (|0⟩ − |1⟩)/√2 — are equally valid; changing basis is a unitary rotation, not a different physical qubit.",
      },
      {
        heading: "Superposition in Mathematical Detail",
        body: "Superposition means the state is a linear combination of basis kets with complex coefficients. Example: |ψ⟩ = (1/√2)|0⟩ + (i/√2)|1⟩ has P(0) = P(1) = 1/2 but differs physically from |ψ′⟩ = (1/√2)|0⟩ + (1/√2)|1⟩ because the relative phase between α and β is different. Phase is invisible in single-qubit Z-basis measurement probabilities but becomes visible when amplitudes interfere — as in the Hadamard basis or multi-qubit algorithms. Superposition is NOT running two classical values in parallel; it is one vector whose components can constructively or destructively combine under gates.",
      },
      {
        heading: "Global Phase vs Relative Phase",
        body: "Multiplying |ψ⟩ by a global phase e^(iθ) changes no observable — all measurement statistics stay the same. Relative phase between |0⟩ and |1⟩ components IS physical: the Z gate adds a π phase to |1⟩; the S gate adds π/2. Relative phase drives interference in algorithms. Scholars should distinguish 'global phase is unobservable' from 'phase between amplitudes matters enormously in circuits.'",
      },
      {
        heading: "Measurement and the Born Rule",
        body: "Projective measurement in the computational basis collapses |ψ⟩ to |0⟩ with probability |α|² or |1⟩ with probability |β|² (Born rule). After measurement, the state is the corresponding basis ket — the original superposition is destroyed (destructive readout). To estimate probabilities accurately, repeat the same circuit preparation many times (shots) and histogram outcomes. One shot gives one bit; thousands of shots approximate the Born-rule probabilities.",
      },
      {
        heading: "The No-Cloning Theorem",
        body: "There is no unitary operation that copies an unknown qubit |ψ⟩ to a blank qubit |0⟩ while leaving |ψ⟩ unchanged. Formally, no U satisfies U|ψ⟩|0⟩ = |ψ⟩|ψ⟩ for all |ψ⟩. Proof sketch: assume such U exists; apply it to orthogonal states |0⟩ and |1⟩; linearity forces |0⟩|0⟩ and |1⟩|1⟩ but also a cross term |0⟩|1⟩ — contradiction. Consequences for workforce: (1) you cannot backup arbitrary quantum states like classical files; (2) eavesdropping on QKD disturbs the state; (3) error correction must use redundancy without naive copying.",
      },
    ],
    visuals: [
      {
        type: "gate-sequence-demo",
        title: "Superposition: H on |0⟩",
        caption: "State moves to equator; equal Z-basis probabilities but definite phase structure.",
        afterSection: 1,
        props: { initialGates: ["H"] },
      },
      {
        type: "probability-chart",
        title: "Born rule probabilities",
        afterSection: 3,
        props: { prob0: 0.5, prob1: 0.5 },
      },
      {
        type: "gate-playground",
        title: "Explore phase with Z and S gates",
        caption: "Z adds π phase to |1⟩; probabilities unchanged, interference paths differ.",
        afterSection: 2,
      },
    ],
    summary:
      "A qubit is |ψ⟩ = α|0⟩ + β|1⟩ with complex amplitudes. Superposition carries phase information; measurement yields 0 or 1 per Born rule and destroys the state. Unknown qubits cannot be cloned.",
    careerInsight:
      "The no-cloning theorem is a favorite interview topic for quantum security roles. Practice explaining why Eve cannot copy a QKD photon without detection — it's physics, not engineering limitation.",
    glossary: [
      { term: "Statevector", definition: "Column vector of amplitudes representing a pure quantum state." },
      { term: "Born rule", definition: "P(outcome k) = |⟨k|ψ⟩|² for projective measurement." },
      { term: "Projective measurement", definition: "Measurement projecting |ψ⟩ onto an eigenstate of an observable." },
      { term: "Destructive readout", definition: "Measurement collapses the state; the pre-measurement superposition is lost." },
      { term: "No-cloning theorem", definition: "No quantum operation perfectly copies an arbitrary unknown state." },
      { term: "Relative phase", definition: "Phase difference between amplitudes of basis states — affects interference." },
    ],
    references: [
      { title: "Quantum Computing for the Very Curious — Superposition", url: "https://quantum.country/qcvc", author: "Matuschak & Nielsen" },
      { title: "Wootters & Zurek — No-Cloning", url: "https://www.nature.com/articles/299802a0", author: "Nature" },
    ],
  },

  "bloch-sphere-visualization": {
    sections: [
      {
        heading: "Geometric Picture of One Qubit",
        body: "Any pure single-qubit state (up to global phase) maps to a point on the Bloch sphere: a unit sphere with |0⟩ at the north pole (+Z), |1⟩ at the south pole (−Z), |+⟩ on +X, and |−⟩ on −X. Coordinates (x, y, z) satisfy x² + y² + z² = 1, computed from expectation values of Pauli operators: x = ⟨X⟩, y = ⟨Y⟩, z = ⟨Z⟩.",
      },
      {
        heading: "Reading Superposition on the Sphere",
        body: "States on the equator (z = 0) are equal superpositions of |0⟩ and |1⟩ with different phases — all have P(0) = P(1) = 0.5 in Z basis but differ in X or Y measurement statistics. |+⟩ sits at +X; applying Z rotates around Z-axis on the sphere (phase gate). Applying H swaps poles and equator — a π rotation mixing X and Z. Every single-qubit unitary gate is a rotation on the Bloch sphere.",
      },
      {
        heading: "What the Bloch Sphere Cannot Show",
        body: "The Bloch sphere represents ONE qubit only. There is no simple 3D picture for two entangled qubits — the joint state lives in 15 real dimensions (4 complex amplitudes minus normalization and global phase). Do not try to visualize entanglement as two Bloch vectors; use correlation tables, density matrices, or circuit diagrams instead.",
      },
      {
        heading: "Workforce Use of Bloch Intuition",
        body: "When debugging circuits, ask: 'Where did this gate move the state on the sphere?' X flips pole-to-pole; H moves pole to equator; Rz rotates around Z. Misaligned pulses in hardware often appear as unintended rotations — calibration teams speak in terms of over/under-rotation on the sphere.",
      },
    ],
    visuals: [
      {
        type: "bloch-sphere",
        title: "Interactive Bloch sphere",
        caption: "Apply H, X, Z, and rotations — watch the state vector move.",
        afterSection: 0,
        props: { initialGates: ["H"] },
      },
      {
        type: "gate-sequence-demo",
        title: "H then Z: same Z probabilities, different phase",
        afterSection: 1,
        props: { initialGates: ["H", "Z"] },
      },
    ],
    summary:
      "The Bloch sphere gives a 3D picture of single-qubit pure states. Equatorial points are superpositions; gates are rotations. Entangled multi-qubit states require richer representations.",
    careerInsight:
      "Hardware calibration roles reference randomized benchmarking and tomography that reconstruct Bloch coordinates. Software scholars who read Bloch plots can communicate with pulse engineers during bring-up.",
    glossary: [
      { term: "Bloch sphere", definition: "Unit sphere representation of single-qubit pure states up to global phase." },
      { term: "Pauli operators", definition: "X, Y, Z — Hermitian matrices whose expectations give Bloch coordinates." },
      { term: "Equator", definition: "Bloch points with z = 0 — equal |0⟩/|1⟩ Z-basis probabilities." },
    ],
    references: [
      { title: "IBM — Bloch Sphere", url: "https://learning.quantum.ibm.com/", author: "IBM Quantum" },
    ],
  },

  "density-matrices": {
    sections: [
      {
        heading: "Pure vs Mixed States",
        body: "A pure state is |ψ⟩ with density matrix ρ = |ψ⟩⟨ψ|. A mixed state is a statistical ensemble — you might prepare |0⟩ with 50% probability and |1⟩ with 50% probability classically, written ρ = 0.5|0⟩⟨0| + 0.5|1⟩⟨1|. This is NOT the same as the superposition (|0⟩ + |1⟩)/√2, even though Z-measurement probabilities match. The off-diagonal terms in ρ encode coherence; mixed states lack them.",
      },
      {
        heading: "Decoherence as Diagonalization",
        body: "Decoherence is the process where environmental interaction destroys off-diagonal elements of ρ, turning quantum superpositions into classical mixtures. Amplitude damping (T1 processes) drives |1⟩ → |0⟩ energy decay. Dephasing (T2 processes) kills phase without necessarily changing energy populations. On hardware, T2 ≤ 2T1 always. NISQ circuits must finish before ρ loses coherence — typically microseconds for superconducting qubits.",
      },
      {
        heading: "Purity as a Coherence Diagnostic",
        body: "Purity Tr(ρ²) equals 1 for pure states and less than 1 for mixed states. For a 2-qubit state, reduced purity of one subsystem Tr(ρ₁²) < 1 signals entanglement with the other. This connects density matrices to entanglement detection in tomography labs.",
      },
      {
        heading: "Workforce Relevance",
        body: "Simulators can model noise channels (depolarizing, amplitude damping) by evolving ρ instead of |ψ⟩. Cloud backends publish T1, T2, and gate error rates — your circuit depth budget is set by these numbers. Error mitigation and error correction exist because ρ drifts from |ψ⟩⟨ψ| during computation.",
      },
    ],
    visuals: [
      {
        type: "classical-quantum-comparison",
        title: "Coherent superposition vs classical mixture",
        afterSection: 0,
      },
    ],
    summary:
      "Density matrices ρ represent pure and mixed states. Decoherence removes off-diagonal coherence, turning superpositions into mixtures. T1 and T2 characterize how fast this happens on hardware.",
    careerInsight:
      "When a pilot's VQE results degrade on hardware vs simulator, first hypothesis is decoherence and gate error — not 'quantum doesn't work.' Document T1/T2 of chosen qubits in your report.",
    glossary: [
      { term: "Density matrix", definition: "Positive semidefinite ρ with Tr(ρ) = 1 describing pure or mixed states." },
      { term: "Decoherence", definition: "Loss of quantum coherence from environment coupling." },
      { term: "T1", definition: "Energy relaxation time — population decay from |1⟩ to |0⟩." },
      { term: "T2", definition: "Dephasing time — loss of phase information in superposition." },
      { term: "Purity", definition: "Tr(ρ²); equals 1 for pure states, lower for mixed." },
    ],
    references: [
      { title: "Qiskit — Noise Models", url: "https://docs.quantum.ibm.com/", author: "IBM" },
    ],
  },
};
