import type { LessonContent } from "@/lib/types/lms";

/** Full lesson body content for Module 2 — Linear Algebra foundations for multi-qubit states */
export const MODULE2_LESSON_CONTENT: Record<string, LessonContent> = {
  "tensor-products": {
    sections: [
      {
        heading: "Why Multi-Qubit Math Matters",
        body: "A single qubit lives in a 2-dimensional complex Hilbert space ℂ². Two qubits do not live in two copies of ℂ² — they live in the tensor product space ℂ² ⊗ ℂ², which has dimension 4. Three qubits require 2³ = 8 complex amplitudes; n qubits require 2ⁿ. This exponential growth is the source of both quantum power and quantum engineering difficulty. As a workforce scholar, you must explain why adding one qubit doubles the state space — and why you still extract only n classical bits per measurement.",
      },
      {
        heading: "The Tensor Product Construction",
        body: "If |ψ⟩ = α|0⟩ + β|1⟩ and |φ⟩ = γ|0⟩ + δ|1⟩, their tensor product is |ψ⟩ ⊗ |φ⟩ = αγ|00⟩ + αδ|01⟩ + βγ|10⟩ + βδ|11⟩. We often write |00⟩ for |0⟩ ⊗ |0⟩. The four computational basis states |00⟩, |01⟩, |10⟩, |11⟩ span the 2-qubit Hilbert space. Inner products extend by linearity: ⟨ψ₁|φ₁⟩ · ⟨ψ₂|φ₂⟩ = ⟨ψ₁ ⊗ ψ₂|φ₁ ⊗ φ₂⟩. Normalization requires Σ|amplitude|² = 1 over all 2ⁿ basis kets for n qubits.",
      },
      {
        heading: "Product States vs Entangled States",
        body: "A 2-qubit state is a product state (separable) if it can be written |ψ⟩ ⊗ |φ⟩ — each qubit has its own independent description. Example: (|0⟩ + |1⟩)/√2 ⊗ |0⟩. An entangled state cannot be factored this way. The Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 is the canonical example: measuring the first qubit as 0 forces the second to 0; measuring 1 forces 1 — but neither qubit has a definite value before measurement. Entanglement is a property of the joint state vector, not of individual wires.",
      },
      {
        heading: "Operators on Composite Systems",
        body: "Single-qubit gates act on one subsystem via tensor products with identity. Applying X to the first qubit of a 2-qubit register is X ⊗ I; applying Z to the second is I ⊗ Z. The CNOT gate is not a tensor product of single-qubit gates — it is a genuine 2-qubit entangling operation. When you read Qiskit circuits, each gate's placement on specific qubit lines encodes which tensor factor it acts on.",
      },
      {
        heading: "Workforce Intuition: Dimension vs Information",
        body: "The 2ⁿ-dimensional state vector describes quantum correlations and interference patterns across all basis strings. After one projective measurement in the computational basis, you obtain one n-bit string — not a list of all 2ⁿ amplitudes. Algorithms like Grover manipulate amplitudes globally, then measure once (or a few times) to extract a result. Your job is to communicate this distinction to stakeholders who assume 'n qubits = 2ⁿ parallel CPUs.'",
      },
    ],
    visuals: [
      {
        type: "probability-chart",
        title: "Product state: independent probabilities",
        caption: "If q0 is |+⟩ and q1 is |0⟩, P(00)=0.5, P(10)=0.5 — factorizable.",
        afterSection: 2,
        props: { prob0: 0.5, prob1: 0.5 },
      },
      {
        type: "entanglement-concept",
        title: "Bell state vs classical correlation",
        afterSection: 2,
      },
    ],
    summary:
      "Multi-qubit states live in tensor product Hilbert spaces of dimension 2ⁿ. Product states factor across qubits; entangled states do not. Gates act via tensor products with identity or as native multi-qubit unitaries like CNOT.",
    careerInsight:
      "Interview question: 'How many complex amplitudes describe 4 qubits?' Answer: 2⁴ = 16, with one normalization constraint. Follow up: 'How many classical bits do you read in one shot?' Answer: 4 — always connect dimension to measurement limits.",
    glossary: [
      { term: "Tensor product", definition: "Bilinear operation ⊗ combining vector spaces; |ψ⟩ ⊗ |φ⟩ spans composite systems." },
      { term: "Computational basis", definition: "Tensor products of |0⟩ and |1⟩ kets, e.g. |00⟩, |01⟩, |10⟩, |11⟩ for two qubits." },
      { term: "Separable state", definition: "A state written as a product |ψ⟩ ⊗ |φ⟩ with no entanglement." },
      { term: "Entangled state", definition: "A joint state that cannot be factored into individual qubit states." },
    ],
    references: [
      { title: "Qiskit Textbook — Multiple Qubits", url: "https://learning.quantum.ibm.com/", author: "IBM Quantum" },
      { title: "Preskill — Lecture Notes Ch. 2", url: "https://theory.caltech.edu/~preskill/ph219/", author: "John Preskill" },
    ],
  },
};
