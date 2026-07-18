import type { LessonContent } from "@/lib/types/lms";

/** Full lesson body content for Module 7 — Shor, VQE, QAOA, hybrid algorithms */
export const MODULE7_LESSON_CONTENT: Record<string, LessonContent> = {
  "shors-algorithm-overview": {
    sections: [
      {
        heading: "Factoring and Cryptography Impact",
        body: "Shor's algorithm (1994) factors large integers in polynomial time on a fault-tolerant quantum computer, threatening RSA and Diffie-Hellman public-key cryptography. It combines quantum phase estimation with modular arithmetic circuits. Classical factoring is sub-exponential (GNFS); Shor is polynomial in log N — an exponential separation in problem size.",
      },
      {
        heading: "High-Level Circuit Flow",
        body: "Given N to factor: (1) pick random a < N; (2) use QFT-based period finding to find r such that aʳ ≡ 1 mod N; (3) classical post-processing (GCD) extracts factors from r. The quantum heart is order finding via phase estimation on unitary U|y⟩ = |ay mod N⟩. Requires millions of logical qubits with error correction for cryptographically relevant N — far beyond NISQ.",
      },
      {
        heading: "Workforce: PQC Migration, Not Panic",
        body: "NIST standardized post-quantum algorithms (ML-KEM, ML-DSA) for classical deployment. Cybersecurity careers focus on inventory, migration, and hybrid TLS — not building Shor circuits tomorrow. Quantum software scholars still learn Shor to understand threat models and executive questions.",
      },
    ],
    summary:
      "Shor factors integers efficiently on fault-tolerant quantum computers, motivating post-quantum cryptography migration today. It is not runnable at scale on current NISQ devices.",
    careerInsight:
      "CISO briefings want timeline honesty: 'cryptographically relevant Shor' requires fault tolerance likely 2030s+; 'migrate to PQC now' is the actionable item.",
    glossary: [
      { term: "Shor's algorithm", definition: "Quantum algorithm for integer factorization via period finding." },
      { term: "Post-quantum cryptography", definition: "Classical crypto algorithms conjectured secure against quantum attacks." },
      { term: "QFT", definition: "Quantum Fourier Transform — key subroutine in Shor and phase estimation." },
    ],
    references: [
      { title: "NIST PQC Standards", url: "https://csrc.nist.gov/projects/post-quantum-cryptography", author: "NIST" },
    ],
  },

  "variational-principle": {
    sections: [
      {
        heading: "Ground-State Energy Minimization",
        body: "The variational principle states that for any trial state |ψ(θ)⟩, the energy expectation ⟨ψ(θ)|H|ψ(θ)⟩ ≥ E₀ (true ground-state energy). Equality holds when |ψ⟩ is the ground state. Hybrid algorithms parameterize |ψ(θ)⟩ with a circuit ansatz and minimize energy classically — guaranteed to never undershoot E₀ (no unphysical results).",
      },
      {
        heading: "Ansatz Design Tradeoffs",
        body: "Hardware-efficient ansätze use native gates and shallow depth. Chemistry-inspired ansätze (UCCSD) are deeper but physically motivated. More parameters increase expressivity but worsen barren plateaus and noise sensitivity. Application scientists co-design ansätze with hardware teams.",
      },
    ],
    summary:
      "Variational methods minimize ⟨H⟩ over parameterized quantum states, bounded below by the true ground energy — foundation for VQE and QAOA.",
    careerInsight:
      "When VQE stalls, check ansatz depth vs T2 on chosen qubits before blaming 'quantum hype.'",
    glossary: [
      { term: "Variational principle", definition: "⟨ψ|H|ψ⟩ ≥ E₀ for any trial state |ψ⟩." },
      { term: "Barren plateau", definition: "Exponential vanishing of gradients in deep random circuits." },
    ],
    references: [
      { title: "Peruzzo et al. — VQE", url: "https://doi.org/10.1038/ncomms4213", author: "Nature Communications" },
    ],
  },

  "vqe-workflow": {
    sections: [
      {
        heading: "VQE Hybrid Loop",
        body: "Variational Quantum Eigensolver (VQE): (1) Encode problem Hamiltonian H into qubit operators (e.g., molecular electronic structure). (2) Prepare parameterized trial state |ψ(θ)⟩ via ansatz circuit. (3) Measure ⟨H⟩ on quantum device or simulator (often via grouped Pauli measurements). (4) Classical optimizer (COBYLA, SPSA, Adam) updates θ. (5) Repeat until convergence. Output: upper-bound estimate of ground-state energy E₀.",
      },
      {
        heading: "Measurement and Shot Budget",
        body: "Expectation values require many shots for statistical precision. Hamiltonians decompose into Pauli strings — each term measured separately or via grouping. Shot noise limits convergence; error mitigation improves estimates. Cloud cost scales with shots × circuit depth × iterations.",
      },
      {
        heading: "Industry Use Cases",
        body: "Pharma and materials companies pilot VQE for small molecules (H₂, LiH) comparing to classical CCSD baselines. Results are research-grade — scholars document classical comparison, error bars, and qubit mapping choices in portfolio reports.",
      },
    ],
    visuals: [
      {
        type: "circuit-diagram",
        title: "Parameterized ansatz layer",
        afterSection: 0,
        props: { gates: [{ id: "Ry", label: "Ry(θ)" }, { id: "Rz", label: "Rz(φ)" }, { id: "M" }] },
      },
      {
        type: "gate-playground",
        title: "Build intuition for rotation ansätze",
        afterSection: 1,
      },
    ],
    summary:
      "VQE hybridizes parameterized quantum circuits with classical optimization to estimate ground-state energies — the leading NISQ chemistry workflow.",
    careerInsight:
      "Qiskit Nature and PennyLane Chemistry roles expect you to diagram the classical-quantum loop and explain shot budgets to project managers.",
    glossary: [
      { term: "VQE", definition: "Variational Quantum Eigensolver — hybrid ground-state energy algorithm." },
      { term: "Ansatz", definition: "Parameterized quantum circuit preparing trial states |ψ(θ)⟩." },
      { term: "Pauli decomposition", definition: "Expressing H as sum of tensor products of Pauli operators." },
    ],
    references: [
      { title: "Qiskit Nature", url: "https://qiskit-community.github.io/qiskit-nature/", author: "Qiskit" },
    ],
  },

  "qaoa-introduction": {
    sections: [
      {
        heading: "Combinatorial Optimization on Qubits",
        body: "Quantum Approximate Optimization Algorithm (QAOA) targets problems like MaxCut by encoding a cost function into a Hamiltonian H_C. Alternating layers e^(−iγH_C) and e^(−iβH_M) with mixer H_M create a parameterized circuit. Classical optimization over (γ, β) vectors seeks low-cost bitstrings. Depth p (number of layers) trades quality vs noise.",
      },
      {
        heading: "QAOA vs Classical Heuristics",
        body: "QAOA does not guarantee quantum advantage for MaxCut or routing — classical heuristics (simulated annealing, Gurobi) remain strong baselines. Workforce pilots compare approximation ratios at equal time budgets. Honest reporting wins consulting renewals.",
      },
      {
        heading: "QUBO and Logistics Encoding",
        body: "Many logistics problems map to Quadratic Unconstrained Binary Optimization (QUBO): minimize xᵀQx with x ∈ {0,1}ⁿ. QAOA and quantum annealing (D-Wave) both consume QUBO forms. Scholars learn to translate business constraints into Ising/QUBO coefficients.",
      },
    ],
    visuals: [
      {
        type: "circuit-diagram",
        title: "QAOA layer structure (conceptual)",
        afterSection: 0,
        props: { gates: [{ id: "H" }, { id: "Rz", label: "e^{-iγH_C}" }, { id: "Rx", label: "e^{-iβH_M}" }, { id: "M" }] },
      },
    ],
    summary:
      "QAOA is a hybrid algorithm for combinatorial optimization using alternating cost and mixer layers. Advantage over classical heuristics is unproven for most instances — baselines are mandatory.",
    careerInsight:
      "Supply-chain pilots often start with 8–20 variable QUBOs. Document classical Gurobi runtime alongside QAOA shot schedules.",
    glossary: [
      { term: "QAOA", definition: "Quantum Approximate Optimization Algorithm for combinatorial problems." },
      { term: "QUBO", definition: "Quadratic Unconstrained Binary Optimization — standard optimization encoding." },
      { term: "Mixer Hamiltonian", definition: "Driver of transitions between bitstrings in QAOA (often X rotations)." },
    ],
    references: [
      { title: "Farhi et al. — QAOA", url: "https://arxiv.org/abs/1411.4028", author: "arXiv" },
    ],
  },
};
