"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useScholar } from "@/components/providers/scholar-provider";

export default function RegisterPage() {
  const { register } = useScholar();
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = register({
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
      institution: String(fd.get("institution") ?? "") || undefined,
    });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="qwa-container max-w-md py-16">
      <h1 className="text-3xl font-bold qwa-text-gradient">Scholar Registration</h1>
      <p className="mt-2 text-sm text-[var(--qwa-fg-muted)]">Create your Quantum Workforce Academy account.</p>
      <form onSubmit={onSubmit} className="qwa-glass-card mt-8 space-y-4">
        {error && <p className="text-sm text-red-400">{error}</p>}
        <label className="block text-sm">
          Full name
          <input name="fullName" required className="mt-1 w-full rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] px-3 py-2" />
        </label>
        <label className="block text-sm">
          Email
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] px-3 py-2" />
        </label>
        <label className="block text-sm">
          Institution (optional)
          <input name="institution" className="mt-1 w-full rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] px-3 py-2" />
        </label>
        <label className="block text-sm">
          Password (6+ characters)
          <input name="password" type="password" required minLength={6} className="mt-1 w-full rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] px-3 py-2" />
        </label>
        <button type="submit" disabled={pending} className="qwa-btn-primary w-full">{pending ? "Creating…" : "Register"}</button>
      </form>
      <p className="mt-4 text-sm text-[var(--qwa-fg-muted)]">
        Already registered? <Link href="/login" className="text-[var(--qwa-cyan)] hover:underline">Sign in</Link>
      </p>
    </div>
  );
}
