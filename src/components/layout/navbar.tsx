"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { QwaLogo } from "@/components/ui/qwa-logo";
import { useScholar } from "@/components/providers/scholar-provider";

const NAV_LINKS = [
  { href: "/course", label: "Course" },
  { href: "/technologies", label: "Tech" },
  { href: "/simulations", label: "Simulations" },
  { href: "/labs", label: "Labs" },
  { href: "/dashboard", label: "Scholar" },
  { href: "/workforce", label: "Careers" },
  { href: "/companies", label: "Companies" },
  { href: "/news", label: "News" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scholar, logout } = useScholar();

  return (
    <header className="qwa-glass-nav sticky top-0 z-50">
      <nav className="qwa-container flex h-16 items-center justify-between gap-3" aria-label="Main navigation">
        <Link href="/" className="qwa-brand shrink-0" aria-label="Quantum Workforce Academy home">
          <QwaLogo size={52} variant="icon" className="qwa-brand-logo qwa-logo-pulse shrink-0" />
          <span className="qwa-brand-short sm:hidden">QWA</span>
          <span className="qwa-brand-stack hidden sm:flex">
            <span className="qwa-brand-line">Quantum</span>
            <span className="qwa-brand-line">Workforce</span>
            <span className="qwa-brand-line qwa-brand-line--accent">Academy</span>
          </span>
        </Link>

        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition xl:px-3 xl:text-sm ${
                    active
                      ? "bg-[var(--qwa-accent)]/15 text-[var(--qwa-cyan)]"
                      : "text-[var(--qwa-fg-muted)] hover:text-[var(--qwa-fg)]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          {scholar ? (
            <>
              <span className="hidden max-w-[5rem] truncate text-xs text-[var(--qwa-fg-muted)] md:inline">
                {scholar.fullName.split(" ")[0]}
              </span>
              <button type="button" onClick={logout} className="qwa-btn-secondary hidden px-3 py-1.5 text-xs md:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="qwa-btn-secondary hidden px-3 py-1.5 text-xs md:inline-flex">Login</Link>
              <Link href="/register" className="hidden text-xs text-[var(--qwa-cyan)] hover:underline md:inline">Register</Link>
            </>
          )}
          <Link href="/course" className="qwa-btn-primary hidden px-3 py-1.5 text-xs md:inline-flex xl:text-sm">
            Start
          </Link>
        </div>
      </nav>

      <div className="qwa-container pb-2.5 lg:hidden">
        <ul className="flex gap-1 overflow-x-auto pb-1" role="list" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <Link href={href} className="qwa-badge whitespace-nowrap text-xs hover:opacity-80">{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
