import type { Lab } from "@/lib/types/lms";

const FULL_LABS: Lab[] = [
  {
    id: "lab-1",
    slug: "hello-quantum-world",
    title: "Lab 1: Hello Quantum World",
    description:
      "Install Qiskit, build your first circuit, run on Aer simulator, and interpret measurement histograms — the baseline skill every quantum developer needs.",
    objectives: [
      "Create a QuantumCircuit with Hadamard and measure gates",
      "Execute 1024 shots on Aer simulator",
      "Interpret counts dictionary and probability estimates",
      "Compare ideal vs finite-shot statistics",
    ],
    difficulty: "intro",
    durationMinutes: 45,
    moduleSlug: "foundations-of-quantum-computing",
    prerequisites: ["Python 3.10+", "pip install qiskit qiskit-aer"],
    tools: ["Qiskit", "Qiskit Aer", "Jupyter or VS Code"],
    starterCode: `# Lab 1: Hello Quantum World
# Install: pip install qiskit qiskit-aer matplotlib

from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

# Create one qubit and one classical bit
qc = QuantumCircuit(1, 1)

# TODO: Apply Hadamard to qubit 0
# qc.h(0)

# TODO: Measure qubit 0 into classical bit 0
# qc.measure(0, 0)

simulator = AerSimulator()
job = simulator.run(qc, shots=1024)
result = job.result()
counts = result.get_counts()
print("Measurement counts:", counts)
`,
    solutionCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
import matplotlib.pyplot as plt

qc = QuantumCircuit(1, 1)
qc.h(0)          # Put |0⟩ into (|0⟩+|1⟩)/√2
qc.measure(0, 0)

simulator = AerSimulator()
result = simulator.run(qc, shots=1024).result()
counts = result.get_counts()

print("Counts:", counts)
# Expect ~50% '0' and ~50% '1' (within statistical fluctuation)

p0 = counts.get('0', 0) / 1024
p1 = counts.get('1', 0) / 1024
print(f"P(0) ≈ {p0:.3f}, P(1) ≈ {p1:.3f}")
`,
    steps: [
      {
        order: 1,
        title: "Environment Setup",
        instruction:
          "Create a virtual environment and install Qiskit: pip install qiskit qiskit-aer matplotlib. Verify with python -c \"import qiskit; print(qiskit.__version__)\".",
        hint: "Use Python 3.10 or 3.11 for best wheel compatibility.",
      },
      {
        order: 2,
        title: "Build the Circuit",
        instruction:
          "Instantiate QuantumCircuit(1, 1). Apply qc.h(0) then qc.measure(0, 0). Draw the circuit with qc.draw('mpl') or qc.draw('text').",
      },
      {
        order: 3,
        title: "Run Simulator",
        instruction:
          "Use AerSimulator().run(qc, shots=1024). Extract counts via result.get_counts(). Record the approximate probabilities.",
      },
      {
        order: 4,
        title: "Analyze Statistics",
        instruction:
          "Compute P(0) and P(1). Repeat with shots=8192 and note reduced variance. Document findings in your lab notebook.",
      },
      {
        order: 5,
        title: "Workforce Reflection",
        instruction:
          "Write 3 sentences explaining why employers care about shot counts and reproducibility when demoing quantum prototypes.",
      },
    ],
  },
  {
    id: "lab-2",
    slug: "superposition-and-bloch",
    title: "Lab 2: Superposition and the Bloch Sphere",
    description:
      "Prepare arbitrary single-qubit states using rotation gates and visualize them with Statevector and the Bloch sphere.",
    objectives: [
      "Apply Rx, Ry, Rz rotations to navigate the Bloch sphere",
      "Extract statevector amplitudes from Aer",
      "Relate angles to measurement probabilities",
    ],
    difficulty: "intro",
    durationMinutes: 60,
    moduleSlug: "qubits-and-quantum-states",
    prerequisites: ["Lab 1 complete", "Basic trigonometry"],
    tools: ["Qiskit", "Qiskit Aer", "NumPy"],
    starterCode: `from math import pi
from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
# TODO: Rotate to point mostly toward |1⟩ on Bloch sphere
# qc.ry(???, 0)

sv = Statevector.from_instruction(qc)
print("Amplitudes:", sv.data)
print("Prob(0):", abs(sv.data[0])**2)
print("Prob(1):", abs(sv.data[1])**2)
`,
    solutionCode: `from math import pi
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

# |0⟩ rotated toward |1⟩ by angle θ on Bloch equator: Ry(θ)|0⟩
theta = pi / 3  # 60 degrees
qc = QuantumCircuit(1)
qc.ry(theta, 0)

sv = Statevector.from_instruction(qc)
alpha, beta = sv.data[0], sv.data[1]
print(f"α={alpha:.4f}, β={beta:.4f}")
print(f"P(0)={abs(alpha)**2:.4f}, P(1)={abs(beta)**2:.4f}")

# Verify on simulator with measurements
from qiskit import QuantumCircuit
qc_m = QuantumCircuit(1, 1)
qc_m.ry(theta, 0)
qc_m.measure(0, 0)
from qiskit_aer import AerSimulator
counts = AerSimulator().run(qc_m, shots=4096).result().get_counts()
print("Counts:", counts)
`,
    steps: [
      {
        order: 1,
        title: "Review Bloch Coordinates",
        instruction:
          "Read Module 3 Bloch lesson. Note that Ry(θ)|0⟩ = cos(θ/2)|0⟩ + sin(θ/2)|1⟩.",
      },
      {
        order: 2,
        title: "Set Rotation Angle",
        instruction:
          "Choose θ = π/3. Build circuit with qc.ry(pi/3, 0). Compute expected P(0) and P(1) analytically.",
      },
      {
        order: 3,
        title: "Statevector Verification",
        instruction:
          "Use Statevector.from_instruction(qc) to print amplitudes. Confirm probabilities match theory.",
      },
      {
        order: 4,
        title: "Measurement Comparison",
        instruction:
          "Add measurement, run 4096 shots, compare histogram to analytical probabilities.",
      },
      {
        order: 5,
        title: "Cross-Check with QWA Simulation",
        instruction:
          "Open the Bloch Sphere simulation page and qualitatively match your rotation direction.",
      },
    ],
  },
  {
    id: "lab-3",
    slug: "bell-state-entanglement",
    title: "Lab 3: Bell State Entanglement",
    description:
      "Create a Bell pair with H and CNOT, analyze correlated measurements, and run on IBM hardware or noisy simulator.",
    objectives: [
      "Prepare |Φ+⟩ = (|00⟩+|11⟩)/√2",
      "Observe correlated measurement outcomes",
      "Compare ideal, noisy, and hardware results",
    ],
    difficulty: "intermediate",
    durationMinutes: 75,
    moduleSlug: "entanglement-and-bell-states",
    prerequisites: ["Labs 1–2", "Two-qubit gates lesson"],
    tools: ["Qiskit", "Qiskit Aer", "Optional: IBM Quantum account"],
    starterCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)
# TODO: Prepare Bell state |Φ+⟩
# qc.h(0)
# qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

sim = AerSimulator()
counts = sim.run(qc, shots=2048).result().get_counts()
print(counts)
# Expect mostly '00' and '11', rarely '01' or '10'
`,
    solutionCode: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error

# Ideal Bell state
qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

ideal = AerSimulator().run(qc, shots=4096).result().get_counts()
print("Ideal:", ideal)

# Noisy simulation
noise_model = NoiseModel()
error = depolarizing_error(0.02, 1)
noise_model.add_all_qubit_quantum_error(error, ['h', 'cx'])
noisy_sim = AerSimulator(noise_model=noise_model)
noisy = noisy_sim.run(qc, shots=4096).result().get_counts()
print("Noisy:", noisy)

# Optional: submit to IBM Quantum hardware via IBMProvider
# Document queue time and fidelity compared to simulation
`,
    steps: [
      {
        order: 1,
        title: "Construct Bell Circuit",
        instruction: "Apply H on q0, CNOT with control q0 and target q1. Measure both qubits.",
      },
      {
        order: 2,
        title: "Verify Ideal Correlations",
        instruction:
          "Run 4096 shots on Aer. Confirm ~50% '00' and ~50% '11' with negligible '01'/'10'.",
      },
      {
        order: 3,
        title: "Add Depolarizing Noise",
        instruction:
          "Build NoiseModel with 2% depolarizing error on h and cx. Observe increased '01'/'10' counts.",
      },
      {
        order: 4,
        title: "Optional Hardware Run",
        instruction:
          "Transpile for chosen backend, submit job, record queue latency and fidelity metrics in lab report.",
        hint: "Use least busy backend with ≥2 qubits and read coupling map first.",
      },
      {
        order: 5,
        title: "Career Deliverable",
        instruction:
          "Produce a one-page PDF comparing ideal vs noisy vs hardware — format suitable for portfolio.",
      },
    ],
  },
];

/** Structured stubs for Labs 4–20 */
const LAB_STUBS: Omit<Lab, "starterCode" | "solutionCode" | "steps">[] = [
  { id: "lab-4", slug: "multi-qubit-oracle", title: "Lab 4: Multi-Qubit Oracle Design", description: "Build phase oracles for small Boolean functions.", objectives: ["Encode oracle as diagonal phases", "Test on Deutsch-Jozsa"], difficulty: "intermediate", durationMinutes: 70, moduleSlug: "quantum-algorithms-deutsch-grover", prerequisites: ["Lab 3"], tools: ["Qiskit"] },
  { id: "lab-5", slug: "grover-2-qubit", title: "Lab 5: Grover Search on 2 Qubits", description: "Implement amplitude amplification for marked state.", objectives: ["Design diffusion operator", "Measure success probability"], difficulty: "intermediate", durationMinutes: 80, moduleSlug: "quantum-algorithms-deutsch-grover", prerequisites: ["Lab 4"], tools: ["Qiskit"] },
  { id: "lab-6", slug: "qft-implementation", title: "Lab 6: Quantum Fourier Transform", description: "Implement QFT circuit and inspect phase patterns.", objectives: ["Build QFT for n=3", "Compare to manual DFT"], difficulty: "intermediate", durationMinutes: 90, moduleSlug: "quantum-algorithms-shor-vqe", prerequisites: ["Module 7 lessons"], tools: ["Qiskit"] },
  { id: "lab-7", slug: "vqe-h2-molecule", title: "Lab 7: VQE for H₂ Molecule", description: "Estimate ground-state energy with Qiskit Nature.", objectives: ["Build ansatz", "Run hybrid optimizer loop"], difficulty: "advanced", durationMinutes: 120, moduleSlug: "quantum-algorithms-shor-vqe", prerequisites: ["Lab 6"], tools: ["Qiskit Nature", "NumPy", "SciPy"] },
  { id: "lab-8", slug: "qaoa-maxcut", title: "Lab 8: QAOA for MaxCut", description: "Solve small graph MaxCut with QAOA layers.", objectives: ["Formulate Ising Hamiltonian", "Optimize β, γ parameters"], difficulty: "advanced", durationMinutes: 100, moduleSlug: "quantum-algorithms-shor-vqe", prerequisites: ["Lab 7 intro"], tools: ["Qiskit", "NetworkX"] },
  { id: "lab-9", slug: "noise-channel-simulation", title: "Lab 9: Noise Channel Simulation", description: "Apply amplitude damping and depolarizing channels.", objectives: ["Simulate Kraus operators", "Track fidelity decay"], difficulty: "intermediate", durationMinutes: 65, moduleSlug: "quantum-error-correction", prerequisites: ["Module 8"], tools: ["Qiskit Aer"] },
  { id: "lab-10", slug: "error-mitigation-zne", title: "Lab 10: Zero-Noise Extrapolation", description: "Mitigate noise via scaled noise extrapolation.", objectives: ["Run scaled circuits", "Fit extrapolation curve"], difficulty: "advanced", durationMinutes: 85, moduleSlug: "quantum-error-correction", prerequisites: ["Lab 9"], tools: ["Qiskit Experiments"] },
  { id: "lab-11", slug: "readout-error-correction", title: "Lab 11: Readout Error Correction", description: "Calibrate and apply readout mitigation matrix.", objectives: ["Build confusion matrix", "Apply correction"], difficulty: "intermediate", durationMinutes: 70, moduleSlug: "quantum-error-correction", prerequisites: ["Lab 10"], tools: ["Qiskit Ignis/Experiments"] },
  { id: "lab-12", slug: "backend-benchmarking", title: "Lab 12: Backend Benchmarking", description: "Compare gate fidelities across cloud backends.", objectives: ["Query calibration data", "Rank backends for circuit"], difficulty: "intermediate", durationMinutes: 60, moduleSlug: "nisq-hardware-calibration", prerequisites: ["Module 9"], tools: ["IBM Quantum Platform"] },
  { id: "lab-13", slug: "transpilation-optimization", title: "Lab 13: Transpilation Optimization", description: "Tune optimization levels and routing methods.", objectives: ["Compare depth vs fidelity", "Document tradeoffs"], difficulty: "intermediate", durationMinutes: 55, moduleSlug: "nisq-hardware-calibration", prerequisites: ["Lab 12"], tools: ["Qiskit"] },
  { id: "lab-14", slug: "qiskit-runtime-estimator", title: "Lab 14: Qiskit Runtime Estimator", description: "Use Estimator primitive for expectation values.", objectives: ["Configure Runtime session", "Batch parameterized circuits"], difficulty: "intermediate", durationMinutes: 75, moduleSlug: "quantum-software-stack", prerequisites: ["Module 10"], tools: ["Qiskit Runtime"] },
  { id: "lab-15", slug: "ci-quantum-pipeline", title: "Lab 15: CI Quantum Pipeline", description: "Automate simulator tests in GitHub Actions.", objectives: ["Write pytest for circuits", "Configure CI workflow"], difficulty: "intermediate", durationMinutes: 65, moduleSlug: "quantum-software-stack", prerequisites: ["Lab 14"], tools: ["GitHub Actions", "pytest"] },
  { id: "lab-16", slug: "portfolio-optimization-qubo", title: "Lab 16: Portfolio QUBO Encoding", description: "Map finance constraints to QUBO for QAOA.", objectives: ["Encode returns and risk", "Validate small instance"], difficulty: "advanced", durationMinutes: 90, moduleSlug: "industry-applications", prerequisites: ["Lab 8"], tools: ["Qiskit", "NumPy"] },
  { id: "lab-17", slug: "quantum-kernel-classifier", title: "Lab 17: Quantum Kernel Classifier", description: "Build QSVM-style kernel matrix on simulator.", objectives: ["Compute quantum kernel", "Train classical SVM"], difficulty: "advanced", durationMinutes: 95, moduleSlug: "industry-applications", prerequisites: ["Module 11 ML lesson"], tools: ["Qiskit Machine Learning"] },
  { id: "lab-18", slug: "supply-chain-qaoa", title: "Lab 18: Supply Chain QAOA Pilot", description: "Model small logistics problem as Ising model.", objectives: ["Define cost Hamiltonian", "Report business KPI"], difficulty: "advanced", durationMinutes: 100, moduleSlug: "industry-applications", prerequisites: ["Lab 8"], tools: ["Qiskit", "PennyLane optional"] },
  { id: "lab-19", slug: "capstone-project-execution", title: "Lab 19: Capstone Project Execution", description: "Execute end-to-end capstone with documentation.", objectives: ["Deliver working prototype", "Publish results report"], difficulty: "advanced", durationMinutes: 180, moduleSlug: "career-capstone", prerequisites: ["Modules 1–11"], tools: ["Qiskit", "Cloud backend"] },
  { id: "lab-20", slug: "capstone-peer-review", title: "Lab 20: Capstone Peer Review", description: "Review peer capstones using structured rubric.", objectives: ["Apply review rubric", "Provide actionable feedback"], difficulty: "intermediate", durationMinutes: 45, moduleSlug: "career-capstone", prerequisites: ["Lab 19"], tools: ["QWA Platform"] },
];

export const LABS: Lab[] = [
  ...FULL_LABS,
  ...LAB_STUBS.map((stub) => ({ ...stub, steps: undefined, starterCode: undefined, solutionCode: undefined })),
];

export function getLabBySlug(slug: string): Lab | undefined {
  return LABS.find((l) => l.slug === slug);
}

export function getFeaturedLabs(count = 3): Lab[] {
  return FULL_LABS.slice(0, count);
}
