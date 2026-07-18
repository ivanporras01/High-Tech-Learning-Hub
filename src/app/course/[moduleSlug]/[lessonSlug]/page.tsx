import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson } from "@/lib/data/course";
import { LessonContentView } from "@/components/course/lesson-content";
import { LessonCompleteButton } from "@/components/course/lesson-complete-button";

type Props = { params: Promise<{ moduleSlug: string; lessonSlug: string }> };

export default async function LessonPage({ params }: Props) {
  const { moduleSlug, lessonSlug } = await params;
  const result = getLesson(moduleSlug, lessonSlug);
  if (!result) notFound();

  const { module: mod, lesson } = result;

  return (
    <div className="qwa-section">
      <article className="qwa-container max-w-4xl">
        <Link href={`/course/${mod.slug}`} className="text-sm text-[var(--qwa-accent)] hover:underline">
          ← {mod.title}
        </Link>
        <p className="mt-4 text-xs uppercase text-[var(--qwa-fg-muted)]">
          {lesson.type} · {lesson.durationMinutes} min · College &amp; University
        </p>
        <h1 className="mt-2 text-3xl font-black text-[var(--qwa-fg)]">{lesson.title}</h1>
        <p className="mt-4 text-[var(--qwa-fg-muted)]">{lesson.description}</p>

        {lesson.objectives.length > 0 && (
          <div className="qwa-glass-card mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--qwa-violet)]">
              Learning Objectives
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--qwa-fg-muted)]">
              {lesson.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        )}

        {lesson.content ? (
          <div className="mt-10">
            <LessonContentView content={lesson.content} />
          </div>
        ) : (
          <div className="qwa-glass-card mt-10">
            <p className="text-[var(--qwa-fg-muted)]">
              Full lesson content for <strong>{lesson.title}</strong> includes interactive Bloch
              sphere and gate visuals — expanding in the next content release.
            </p>
            <Link
              href="/simulations/bloch-sphere"
              className="qwa-btn-primary mt-4 inline-flex text-sm"
            >
              Open Gate Playground →
            </Link>
          </div>
        )}

        <LessonCompleteButton lessonId={lesson.id} lessonTitle={lesson.title} />
      </article>
    </div>
  );
}
