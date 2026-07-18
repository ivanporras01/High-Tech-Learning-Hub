import Link from "next/link";
import { QwaLogo } from "@/components/ui/qwa-logo";

const FOOTER_LINKS = {
  Learn: [
    { href: "/course", label: "Course Catalog" },
    { href: "/technologies", label: "Technology Classes" },
    { href: "/simulations", label: "Simulations & Visuals" },
    { href: "/labs", label: "Qiskit Labs" },
    { href: "/dashboard", label: "Scholar Dashboard" },
  ],
  Careers: [
    { href: "/workforce", label: "Career Roadmap" },
    { href: "/companies", label: "Quantum Employers" },
    { href: "/news", label: "Industry News" },
  ],
  Platform: [
    { href: "/admin", label: "Admin" },
    { href: "/course/foundations-of-quantum-computing/what-is-quantum-computing", label: "Sample Lesson" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] backdrop-blur-xl">
      <div className="qwa-container-wide py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <QwaLogo size={48} variant="full" className="drop-shadow-[0_0_14px_rgba(167,139,250,0.3)]" />
              <p className="text-lg font-bold qwa-text-gradient">Quantum Workforce Academy</p>
            </div>
            <p className="mt-3 text-sm text-[var(--qwa-fg-muted)]">
              College &amp; university quantum workforce development — rigorous curriculum from
              qubit theory to industry careers.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--qwa-fg)]">
                {section}
              </h2>
              <ul className="mt-4 space-y-2" role="list">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--qwa-fg-muted)] transition hover:text-[var(--qwa-cyan)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--qwa-border)] pt-8 sm:flex-row">
          <p className="text-sm text-[var(--qwa-fg-muted)]">
            © {new Date().getFullYear()} Quantum Workforce Academy. Educational content for workforce development.
          </p>
          <p className="text-xs text-[var(--qwa-fg-muted)]">
            High Tech Learning Hub · github.com/ivanporras01/High-Tech-Learning-Hub
          </p>
        </div>
      </div>
    </footer>
  );
}
