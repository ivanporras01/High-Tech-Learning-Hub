/**
 * LMS domain types — structured for future Firebase/Supabase migration.
 * Keep IDs stable; swap data layer implementations without changing UI contracts.
 */

export type LessonType = "reading" | "video" | "interactive" | "quiz" | "lab-ref";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface Reference {
  title: string;
  url: string;
  author?: string;
}

export interface LessonSection {
  heading: string;
  body: string;
}

export type LessonVisualType =
  | "bloch-sphere"
  | "gate-playground"
  | "gate-sequence-demo"
  | "circuit-diagram"
  | "probability-chart"
  | "technology-landscape";

export interface LessonVisual {
  type: LessonVisualType;
  title?: string;
  caption?: string;
  /** Insert visual after this section index (0-based). Omit to show at top. */
  afterSection?: number;
  props?: Record<string, unknown>;
}

export interface LessonContent {
  /** Structured reading sections rendered in the lesson viewer */
  sections: LessonSection[];
  /** Interactive visuals — Bloch sphere, gates, circuits (graphic-first curriculum) */
  visuals?: LessonVisual[];
  summary: string;
  careerInsight: string;
  glossary: GlossaryTerm[];
  references: Reference[];
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  objectives: string[];
  durationMinutes: number;
  type: LessonType;
  order: number;
  /** Full body content — present for published lessons */
  content?: LessonContent;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export type CourseAudience = "college-university";

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** Academic difficulty band within the college/university track */
  level: Difficulty;
  /** Target learner population — QWA is college & university only (not K-12) */
  audience: CourseAudience;
  prerequisites: string[];
  totalHours: number;
  modules: Module[];
  tags: string[];
}

export type LabDifficulty = "intro" | "intermediate" | "advanced";

export interface LabStep {
  order: number;
  title: string;
  instruction: string;
  hint?: string;
}

export interface Lab {
  id: string;
  slug: string;
  title: string;
  description: string;
  objectives: string[];
  difficulty: LabDifficulty;
  durationMinutes: number;
  moduleSlug: string;
  prerequisites: string[];
  /** Qiskit or Python code samples */
  starterCode?: string;
  solutionCode?: string;
  steps?: LabStep[];
  tools: string[];
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  headquarters: string;
  founded: number;
  employees?: string;
  focusAreas: string[];
  careersUrl: string;
  logoInitials: string;
}

export interface Certification {
  name: string;
  issuer: string;
  description: string;
  url?: string;
}

export interface CareerPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  skills: string[];
  salaryRange: { min: number; max: number; currency: string; period: "yearly" };
  certifications: Certification[];
  relatedModules: string[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  source: string;
  publishedAt: string;
  category: "industry" | "research" | "policy" | "workforce";
  url?: string;
}

/** Mock learner progress — replace with auth-backed store later */
export interface LearnerProgress {
  courseId: string;
  completedLessonIds: string[];
  completedLabIds: string[];
  xp: number;
  badges: Badge[];
  streakDays: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedAt?: string;
}
