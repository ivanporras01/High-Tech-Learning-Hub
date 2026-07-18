/** Core quantum concepts — hub index linking to full lessons */

export type ConceptLessonLink = {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
};

export type QuantumConcept = {
  id: string;
  title: string;
  symbol?: string;
  summary: string;
  /** Plain-language explanation for scholars new to quantum */
  explanation: string;
  keyPoints: string[];
  misconceptions?: string[];
  primaryLesson: ConceptLessonLink;
  relatedLessons?: ConceptLessonLink[];
  simulationHref?: string;
};

export const QUANTUM_CONCEPTS: QuantumConcept[] = [
  {
    id: "superposition",
    title: "Superposition",
    symbol: "|ψ⟩",
    summary: "A qubit exists as a single state vector α|0⟩ + β|1⟩ before measurement — not as 'both values at once' classically.",
    explanation:
      "Superposition is the ability of a quantum system to be described by a weighted combination of basis states. For one qubit, |ψ⟩ = α|0⟩ + β|1⟩ where α and β are complex amplitudes and |α|² + |β|² = 1. The qubit is one state in Hilbert space — not two classical bits running in parallel. The relative phase between α and β matters for interference when gates are applied. Only when you measure do you obtain a classical 0 or 1, with probabilities given by the Born rule.",
    keyPoints: [
      "One qubit = one state vector, not two classical threads",
      "Amplitudes α, β carry phase — essential for algorithms",
      "Measurement destroys superposition (destructive readout)",
      "H gate creates equal superposition from |0⟩",
    ],
    misconceptions: [
      "False: n qubits = 2ⁿ classical computers running simultaneously",
      "False: superposition means the qubit is 'half 0 and half 1' like a classical probability mix",
    ],
    primaryLesson: {
      moduleSlug: "foundations-of-quantum-computing",
      lessonSlug: "what-is-quantum-computing",
      title: "What Is Quantum Computing?",
    },
    relatedLessons: [
      { moduleSlug: "qubits-and-quantum-states", lessonSlug: "single-qubit-states", title: "Single-Qubit States" },
      { moduleSlug: "qubits-and-quantum-states", lessonSlug: "bloch-sphere-visualization", title: "Bloch Sphere" },
    ],
    simulationHref: "/simulations/bloch-sphere",
  },
  {
    id: "measurement",
    title: "Measurement & Born Rule",
    symbol: "⟨Z⟩",
    summary: "Measuring collapses |ψ⟩ to |0⟩ or |1⟩ with probability |α|² or |β|² — the state cannot be recovered afterward.",
    explanation:
      "Projective measurement in the computational (Z) basis takes |ψ⟩ = α|0⟩ + β|1⟩ and yields outcome 0 with probability |α|² or outcome 1 with probability |β|². This is the Born rule. After measurement, the qubit is in that basis state — the original superposition is gone. To estimate probabilities, you prepare many identical circuits (shots) and build a histogram. One measurement gives one classical bit of information.",
    keyPoints: [
      "P(0) = |α|², P(1) = |β|² (Born rule)",
      "Measurement is probabilistic and irreversible",
      "Use many shots to estimate probabilities",
      "Different measurement bases (X, Y, Z) reveal different information",
    ],
    primaryLesson: {
      moduleSlug: "foundations-of-quantum-computing",
      lessonSlug: "what-is-quantum-computing",
      title: "What Is Quantum Computing?",
    },
    relatedLessons: [
      { moduleSlug: "qubits-and-quantum-states", lessonSlug: "single-qubit-states", title: "Single-Qubit States" },
    ],
    simulationHref: "/simulations/bloch-sphere",
  },
  {
    id: "entanglement",
    title: "Entanglement",
    symbol: "|Φ⁺⟩",
    summary: "Two or more qubits share a joint state that cannot be written as separate states — correlations stronger than any classical model.",
    explanation:
      "An entangled state like |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 cannot be factored into individual qubit states. Measuring one qubit instantly determines the other — but individual outcomes remain random, so no faster-than-light signaling occurs. Entanglement is a resource for teleportation, QKD, error correction, and many algorithms. Detect entanglement via reduced density matrix purity or Bell inequality violations.",
    keyPoints: [
      "Joint state is non-separable: cannot write |ψ⟩ = |a⟩⊗|b⟩",
      "Bell states are maximally entangled two-qubit bases",
      "Correlations ≠ classical hidden variables (Bell tests)",
      "Not usable for instant messaging — classical bits still required",
    ],
    misconceptions: [
      "False: entanglement sends information faster than light",
      "False: entanglement is just 'strong correlation' like matching gloves",
    ],
    primaryLesson: {
      moduleSlug: "entanglement-and-bell-states",
      lessonSlug: "product-vs-entangled-states",
      title: "Product vs Entangled States",
    },
    relatedLessons: [
      { moduleSlug: "linear-algebra-for-quantum", lessonSlug: "tensor-products", title: "Tensor Products" },
      { moduleSlug: "entanglement-and-bell-states", lessonSlug: "bell-states-and-measurements", title: "Bell States" },
    ],
  },
  {
    id: "teleportation",
    title: "Quantum Teleportation",
    symbol: "⊗→",
    summary: "Transfer an unknown qubit state using one Bell pair plus two classical bits — the original is destroyed (no cloning).",
    explanation:
      "Alice shares a Bell pair with Bob. She entangles her unknown qubit with her half of the pair, measures both qubits, and sends Bob two classical bits. Bob applies one of four Pauli corrections based on those bits and recovers the original state. The qubit state travels without sending matter — but classical communication is required, and Alice's qubit is destroyed. Teleportation consumes entanglement and respects the no-cloning theorem.",
    keyPoints: [
      "Requires 1 ebit (Bell pair) + 2 classical bits",
      "Original qubit is destroyed at Alice's site",
      "Bob's correction: I, X, Z, or XZ depending on classical message",
      "Foundation for quantum networks and distributed QC",
    ],
    primaryLesson: {
      moduleSlug: "entanglement-and-bell-states",
      lessonSlug: "quantum-teleportation",
      title: "Quantum Teleportation",
    },
    relatedLessons: [
      { moduleSlug: "entanglement-and-bell-states", lessonSlug: "bell-states-and-measurements", title: "Bell States" },
    ],
  },
  {
    id: "interference",
    title: "Interference",
    symbol: "∿",
    summary: "Amplitudes add as complex numbers — wrong paths cancel and correct paths reinforce, powering Grover and Mach–Zehnder optics.",
    explanation:
      "Quantum algorithms exploit interference: amplitudes for wrong answers are designed to cancel while amplitudes for correct answers add constructively. In photonics, a Mach–Zehnder interferometer splits a beam, applies a phase on one arm, and recombines — output intensity varies as cos²(φ/2). Grover's algorithm rotates the state vector in a 2D subspace so the marked item's amplitude grows with each oracle + diffusion step.",
    keyPoints: [
      "Amplitudes are complex — phase determines constructive/destructive sum",
      "Mach–Zehnder: P(out) = cos²(φ/2) for phase φ",
      "Grover uses O(√N) oracle calls via amplitude amplification",
      "Interference ≠ superposition alone — need controlled phase",
    ],
    primaryLesson: {
      moduleSlug: "quantum-algorithms-deutsch-grover",
      lessonSlug: "grover-search-intuition",
      title: "Grover Search Intuition",
    },
    relatedLessons: [
      { moduleSlug: "quantum-algorithms-deutsch-grover", lessonSlug: "deutsch-jozsa-algorithm", title: "Deutsch–Jozsa" },
    ],
    simulationHref: "/simulations/optical-circuits",
  },
  {
    id: "gates",
    title: "Quantum Gates",
    symbol: "H, X, CNOT",
    summary: "Reversible unitary operations rotate qubit states — H, Pauli (X/Y/Z), rotations, and CNOT build any circuit.",
    explanation:
      "Quantum gates are unitary matrices: they preserve total probability and are reversible. The Hadamard H creates superposition. Pauli X is the quantum NOT (bit flip). Pauli Z flips phase. Rotation gates Rx, Ry, Rz parametrize arbitrary single-qubit rotations on the Bloch sphere. CNOT entangles: flips target if control is |1⟩. Universal quantum computation requires a small gate set — typically {H, S, T, CNOT} or similar.",
    keyPoints: [
      "All gates are unitary (reversible, preserve norm)",
      "H: |0⟩ → (|0⟩+|1⟩)/√2",
      "CNOT creates entanglement from superposition",
      "Circuits = sequences of gates, read left to right",
    ],
    primaryLesson: {
      moduleSlug: "quantum-gates-and-circuits",
      lessonSlug: "pauli-and-hadamard-gates",
      title: "Pauli and Hadamard Gates",
    },
    relatedLessons: [
      { moduleSlug: "quantum-gates-and-circuits", lessonSlug: "phase-and-rotation-gates", title: "Rotation Gates" },
      { moduleSlug: "quantum-gates-and-circuits", lessonSlug: "two-qubit-gates", title: "Two-Qubit Gates (CNOT)" },
    ],
    simulationHref: "/simulations/bloch-sphere",
  },
  {
    id: "no-cloning",
    title: "No-Cloning Theorem",
    symbol: "⊘",
    summary: "Unknown quantum states cannot be copied perfectly — foundational for QKD security and why teleportation replaces copying.",
    explanation:
      "There is no unitary operation that takes |ψ⟩|0⟩ to |ψ⟩|ψ⟩ for an arbitrary unknown |ψ⟩. Copying classical bits is trivial; copying qubits would violate linearity of quantum mechanics. The no-cloning theorem underpins quantum key distribution security (an eavesdropper cannot copy photons without detection) and explains why error correction and teleportation use fundamentally different strategies than classical redundancy.",
    keyPoints: [
      "Only known or orthogonal states can be copied reliably",
      "Eavesdropping on QKD disturbs the state — detectable",
      "Teleportation transfers state without cloning",
      "Classical copy/paste has no quantum analogue",
    ],
    primaryLesson: {
      moduleSlug: "foundations-of-quantum-computing",
      lessonSlug: "classical-vs-quantum-information",
      title: "Classical vs Quantum Information",
    },
    relatedLessons: [
      { moduleSlug: "qubits-and-quantum-states", lessonSlug: "single-qubit-states", title: "Single-Qubit States" },
    ],
  },
  {
    id: "decoherence",
    title: "Decoherence & Noise",
    symbol: "T₁, T₂",
    summary: "Real qubits lose energy (T₁) and phase coherence (T₂) — NISQ devices require shallow circuits and error mitigation.",
    explanation:
      "T₁ (energy relaxation): excited |1⟩ decays toward |0⟩. T₂ (dephasing): superposition loses coherent phase without necessarily flipping the bit. T₂ ≤ 2T₁. Gate errors, readout errors, and crosstalk add further noise. On NISQ hardware, circuits must be short; variational algorithms (VQE, QAOA) tolerate noise better than deep fault-tolerant algorithms like Shor. Error mitigation (ZNE, PEC) and error correction (surface codes) address noise at different levels.",
    keyPoints: [
      "T₁ = energy lifetime; T₂ = coherence time",
      "Superconducting qubits: T₁, T₂ ~ 50–300 μs typical",
      "NISQ = Noisy Intermediate-Scale Quantum (no full error correction)",
      "Depth budgets limit algorithm choice on today's hardware",
    ],
    primaryLesson: {
      moduleSlug: "foundations-of-quantum-computing",
      lessonSlug: "classical-vs-quantum-information",
      title: "Classical vs Quantum (Decoherence)",
    },
    relatedLessons: [
      { moduleSlug: "qubits-and-quantum-states", lessonSlug: "density-matrices", title: "Density Matrices" },
      { moduleSlug: "quantum-error-correction", lessonSlug: "noise-models", title: "Noise Models" },
    ],
  },
  {
    id: "tensor-product",
    title: "Multi-Qubit States",
    symbol: "⊗",
    summary: "Combined systems live in a tensor product space — |ψ⟩ = |a⟩⊗|b⟩ for product states; entangled states cannot be factored.",
    explanation:
      "Two qubits have a 4-dimensional state space spanned by |00⟩, |01⟩, |10⟩, |11⟩. A general two-qubit state needs four complex amplitudes (with normalization). The tensor product ⊗ builds composite states from single-qubit states. Entangled states like (|00⟩+|11⟩)/√2 are not expressible as a simple tensor product of two single-qubit kets. Tensor products scale exponentially: n qubits need 2ⁿ amplitudes to describe — but one measurement still yields only n classical bits.",
    keyPoints: [
      "|ψ⟩ = |a⟩ ⊗ |b⟩ defines product (separable) states",
      "CNOT + H is the standard entanglement recipe",
      "2ⁿ amplitudes describe n qubits — exponential state space",
      "Partial trace removes subsystems in mixed-state analysis",
    ],
    primaryLesson: {
      moduleSlug: "linear-algebra-for-quantum",
      lessonSlug: "tensor-products",
      title: "Tensor Products",
    },
  },
  {
    id: "quantum-advantage",
    title: "Quantum Advantage",
    symbol: "⚡",
    summary: "Provable speedups for specific problems — factoring (Shor), search (Grover), simulation — not universal faster computing.",
    explanation:
      "Quantum advantage means solving a problem faster than any known classical algorithm for that problem class. Shor's algorithm factors integers in polynomial time — threatening RSA. Grover gives quadratic speedup for unstructured search. Quantum simulation of molecules is the most near-term commercial use case. Quantum advantage is problem-specific: most everyday computing tasks see no benefit. Overclaiming 'quantum solves everything' damages workforce credibility.",
    keyPoints: [
      "Shor: polynomial factoring → cryptography impact",
      "Grover: O(√N) vs classical O(N) search",
      "Simulation: Feynman's original motivation — chemistry, materials",
      "No proven advantage for general optimization yet",
    ],
    primaryLesson: {
      moduleSlug: "quantum-algorithms-deutsch-grover",
      lessonSlug: "query-complexity-and-limits",
      title: "Query Complexity and Limits",
    },
    relatedLessons: [
      { moduleSlug: "quantum-algorithms-shor-vqe", lessonSlug: "shors-algorithm-overview", title: "Shor's Algorithm" },
    ],
  },
  {
    id: "qkd",
    title: "QKD & Quantum Cryptography",
    symbol: "🔐",
    summary: "Quantum key distribution uses measurement disturbance to detect eavesdroppers — BB84 and entanglement-based protocols.",
    explanation:
      "In BB84, Alice sends qubits in random bases; Bob measures in random bases; they publicly compare bases (not outcomes) and keep bits where bases matched to form a shared key. An eavesdropper measuring qubits introduces detectable errors. Entanglement-based QKD (E91) uses Bell inequality violations. QKD distributes keys — it does not encrypt bulk data alone. Post-quantum cryptography (classical algorithms resistant to Shor) complements QKD for long-term security.",
    keyPoints: [
      "Security from physics (measurement disturbance), not math alone",
      "BB84: random bases + public sifting → shared key",
      "Eavesdropping increases error rate — detectable",
      "Complement with post-quantum classical crypto for full systems",
    ],
    primaryLesson: {
      moduleSlug: "entanglement-and-bell-states",
      lessonSlug: "entanglement-in-workforce",
      title: "Entanglement in Workforce Projects",
    },
    relatedLessons: [
      { moduleSlug: "entanglement-and-bell-states", lessonSlug: "bell-inequality-overview", title: "Bell Inequality Overview" },
    ],
  },
  {
    id: "hybrid",
    title: "Hybrid Algorithms (VQE, QAOA)",
    symbol: "VQE",
    summary: "Classical optimizer + quantum circuit evaluator — the dominant NISQ workflow for chemistry and optimization.",
    explanation:
      "Variational Quantum Eigensolver (VQE) prepares a parameterized ansatz circuit |ψ(θ)⟩, measures energy ⟨H⟩, and uses a classical optimizer to update θ until convergence — finding ground-state energies for molecules. QAOA applies similar variational structure to combinatorial optimization. Hybrid loops tolerate NISQ noise because circuits stay shallow and re-run many times. This is the primary near-term workflow for quantum developers in industry.",
    keyPoints: [
      "Quantum device evaluates cost function; classical CPU optimizes",
      "Ansatz design is a major research and engineering skill",
      "VQE target: molecular ground states, materials",
      "QAOA target: MaxCut, routing, scheduling approximations",
    ],
    primaryLesson: {
      moduleSlug: "quantum-algorithms-shor-vqe",
      lessonSlug: "vqe-workflow",
      title: "VQE Workflow",
    },
    relatedLessons: [
      { moduleSlug: "quantum-algorithms-shor-vqe", lessonSlug: "qaoa-introduction", title: "QAOA Introduction" },
      { moduleSlug: "quantum-algorithms-shor-vqe", lessonSlug: "variational-principle", title: "Variational Principle" },
    ],
  },
];

export function lessonPath(link: ConceptLessonLink): string {
  return `/course/${link.moduleSlug}/${link.lessonSlug}`;
}

export function getConceptById(id: string): QuantumConcept | undefined {
  return QUANTUM_CONCEPTS.find((c) => c.id === id);
}
