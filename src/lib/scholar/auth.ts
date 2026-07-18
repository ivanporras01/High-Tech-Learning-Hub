/** Client-side scholar registration & session (localStorage MVP) */

export type Scholar = {
  id: string;
  fullName: string;
  email: string;
  institution?: string;
  registeredAt: string;
};

export type ScholarProgress = {
  completedLessonIds: string[];
  certificateIssuedAt?: string;
  certificateId?: string;
};

const SCHOLARS_KEY = "qwa-scholars";
const SESSION_KEY = "qwa-session";
const PROGRESS_PREFIX = "qwa-progress-";

export const MODULE1_LESSON_IDS = ["m1-l1", "m1-l2", "m1-l3", "m1-l3b", "m1-l4", "m1-l5", "m1-l6"];

function readScholars(): Record<string, Scholar & { passwordHash: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(SCHOLARS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeScholars(data: Record<string, Scholar & { passwordHash: string }>) {
  localStorage.setItem(SCHOLARS_KEY, JSON.stringify(data));
}

function simpleHash(input: string): string {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  return `h${Math.abs(h)}`;
}

export function registerScholar(data: {
  fullName: string;
  email: string;
  password: string;
  institution?: string;
}): { ok: true; scholar: Scholar } | { ok: false; error: string } {
  const email = data.email.trim().toLowerCase();
  if (!email || !data.fullName.trim() || data.password.length < 6) {
    return { ok: false, error: "Name, valid email, and password (6+ chars) required." };
  }
  const scholars = readScholars();
  if (scholars[email]) return { ok: false, error: "An account with this email already exists." };

  const scholar: Scholar = {
    id: `sch-${Date.now().toString(36)}`,
    fullName: data.fullName.trim(),
    email,
    institution: data.institution?.trim(),
    registeredAt: new Date().toISOString(),
  };
  scholars[email] = { ...scholar, passwordHash: simpleHash(data.password) };
  writeScholars(scholars);
  localStorage.setItem(SESSION_KEY, email);
  return { ok: true, scholar };
}

export function loginScholar(
  email: string,
  password: string
): { ok: true; scholar: Scholar } | { ok: false; error: string } {
  const key = email.trim().toLowerCase();
  const scholars = readScholars();
  const record = scholars[key];
  if (!record || record.passwordHash !== simpleHash(password)) {
    return { ok: false, error: "Invalid email or password." };
  }
  const { passwordHash: _, ...scholar } = record;
  localStorage.setItem(SESSION_KEY, key);
  return { ok: true, scholar };
}

export function logoutScholar() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSessionScholar(): Scholar | null {
  if (typeof window === "undefined") return null;
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  const record = readScholars()[email];
  if (!record) return null;
  const { passwordHash: _, ...scholar } = record;
  return scholar;
}

export function getScholarProgress(scholarId: string): ScholarProgress {
  if (typeof window === "undefined") return { completedLessonIds: [] };
  try {
    return JSON.parse(localStorage.getItem(`${PROGRESS_PREFIX}${scholarId}`) ?? '{"completedLessonIds":[]}');
  } catch {
    return { completedLessonIds: [] };
  }
}

export function saveScholarProgress(scholarId: string, progress: ScholarProgress) {
  localStorage.setItem(`${PROGRESS_PREFIX}${scholarId}`, JSON.stringify(progress));
}

export function markLessonComplete(scholarId: string, lessonId: string): ScholarProgress {
  const progress = getScholarProgress(scholarId);
  if (!progress.completedLessonIds.includes(lessonId)) {
    progress.completedLessonIds.push(lessonId);
  }
  if (isModule1Complete(progress) && !progress.certificateIssuedAt) {
    progress.certificateIssuedAt = new Date().toISOString();
    progress.certificateId = `QWA-${Date.now().toString(36).toUpperCase()}`;
  }
  saveScholarProgress(scholarId, progress);
  return progress;
}

export function isModule1Complete(progress: ScholarProgress): boolean {
  return MODULE1_LESSON_IDS.every((id) => progress.completedLessonIds.includes(id));
}

export function module1ProgressPercent(progress: ScholarProgress): number {
  const done = MODULE1_LESSON_IDS.filter((id) => progress.completedLessonIds.includes(id)).length;
  return Math.round((done / MODULE1_LESSON_IDS.length) * 100);
}
