import type { LessonContent } from "@/lib/types/lms";

/** Full lesson body content for Module 5 — Entanglement, Bell states, teleportation, QKD */
export const MODULE5_LESSON_CONTENT: Record<string, LessonContent> = {
  "product-vs-entangled-states": {
    sections: [
      {
        heading: "Separability and Entanglement Defined",
        body: "A pure 2-qubit state |ψ⟩ is separable (product) if |ψ⟩ = |ψ_A⟩ ⊗ |ψ_B⟩ for some single-qubit states. Otherwise it is entangled. Example product: (|0⟩ + |1⟩)/√2 ⊗ |0⟩. Example entangled: (|00⟩ + |11⟩)/√2. You cannot assign independent state vectors to Alice's and Bob's qubits when entangled — only the joint state is defined.",
      },
      {
        heading: "Correlation Without Classical Analog",
        body: "Entangled particles exhibit correlations stronger than any local hidden-variable theory allows (Bell's theorem). If Alice and Bob each hold one qubit of |Φ⁺⟩, measuring both in Z basis yields matching outcomes (00 or 11) even though each individual outcome is random. This is not like two coins prepared in advance with matching faces — the outcomes are undetermined until measurement, yet perfectly correlated.",
      },
      {
        heading: "EPR Paradox at Workforce Level",
        body: "Einstein, Podolsky, and Rosen (1935) argued that if quantum mechanics is complete, measuring one particle instantaneously 'fixes' the other — 'spooky action at a distance.' Modern view: no information travels faster than light because individual outcomes are random; only correlation statistics violate classical intuitions. Entanglement is a resource for protocols (teleportation, QKD, error correction), not a sci-fi communication channel.",
      },
      {
        heading: "Detecting Entanglement",
        body: "For 2 qubits, if Tr(ρ_A²) < 1 for the reduced density matrix of one subsystem, the state is entangled. Schmidt decomposition counts non-zero Schmidt coefficients — one coefficient means product; two equal means maximally entangled. In practice, tomography and entanglement witnesses are used in labs.",
      },
    ],
    visuals: [
      {
        type: "entanglement-concept",
        title: "Entangled vs classical correlation",
        afterSection: 1,
      },
      {
        type: "classical-quantum-comparison",
        title: "Why entanglement is not classical correlation",
        afterSection: 2,
      },
    ],
    summary:
      "Entangled states cannot be factored into individual qubit descriptions. They produce non-classical correlations (EPR/Bell) without sending controllable faster-than-light messages.",
    careerInsight:
      "Sales teams sometimes claim 'quantum networking sends data instantly.' Your correction: entanglement enables correlated randomness and protocol resources; usable bits still require classical communication.",
    glossary: [
      { term: "Entanglement", definition: "Non-separable joint state of composite quantum system." },
      { term: "EPR paradox", definition: "1935 thought experiment questioning completeness of quantum mechanics." },
      { term: "Local realism", definition: "Classical assumption that outcomes depend only on local hidden variables." },
      { term: "Schmidt decomposition", definition: "Expansion of bipartite pure states into sum of product terms." },
    ],
    references: [
      { title: "Bell — On the Einstein Podolsky Rosen Paradox", url: "https://doi.org/10.1103/PhysicsPhysiqueFizika.1.195", author: "Physics Physique Fizika" },
    ],
  },

  "bell-states-and-measurements": {
    sections: [
      {
        heading: "The Four Bell States",
        body: "Maximally entangled 2-qubit bases: |Φ⁺⟩ = (|00⟩ + |11⟩)/√2, |Φ⁻⟩ = (|00⟩ − |11⟩)/√2, |Ψ⁺⟩ = (|01⟩ + |10⟩)/√2, |Ψ⁻⟩ = (|01⟩ − |10⟩)/√2. Each is created from |00⟩ with H and CNOT variants (plus local Pauli corrections). |Φ⁺⟩ circuit: H on q0, CNOT(q0→q1).",
      },
      {
        heading: "Measurement Statistics",
        body: "For |Φ⁺⟩, joint Z measurements yield 00 or 11 each with 50% probability — never 01 or 10. Marginal probabilities for each qubit alone are 50/50. Measuring one qubit instantly determines the other (in the same basis), but the specific outcome is random. In X basis, |Φ⁺⟩ behaves differently — basis choice matters for correlation patterns.",
      },
      {
        heading: "Bell State Uses in Protocols",
        body: "Bell pairs are consumed in quantum teleportation, superdense coding, entanglement swapping, and QKD. Labs benchmark entangling gate fidelity by how closely prepared states match ideal |Φ⁺⟩. Fidelity F = ⟨Φ⁺|ρ|Φ⁺⟩ quantifies hardware quality.",
      },
    ],
    visuals: [
      {
        type: "entanglement-concept",
        title: "|Φ⁺⟩ measurement correlations",
        afterSection: 0,
      },
      {
        type: "probability-chart",
        title: "Single-qubit marginals look random",
        caption: "Each qubit alone: P(0)=P(1)=0.5 — correlation appears only jointly.",
        afterSection: 1,
        props: { prob0: 0.5, prob1: 0.5 },
      },
    ],
    summary:
      "Four Bell states form a maximally entangled basis. |Φ⁺⟩ shows perfect Z-basis correlation with random marginals. Bell pairs are foundational resources for quantum protocols.",
    careerInsight:
      "Interview whiteboard: draw H + CNOT, list outcome probabilities. Follow-up: 'What if you measure q0 in X basis?' Shows depth beyond memorization.",
    glossary: [
      { term: "Bell state", definition: "One of four maximally entangled two-qubit basis states." },
      { term: "|Φ⁺⟩", definition: "(|00⟩ + |11⟩)/√2 — canonical Bell pair." },
      { term: "Entanglement fidelity", definition: "Overlap between prepared state and target Bell state." },
    ],
    references: [
      { title: "Qiskit — Entanglement", url: "https://learning.quantum.ibm.com/", author: "IBM" },
    ],
  },

  "bell-inequality-overview": {
    sections: [
      {
        heading: "Why Bell Inequalities Matter",
        body: "John Bell (1964) proved that any local hidden-variable theory satisfies statistical bounds (Bell inequalities) on correlation measurements. Quantum mechanics predicts — and experiments confirm — violations of these bounds. This rules out 'local realism' as a complete description of nature and validates entanglement as non-classical.",
      },
      {
        heading: "CHSH Setup (Workforce Summary)",
        body: "In the CHSH experiment, Alice and Bob each choose measurement settings (bases) and record ±1 outcomes. Classical local realism limits a combination S of correlations to |S| ≤ 2. Quantum entangled pairs can achieve S up to 2√2 (Tsirelson bound). Modern loophole-free experiments have confirmed violation — entanglement is an empirically verified resource, not abstract math.",
      },
      {
        heading: "Business and Security Implications",
        body: "Device-independent QKD uses Bell violation to certify security without trusting hardware internals. Regulators and defense programs fund Bell-test infrastructure. Scholars explain: Bell violation = certification tool, not faster-than-light signaling.",
      },
    ],
    summary:
      "Bell inequalities distinguish quantum entanglement from any local classical model. CHSH violations are experimentally confirmed and underpin device-independent cryptography research.",
    careerInsight:
      "Quantum-safe networking startups reference Bell tests in RFP responses. Understanding CHSH at overview level helps you read their architecture docs.",
    glossary: [
      { term: "Bell inequality", definition: "Statistical bound satisfied by local hidden-variable theories." },
      { term: "CHSH", definition: "Clauser-Horne-Shimony-Holt — standard Bell test configuration." },
      { term: "Tsirelson bound", definition: "Maximum quantum violation S = 2√2 for CHSH." },
    ],
    references: [
      { title: "NIST — Bell Tests Overview", url: "https://www.nist.gov/quantum-information-science", author: "NIST" },
    ],
  },

  "quantum-teleportation": {
    sections: [
      {
        heading: "What Teleportation Does (and Does Not)",
        body: "Quantum teleportation transfers an unknown qubit state |ψ⟩ from Alice to Bob using a shared Bell pair plus 2 classical bits — without physically sending the qubit particle through space. It does NOT copy |ψ⟩ (no-cloning forbids that). After the protocol, Bob's qubit is |ψ⟩ and Alice's original is destroyed.",
      },
      {
        heading: "Protocol Steps",
        body: "Setup: Alice holds |ψ⟩ (qubit 0) and one half of |Φ⁺⟩ (qubit 1); Bob holds the other half (qubit 2). Step 1: Alice applies CNOT(0→1) then H on qubit 0. Step 2: Alice measures qubits 0 and 1 in Z basis, obtaining 2 classical bits (00, 01, 10, or 11). Step 3: Alice sends those bits to Bob over a classical channel. Step 4: Bob applies corrections X^b Z^a to his qubit based on the bits. Result: Bob's qubit equals original |ψ⟩.",
      },
      {
        heading: "Classical Communication Cost",
        body: "Exactly 2 classical bits per qubit teleported — proven optimal. Entanglement alone is insufficient; classical bits carry the measurement outcomes needed for correction. Total information about |ψ⟩ never exceeds 2 classical bits because one qubit carries at most one qubit's worth of quantum information.",
      },
      {
        heading: "Workforce Applications",
        body: "Teleportation underpins quantum repeaters for long-distance QKD, distributed quantum computing (moving logical states between nodes), and error-correction syndrome extraction. Companies building quantum networks (IonQ, Toshiba QKD, EU Quantum Internet Alliance) implement teleportation variants in research stacks.",
      },
    ],
    visuals: [
      {
        type: "entanglement-concept",
        title: "Bell pair resource for teleportation",
        afterSection: 0,
      },
      {
        type: "circuit-diagram",
        title: "Local operations before measurement",
        afterSection: 1,
        props: { gates: [{ id: "H" }, { id: "Z" }, { id: "M" }] },
      },
    ],
    summary:
      "Quantum teleportation moves |ψ⟩ using entanglement + 2 classical bits. It destroys the source state and respects no-cloning. It enables quantum networking, not sci-fi matter transport.",
    careerInsight:
      "Network engineers ask about latency: classical bits must arrive before Bob can correct. Teleportation is synchronous with classical messaging — plan repeater chains accordingly.",
    glossary: [
      { term: "Quantum teleportation", definition: "Protocol transferring unknown qubit state via Bell pair + 2 classical bits." },
      { term: "Pauli correction", definition: "Bob applies X and/or Z based on Alice's measurement outcomes." },
      { term: "Quantum repeater", definition: "Device extending entanglement across fiber using teleportation/swapping." },
    ],
    references: [
      { title: "Bennett et al. — Teleporting an Unknown Quantum State", url: "https://doi.org/10.1103/PhysRevLett.70.1895", author: "PRL" },
    ],
  },

  "entanglement-in-workforce": {
    sections: [
      {
        heading: "Quantum Key Distribution (QKD)",
        body: "BB84 and entanglement-based QKD use quantum states to detect eavesdropping: any measurement disturbs the system (no-cloning + measurement disturbance). Commercial QKD links (Toshiba, ID Quantique) deploy in finance and government backbones. Workforce role: integrate QKD key material into classical VPN/TLS stacks — quantum physicists build the link; software engineers consume the keys.",
      },
      {
        heading: "Entanglement in Simulation and Optimization",
        body: "Chemistry VQE ansätze use entangling gates to capture electron correlation. QAOA mixes problem Hamiltonian evolution with entangling layers. More entanglement can mean more expressivity — but also more noise on NISQ hardware. Application scientists tune entanglement depth to device capability.",
      },
      {
        heading: "Distributed Quantum Computing",
        body: "Future modular quantum computers may teleport logical qubits between chips. Cloud providers research multi-node execution where entanglement links separate cryostats. Skills: understand teleportation latency, classical control bandwidth, and error rates across links.",
      },
      {
        heading: "Misconceptions to Correct in the Workplace",
        body: "Entanglement ≠ instant messaging. Entanglement ≠ infinite parallel computation. Entanglement is a correlatable resource consumed by protocols with classical coordination. Correcting hype builds credibility with technical and executive audiences.",
      },
    ],
    summary:
      "Entanglement powers QKD, simulation ansätze, and future distributed quantum systems. Workforce value lies in protocol integration and realistic communication — not sci-fi tropes.",
    careerInsight:
      "Post-quantum cryptography (lattice KEM) and QKD solve different problems — many enterprises need PQC migration first. Know when entanglement-based security is deployment-ready vs research-stage.",
    glossary: [
      { term: "QKD", definition: "Quantum Key Distribution — physics-based key exchange with eavesdrop detection." },
      { term: "BB84", definition: "Prepare-and-measure QKD protocol using basis randomization." },
      { term: "Post-quantum cryptography", definition: "Classical algorithms resistant to Shor's algorithm attacks." },
    ],
    references: [
      { title: "ETSI QKD Standards", url: "https://www.etsi.org/technologies/quantum-key-distribution", author: "ETSI" },
      { title: "NIST PQC Project", url: "https://csrc.nist.gov/projects/post-quantum-cryptography", author: "NIST" },
    ],
  },
};
