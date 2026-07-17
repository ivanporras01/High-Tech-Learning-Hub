import type { NewsArticle } from "@/lib/types/lms";

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    slug: "ibm-heron-processor-milestone",
    title: "IBM Unveils Next-Generation Heron Processor with Improved Two-Qubit Gate Fidelity",
    excerpt:
      "IBM Quantum announced a new Heron-class processor targeting enterprise workloads, emphasizing reduced crosstalk and faster calibration cycles for cloud users.",
    source: "IBM Quantum Blog",
    publishedAt: "2025-11-14",
    category: "industry",
    url: "https://www.ibm.com/quantum/blog",
  },
  {
    id: "news-2",
    slug: "nist-pqc-standards-deployment",
    title: "NIST Post-Quantum Cryptography Standards Enter Enterprise Deployment Phase",
    excerpt:
      "Organizations are mapping migration timelines for ML-KEM and ML-DSA algorithms as quantum threat assessments move from research to board-level risk planning.",
    source: "NIST Computer Security Resource Center",
    publishedAt: "2025-10-02",
    category: "policy",
    url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
  },
  {
    id: "news-3",
    slug: "quantum-workforce-report-2025",
    title: "Industry Consortium Reports 40% Increase in Quantum Software Job Postings",
    excerpt:
      "A joint workforce survey finds rising demand for Qiskit proficiency, hybrid algorithm experience, and cloud backend literacy across finance, pharma, and logistics.",
    source: "Quantum Economic Development Consortium",
    publishedAt: "2025-09-18",
    category: "workforce",
  },
  {
    id: "news-4",
    slug: "google-error-correction-breakthrough",
    title: "Google Quantum AI Demonstrates Below-Threshold Error Correction on Surface Code",
    excerpt:
      "Researchers report logical qubit performance improving with code distance, a key milestone toward fault-tolerant quantum computing at scale.",
    source: "Google Quantum AI",
    publishedAt: "2025-08-22",
    category: "research",
    url: "https://quantumai.google/",
  },
  {
    id: "news-5",
    slug: "ionq-azure-marketplace-expansion",
    title: "IonQ Expands Azure Quantum Marketplace Offerings for Enterprise Customers",
    excerpt:
      "IonQ adds new trapped-ion systems to Azure Quantum with simplified billing and regional availability for hybrid cloud quantum pilots.",
    source: "IonQ Press",
    publishedAt: "2025-07-30",
    category: "industry",
    url: "https://ionq.com/news",
  },
  {
    id: "news-6",
    slug: "community-college-quantum-programs",
    title: "Community Colleges Launch Stackable Quantum Certificates Aligned to NIST Workforce Framework",
    excerpt:
      "Twelve U.S. institutions pilot two-semester programs combining linear algebra modules, Qiskit labs, and career coaching for non-traditional learners.",
    source: "Quantum Workforce Alliance",
    publishedAt: "2025-06-12",
    category: "workforce",
  },
  {
    id: "news-7",
    slug: "vqe-pharma-collaboration",
    title: "Pharma Consortium Reports Promising VQE Pilot for Small-Molecule Binding Studies",
    excerpt:
      "A hybrid VQE workflow on cloud hardware produced chemically plausible energy landscapes, though teams caution results remain proof-of-concept.",
    source: "Nature Quantum Information",
    publishedAt: "2025-05-08",
    category: "research",
  },
  {
    id: "news-8",
    slug: "eu-quantum-act-funding",
    title: "European Quantum Act Allocates €500M for Talent Pipelines and Regional Innovation Hubs",
    excerpt:
      "Policy makers prioritize workforce training, open cloud access, and SME adoption programs through 2030 funding cycles.",
    source: "European Commission",
    publishedAt: "2025-04-19",
    category: "policy",
  },
  {
    id: "news-9",
    slug: "microsoft-quantum-ready-checklist",
    title: "Microsoft Publishes Quantum-Ready Enterprise Checklist for CIOs",
    excerpt:
      "The checklist covers talent assessment, Azure Quantum workspace setup, PQC migration, and pilot kill criteria for NISQ experiments.",
    source: "Microsoft Azure Blog",
    publishedAt: "2025-03-27",
    category: "workforce",
    url: "https://azure.microsoft.com/en-us/blog/",
  },
  {
    id: "news-10",
    slug: "rigetti-ankaa-processor",
    title: "Rigetti Ships Ankaa-3 Processor to Cloud Partners with Improved Readout Fidelity",
    excerpt:
      "The superconducting QPU targets variational algorithms and benchmarking workloads with updated calibration APIs for developers.",
    source: "Rigetti Computing",
    publishedAt: "2025-02-15",
    category: "industry",
    url: "https://www.rigetti.com/news",
  },
];

export function getNewsByCategory(category: NewsArticle["category"]): NewsArticle[] {
  return NEWS_ARTICLES.filter((a) => a.category === category);
}

export function getNewsArticles(limit?: number): NewsArticle[] {
  const sorted = [...NEWS_ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return limit ? sorted.slice(0, limit) : sorted;
}
