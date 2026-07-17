/**
 * Quantum computing modality taxonomy — college-level reference for scholars.
 * Emphasis on physical implementation classes, tradeoffs, and workforce relevance.
 */

export type ModalityId =
  | "superconducting"
  | "trapped-ion"
  | "photonic"
  | "neutral-atom"
  | "topological"
  | "semiconductor-spin";

export interface QuantumModality {
  id: ModalityId;
  name: string;
  subtitle: string;
  /** How the qubit is physically encoded */
  physicalBasis: string;
  operatingEnvironment: string;
  leadingOrganizations: string[];
  cloudAccess: string[];
  strengths: string[];
  challenges: string[];
  typicalGateFidelity: string;
  connectivity: string;
  scalingApproach: string;
  workforceRoles: string[];
  color: string;
}

export const QUANTUM_MODALITIES: QuantumModality[] = [
  {
    id: "superconducting",
    name: "Superconducting Qubits",
    subtitle: "Josephson junctions · microwave control",
    physicalBasis:
      "Qubit states encoded in oscillations of superconducting circuits (transmon, flux, etc.) cooled to ~15 mK in dilution refrigerators.",
    operatingEnvironment: "Cryogenic (~10–20 mK)",
    leadingOrganizations: ["IBM", "Google Quantum AI", "Rigetti", "IQM", "OQC"],
    cloudAccess: ["IBM Quantum Platform", "Google (research)", "Amazon Braket (Rigetti, OQC)", "Rigetti QCS"],
    strengths: [
      "Mature fabrication (CMOS-adjacent foundries)",
      "Fast single- and two-qubit gates (ns scale)",
      "Largest deployed cloud fleets today",
    ],
    challenges: [
      "Requires dilution refrigeration infrastructure",
      "Fixed chip topology — routing overhead via SWAPs",
      "Sensitivity to crosstalk and calibration drift",
    ],
    typicalGateFidelity: "99.5–99.9% (2-qubit, device-dependent)",
    connectivity: "Nearest-neighbor on 2D lattice; varies by processor",
    scalingApproach: "Modular chiplets, multiplexed control lines, error correction lattices",
    workforceRoles: ["Cryogenic engineer", "Microwave control engineer", "Qiskit/Cirq developer", "Calibration scientist"],
    color: "#38bdf8",
  },
  {
    id: "trapped-ion",
    name: "Trapped-Ion Qubits",
    subtitle: "Laser-driven · ion trap",
    physicalBasis:
      "Individual ions (e.g., Yb⁺, Ca⁺) held in electromagnetic traps; hyperfine or optical states store |0⟩ and |1⟩. Gates via precisely timed laser pulses.",
    operatingEnvironment: "Ultra-high vacuum, room-temperature vacuum chamber",
    leadingOrganizations: ["IonQ", "Quantinuum (Honeywell + CQC)", "Alpine Quantum Technologies"],
    cloudAccess: ["Amazon Braket (IonQ)", "Microsoft Azure Quantum (IonQ, Quantinuum)", "IonQ Cloud"],
    strengths: [
      "All-to-all connectivity (ions in shared trap)",
      "High gate fidelities and long coherence times",
      "Identical qubits (no fabrication variability per site)",
    ],
    challenges: [
      "Slower gates than superconducting (µs–ms)",
      "Complex laser and vacuum systems",
      "Scaling requires ion shuttling or photonic links",
    ],
    typicalGateFidelity: "99.9%+ (benchmarked on small systems)",
    connectivity: "All-to-all within trap; modular architectures emerging",
    scalingApproach: "Ion transport between zones, quantum charge-coupled device (QCCD) architectures",
    workforceRoles: ["Optics/laser engineer", "Vacuum systems technician", "Applications scientist", "Cloud integration engineer"],
    color: "#a78bfa",
  },
  {
    id: "photonic",
    name: "Photonic Quantum Computing",
    subtitle: "Squeezed light · linear optics",
    physicalBasis:
      "Information in photonic modes — Fock states, squeezed vacuum, or dual-rail encoding. Gates via beam splitters, phase shifters, and measurement-induced nonlinearity.",
    operatingEnvironment: "Room temperature (optical bench or integrated photonics)",
    leadingOrganizations: ["Xanadu", "PsiQuantum", "Quandela", "ORCA Computing"],
    cloudAccess: ["Xanadu Cloud (Borealis)", "Amazon Braket (Xanadu)", "Research partnerships"],
    strengths: [
      "No cryogenics for core operation",
      "Natural fit for quantum networking and distribution",
      "Gaussian boson sampling demonstrations at scale",
    ],
    challenges: [
      "Probabilistic gates or large resource overhead for fault tolerance",
      "Detector efficiency and loss limit scale",
      "Different programming model (continuous-variable vs discrete)",
    ],
    typicalGateFidelity: "High for linear optics; entangling ops architecture-dependent",
    connectivity: "Reconfigurable optical networks",
    scalingApproach: "Integrated photonic chips, fusion-based architectures, cluster states",
    workforceRoles: ["Optical engineer", "PennyLane / Strawberry Fields developer", "Quantum ML researcher"],
    color: "#f472b6",
  },
  {
    id: "neutral-atom",
    name: "Neutral-Atom Qubits",
    subtitle: "Rydberg arrays · optical tweezers",
    physicalBasis:
      "Individual atoms (e.g., rubidium) trapped in optical tweezers; Rydberg interactions enable fast entangling gates. 2D/3D arrays reconfigurable in software.",
    operatingEnvironment: "Ultra-high vacuum, laser cooling to µK temperatures",
    leadingOrganizations: ["QuEra", "Pasqal", "ColdQuanta (Infleqtion)", "Atom Computing"],
    cloudAccess: ["Amazon Braket (QuEra, Aquila)", "Pasqal cloud", "Research systems"],
    strengths: [
      "Flexible geometric layouts (analog Hamiltonian simulation)",
      "Strong for optimization and simulation problems",
      "Rapid array reconfiguration",
    ],
    challenges: [
      "Rydberg blockade radius limits connectivity patterns",
      "Laser stability and atom loss during runs",
      "Newer commercial ecosystem vs superconducting",
    ],
    typicalGateFidelity: "High for single-qubit; 2-qubit improving rapidly",
    connectivity: "Programmable nearest-neighbor in 2D arrays",
    scalingApproach: "Larger tweezer arrays, fault-tolerant encoding research",
    workforceRoles: ["Atomic physicist", "Optimization applications scientist", "Braket SDK developer"],
    color: "#34d399",
  },
  {
    id: "topological",
    name: "Topological Qubits",
    subtitle: "Majorana modes · error-protected (research)",
    physicalBasis:
      "Proposed qubits built from non-Abelian anyons or Majorana zero modes in engineered nanowires/superconductor heterostructures — intrinsic protection from local noise.",
    operatingEnvironment: "Millikelvin cryogenics; specialized materials",
    leadingOrganizations: ["Microsoft Azure Quantum", "QuTech", "Majorana-focused research labs"],
    cloudAccess: ["Future Azure Quantum integration (roadmap)"],
    strengths: [
      "Potential for hardware-level error protection",
      "Could reduce overhead for fault-tolerant computing",
    ],
    challenges: [
      "Still largely experimental — no commercial logical qubit at scale",
      "Materials science and verification of Majorana signatures ongoing",
    ],
    typicalGateFidelity: "Research stage",
    connectivity: "TBD — architecture under active development",
    scalingApproach: "Braiding operations, topological error correction",
    workforceRoles: ["Condensed matter physicist", "Q# developer", "Quantum error correction theorist"],
    color: "#fbbf24",
  },
  {
    id: "semiconductor-spin",
    name: "Semiconductor / Spin Qubits",
    subtitle: "Electrons in silicon · CMOS-compatible",
    physicalBasis:
      "Electron or nuclear spin in quantum dots or donors in silicon/silicon-germanium; controlled via electrostatic gates and microwave fields.",
    operatingEnvironment: "Cryogenic (often higher than transmon: 100 mK – 1 K)",
    leadingOrganizations: ["Intel", "QuTech (Intel partnership)", "Sandia", "Universities (global research)"],
    cloudAccess: ["Research access; limited commercial cloud today"],
    strengths: [
      "Potential leverage of semiconductor industry fabrication",
      "Long spin coherence in isotopically pure silicon",
    ],
    challenges: [
      "Scaling control lines for millions of dots",
      "Variability across devices; tuning overhead",
    ],
    typicalGateFidelity: "Rapidly improving in research systems",
    connectivity: "Local exchange coupling; 2D arrays in development",
    scalingApproach: "CMOS-style multi-layer control, error correction integration",
    workforceRoles: ["Semiconductor process engineer", "Quantum device researcher", "Firmware engineer"],
    color: "#fb923c",
  },
];

export function getModalityById(id: ModalityId): QuantumModality | undefined {
  return QUANTUM_MODALITIES.find((m) => m.id === id);
}

/** Comparison dimensions for workforce decision-making */
export const TECHNOLOGY_COMPARISON_AXES = [
  { axis: "Operating temperature", key: "operatingEnvironment" as const },
  { axis: "Typical 2-qubit fidelity", key: "typicalGateFidelity" as const },
  { axis: "Connectivity model", key: "connectivity" as const },
  { axis: "Scaling strategy", key: "scalingApproach" as const },
];
