import type { LessonContent } from "@/lib/types/lms";

/** Full lesson body content for Module 9 — NISQ hardware and calibration */
export const MODULE9_LESSON_CONTENT: Record<string, LessonContent> = {
  "calibration-data": {
    sections: [
      {
        heading: "Reading Backend Calibration Reports",
        body: "Cloud platforms publish per-qubit T1, T2, readout error, and per-edge two-qubit gate error (e.g., CNOT ECR). Data refreshes daily as devices recalibrate. Scholars export properties via Qiskit backend.properties() and log them alongside experiment results for reproducibility.",
      },
      {
        heading: "Choosing Qubits Intelligently",
        body: "For a 3-qubit circuit needing linear connectivity, pick physical qubits with low CNOT error on required edges and high T2. Avoid 'bad' qubits flagged in community forums. Transpiler initial_layout parameter maps logical to physical qubits — manual layout often beats default for small circuits.",
      },
      {
        heading: "Calibration Drift",
        body: "Devices recalibrate on schedules; properties change overnight. Production pipelines re-fetch calibration before batch jobs. Sudden result degradation often means calibration drift, not code regression.",
      },
    ],
    summary:
      "T1, T2, gate, and readout errors from calibration data drive qubit selection and circuit depth planning on cloud quantum hardware.",
    careerInsight:
      "DevOps roles automate 'best qubit picker' scripts — a portfolio differentiator showing hardware-aware software engineering.",
    glossary: [
      { term: "Calibration", definition: "Periodic tuning of pulses and readout to minimize gate and measurement error." },
      { term: "Initial layout", definition: "Mapping of logical circuit qubits to physical device indices." },
    ],
    references: [
      { title: "IBM Quantum Backend Properties", url: "https://quantum.cloud.ibm.com/", author: "IBM" },
    ],
  },
};
