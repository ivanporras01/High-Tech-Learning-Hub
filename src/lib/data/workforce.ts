import type { CareerPath } from "@/lib/types/lms";

export const CAREER_PATHS: CareerPath[] = [
  {
    id: "cp-software",
    slug: "quantum-software-engineer",
    title: "Quantum Software Engineer",
    description:
      "Builds quantum circuits, transpilation pipelines, SDK integrations, and testing infrastructure. Works closely with cloud backends and classical DevOps teams.",
    skills: ["Python", "Qiskit/Cirq", "Linear algebra", "Git/CI", "Cloud APIs", "Unit testing"],
    salaryRange: { min: 120000, max: 210000, currency: "USD", period: "yearly" },
    certifications: [
      { name: "IBM Quantum Developer Certification", issuer: "IBM", description: "Validates Qiskit and quantum computing fundamentals.", url: "https://www.ibm.com/training/quantum" },
      { name: "Microsoft Azure Quantum Fundamentals", issuer: "Microsoft", description: "Azure Quantum and basic quantum concepts.", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-quantum-fundamentals/" },
    ],
    relatedModules: ["quantum-software-stack", "quantum-gates-and-circuits", "quantum-error-correction"],
  },
  {
    id: "cp-applications",
    slug: "quantum-applications-scientist",
    title: "Quantum Applications Scientist",
    description:
      "Models industry problems (chemistry, optimization, ML) as quantum algorithms. Runs hybrid VQE/QAOA experiments and communicates ROI to stakeholders.",
    skills: ["Physics/Chemistry modeling", "VQE/QAOA", "SciPy optimization", "Data visualization", "Technical writing"],
    salaryRange: { min: 110000, max: 195000, currency: "USD", period: "yearly" },
    certifications: [
      { name: "Qiskit Nature Practitioner Path", issuer: "IBM", description: "Computational chemistry with quantum algorithms." },
    ],
    relatedModules: ["industry-applications", "quantum-algorithms-shor-vqe", "linear-algebra-for-quantum"],
  },
  {
    id: "cp-devops",
    slug: "quantum-cloud-devops",
    title: "Quantum Cloud / DevOps Engineer",
    description:
      "Manages quantum job queues, IAM, cost controls, observability, and reproducible pipelines integrating simulators and hardware backends.",
    skills: ["AWS/Azure/GCP", "Terraform", "Python automation", "Monitoring", "Security best practices"],
    salaryRange: { min: 115000, max: 185000, currency: "USD", period: "yearly" },
    certifications: [
      { name: "AWS Certified Solutions Architect", issuer: "AWS", description: "Cloud architecture including Braket integrations." },
    ],
    relatedModules: ["quantum-software-stack", "nisq-hardware-calibration"],
  },
  {
    id: "cp-architect",
    slug: "quantum-solutions-architect",
    title: "Quantum Solutions Architect",
    description:
      "Translates enterprise requirements into quantum pilots, hybrid architectures, and migration roadmaps — often client-facing at consulting firms or cloud providers.",
    skills: ["Systems design", "Stakeholder communication", "ROI analysis", "Security/compliance", "Hybrid workflows"],
    salaryRange: { min: 140000, max: 230000, currency: "USD", period: "yearly" },
    certifications: [
      { name: "IBM Quantum Ambassador", issuer: "IBM", description: "Community and enterprise enablement track." },
    ],
    relatedModules: ["industry-applications", "career-capstone", "foundations-of-quantum-computing"],
  },
  {
    id: "cp-security",
    slug: "quantum-safe-security-engineer",
    title: "Quantum-Safe Security Engineer",
    description:
      "Leads post-quantum cryptography migration, crypto-agility assessments, and threat modeling for organizations preparing for cryptographically relevant quantum computers.",
    skills: ["PQC algorithms (ML-KEM, ML-DSA)", "PKI", "Risk assessment", "NIST standards", "Python/C tooling"],
    salaryRange: { min: 125000, max: 200000, currency: "USD", period: "yearly" },
    certifications: [
      { name: "NIST PQC Training Materials", issuer: "NIST", description: "Official post-quantum standards guidance.", url: "https://csrc.nist.gov/projects/post-quantum-cryptography" },
    ],
    relatedModules: ["foundations-of-quantum-computing", "quantum-algorithms-shor-vqe"],
  },
];

export const WORKFORCE_STATS = {
  globalInvestmentBillions: 44,
  annualJobGrowthPercent: 28,
  openRolesEstimate: 8500,
  medianSalaryUsd: 155000,
  topSkills: ["Python", "Qiskit", "Linear Algebra", "Cloud Quantum", "Hybrid Algorithms"],
};

export function getCareerPathBySlug(slug: string): CareerPath | undefined {
  return CAREER_PATHS.find((c) => c.slug === slug);
}
