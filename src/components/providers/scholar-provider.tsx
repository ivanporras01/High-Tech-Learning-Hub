"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getStoredSession,
  getScholarAccount,
  loginScholar,
  logoutScholar,
  registerScholar,
} from "@/lib/scholar/auth";
import {
  getCertificateProgress,
  getScholarProgress,
  markLessonComplete,
} from "@/lib/scholar/progress";
import type { ScholarProgress, ScholarSession } from "@/lib/scholar/types";

interface ScholarView {
  id: string;
  fullName: string;
  email: string;
  institution?: string;
}

interface ScholarContextValue {
  session: ScholarSession | null;
  /** Convenience view for UI — maps session + account fields */
  scholar: ScholarView | null;
  progress: ScholarProgress | null;
  certificateProgress: ReturnType<typeof getCertificateProgress> | null;
  loading: boolean;
  register: (input: {
    fullName: string;
    email: string;
    password: string;
    institution?: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
  completeLesson: (lessonId: string) => void;
  refreshProgress: () => void;
  /** @deprecated use refreshProgress */
  refresh: () => void;
}

const ScholarContext = createContext<ScholarContextValue | undefined>(undefined);

export function ScholarProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<ScholarSession | null>(null);
  const [progress, setProgress] = useState<ScholarProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProgress = useCallback(() => {
    if (!session) {
      setProgress(null);
      return;
    }
    setProgress(getScholarProgress(session.scholarId));
  }, [session]);

  useEffect(() => {
    const stored = getStoredSession();
    setSession(stored);
    if (stored) {
      setProgress(getScholarProgress(stored.scholarId));
    }
    setLoading(false);
  }, []);

  const register = useCallback(
    async (input: {
      fullName: string;
      email: string;
      password: string;
      institution?: string;
    }) => {
      const result = await registerScholar(input);
      if (!result.ok) return result;
      setSession(result.session);
      setProgress(getScholarProgress(result.session.scholarId));
      return { ok: true as const };
    },
    []
  );

  const login = useCallback(async (email: string, password: string) => {
    const result = await loginScholar(email, password);
    if (!result.ok) return result;
    setSession(result.session);
    setProgress(getScholarProgress(result.session.scholarId));
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    logoutScholar();
    setSession(null);
    setProgress(null);
  }, []);

  const completeLesson = useCallback(
    (lessonId: string) => {
      if (!session) return;
      const updated = markLessonComplete(session.scholarId, lessonId);
      setProgress(updated);
    },
    [session]
  );

  const scholar = useMemo((): ScholarView | null => {
    if (!session) return null;
    const account = getScholarAccount(session.scholarId);
    return {
      id: session.scholarId,
      fullName: session.fullName,
      email: session.email,
      institution: account?.institution,
    };
  }, [session]);

  const certificateProgress = useMemo(() => {
    if (!session) return null;
    return getCertificateProgress(session.scholarId);
  }, [session, progress]);

  const value = useMemo(
    () => ({
      session,
      scholar,
      progress,
      certificateProgress,
      loading,
      register,
      login,
      logout,
      completeLesson,
      refreshProgress,
      refresh: refreshProgress,
    }),
    [
      session,
      scholar,
      progress,
      certificateProgress,
      loading,
      register,
      login,
      logout,
      completeLesson,
      refreshProgress,
    ]
  );

  return (
    <ScholarContext.Provider value={value}>{children}</ScholarContext.Provider>
  );
}

export function useScholar() {
  const ctx = useContext(ScholarContext);
  if (!ctx) throw new Error("useScholar must be used within ScholarProvider");
  return ctx;
}
