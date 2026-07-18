import { QUANTUM_WORKFORCE_COURSE } from "@/lib/data/course";
import type { ScholarProgress } from "./types";
import { progressStorageKey } from "./storage-keys";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function emptyProgress(): ScholarProgress {
  return {
    courseId: QUANTUM_WORKFORCE_COURSE.id,
    completedLessonIds: [],
    completedLabIds: [],
  };
}

export function getScholarProgress(scholarId: string): ScholarProgress {
  if (!isBrowser()) return emptyProgress();
  try {
    const raw = localStorage.getItem(progressStorageKey(scholarId));
    return raw ? (JSON.parse(raw) as ScholarProgress) : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveScholarProgress(scholarId: string, progress: ScholarProgress): void {
  if (!isBrowser()) return;
  localStorage.setItem(progressStorageKey(scholarId), JSON.stringify(progress));
}

export function markLessonComplete(scholarId: string, lessonId: string): ScholarProgress {
  const progress = getScholarProgress(scholarId);
  if (!progress.completedLessonIds.includes(lessonId)) {
    progress.completedLessonIds.push(lessonId);
    saveScholarProgress(scholarId, progress);
  }
  return progress;
}

export function isLessonComplete(scholarId: string, lessonId: string): boolean {
  return getScholarProgress(scholarId).completedLessonIds.includes(lessonId);
}

export function getModule1LessonIds(): string[] {
  const module1 = QUANTUM_WORKFORCE_COURSE.modules[0];
  return module1?.lessons.map((l) => l.id) ?? [];
}

export function getCertificateRequiredCount(): number {
  return getModule1LessonIds().length;
}

export function getCertificateProgress(scholarId: string): {
  completed: number;
  required: number;
  percent: number;
  eligible: boolean;
} {
  const requiredIds = getModule1LessonIds();
  const progress = getScholarProgress(scholarId);
  const completed = requiredIds.filter((id) => progress.completedLessonIds.includes(id)).length;
  const required = requiredIds.length;
  const percent = required === 0 ? 0 : Math.round((completed / required) * 100);
  return {
    completed,
    required,
    percent,
    eligible: completed === required && required > 0,
  };
}
