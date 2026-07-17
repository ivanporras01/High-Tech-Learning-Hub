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
        heading: "The Core Idea: Superposition and Measurement",
        body: "A classical bit is always 0 or 1. A quantum bit (qubit) can exist in a linear combination of both states until measured. We describe a single qubit as |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex amplitudes with |α|² + |β|² = 1. Measurement collapses the state to |0⟩ with probability |α|² or |1⟩ with probability |β|². This probabilistic outcome is not noise — it is fundamental physics described by the Born rule.",
      },
      {
        heading: "From Physics to Programs",
        body: "Quantum computers manipulate amplitudes through unitary gates ( reversible operations ). Programs are expressed as quantum circuits — sequences of gates applied to qubits, often with classical control and measurement. Frameworks like Qiskit, Cirq, and Braket let you compose circuits in Python and run them on simulators or real processors. Your job as a quantum workforce professional is to translate business problems into circuits or hybrid algorithms that extract quantum advantage where it exists.",
      },
      {
        heading: "What Quantum Computers Are Not",
        body: "Quantum computers will not replace your laptop. They excel at specific tasks: simulating quantum systems, solving certain linear algebra problems, and sampling from complex distributions. They are slow at email, spreadsheets, and most everyday software. Understanding this boundary prevents hype-driven misallocation and helps you communicate value to employers.",
      },
    ],
    visuals: [
      {
        type: "gate-sequence-demo",
        title: "See superposition on the Bloch sphere",
        caption: "Apply H to |0⟩ — the state vector moves to the equator (+X). Probabilities become 50/50.",
        afterSection: 1,
        props: { initialGates: ["H"] },
      },
      {
        type: "circuit-diagram",
        title: "Your first superposition circuit",
        afterSection: 2,
        props: { gates: [{ id: "H" }, { id: "M" }] },
      },
      {
        type: "gate-playground",
        title: "Build your own single-qubit circuit",
        caption: "Experiment with Pauli and rotation gates — every gate is a rotation on the Bloch sphere.",
        afterSection: 2,
      },
    ],
    summary:
      "Quantum computing leverages superposition and measurement to process information differently from classical machines. Workforce roles focus on translating real problems into quantum circuits and hybrid workflows while understanding hardware limits.",
    careerInsight:
      "Entry-level quantum roles often start with classical Python, linear algebra, and cloud quantum access (IBM Quantum, AWS Braket). Highlight simulation projects and clear problem framing in interviews — employers value practical hybrid skills over pure theory.",
    glossary: [
      { term: "Qubit", definition: "The basic unit of quantum information, analogous to a classical bit but allowing superposition." },
      { term: "Superposition", definition: "A qubit state that is a weighted combination of basis states |0⟩ and |1⟩ before measurement." },
      { term: "Born rule", definition: "The probability of measuring outcome k equals the squared magnitude of its amplitude." },
      { term: "Unitary gate", definition: "A reversible quantum operation that preserves total probability." },
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
        heading: "Information as Physical State",
        body: "Classical information is encoded in distinguishable physical states — voltage levels, magnetic domains, or punch cards. Copying, reading, and error correction follow well-understood rules. Quantum information is encoded in amplitudes of a Hilbert space. Because amplitudes are continuous and entangled, copying unknown quantum states is impossible (no-cloning theorem), and reading disturbs the state.",
      },
      {
        heading: "Bits vs Qubits — Capacity and Correlation",
        body: "n classical bits store n bits of information. n qubits can represent superpositions across 2ⁿ basis states simultaneously, but you cannot read all 2ⁿ outcomes in one shot — measurement yields one n-bit string per run. Quantum advantage comes from interference (canceling wrong paths) and entanglement (correlations with no classical analog), not from storing exponentially more readable data.",
      },
      {
        heading: "Complex Numbers Are Not Optional",
        body: "Amplitudes are complex numbers. Phase relationships between paths determine whether they amplify or cancel. This is why trigonometry and Euler's formula e^(iθ) appear throughout quantum software. Workforce developers use libraries to handle the math, but intuition about phase is essential when debugging circuits.",
      },
      {
        heading: "Thermodynamics and Decoherence",
        body: "Quantum states are fragile. Interaction with the environment causes decoherence — loss of quantum behavior. Classical RAM can be refreshed cheaply; qubits require isolation, calibration, and error mitigation. This is why today's machines are NISQ (Noisy Intermediate-Scale Quantum) devices and why your programs must be short and statistically analyzed over many shots.",
      },
    ],
    summary:
      "Quantum information differs from classical information in how it is stored, copied, and read. Superposition and entanglement enable new algorithms, but measurement and noise impose strict engineering constraints.",
    careerInsight:
      "Teams hiring quantum software engineers expect you to explain why quantum speedups are problem-specific. Practice a 2-minute 'classical vs quantum' elevator pitch for non-technical stakeholders.",
    glossary: [
      { term: "Hilbert space", definition: "The complex vector space where quantum states live." },
      { term: "No-cloning theorem", definition: "Unknown quantum states cannot be copied perfectly." },
      { term: "Decoherence", definition: "Loss of quantum coherence due to environmental interaction." },
      { term: "NISQ", definition: "Noisy Intermediate-Scale Quantum — today's hardware era with limited qubits and error rates." },
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
