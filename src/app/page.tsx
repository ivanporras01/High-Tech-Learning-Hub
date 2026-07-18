import Link from "next/link";
import { GatePlaygroundSection } from "@/components/home/gate-playground-section";
import { HomeCareerCharts } from "@/components/home/home-career-charts";
import { QwaLogo } from "@/components/ui/qwa-logo";
import { QuantumHeroViz, QuantumReveal } from "@/components/ui/quantum-motion";
import { getCourse, getTotalLessonCount } from "@/lib/data/course";
import { getFeaturedLabs } from "@/lib/data/labs";
import { getNewsArticles } from "@/lib/data/news";
import { getMockProgress } from "@/lib/data/progress";
import { WORKFORCE_STATS } from "@/lib/data/workforce";

export default function HomePage() {
  const course = getCourse();
  const lessonCount = getTotalLessonCount();
  const featuredLabs = getFeaturedLabs(3);
  const news = getNewsArticles(3);
  const progress = getMockProgress();

  return (
    <>
      {/* Hero */}
      <section className="qwa-container py-16 sm:py-24" aria-labelledby="hero-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <QuantumReveal>
          <div>
            <div className="flex items-center gap-3">
              <QwaLogo size={60} variant="full" className="qwa-logo-pulse" />
              <span className="qwa-badge">Workforce Development Platform</span>
            </div>
            <h1 id="hero-heading" className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="qwa-text-gradient">Quantum Computing</span>
              <br />
              <span className="text-[var(--qwa-fg)]">for the Workforce</span>
            </h1>
            <p className="mt-6 text-lg text-[var(--qwa-fg-muted)] sm:text-xl">
              Master qubits, Qiskit, hybrid algorithms, and career-ready skills through a premium LMS with
              interactive Bloch sphere, optical circuits, and gate simulations.
            </p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <Link href="/register" className="qwa-btn-primary">Register as Scholar</Link>
              <Link href="/course" className="qwa-btn-secondary">Explore the Course</Link>
            </div>
          </div>
          </QuantumReveal>
          <QuantumReveal delay={150}>
          <div className="relative">
            <QuantumHeroViz className="mb-6 hidden lg:block" />
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--qwa-cyan)]">
              Try it now — Gate Playground
            </p>
            <GatePlaygroundSection title="H · X · Y · Z · Rx · Ry · Rz" initialGates={["H"]} />
          </div>
          </QuantumReveal>
        </div>
      </section>

      {/* Technology classes */}
      <section className="qwa-container py-16" aria-labelledby="tech-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="tech-heading" className="qwa-section-title">
              Six Classes of Quantum Technology
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--qwa-fg-muted)]">
              Superconducting, trapped ion, photonic, neutral atom, topological, and spin — scholars
              learn to compare platforms, not treat quantum as one black box.
            </p>
          </div>
          <Link href="/technologies" className="text-sm text-[var(--qwa-cyan)] hover:underline">
            Full technology guide →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Superconducting", org: "IBM · Google · Rigetti", color: "#38bdf8" },
            { name: "Trapped Ion", org: "IonQ · Quantinuum", color: "#a78bfa" },
            { name: "Photonic", org: "Xanadu · PsiQuantum", color: "#f472b6" },
            { name: "Neutral Atom", org: "QuEra · Pasqal", color: "#34d399" },
            { name: "Topological", org: "Microsoft (research)", color: "#fbbf24" },
            { name: "Spin / Semiconductor", org: "Intel · QuTech", color: "#fb923c" },
          ].map(({ name, org, color }) => (
            <Link key={name} href="/technologies" className="qwa-glass-card block">
              <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              <h3 className="mt-2 font-bold text-[var(--qwa-fg)]">{name}</h3>
              <p className="mt-1 text-xs text-[var(--qwa-fg-muted)]">{org}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Quantum */}
      <section className="qwa-container py-16" aria-labelledby="why-heading">
        <h2 id="why-heading" className="qwa-section-title text-center">
          Why Quantum Now?
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { stat: `$${WORKFORCE_STATS.globalInvestmentBillions}B+`, label: "Global quantum investment" },
            { stat: `${WORKFORCE_STATS.annualJobGrowthPercent}%`, label: "Annual job growth (est.)" },
            { stat: lessonCount.toString(), label: "Structured lessons" },
            { stat: "20", label: "Hands-on labs" },
          ].map(({ stat, label }) => (
            <div key={label} className="qwa-glass-card text-center">
              <p className="text-3xl font-bold qwa-text-gradient">{stat}</p>
              <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Career Stats */}
      <section className="qwa-container py-16" aria-labelledby="careers-heading">
        <h2 id="careers-heading" className="qwa-section-title">
          Quantum Career Landscape
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--qwa-fg-muted)]">
          Salary ranges and role distribution based on industry workforce reports. Median U.S. compensation
          exceeds ${WORKFORCE_STATS.medianSalaryUsd.toLocaleString()}/year for experienced software roles.
        </p>
        <div className="mt-10">
          <HomeCareerCharts />
        </div>
      </section>

      {/* Timeline */}
      <section className="qwa-container py-16" aria-labelledby="timeline-heading">
        <h2 id="timeline-heading" className="qwa-section-title">
          Your Learning Path
        </h2>
        <ol className="mt-10 space-y-6 border-l-2 border-[var(--qwa-accent)] pl-8" aria-label="Course timeline">
          {course.modules.slice(0, 6).map((mod, i) => (
            <li key={mod.id} className="relative">
              <span className="absolute -left-[2.4rem] flex h-8 w-8 items-center justify-center rounded-full bg-[var(--qwa-accent)] text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-semibold text-[var(--qwa-fg)]">{mod.title}</h3>
              <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">{mod.description}</p>
              <Link href={`/course/${mod.slug}`} className="mt-2 inline-block text-sm text-[var(--qwa-cyan)] hover:underline">
                View module →
              </Link>
            </li>
          ))}
        </ol>
        <Link href="/course" className="qwa-btn-secondary mt-8 inline-flex">
          View all 12 modules
        </Link>
      </section>

      {/* News Preview */}
      <section className="qwa-container py-16" aria-labelledby="news-heading">
        <div className="flex items-end justify-between gap-4">
          <h2 id="news-heading" className="qwa-section-title">
            Industry Pulse
          </h2>
          <Link href="/news" className="text-sm text-[var(--qwa-cyan)] hover:underline">
            All news →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {news.map((article) => (
            <article key={article.id} className="qwa-glass-card">
              <span className="qwa-badge">{article.category}</span>
              <h3 className="mt-3 font-semibold text-[var(--qwa-fg)]">{article.title}</h3>
              <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">{article.excerpt}</p>
              <p className="mt-4 text-xs text-[var(--qwa-fg-muted)]">
                {article.source} · {article.publishedAt}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Labs */}
      <section className="qwa-container py-16" aria-labelledby="labs-heading">
        <h2 id="labs-heading" className="qwa-section-title">
          Featured Labs
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredLabs.map((lab) => (
            <Link key={lab.id} href={`/labs/${lab.slug}`} className="qwa-glass-card block">
              <span className="qwa-badge">{lab.difficulty}</span>
              <h3 className="mt-3 font-semibold text-[var(--qwa-fg)]">{lab.title}</h3>
              <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">{lab.description}</p>
              <p className="mt-4 text-xs text-[var(--qwa-fg-muted)]">{lab.durationMinutes} min</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="qwa-container py-16" aria-labelledby="dashboard-heading">
        <h2 id="dashboard-heading" className="qwa-section-title">
          Track Your Progress
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="qwa-glass-card text-center">
            <p className="text-3xl font-bold qwa-text-gradient">{progress.xp.toLocaleString()}</p>
            <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">XP earned</p>
          </div>
          <div className="qwa-glass-card text-center">
            <p className="text-3xl font-bold qwa-text-gradient">{progress.streakDays}</p>
            <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">Day streak</p>
          </div>
          <div className="qwa-glass-card text-center">
            <p className="text-3xl font-bold qwa-text-gradient">{progress.badges.length}</p>
            <p className="mt-1 text-sm text-[var(--qwa-fg-muted)]">Badges unlocked</p>
          </div>
        </div>
        <Link href="/dashboard" className="qwa-btn-primary mt-8 inline-flex">
          Open Scholar Dashboard
        </Link>
      </section>

      {/* Testimonials */}
      <section className="qwa-container py-16" aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading" className="qwa-section-title text-center">
          Scholar Stories
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              quote: "The Qiskit labs and career modules helped me pivot from classical DevOps to a quantum cloud role.",
              name: "Priya S.",
              role: "Quantum Cloud Engineer",
            },
            {
              quote: "Module 1 cleared up superposition vs parallelism — exactly what I needed for stakeholder conversations.",
              name: "Marcus T.",
              role: "Solutions Architect",
            },
            {
              quote: "Bell state lab on real IBM hardware was the portfolio piece that got me interviews.",
              name: "Elena R.",
              role: "Quantum Software Developer",
            },
          ].map(({ quote, name, role }) => (
            <blockquote key={name} className="qwa-glass-card">
              <p className="text-[var(--qwa-fg-muted)]">&ldquo;{quote}&rdquo;</p>
              <footer className="mt-4">
                <cite className="not-italic font-semibold text-[var(--qwa-fg)]">{name}</cite>
                <p className="text-sm text-[var(--qwa-fg-muted)]">{role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="qwa-container py-20 text-center" aria-labelledby="cta-heading">
        <div className="qwa-glass-card mx-auto max-w-2xl">
          <h2 id="cta-heading" className="text-2xl font-bold text-[var(--qwa-fg)] sm:text-3xl">
            Ready to enter the quantum workforce?
          </h2>
          <p className="mt-4 text-[var(--qwa-fg-muted)]">
            Start with {course.title} — {course.modules.length} modules, {lessonCount} lessons, and 20 labs.
          </p>
          <Link href="/course" className="qwa-btn-primary mt-8 inline-flex">
            Begin Your Journey
          </Link>
        </div>
      </section>
    </>
  );
}
