"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useScholar } from "@/components/providers/scholar-provider";

export default function LoginPage() {
  const { login } = useScholar();
  const router = useRouter();
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = login(String(fd.get("email") ?? ""), String(fd.get("password") ?? ""));
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="qwa-container max-w-md py-16">
      <h1 className="text-3xl font-bold qwa-text-gradient">Scholar Sign In</h1>
      <form onSubmit={onSubmit} className="qwa-glass-card mt-8 space-y-4">
        {error && <p className="text-sm text-red-400">{error}</p>}
        <label className="block text-sm">
          Email
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] px-3 py-2" />
        </label>
        <label className="block text-sm">
          Password
          <input name="password" type="password" required className="mt-1 w-full rounded-lg border border-[var(--qwa-border)] bg-[var(--qwa-glass-bg)] px-3 py-2" />
        </label>
        <button type="submit" className="qwa-btn-primary w-full">Sign In</button>
      </form>
      <p className="mt-4 text-sm text-[var(--qwa-fg-muted)]">
        New scholar? <Link href="/register" className="text-[var(--qwa-cyan)] hover:underline">Register</Link>
      </p>
    </div>
  );
}
