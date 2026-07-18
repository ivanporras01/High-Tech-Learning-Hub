"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useScholar } from "@/components/providers/scholar-provider";
import { markLessonComplete } from "@/lib/scholar/auth";

export function LessonCompleteButton({ lessonId, lessonTitle }: { lessonId: string; lessonTitle: string }) {
  const { scholar, progress, refresh } = useScholar();
  const router = useRouter();
  const [done, setDone] = useState(progress.completedLessonIds.includes(lessonId));

  if (!scholar) {
    return (
      <p className="mt-10 text-sm text-[var(--qwa-fg-muted)]">
        <a href="/login" className="text-[var(--qwa-cyan)] hover:underline">Sign in</a> to track progress and earn your certificate.
      </p>
    );
  }

  function complete() {
    markLessonComplete(scholar!.id, lessonId);
    refresh();
    setDone(true);
    router.refresh();
  }

  return (
    <div className="mt-10 qwa-glass-card">
      {done ? (
        <p className="text-sm text-[var(--qwa-cyan)]">✓ Completed — {lessonTitle}</p>
      ) : (
        <button type="button" onClick={complete} className="qwa-btn-primary text-sm">
          Mark lesson complete
        </button>
      )}
    </div>
  );
}
