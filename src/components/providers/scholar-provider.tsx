"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  getSessionScholar,
  getScholarProgress,
  loginScholar,
  logoutScholar,
  registerScholar,
  type Scholar,
  type ScholarProgress,
} from "@/lib/scholar/auth";

type ScholarContextValue = {
  scholar: Scholar | null;
  progress: ScholarProgress;
  loading: boolean;
  login: (email: string, password: string) => ReturnType<typeof loginScholar>;
  register: (data: Parameters<typeof registerScholar>[0]) => ReturnType<typeof registerScholar>;
  logout: () => void;
  refresh: () => void;
};

const ScholarContext = createContext<ScholarContextValue | null>(null);

export function ScholarProvider({ children }: { children: ReactNode }) {
  const [scholar, setScholar] = useState<Scholar | null>(null);
  const [progress, setProgress] = useState<ScholarProgress>({ completedLessonIds: [] });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    const s = getSessionScholar();
    setScholar(s);
    setProgress(s ? getScholarProgress(s.id) : { completedLessonIds: [] });
  }, []);

  useEffect(() => {
    refresh();
    setLoading(false);
  }, [refresh]);

  const login = (email: string, password: string) => {
    const result = loginScholar(email, password);
    if (result.ok) {
      setScholar(result.scholar);
      setProgress(getScholarProgress(result.scholar.id));
    }
    return result;
  };

  const register = (data: Parameters<typeof registerScholar>[0]) => {
    const result = registerScholar(data);
    if (result.ok) {
      setScholar(result.scholar);
      setProgress({ completedLessonIds: [] });
    }
    return result;
  };

  const logout = () => {
    logoutScholar();
    setScholar(null);
    setProgress({ completedLessonIds: [] });
  };

  return (
    <ScholarContext.Provider value={{ scholar, progress, loading, login, register, logout, refresh }}>
      {children}
    </ScholarContext.Provider>
  );
}

export function useScholar() {
  const ctx = useContext(ScholarContext);
  if (!ctx) throw new Error("useScholar must be used within ScholarProvider");
  return ctx;
}
