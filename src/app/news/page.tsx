import type { Metadata } from "next";
import { getNewsArticles, getNewsByCategory } from "@/lib/data/news";
import type { NewsArticle } from "@/lib/types/lms";

export const metadata: Metadata = {
  title: "Industry News",
  description: "Quantum computing industry, research, policy, and workforce news.",
};

const CATEGORIES: NewsArticle["category"][] = ["industry", "research", "policy", "workforce"];

export default function NewsPage() {
  const articles = getNewsArticles();

  return (
    <div className="qwa-container py-12">
      <header>
        <span className="qwa-badge">Industry Pulse</span>
        <h1 className="mt-4 text-3xl font-bold text-[var(--qwa-fg)] sm:text-4xl">Quantum News</h1>
        <p className="mt-4 max-w-3xl text-[var(--qwa-fg-muted)]">
          Curated headlines for workforce scholars — hardware milestones, policy updates, research
          breakthroughs, and hiring trends.
        </p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <span key={cat} className="qwa-badge">
            {cat}: {getNewsByCategory(cat).length}
          </span>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.id} className="qwa-glass-card">
            <span className="qwa-badge">{article.category}</span>
            <h2 className="mt-3 text-lg font-semibold text-[var(--qwa-fg)]">{article.title}</h2>
            <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">{article.excerpt}</p>
            <p className="mt-4 text-xs text-[var(--qwa-fg-muted)]">
              {article.source} · {article.publishedAt}
            </p>
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-[var(--qwa-accent)] hover:underline"
              >
                Read source →
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
