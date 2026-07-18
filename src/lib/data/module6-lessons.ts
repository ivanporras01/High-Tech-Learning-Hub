import type { LessonContent } from "@/lib/types/lms";

/** Full lesson body content for Module 6 — Interference, Grover, quantum advantage framing */
export const MODULE6_LESSON_CONTENT: Record<string, LessonContent> = {
  "grover-search-intuition": {
    sections: [
      {
        heading: "Interference: Amplitudes Add, Not Probabilities",
        body: "In quantum mechanics, probability amplitudes are complex numbers that add before squaring. Two paths to the same outcome can constructively interfere (amplitudes align) or destructively interfere (amplitudes cancel). Example: apply H to |0⟩, then H again — amplitudes for |0⟩ are (1/√2)(1/√2) + (1/√2)(−1/√2) = 0; |1⟩ also cancels — you return to |0⟩ with certainty. This is impossible classically. Algorithms exploit interference to amplify correct answers and suppress wrong ones.",
      },
      {
        heading: "Phase Matters",
        body: "Two states with identical probabilities can behave differently in circuits because relative phase changes how amplitudes combine. The Deutsch-Jozsa and Grover algorithms rely on flipping phases of 'bad' states (oracle) then interfering them away. A Z gate on |+⟩ does not change Z-measurement odds but changes how subsequent Hadamards combine paths.",
      },
      {
        heading: "Grover's Algorithm — Geometric Picture",
        body: "Grover searches an unstructured database of N items for one marked item using O(√N) oracle queries — quadratic speedup over classical O(N). Start in uniform superposition |s⟩. Oracle O flips phase of the marked state |ω⟩. Diffusion operator D reflects amplitudes about the average (inversion about average). Repeated O then D rotates the state vector toward |ω⟩ in a 2D subspace spanned by |s⟩ and |ω⟩. After ~π/4 · √N iterations, measuring yields |ω⟩ with high probability.",
      },
      {
        heading: "Why Grover Illustrates Workforce-Relevant Interference",
        body: "Grover is the cleanest teaching example of amplitude amplification — the same interference pattern underlying many algorithms. It is also honest about limits: quadratic, not exponential; needs oracle access; still needs O(√N) measurements for high success. Use Grover to explain interference to managers, then note that business databases rarely expose oracle models.",
      },
    ],
    visuals: [
      {
        type: "gate-sequence-demo",
        title: "H-H interference returns to |0⟩",
        caption: "Destructive interference — amplitudes cancel after double Hadamard.",
        afterSection: 0,
        props: { initialGates: ["H", "H"] },
      },
      {
        type: "gate-sequence-demo",
        title: "H-Z-H: phase affects interference",
        afterSection: 1,
        props: { initialGates: ["H", "Z", "H"] },
      },
      {
        type: "circuit-diagram",
        title: "Grover iteration sketch (single-qubit toy)",
        afterSection: 2,
        props: { gates: [{ id: "H" }, { id: "Z" }, { id: "H" }, { id: "M" }] },
      },
    ],
    summary:
      "Quantum interference adds amplitudes before squaring; phase controls constructive/destructive effects. Grover uses oracle + diffusion to amplify marked states in O(√N) queries.",
    careerInsight:
      "When stakeholders ask for 'Grover on our SQL database,' explain the oracle requirement: you need a quantum subroutine marking solutions, not just a list of rows.",
    glossary: [
      { term: "Interference", definition: "Amplitude combination where phases cause enhancement or cancellation." },
      { term: "Amplitude amplification", definition: "Technique boosting marked state amplitude via oracle + diffusion." },
      { term: "Grover iteration", definition: "One oracle application plus one diffusion operator." },
      { term: "Oracle", definition: "Black-box unitary marking problem solutions with phase flip." },
    ],
    references: [
      { title: "Grover — A Fast Quantum Mechanical Algorithm", url: "https://doi.org/10.1145/237814.237866", author: "STOC 1996" },
      { title: "Qiskit — Grover's Algorithm", url: "https://learning.quantum.ibm.com/", author: "IBM" },
    ],
  },

  "deutsch-jozsa-algorithm": {
    sections: [
      {
        heading: "Constant vs Balanced Functions",
        body: "Given f: {0,1}ⁿ → {0,1} that is promised either constant (same output for all inputs) or balanced (0 on half, 1 on half), a classical algorithm may need up to 2ⁿ⁻¹ + 1 queries in the worst case. Deutsch-Jozsa (DJ) decides with one quantum query (in the ideal oracle model) by exploiting interference.",
      },
      {
        heading: "Circuit Structure",
        body: "Prepare n+1 qubits: apply H to all, apply oracle U_f, apply H to first n qubits, measure. Constant functions yield all-zero measurement on first n qubits; balanced functions never yield all zeros. The H layers create interference that encodes global function properties into a single-shot distinguishable pattern.",
      },
      {
        heading: "Pedagogical vs Practical Value",
        body: "DJ is historically the first algorithm showing quantum query advantage but is not commercially deployed — oracle construction dominates cost. Its workforce value is pedagogical: teach interference, oracle model, and honest speedup framing before Grover and Shor.",
      },
    ],
    visuals: [
      {
        type: "gate-sequence-demo",
        title: "Single-qubit Deutsch algorithm: H-X-H",
        caption: "Phase kickback from oracle creates interference pattern.",
        afterSection: 1,
        props: { initialGates: ["H", "X", "H"] },
      },
    ],
    summary:
      "Deutsch-Jozsa distinguishes constant vs balanced functions in one query via interference. It teaches oracle models more than near-term business value.",
    careerInsight:
      "Use DJ as an interview explanation of 'quantum advantage in query complexity' — then pivot to why Grover/Shor/hybrid algorithms matter more commercially.",
    glossary: [
      { term: "Deutsch-Jozsa", definition: "Algorithm deciding constant vs balanced Boolean functions with one query." },
      { term: "Query complexity", definition: "Number of oracle calls required to solve a problem." },
    ],
    references: [
      { title: "Qiskit — Deutsch-Jozsa", url: "https://learning.quantum.ibm.com/", author: "IBM" },
    ],
  },

  "query-complexity-and-limits": {
    sections: [
      {
        heading: "Quantum Advantage: Honest Framing",
        body: "Quantum advantage (or supremacy) means solving a specific problem faster or better than the best known classical method for that problem — not 'faster at everything.' Types: query complexity (Grover, DJ), sample complexity, communication complexity, and gate complexity (Shor). Each has different assumptions. Workforce scholars never claim blanket speedup.",
      },
      {
        heading: "When Quantum Does Not Help",
        body: "Sorting, matrix multiplication for general dense matrices, training large classical neural nets, and streaming ETL have no proven quantum advantage at scale. Even Grover only gives quadratic improvement — and square root of a large number is still large. Shor threatens RSA but requires fault-tolerant machines not yet available.",
      },
      {
        heading: "Communicating Limits to Stakeholders",
        body: "Template: (1) Problem class, (2) classical baseline runtime/quality, (3) quantum approach and required resources (qubits, depth, shots), (4) proven vs conjectured advantage, (5) timeline (NISQ vs fault-tolerant). Include kill criteria for pilots. This builds trust and mirrors how national labs structure funding reviews.",
      },
      {
        heading: "Speedup Hierarchy Reference",
        body: "Quadratic: Grover unstructured search. Exponential (in ideal models): Shor factoring, Simon's problem. Polynomial/heuristic: VQE, QAOA — advantage unproven for most instances. Simulation: quantum systems may be efficiently simulable only on quantum hardware (Feynman argument) — strongest near-term motivation for chemistry and materials.",
      },
    ],
    summary:
      "Quantum advantage is problem-specific and model-dependent. Scholars document classical baselines, resource estimates, and honest timelines — avoiding universal speedup hype.",
    careerInsight:
      "Consulting engagements fail when pilots lack classical baselines. Your differentiator: rigorous comparison tables in every executive readout.",
    glossary: [
      { term: "Quantum advantage", definition: "Demonstrated superiority over best classical method for a defined task." },
      { term: "Quantum supremacy", definition: "Controversial term for quantum device solving a contrived problem infeasible for classical HPC." },
      { term: "Kill criteria", definition: "Pre-defined conditions to stop an unproductive quantum pilot." },
    ],
    references: [
      { title: "Preskill — Quantum Computing in the NISQ era", url: "https://arxiv.org/abs/1801.00862", author: "John Preskill" },
    ],
  },
};
