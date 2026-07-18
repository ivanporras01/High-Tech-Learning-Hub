import type { LessonContent } from "@/lib/types/lms";

/** Full lesson body content for Module 8 — Noise, decoherence, NISQ reality */
export const MODULE8_LESSON_CONTENT: Record<string, LessonContent> = {
  "noise-models": {
    sections: [
      {
        heading: "Why Noise Dominates NISQ Computing",
        body: "Real qubits decohere and gates misfire. A circuit executed on hardware is not the ideal unitary U you wrote — it is U followed (or accompanied) by noise channels that map pure states to mixed states. Simulators with noise models predict histograms closer to lab results. Ignoring noise is the top cause of 'works in Aer, fails on IBM' project failures.",
      },
      {
        heading: "Common Noise Channels",
        body: "Depolarizing: with probability p, random Pauli X/Y/Z applied — simple gate error model. Amplitude damping (T1): |1⟩ decays toward |0⟩ — energy relaxation. Phase damping / dephasing (T2): destroys superposition phase without flipping population — often faster than T1 limits allow T2 ≤ 2T1. Readout error: misclassifying |0⟩ as |1⟩ and vice versa — corrected classically via calibration matrices.",
      },
      {
        heading: "T1 and T2 at High Level",
        body: "T1 (energy relaxation time): average time for excited |1⟩ to decay to |0⟩. Limits how long you can store |1⟩. T2 (dephasing time): average time before superposition loses coherent phase. For superconducting qubits, T1 and T2 are typically 50–300 μs; gates take ~50–100 ns — depth budgets are tens to low hundreds of gates. Trapped ions have longer T1/T2 but slower gates. Always check backend calibration before job submission.",
      },
      {
        heading: "Decoherence as Algorithm Killer",
        body: "Long circuits spread entanglement across many qubits; noise accumulates multiplicatively in depth. Variational algorithms tolerate some noise because shallow ansätze re-run many times; fault-tolerant algorithms like Shor need error correction because depth is enormous. Choosing algorithm class for device era is a core workforce skill.",
      },
    ],
    visuals: [
      {
        type: "classical-quantum-comparison",
        title: "Ideal vs noisy execution",
        afterSection: 0,
      },
      {
        type: "probability-chart",
        title: "Readout error skews histograms",
        caption: "Example: intended 50/50 becomes 45/55 after readout misassignment.",
        afterSection: 2,
        props: { prob0: 0.45, prob1: 0.55 },
      },
    ],
    summary:
      "NISQ devices suffer depolarizing, amplitude, and phase noise characterized by T1, T2, and gate error rates. Decoherence limits circuit depth and drives algorithm choice toward shallow hybrid methods.",
    careerInsight:
      "Backend selection dashboards show T1, T2, CNOT error per qubit pair. Top performers queue for the best qubits — automate selection in production pipelines.",
    glossary: [
      { term: "Depolarizing channel", definition: "Random Pauli error with probability p per gate." },
      { term: "Amplitude damping", definition: "T1 process — energy decay from |1⟩ toward |0⟩." },
      { term: "Phase damping", definition: "T2 dephasing — loss of coherence in superposition." },
      { term: "Readout error", definition: "Misidentification of measured qubit state." },
    ],
    references: [
      { title: "Qiskit Aer Noise Models", url: "https://docs.quantum.ibm.com/", author: "IBM" },
    ],
  },
};
