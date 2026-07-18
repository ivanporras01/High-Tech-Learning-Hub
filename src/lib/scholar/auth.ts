import type { Scholar, ScholarAccount, ScholarProgress, ScholarSession } from "./types";
import { SCHOLARS_STORAGE_KEY, SESSION_STORAGE_KEY } from "./storage-keys";

export type { Scholar, ScholarProgress, ScholarAccount, ScholarSession };

export const MODULE1_LESSON_IDS = ["m1-l1", "m1-l2", "m1-l3", "m1-l3b", "m1-l4", "m1-l5", "m1-l6"];

const PROGRESS_PREFIX = "qwa-progress-";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readScholars(): ScholarAccount[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(SCHOLARS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ScholarAccount[]) : [];
  } catch {
    return [];
  }
}

function writeScholars(scholars: ScholarAccount[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(SCHOLARS_STORAGE_KEY, JSON.stringify(scholars));
}

function accountToScholar(account: ScholarAccount): Scholar {
  return {
    id: account.id,
    fullName: account.fullName,
    email: account.email,
    institution: account.institution,
    registeredAt: account.createdAt,
  };
}

export async function registerScholar(input: {
  fullName: string;
  email: string;
  password: string;
  institution?: string;
}): Promise<{ ok: true; scholar: Scholar } | { ok: false; error: string }> {
  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!fullName || !email || !password) {
    return { ok: false, error: "Name, email, and password are required." };
  }
  if (password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }

  const scholars = readScholars();
  if (scholars.some((s) => s.email === email)) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const account: ScholarAccount = {
    id: crypto.randomUUID(),
    fullName,
    email,
    passwordHash: await hashPassword(password),
    institution: input.institution?.trim() || undefined,
    createdAt: new Date().toISOString(),
  };

  scholars.push(account);
  writeScholars(scholars);

  const session: ScholarSession = {
    scholarId: account.id,
    email: account.email,
    fullName: account.fullName,
  };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return { ok: true, scholar: accountToScholar(account) };
}

export async function loginScholar(
  email: string,
  password: string
): Promise<{ ok: true; scholar: Scholar } | { ok: false; error: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const account = readScholars().find((s) => s.email === normalizedEmail);

  if (!account) {
    return { ok: false, error: "Invalid email or password." };
  }

  if (account.passwordHash !== (await hashPassword(password))) {
    return { ok: false, error: "Invalid email or password." };
  }

  const session: ScholarSession = {
    scholarId: account.id,
    email: account.email,
    fullName: account.fullName,
  };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return { ok: true, scholar: accountToScholar(account) };
}

export function logoutScholar(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function getSessionScholar(): Scholar | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as ScholarSession;
    const account = readScholars().find((s) => s.id === session.scholarId);
    return account ? accountToScholar(account) : null;
  } catch {
    return null;
  }
}

export function getScholarProgress(scholarId: string): ScholarProgress {
  if (!isBrowser()) return { completedLessonIds: [] };
  try {
    return JSON.parse(localStorage.getItem(`${PROGRESS_PREFIX}${scholarId}`) ?? '{"completedLessonIds":[]}');
  } catch {
    return { completedLessonIds: [] };
  }
}

function saveScholarProgress(scholarId: string, progress: ScholarProgress): void {
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
