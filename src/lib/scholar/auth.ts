import type { ScholarAccount, ScholarProgress, ScholarSession } from "./types";
import { SCHOLARS_STORAGE_KEY, SESSION_STORAGE_KEY } from "./storage-keys";
import { getModule1LessonIds, markLessonComplete as markLessonCompleteProgress } from "./progress";

export { markLessonCompleteProgress as markLessonComplete };

export function isModule1Complete(progress: ScholarProgress | null): boolean {
  if (!progress) return false;
  const requiredIds = getModule1LessonIds();
  return requiredIds.length > 0 && requiredIds.every((id) => progress.completedLessonIds.includes(id));
}

export function module1ProgressPercent(progress: ScholarProgress | null): number {
  if (!progress) return 0;
  const requiredIds = getModule1LessonIds();
  if (requiredIds.length === 0) return 0;
  const completed = requiredIds.filter((id) => progress.completedLessonIds.includes(id)).length;
  return Math.round((completed / requiredIds.length) * 100);
}

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

function generateId(): string {
  return crypto.randomUUID();
}

export async function registerScholar(input: {
  fullName: string;
  email: string;
  password: string;
  institution?: string;
}): Promise<{ ok: true; session: ScholarSession } | { ok: false; error: string }> {
  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!fullName || !email || !password) {
    return { ok: false, error: "Name, email, and password are required." };
  }
  if (password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const scholars = readScholars();
  if (scholars.some((s) => s.email === email)) {
    return { ok: false, error: "An account with this email already exists. Sign in instead." };
  }

  const account: ScholarAccount = {
    id: generateId(),
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
  return { ok: true, session };
}

export async function loginScholar(
  email: string,
  password: string
): Promise<{ ok: true; session: ScholarSession } | { ok: false; error: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const scholars = readScholars();
  const account = scholars.find((s) => s.email === normalizedEmail);

  if (!account) {
    return { ok: false, error: "No account found for this email. Register first." };
  }

  const passwordHash = await hashPassword(password);
  if (account.passwordHash !== passwordHash) {
    return { ok: false, error: "Incorrect password." };
  }

  const session: ScholarSession = {
    scholarId: account.id,
    email: account.email,
    fullName: account.fullName,
  };
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return { ok: true, session };
}

export function logoutScholar(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function getStoredSession(): ScholarSession | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ScholarSession) : null;
  } catch {
    return null;
  }
}

export function getScholarAccount(scholarId: string): ScholarAccount | undefined {
  return readScholars().find((s) => s.id === scholarId);
}
