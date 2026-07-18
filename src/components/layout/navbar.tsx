"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { QwaLogo } from "@/components/ui/qwa-logo";
import { useScholar } from "@/components/providers/scholar-provider";

const NAV_LINKS = [
  { href: "/course", label: "Course" },
  { href: "/technologies", label: "Technologies" },
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
      <nav className="qwa-container flex h-16 items-center justify-between gap-4" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight" aria-label="Quantum Workforce Academy home">
          <QwaLogo size={34} variant="icon" className="shrink-0 qwa-logo-pulse" />
          <span className="hidden sm:inline">Quantum Workforce Academy</span>
          <span className="sm:hidden">QWA</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--qwa-accent)]/15 text-[var(--qwa-violet)] dark:text-[var(--qwa-cyan)]"
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {scholar ? (
            <>
              <span className="hidden max-w-[120px] truncate text-xs text-[var(--qwa-fg-muted)] sm:inline">{scholar.fullName.split(" ")[0]}</span>
              <button type="button" onClick={logout} className="qwa-btn-secondary hidden text-xs sm:inline-flex">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="qwa-btn-secondary hidden text-xs sm:inline-flex">Login</Link>
              <Link href="/register" className="hidden text-xs text-[var(--qwa-cyan)] hover:underline sm:inline">Register</Link>
            </>
          )}
          <Link href="/course" className="qwa-btn-primary hidden text-sm sm:inline-flex">Start Learning</Link>
        </div>
      </nav>

      <div className="qwa-container pb-3 md:hidden">
        <ul className="flex gap-1 overflow-x-auto pb-1" role="list" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <Link href={href} className="qwa-badge whitespace-nowrap hover:opacity-80">{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
