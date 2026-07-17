import Link from "next/link";
import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/lib/data/course";

type Props = { params: Promise<{ moduleSlug: string }> };

export default async function ModulePage({ params }: Props) {
  const { moduleSlug } = await params;
  const mod = getModuleBySlug(moduleSlug);
  if (!mod) notFound();

  return (
    <div className="qwa-section">
      <div className="qwa-container max-w-3xl">
        <Link href="/course" className="text-sm text-[var(--qwa-accent)] hover:underline">
          ← All modules
        </Link>
        <p className="mt-4 text-xs font-bold uppercase text-[var(--qwa-violet)]">Module {mod.order}</p>
        <h1 className="mt-2 text-3xl font-black text-[var(--qwa-fg)]">{mod.title}</h1>
        <p className="mt-3 text-[var(--qwa-fg-muted)]">{mod.description}</p>
        <ul className="mt-8 space-y-3">
          {mod.lessons.map((lesson, i) => (
            <li key={lesson.slug}>
              <Link
                href={`/course/${mod.slug}/${lesson.slug}`}
                className="qwa-glass-card flex items-center justify-between gap-4"
              >
                <div>
                  <p className="text-xs text-[var(--qwa-fg-muted)]">
                    Lesson {i + 1} · {lesson.type}
                    {lesson.type === "interactive" && " · includes visuals"}
                  </p>
                  <p className="font-semibold text-[var(--qwa-fg)]">{lesson.title}</p>
                </div>
                <span className="text-sm text-[var(--qwa-fg-muted)]">{lesson.durationMinutes} min</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
