import type { Company } from "@/lib/types/lms";

export const COMPANIES: Company[] = [
  {
    id: "ibm",
    slug: "ibm-quantum",
    name: "IBM Quantum",
    tagline: "Enterprise quantum cloud and the Qiskit ecosystem",
    overview:
      "IBM Quantum operates one of the world's largest fleets of cloud-accessible superconducting processors and maintains the open-source Qiskit software stack. Through the IBM Quantum Platform, researchers and enterprises queue circuits on systems ranging from 127-qubit Eagle-class devices to modular Heron processors. IBM's roadmap targets error-corrected logical qubits via lattice surgery on superconducting arrays. Workforce hires span quantum cloud software, compiler/transpiler engineering, cryogenic hardware, and quantum applications consulting through IBM Consulting.",
    headquarters: "Yorktown Heights, New York, USA",
    founded: 1911,
    employees: "280,000+ (IBM overall)",
    focusAreas: ["Superconducting qubits", "Qiskit", "Quantum cloud", "Enterprise consulting"],
    careersUrl: "https://www.ibm.com/quantum/careers",
    logoInitials: "IBM",
  },
  {
    id: "google",
    slug: "google-quantum-ai",
    name: "Google Quantum AI",
    tagline: "Sycamore processors and quantum error correction research",
    overview:
      "Google Quantum AI develops superconducting quantum processors at its Santa Barbara lab, including the Sycamore family used in quantum supremacy experiments and ongoing error-correction demonstrations. The team publishes on surface codes, magic state distillation, and co-design of algorithms with hardware. Cirq is Google's Python framework for NISQ circuits. Career paths include quantum hardware engineering, control electronics, quantum algorithms research, and software tooling for large-scale fabrication facilities.",
    headquarters: "Santa Barbara, California, USA",
    founded: 2012,
    employees: "200+ (Quantum AI division)",
    focusAreas: ["Superconducting qubits", "Cirq", "Quantum error correction", "Quantum supremacy research"],
    careersUrl: "https://quantumai.google/join",
    logoInitials: "G",
  },
  {
    id: "microsoft",
    slug: "microsoft-azure-quantum",
    name: "Microsoft Azure Quantum",
    tagline: "Topological qubits and cloud quantum services",
    overview:
      "Microsoft Azure Quantum integrates multiple hardware partners (IonQ, Quantinuum, Pasqal, and others) into a unified cloud portal with the Q# programming language and Azure Quantum Elements for computational chemistry. Microsoft Research pursues topological qubits (Majorana-based) for inherent error protection, alongside advances in quantum error correction and resource estimation tools. Workforce roles include quantum software engineers for Q# and Azure services, solution architects, and research scientists bridging condensed matter physics with scalable systems.",
    headquarters: "Redmond, Washington, USA",
    founded: 1975,
    employees: "220,000+ (Microsoft overall)",
    focusAreas: ["Azure Quantum cloud", "Q#", "Topological qubits", "Quantum chemistry"],
    careersUrl: "https://careers.microsoft.com/",
    logoInitials: "MS",
  },
  {
    id: "ionq",
    slug: "ionq",
    name: "IonQ",
    tagline: "Trapped-ion quantum computers for cloud and enterprise",
    overview:
      "IonQ builds trapped-ion quantum computers offering high gate fidelities and all-to-all connectivity via ion shuttling. Systems are available through AWS Braket, Microsoft Azure, Google Cloud, and IonQ Cloud. IonQ focuses on algorithmic qubits (#AQ) as a practical performance metric and partners with enterprises in finance, automotive, and pharma. Careers span ion trap physics, laser systems, firmware, cloud engineering, and applications development.",
    headquarters: "College Park, Maryland, USA",
    founded: 2015,
    employees: "400+",
    focusAreas: ["Trapped ions", "Cloud access", "Enterprise partnerships", "High fidelity gates"],
    careersUrl: "https://ionq.com/careers",
    logoInitials: "IQ",
  },
  {
    id: "amazon",
    slug: "amazon-braket",
    name: "Amazon Braket",
    tagline: "Multi-vendor quantum computing on AWS",
    overview:
      "Amazon Braket provides managed access to diverse quantum hardware (IonQ, Rigetti, OQC, QuEra) and high-performance simulators within AWS. The Braket SDK integrates with classical AWS services — S3 for results, CloudWatch for monitoring, and IAM for governance. Amazon Quantum Solutions Lab engages customers on hybrid workflows. Roles include quantum solutions architects, SDK engineers, partner integration teams, and applied scientists supporting customer pilots.",
    headquarters: "Seattle, Washington, USA",
    founded: 2019,
    employees: "1.5M+ (Amazon overall)",
    focusAreas: ["AWS cloud", "Multi-hardware access", "Braket SDK", "Hybrid workflows"],
    careersUrl: "https://www.amazon.jobs/",
    logoInitials: "AWS",
  },
  {
    id: "rigetti",
    slug: "rigetti-computing",
    name: "Rigetti Computing",
    tagline: "Superconducting QPUs and Fab-1 manufacturing",
    overview:
      "Rigetti designs and fabricates superconducting quantum processors at its Fab-1 facility, offering access via Rigetti Quantum Cloud Services and Amazon Braket. The company emphasizes modular chiplet architectures and hybrid quantum-classical computing with its QCS platform. Workforce opportunities include quantum firmware, compiler development, process engineering, and applications support for NISQ algorithms.",
    headquarters: "Berkeley, California, USA",
    founded: 2013,
    employees: "150+",
    focusAreas: ["Superconducting QPUs", "Quantum cloud services", "Hybrid computing", "Chip manufacturing"],
    careersUrl: "https://rigetti.com/careers",
    logoInitials: "RGT",
  },
  {
    id: "quantinuum",
    slug: "quantinuum",
    name: "Quantinuum",
    tagline: "Trapped-ion H-Series and quantum software products",
    overview:
      "Formed from the merger of Honeywell Quantum Solutions and Cambridge Quantum, Quantinuum operates high-fidelity trapped-ion systems (H1, H2) and software products including InQuanto for computational chemistry and Quantum Origin for quantum-enhanced cryptography. The company targets enterprise customers requiring verified randomness and chemistry simulations. Roles combine ion trap hardware, enterprise software, and cybersecurity.",
    headquarters: "Broomfield, Colorado / Cambridge, UK",
    founded: 2021,
    employees: "500+",
    focusAreas: ["Trapped ions", "InQuanto", "Quantum Origin", "Enterprise software"],
    careersUrl: "https://www.quantinuum.com/careers",
    logoInitials: "QTM",
  },
  {
    id: "xanadu",
    slug: "xanadu",
    name: "Xanadu",
    tagline: "Photonic quantum computing and PennyLane",
    overview:
      "Xanadu develops photonic quantum computers using squeezed light and maintains PennyLane, a cross-platform library for quantum machine learning and differentiable programming. Their architecture targets room-temperature operation and network scalability via photonic interconnects. Careers span optical engineering, ML research, open-source developer relations, and cloud infrastructure.",
    headquarters: "Toronto, Ontario, Canada",
    founded: 2016,
    employees: "200+",
    focusAreas: ["Photonics", "PennyLane", "Quantum ML", "Open source"],
    careersUrl: "https://xanadu.ai/careers/",
    logoInitials: "XAN",
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return COMPANIES.find((c) => c.slug === slug);
}
