import type { LessonContent } from "@/lib/types/lms";

/** Full lesson body content for Module 1 — imported by course.ts */
export const MODULE1_LESSON_CONTENT: Record<string, LessonContent> = {
  "what-is-quantum-computing": {
    sections: [
      {
        heading: "Why Quantum Computing Matters for Your Career",
        body: "Quantum computing is not science fiction — it is an emerging engineering discipline reshaping cryptography, materials discovery, optimization, finance, and drug design. Governments and Fortune 500 companies are investing billions because certain problems that scale exponentially on classical computers may become tractable on quantum hardware. For workforce scholars, this means new job categories: quantum software engineers, quantum applications specialists, cryogenic technicians, and hybrid classical-quantum algorithm designers.",
      },
      {
        heading: "What Is a Qubit? (Quantum Bit)",
        body: "A qubit is the fundamental unit of quantum information — the quantum analogue of a classical bit. A classical bit is always in one definite state: 0 or 1. A qubit can be prepared in a superposition |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex numbers (amplitudes) and |α|² + |β|² = 1. The ket notation |0⟩ and |1⟩ are basis states: |0⟩ is the north pole of the Bloch sphere, |1⟩ the south pole. Before measurement, the qubit is not '0.5 zero and 0.5 one' in a classical sense — it carries phase information in α and β that enables interference. Only upon measurement do you obtain a classical outcome: 0 with probability |α|² or 1 with probability |β|² (Born rule). Physically, qubits are implemented as superconducting circuits, trapped ions, photons, or other quantum systems — but in software you always work with the abstract state vector and gates.",
      },
      {
        heading: "The Core Idea: Superposition and Measurement",
        body: "Superposition is not parallel trial of both values at once. It is a single state vector in a Hilbert space whose measurement statistics can differ from any classical mixture. Two qubits can be entangled — their joint state cannot be written as separate states for each qubit. Entanglement plus interference is what powers algorithms like Shor and Grover, not 'trying all answers simultaneously.' As a scholar, you must explain superposition correctly to managers and interviewers: quantum computers manipulate amplitudes with reversible gates; measurement is probabilistic and destructive (collapses the state).",
      },
      {
        heading: "From Physics to Programs",
        body: "Quantum computers manipulate amplitudes through unitary gates (reversible operations). Programs are expressed as quantum circuits — sequences of gates applied to qubits, often with classical control and measurement. Frameworks like Qiskit, Cirq, and Braket let you compose circuits in Python and run them on simulators or real processors. Your job as a quantum workforce professional is to translate business problems into circuits or hybrid algorithms that extract quantum advantage where it exists.",
      },
      {
        heading: "What Quantum Computers Are Not",
        body: "Quantum computers will not replace your laptop. They excel at specific tasks: simulating quantum systems, solving certain linear algebra problems, and sampling from complex distributions. They are slow at email, spreadsheets, and most everyday software. Understanding this boundary prevents hype-driven misallocation and helps you communicate value to employers.",
      },
    ],
    visuals: [
      {
        type: "classical-quantum-comparison",
        title: "Bit vs qubit — at a glance",
        afterSection: 1,
      },
      {
        type: "gate-sequence-demo",
        title: "See superposition on the Bloch sphere",
        caption: "Apply H to |0⟩ — the state vector moves to the equator (+X). Probabilities become 50/50.",
        afterSection: 2,
        props: { initialGates: ["H"] },
      },
      {
        type: "circuit-diagram",
        title: "Your first superposition circuit",
        afterSection: 3,
        props: { gates: [{ id: "H" }, { id: "M" }] },
      },
      {
        type: "gate-playground",
        title: "Build your own single-qubit circuit",
        caption: "Experiment with Pauli and rotation gates — every gate is a rotation on the Bloch sphere.",
        afterSection: 3,
      },
    ],
    summary:
      "A qubit is a quantum two-level system written |ψ⟩ = α|0⟩ + β|1⟩. Quantum computing uses superposition, interference, and entanglement — not classical parallelism — to solve specific hard problems. Workforce roles focus on circuits, hybrid workflows, and realistic use cases.",
    careerInsight:
      "Interviewers often ask: 'Explain a qubit to a VP who knows only classical IT.' Practice: 'A qubit is a quantum state with amplitudes α, β; gates rotate that state; measurement yields 0 or 1 with probabilities |α|² and |β|² — useful for chemistry and optimization, not for replacing Excel.'",
    glossary: [
      { term: "Qubit", definition: "Quantum bit — a two-level quantum system |ψ⟩ = α|0⟩ + β|1⟩ with |α|² + |β|² = 1." },
      { term: "Ket |0⟩, |1⟩", definition: "Computational basis states; standard labels for the two measurable outcomes of one qubit." },
      { term: "Amplitude", definition: "Complex number α or β weighting each basis state before measurement." },
      { term: "Superposition", definition: "A qubit state that is a weighted combination of |0⟩ and |1⟩ before measurement." },
      { term: "Born rule", definition: "Measurement probability for outcome k equals the squared magnitude of its amplitude." },
      { term: "Unitary gate", definition: "A reversible quantum operation U with U†U = I that rotates the state vector." },
    ],
    references: [
      { title: "Qiskit Textbook — Introduction", url: "https://learning.quantum.ibm.com/", author: "IBM Quantum" },
      { title: "Quantum Computing for the Very Curious", url: "https://quantum.country/", author: "Andy Matuschak & Michael Nielsen" },
      { title: "NIST Post-Quantum Cryptography Project", url: "https://csrc.nist.gov/projects/post-quantum-cryptography", author: "NIST" },
    ],
  },

  "classical-vs-quantum-information": {
    sections: [
      {
        heading: "Classical Computing in One Paragraph",
        body: "Classical computers process information with bits — switches that are definitively 0 or 1. Logic gates (AND, OR, NOT, XOR) combine bits deterministically. A CPU applies billions of such operations per second on data stored in RAM that can be copied freely. Algorithms are designed for this architecture: sorting, databases, video encoding, AI on GPUs. Error correction is mature (ECC RAM, checksums). This stack solves most of the world's computing needs and will continue to do so.",
      },
      {
        heading: "Quantum Computing in One Paragraph",
        body: "Quantum computers process information with qubits — quantum states |ψ⟩ = α|0⟩ + β|1⟩ evolved by unitary gates and read by measurement. The state lives in a complex vector space; phases matter. Multiple qubits can be entangled. Programs are circuits ending in measurements; results are samples from a probability distribution, so you repeat ('shots') and aggregate. Today's machines are noisy and small (NISQ era). They are accessed via cloud queues, not installed on your desk.",
      },
      {
        heading: "Key Differences: Bit vs Qubit",
        body: "State: classical bit = 0 OR 1; qubit = superposition until measured. Copying: classical bits copy perfectly; unknown qubits cannot be cloned (no-cloning theorem). Reading: reading a classical bit does not change it; measuring a qubit collapses and disturbs the state. Parallelism: classical parallelism = many cores each with definite bits; quantum 'parallelism' = interference over amplitudes, not reading 2ⁿ answers at once. Reversibility: classical gates can be irreversible (AND loses information); quantum gates must be reversible (unitary). Information capacity: n classical bits store n bits of readable information; n qubits describe a unit vector in 2ⁿ complex dimensions — but one measurement yields only n classical bits.",
      },
      {
        heading: "Advantages of Quantum Computing",
        body: "1) Quantum simulation — natively modeling electrons and nuclei for chemistry and materials (Feynman's original motivation). 2) Structured speedups for specific problems — e.g. Shor's algorithm for factoring (threatens RSA), Grover for unstructured search quadratic speedup. 3) Hybrid algorithms — VQE and QAOA for optimization and chemistry on NISQ hardware with classical optimizers. 4) Interference — amplitude amplification cancels wrong paths in algorithms like Grover. 5) Entanglement — enables secure protocols (QKD) and correlated measurements in algorithms. 6) Certified randomness — measurement outcomes provide entropy when device is trusted. 7) Potential exponential advantage for certain linear algebra tasks when fault-tolerant machines exist.",
      },
      {
        heading: "Disadvantages and Limitations",
        body: "1) No universal speedup — most business software (ERP, email, spreadsheets) stays classical. 2) Measurement bottleneck — you only extract one n-bit string per run; extracting all patterns requires many shots and classical post-processing. 3) Noise and decoherence — qubits lose quantum behavior quickly; circuits must be short; error mitigation adds overhead. 4) Hardware cost and expertise — cryogenics, lasers, vacuum, calibration; scarce cloud capacity. 5) Algorithm gap — few proven exponential advantages; many proposals still research-stage. 6) Programming model — probabilistic outputs, statistical analysis, queue latency — harder than deterministic classical APIs. 7) Security transition — Shor threatens current public-key crypto; migration to post-quantum cryptography is a multi-year industry effort, not an instant quantum win.",
      },
      {
        heading: "When to Use Which (Workforce Decision Framework)",
        body: "Use classical computing for: general software, big data ETL, training most ML models, real-time control, anything requiring deterministic single-shot answers at microsecond latency. Consider quantum when: simulating quantum systems (molecules, materials), exploring combinatorial optimization with QAOA/VQE prototypes, cryptography migration planning, or research pilots with clear metrics. Hybrid workflows — classical preprocessing, quantum kernel or VQE loop, classical optimization — are the dominant near-term pattern. Document baseline classical performance before claiming quantum value.",
      },
      {
        heading: "Thermodynamics and Decoherence",
        body: "Quantum states are fragile. Interaction with the environment causes decoherence — loss of quantum behavior. Classical RAM can be refreshed cheaply; qubits require isolation, calibration, and error mitigation. This is why today's machines are NISQ (Noisy Intermediate-Scale Quantum) devices and why your programs must be short and statistically analyzed over many shots.",
      },
    ],
    visuals: [
      {
        type: "classical-quantum-comparison",
        title: "Classical vs quantum — advantages & disadvantages",
        afterSection: 4,
      },
      {
        type: "probability-chart",
        title: "Measurement is probabilistic (Born rule)",
        caption: "After H on |0⟩, P(0) = P(1) = 0.5 — unlike a classical coin stored as 0 or 1 before readout.",
        afterSection: 2,
        props: { prob0: 0.5, prob1: 0.5 },
      },
    ],
    summary:
      "Classical bits are definite, copyable, and deterministic; qubits are superposed, fragile, and measured probabilistically. Quantum advantages are problem-specific (simulation, certain algorithms, hybrid optimization); disadvantages include noise, measurement limits, and no replacement for general classical IT.",
    careerInsight:
      "Stakeholders ask 'Should we quantum?' Your answer framework: problem type → classical baseline → qubit/gate depth estimate → noise tolerance → hybrid vs pure quantum → cost of cloud shots. Never skip the classical baseline.",
    glossary: [
      { term: "Classical bit", definition: "Definitive 0 or 1; copied and read without disturbing the value." },
      { term: "Qubit", definition: "Quantum two-level system |ψ⟩ = α|0⟩ + β|1⟩; measured probabilistically." },
      { term: "Hilbert space", definition: "The complex vector space where quantum states live." },
      { term: "No-cloning theorem", definition: "Unknown quantum states cannot be copied perfectly." },
      { term: "Decoherence", definition: "Loss of quantum coherence due to environmental interaction." },
      { term: "NISQ", definition: "Noisy Intermediate-Scale Quantum — today's hardware era with limited qubits and error rates." },
      { term: "Quantum advantage", definition: "Demonstrated speedup or quality improvement over best known classical method for a problem." },
    ],
    references: [
      { title: "Preskill Lecture Notes — Quantum Information", url: "https://theory.caltech.edu/~preskill/ph219/", author: "John Preskill" },
      { title: "Microsoft Quantum Concepts", url: "https://learn.microsoft.com/en-us/azure/quantum/", author: "Microsoft" },
    ],
  },

  "the-quantum-computing-stack": {
    sections: [
      {
        heading: "Layer 0: Quantum Hardware",
        body: "Superconducting qubits (IBM, Google), trapped ions (IonQ, Quantinuum), photonics (PsiQuantum, Xanadu), and neutral atoms (QuEra) each trade off coherence time, gate fidelity, connectivity, and scalability. Cryogenics, microwave control lines, and laser systems are maintained by hardware engineers and lab technicians — roles adjacent to software careers.",
      },
      {
        heading: "Layer 1: Control Electronics and Pulse Calibration",
        body: "Real devices execute analog pulses, not abstract gates. Calibration teams tune readout, gate fidelities, and crosstalk. OpenPulse (Qiskit) exposes pulse-level control for advanced users. Workforce developers usually stay at gate level but must understand calibration drift when results degrade.",
      },
      {
        heading: "Layer 2: Quantum SDKs and Cloud Access",
        body: "Qiskit, Cirq, PennyLane, and Braket SDK translate Python into circuits, transpile for target hardware, submit jobs to queues, and return histograms. Cloud portals (IBM Quantum Platform, Amazon Braket, Azure Quantum) manage authentication, quotas, and billing — skills directly transferable from classical cloud DevOps.",
      },
      {
        heading: "Layer 3: Algorithms and Applications",
        body: "Application scientists encode chemistry Hamiltonians, portfolio optimization QUBOs, and ML kernels into quantum-friendly forms. Hybrid loops run parameterized circuits on quantum backends and classical optimizers on CPUs — Variational Quantum Eigensolver (VQE) and QAOA are canonical examples you'll implement in later modules.",
      },
      {
        heading: "Layer 4: Workforce Integration",
        body: "Enterprises wrap quantum experiments in CI pipelines, data governance, and ROI reporting. Solution architects connect quantum pilots to existing ERP, HPC, and security workflows. Your stack literacy helps you sit at the intersection of R&D and production teams.",
      },
    ],
    summary:
      "The quantum stack spans hardware, calibration, SDKs, algorithms, and enterprise integration. Most workforce roles focus on layers 2–4 while collaborating with hardware specialists.",
    careerInsight:
      "Job postings often mention 'Qiskit or equivalent' plus cloud experience. Build a portfolio project that runs the same circuit on a simulator and a real backend, documenting queue times and noise impact.",
    glossary: [
      { term: "Transpilation", definition: "Rewriting a circuit into the native gate set and topology of a target device." },
      { term: "Shot", definition: "One execution of a quantum circuit ending in measurement." },
      { term: "VQE", definition: "Variational Quantum Eigensolver — hybrid algorithm for ground-state energy estimation." },
      { term: "QAOA", definition: "Quantum Approximate Optimization Algorithm for combinatorial problems." },
    ],
    references: [
      { title: "IBM Quantum Platform Documentation", url: "https://quantum.cloud.ibm.com/docs/", author: "IBM" },
      { title: "Amazon Braket Developer Guide", url: "https://docs.aws.amazon.com/braket/", author: "AWS" },
    ],
    visuals: [
      {
        type: "technology-landscape",
        title: "Six classes of quantum hardware",
        caption: "Click each modality — superconducting, trapped ion, photonic, neutral atom, topological, spin.",
        afterSection: 0,
        props: { compact: true },
      },
    ],
  },

  "quantum-technology-landscape": {
    sections: [
      {
        heading: "Why Technology Class Matters for Scholars",
        body: "Quantum software is not hardware-agnostic in practice. Transpilation rules, native gate sets, topology, coherence times, and queue availability all depend on the physical platform. A scholar who understands modality classes can explain why the same circuit behaves differently on IBM (superconducting) vs IonQ (trapped ion), select Braket backends intelligently, and interview for roles aligned with a vendor ecosystem.",
      },
      {
        heading: "Superconducting Qubits — The Cloud Workhorse",
        body: "Transmon qubits in dilution refrigerators power IBM's fleet, Google's Sycamore line, and Rigetti processors. Microwave pulses implement gates in nanoseconds. Strengths: fast gates and mature cloud access. Challenges: cryogenic infrastructure, fixed lattice connectivity, calibration drift. Workforce path: Qiskit, microwave engineering, cryogenics.",
      },
      {
        heading: "Trapped Ions — High Fidelity, All-to-All",
        body: "Ions in vacuum traps manipulated by lasers offer excellent gate fidelities and full connectivity within a trap. IonQ and Quantinuum lead commercial deployment via Azure and Braket. Gates are slower than superconducting but often more accurate. Ideal for algorithms needing high-quality entangling gates and moderate depth.",
      },
      {
        heading: "Photonic, Neutral-Atom, and Emerging Platforms",
        body: "Photonic systems (Xanadu, PsiQuantum) use light — room-temperature operation and natural networking, with different algorithmic sweet spots (e.g., GBS, continuous-variable ML). Neutral-atom arrays (QuEra, Pasqal) use optical tweezers and Rydberg interactions — strong for optimization and analog simulation. Topological qubits (Microsoft research) aim for built-in error protection. Semiconductor spin qubits (Intel, QuTech) target CMOS-compatible scaling.",
      },
      {
        heading: "Choosing Hardware for Your Application",
        body: "Chemistry VQE often runs on superconducting or trapped-ion backends depending on qubit count and connectivity needs. Optimization pilots may use neutral-atom analog modes. ML experiments may use PennyLane on photonic simulators. Scholars document: problem size, required connectivity, acceptable error rates, cloud cost, and queue latency — then justify backend choice in portfolio reports.",
      },
    ],
    visuals: [
      {
        type: "technology-landscape",
        title: "Interactive technology landscape",
        afterSection: 0,
      },
      {
        type: "technology-landscape",
        title: "Compare modalities side by side",
        caption: "Review strengths, challenges, cloud access, and workforce roles for each class.",
        afterSection: 3,
      },
    ],
    summary:
      "Quantum computing spans multiple physical platforms — superconducting, trapped ion, photonic, neutral atom, topological, and spin — each with distinct tradeoffs. Scholars must map modalities to vendors, cloud backends, and career paths.",
    careerInsight:
      "Interviewers at IBM ask about transmon basics; IonQ roles may probe laser systems; Braket architects must compare modalities for customer pilots. Master this landscape before specializing in one SDK.",
    glossary: [
      { term: "Transmon qubit", definition: "Superconducting qubit design widely used by IBM and Google with good coherence and manufacturability." },
      { term: "Rydberg blockade", definition: "Neutral-atom interaction mechanism enabling entangling gates in optical arrays." },
      { term: "Native gate set", definition: "Hardware-specific gates a processor executes directly after transpilation." },
      { term: "Modality", definition: "A class of quantum hardware defined by how qubits are physically implemented." },
    ],
    references: [
      { title: "IBM Quantum Learning — Hardware", url: "https://learning.quantum.ibm.com/", author: "IBM" },
      { title: "Amazon Braket — Supported Devices", url: "https://docs.aws.amazon.com/braket/", author: "AWS" },
      { title: "Nature — Quantum computing modalities review", url: "https://www.nature.com/subjects/quantum-computing", author: "Nature Portfolio" },
    ],
  },

  "nisq-era-and-roadmap": {
    sections: [
      {
        heading: "Where We Are: NISQ Devices",
        body: "Current processors offer tens to thousands of physical qubits with error rates far above fault-tolerance thresholds. Algorithms must be shallow (few gate layers), use error mitigation, and repeat experiments for statistics. Google's 2019 quantum supremacy experiment and IBM's Condor (1,121 superconducting qubits) illustrate progress — but logical qubits protected by error correction remain an active research frontier.",
      },
      {
        heading: "Error Mitigation vs Error Correction",
        body: "Mitigation techniques (zero-noise extrapolation, probabilistic error cancellation, readout correction) estimate noiseless expectation values without full fault tolerance. Surface codes and other QEC schemes will eventually enable long circuits by encoding one logical qubit across many physical qubits. Workforce developers should master mitigation now while tracking QEC milestones.",
      },
      {
        heading: "Industry Roadmap Highlights",
        body: "IBM targets utility-scale quantum by improving error rates and modular quantum systems. IonQ and others pursue high-fidelity gates for algorithmic qubits. National programs (U.S. National Quantum Initiative, EU Quantum Flagship, UK NQCC) fund workforce pipelines. Expect hybrid classical-quantum workflows to dominate commercial value through the 2020s.",
      },
      {
        heading: "Implications for Learning Paths",
        body: "Focus on variational algorithms, quantum simulation, and optimization prototypes that tolerate noise. Avoid assuming Shor's algorithm will break RSA on today's hardware — instead understand post-quantum cryptography migration timelines relevant to cybersecurity careers.",
      },
    ],
    summary:
      "We are in the NISQ era: powerful but noisy devices requiring statistical methods and hybrid algorithms. Fault-tolerant quantum computing is progressing but workforce skills should prioritize near-term deployable techniques.",
    careerInsight:
      "Cybersecurity and quantum software roles are converging. NIST post-quantum standards (ML-KEM, ML-DSA) create demand for engineers who understand both classical migration and quantum threat models.",
    glossary: [
      { term: "Fault tolerance", definition: "Ability to run long algorithms despite individual gate errors via quantum error correction." },
      { term: "Logical qubit", definition: "An error-protected qubit encoded across multiple physical qubits." },
      { term: "Error mitigation", definition: "Classical post-processing to reduce noise bias without full QEC." },
    ],
    references: [
      { title: "IBM Quantum Roadmap", url: "https://www.ibm.com/quantum/roadmap", author: "IBM" },
      { title: "NIST PQC Standards", url: "https://csrc.nist.gov/projects/post-quantum-cryptography", author: "NIST" },
    ],
  },

  "workforce-demand-and-roles": {
    sections: [
      {
        heading: "Market Growth Signals",
        body: "Global quantum technology investment exceeds $40 billion across public and private sectors (McKinsey, 2024 estimates). Hiring spans hyperscalers (IBM, Google, Microsoft, Amazon), pure-play hardware (IonQ, Rigetti, Quantinuum), consulting (Accenture, Deloitte), defense contractors, and national labs. Demand outpaces degree pipelines — targeted workforce academies and reskilling programs fill the gap.",
      },
      {
        heading: "Role Families",
        body: "Quantum Software Engineer: builds circuits, transpilation pipelines, and SDK integrations. Quantum Applications Scientist: models chemistry, optimization, or ML use cases. Quantum DevOps / Cloud Engineer: manages job queues, IAM, and cost. Quantum Solutions Architect: translates customer problems into pilots. Adjacent roles include cryogenic engineer, FPGA control engineer, and quantum-safe cryptography consultant.",
      },
      {
        heading: "Skills Employers Screen For",
        body: "Python proficiency, linear algebra, probability, Git, cloud APIs, and communication skills. PhD is not required for many software paths — demonstrated projects on IBM Quantum or Braket matter more. Certifications (IBM Quantum Developer, Microsoft Azure Quantum) validate baseline competency.",
      },
      {
        heading: "Building Your Portfolio",
        body: "Complete labs with documented results comparing simulator vs hardware. Contribute to open source (Qiskit, PennyLane). Write brief case studies: problem, circuit design, metrics, business takeaway. Participate in hackathons (Qiskit Global Summer School, MIT iQuHACK).",
      },
    ],
    summary:
      "Quantum workforce demand is broad and growing. Software-facing roles emphasize Python, cloud quantum access, and hybrid algorithm literacy over pure physics credentials.",
    careerInsight:
      "Salary bands for U.S. quantum software engineers typically range $120K–$200K+ depending on metro and clearance requirements. Remote-friendly roles exist at cloud quantum providers.",
    glossary: [
      { term: "Hybrid algorithm", definition: "Algorithm splitting work between quantum circuits and classical optimizers." },
      { term: "Transpiler", definition: "Tool that maps abstract circuits to hardware-native instructions." },
    ],
    references: [
      { title: "Quantum Economic Development Consortium", url: "https://quedc.org/", author: "QED-C" },
      { title: "IBM Quantum Certification", url: "https://www.ibm.com/training/quantum", author: "IBM" },
    ],
  },

  "module-1-knowledge-check": {
    sections: [
      {
        heading: "Review Questions",
        body: "1. Explain superposition in one sentence without using the word 'both'. 2. Why can't you clone an arbitrary unknown qubit? 3. Name three quantum hardware modality classes and one leading vendor for each. 4. Name three layers of the quantum stack and one workforce role at each. 5. What does NISQ stand for and how does it affect circuit depth? 6. Give one near-term business use case and one overhyped claim to avoid.",
      },
      {
        heading: "Concept Mapping Exercise",
        body: "Draw a diagram linking: qubit → gate → circuit → transpiler → backend → shots → histogram → business metric. Annotate where noise enters and where classical post-processing occurs. This map becomes your mental model for every lab in this academy.",
      },
      {
        heading: "Reflection Prompt",
        body: "Which role family (software, applications, DevOps, architecture, security) aligns with your background? Identify one skill gap and the next module lesson that addresses it. Write a 150-word learning commitment you can share with a mentor or peer.",
      },
      {
        heading: "Next Steps",
        body: "Proceed to Module 2: Linear Algebra for Quantum Computing. Complete Lab 1: Hello Quantum World in Qiskit to apply measurement statistics firsthand. Explore the Bloch Sphere simulation to visualize single-qubit states.",
      },
    ],
    summary:
      "Module 1 established vocabulary, stack literacy, NISQ context, and career framing. Validate understanding with review questions before advancing to mathematical foundations.",
    careerInsight:
      "Hiring managers often ask behavioral questions about learning agility. Describing how you corrected a misunderstood concept (e.g., superposition vs parallelism) demonstrates workforce readiness.",
    glossary: [
      { term: "Histogram", definition: "Counts of measurement outcomes aggregated over many shots." },
      { term: "Shot count", definition: "Number of times a circuit is executed on hardware or simulator." },
    ],
    references: [
      { title: "QWA Module 2 — Linear Algebra for Quantum", url: "/course/linear-algebra-for-quantum", author: "QWA" },
      { title: "Lab 1 — Hello Quantum World", url: "/labs/hello-quantum-world", author: "QWA" },
    ],
  },
};
