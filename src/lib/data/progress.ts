import type { LearnerProgress } from "@/lib/types/lms";
import { QUANTUM_WORKFORCE_COURSE } from "./course";

export const MOCK_LEARNER: LearnerProgress = {
  courseId: QUANTUM_WORKFORCE_COURSE.id,
  completedLessonIds: [
    "m1-l1",
    "m1-l2",
    "m1-l3",
    "m1-l4",
    "m2-l1",
    "m3-l1",
    "m3-l2",
  ],
  completedLabIds: ["lab-1", "lab-2"],
  xp: 2450,
  streakDays: 12,
  badges: [
    {
      id: "badge-first-circuit",
      name: "First Circuit",
      description: "Completed Lab 1: Hello Quantum World",
      earnedAt: "2025-10-05",
    },
    {
      id: "badge-bloch-navigator",
      name: "Bloch Navigator",
      description: "Finished the Bloch sphere simulation lesson",
      earnedAt: "2025-10-18",
    },
    {
      id: "badge-module-1",
      name: "Foundations Complete",
      description: "Completed Module 1 knowledge check",
      earnedAt: "2025-10-22",
    },
    {
      id: "badge-streak-7",
      name: "7-Day Streak",
      description: "Learned seven days in a row",
      earnedAt: "2025-11-01",
    },
  ],
};

export function getModuleCompletionPercent(moduleId: string): number {
  const mod = QUANTUM_WORKFORCE_COURSE.modules.find((m) => m.id === moduleId);
  if (!mod || mod.lessons.length === 0) return 0;
  const done = mod.lessons.filter((l) => MOCK_LEARNER.completedLessonIds.includes(l.id)).length;
  return Math.round((done / mod.lessons.length) * 100);
}

export function getOverallProgressPercent(): number {
  const total = QUANTUM_WORKFORCE_COURSE.modules.reduce((n, m) => n + m.lessons.length, 0);
  const done = MOCK_LEARNER.completedLessonIds.length;
  return Math.round((done / total) * 100);
}

export function getWeeklyXpData(): { label: string; xp: number }[] {
  return [
    { label: "Mon", xp: 180 },
    { label: "Tue", xp: 320 },
    { label: "Wed", xp: 0 },
    { label: "Thu", xp: 410 },
    { label: "Fri", xp: 290 },
    { label: "Sat", xp: 520 },
    { label: "Sun", xp: 380 },
  ];
}

export function getMockProgress(): LearnerProgress {
  return MOCK_LEARNER;
}
