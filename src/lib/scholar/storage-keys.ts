export const SCHOLARS_STORAGE_KEY = "qwa-scholars";
export const SESSION_STORAGE_KEY = "qwa-scholar-session";

export function progressStorageKey(scholarId: string): string {
  return `qwa-scholar-progress-${scholarId}`;
}
