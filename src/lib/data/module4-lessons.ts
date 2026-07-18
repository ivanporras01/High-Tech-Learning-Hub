import type { LessonContent } from "@/lib/types/lms";

/** Full lesson body content for Module 4 — Quantum gates and circuits */
export const MODULE4_LESSON_CONTENT: Record<string, LessonContent> = {
  "pauli-and-hadamard-gates": {
    sections: [
      {
        heading: "Unitary Gates: Reversible Quantum Operations",
        body: "Quantum gates are unitary matrices U satisfying U†U = I — they preserve the norm of state vectors and are reversible in principle. Unlike classical AND gates, quantum gates cannot discard information. Every gate corresponds to a rotation (or reflection) on the Bloch sphere for single-qubit operations. Circuits are sequences of gates applied left-to-right (or time-ordered) on qubits.",
      },
      {
        heading: "Pauli Gates X, Y, Z",
        body: "Pauli-X (bit flip): X|0⟩ = |1⟩, X|1⟩ = |0⟩ — analogous to classical NOT. Pauli-Z (phase flip): Z|0⟩ = |0⟩, Z|1⟩ = −|1⟩ — adds π phase to |1⟩ without changing Z-measurement probabilities. Pauli-Y: Y = iXZ, combining bit and phase flip. All three are Hermitian, unitary, and self-inverse (X² = Y² = Z² = I). On the Bloch sphere, Pauli gates are 180° rotations about X, Y, and Z axes.",
      },
      {
        heading: "The Hadamard Gate H",
        body: "H creates superposition: H|0⟩ = |+⟩ = (|0⟩ + |1⟩)/√2 and H|1⟩ = |−⟩ = (|0⟩ − |1⟩)/√2. Matrix form: H = (1/√2)[[1,1],[1,−1]]. H is its own inverse (H² = I) — applying H twice returns to the original state. H is the workhorse for creating interference: it converts Z-basis states to X-basis superpositions and back. Nearly every quantum algorithm begins with H layers to spread amplitude across basis states.",
      },
      {
        heading: "Common Gate Identities",
        body: "HXH = Z and HZH = X — H conjugates Pauli X and Z into each other. S = √Z (phase π/2), T = √S (phase π/4) — universal for phase arithmetic. Scholars memorize: H, S, T, CNOT form a universal gate set for fault-tolerant computing (with measurements). For NISQ, native hardware gates differ after transpilation.",
      },
    ],
    visuals: [
      {
        type: "gate-playground",
        title: "Pauli and Hadamard on the Bloch sphere",
        afterSection: 1,
      },
      {
        type: "gate-sequence-demo",
        title: "H|0⟩ → superposition",
        afterSection: 2,
        props: { initialGates: ["H"] },
      },
      {
        type: "circuit-diagram",
        title: "Single-qubit gate circuit",
        afterSection: 3,
        props: { gates: [{ id: "H" }, { id: "Z" }, { id: "H" }, { id: "M" }] },
      },
    ],
    summary:
      "Quantum gates are unitary operations. Pauli X flips bits; Z and S/T add phase; H creates superposition and enables interference. All single-qubit unitaries are Bloch-sphere rotations.",
    careerInsight:
      "Transpilers decompose arbitrary rotations into Rz-Rx-Rz sequences on hardware. Knowing H and Pauli semantics helps you read transpiled circuits that look unfamiliar.",
    glossary: [
      { term: "Unitary", definition: "Matrix U with U†U = I; preserves quantum state norm." },
      { term: "Pauli-X", definition: "Bit-flip gate; NOT equivalent on superpositions." },
      { term: "Hadamard gate", definition: "Creates equal superposition; H|0⟩ = |+⟩." },
      { term: "Universal gate set", definition: "Gates sufficient to approximate any unitary to arbitrary precision." },
    ],
    references: [
      { title: "Qiskit Textbook — Single-Qubit Gates", url: "https://learning.quantum.ibm.com/", author: "IBM" },
    ],
  },

  "phase-and-rotation-gates": {
    sections: [
      {
        heading: "Rotation Gates Rx, Ry, Rz",
        body: "Arbitrary single-qubit states are reached by rotating from |0⟩ on the Bloch sphere. Rx(θ), Ry(θ), Rz(θ) rotate by angle θ about the respective axis. Example: Ry(π) takes |0⟩ → |1⟩. Rz only changes phase of |1⟩ relative to |0⟩ — equatorial states rotate around the vertical axis. Universal single-qubit control uses sequences like U = Rz(φ)Rx(θ)Rz(λ) (Z-Y decomposition in Qiskit).",
      },
      {
        heading: "Phase Gates and Arithmetic",
        body: "Global phase is unobservable, but relative phase between |0⟩ and |1⟩ amplitudes controls interference. S gate applies π/2 phase to |1⟩; T applies π/4. In Shor's and phase estimation algorithms, controlled phase rotations accumulate eigenphase information. Phase kickback — where a controlled-U gate transfers phase to a control qubit — is a key circuit pattern.",
      },
      {
        heading: "Parameterization in Variational Circuits",
        body: "Hybrid algorithms (VQE, QAOA) use parameterized rotation gates θ as trainable knobs. A classical optimizer adjusts θ to minimize energy or cost. Each layer of Ry/Rz entanglers forms an ansatz. Gate depth and parameter count trade off expressivity against NISQ noise — shallow ansätze often outperform deep ones on today's hardware.",
      },
    ],
    visuals: [
      {
        type: "gate-playground",
        title: "Rotation gates — sweep angles on the Bloch sphere",
        caption: "Try Rx, Ry, Rz sequences to reach different sphere points.",
        afterSection: 0,
      },
      {
        type: "circuit-diagram",
        title: "Parameterized rotation layer",
        afterSection: 2,
        props: { gates: [{ id: "Ry", label: "Ry(θ)" }, { id: "Rz", label: "Rz(φ)" }, { id: "M" }] },
      },
    ],
    summary:
      "Rotation gates Rx, Ry, Rz navigate the Bloch sphere. Phase gates implement relative phase arithmetic essential for algorithms and variational ansätze.",
    careerInsight:
      "PennyLane and Qiskit Nature jobs often expose rotation angles as hyperparameters. Understanding Rz vs Ry helps you debug barren plateaus and convergence stalls.",
    glossary: [
      { term: "Rotation gate", definition: "Rx, Ry, Rz — parametric unitaries rotating about Bloch axes." },
      { term: "Phase kickback", definition: "Controlled-U transfers eigenphase to control qubit in algorithms." },
      { term: "Ansatz", definition: "Parameterized circuit template in variational algorithms." },
    ],
    references: [
      { title: "Qiskit — Rotation Gates", url: "https://docs.quantum.ibm.com/", author: "IBM" },
    ],
  },

  "two-qubit-gates": {
    sections: [
      {
        heading: "Why Two-Qubit Gates Are Essential",
        body: "Single-qubit gates cannot create entanglement from product states. You need at least one entangling two-qubit gate (like CNOT) plus single-qubit gates for universal quantum computation. Without entanglement, an n-qubit circuit on product inputs stays product — classically simulable efficiently.",
      },
      {
        heading: "CNOT: Controlled-NOT",
        body: "CNOT with control qubit c and target t: flips target if control is |1⟩. In basis states: CNOT|00⟩ = |00⟩, |01⟩ = |01⟩, |10⟩ = |11⟩, |11⟩ = |10⟩. Matrix is 4×4 block with identity on |00⟩, |01⟩ block and X swap on |10⟩, |11⟩ block. The classic Bell circuit: H on control, then CNOT — produces |Φ⁺⟩ = (|00⟩ + |11⟩)/√2.",
      },
      {
        heading: "CZ and Other Entanglers",
        body: "Controlled-Z (CZ) applies Z to target when control is |1⟩. CZ differs from CNOT by single-qubit Hadamard wraps on target. Hardware native gate sets vary: IBM often uses CNOT; Google Sycamore uses CZ; some platforms use iSWAP or ECR. Transpilers rewrite your abstract CNOT into whatever the backend supports.",
      },
      {
        heading: "Connectivity and SWAP Insertion",
        body: "Real devices have limited qubit coupling — not every pair can CNOT directly. If your algorithm needs a CNOT between non-neighbors, the transpiler inserts SWAP gates routing states along a path. SWAP depth increases circuit time and exposes states to more decoherence. Scholars check coupling maps before choosing qubit layouts.",
      },
    ],
    visuals: [
      {
        type: "entanglement-concept",
        title: "Bell state from H + CNOT",
        afterSection: 1,
      },
      {
        type: "circuit-diagram",
        title: "Hadamard then measure (single-qubit reference)",
        caption: "Two-qubit CNOT diagrams appear in Module 5 Bell state lesson.",
        afterSection: 1,
        props: { gates: [{ id: "H" }, { id: "X" }, { id: "M" }] },
      },
    ],
    summary:
      "CNOT and CZ entangle qubits; they are essential for universal computation. Bell states are prepared with H + CNOT. Hardware connectivity constrains which pairs can entangle directly.",
    careerInsight:
      "When jobs fail transpilation with high SWAP count, try remapping logical qubits to physical indices with better connectivity — a common optimization in cloud quantum DevOps.",
    glossary: [
      { term: "CNOT", definition: "Controlled-NOT — flips target qubit when control is |1⟩." },
      { term: "Entangling gate", definition: "Two-qubit gate that can create entanglement from product inputs." },
      { term: "Coupling map", definition: "Hardware graph of which qubit pairs support native two-qubit gates." },
      { term: "SWAP gate", definition: "Exchanges two qubit states; used for routing on limited topology." },
    ],
    references: [
      { title: "Qiskit — Multi-Qubit Gates", url: "https://learning.quantum.ibm.com/", author: "IBM" },
    ],
  },
};
