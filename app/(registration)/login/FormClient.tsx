"use client";

import { useState } from "react";
import { logInAction } from "@/app/actions/auth";
import Link from "next/link";

export default function LogInForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await logInAction(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (err: any) {
      setError("Došlo je do neočekivane greške.");
      setLoading(false);
    }
  }

  return (
    <article className="w-full rounded-card border border-border bg-surface p-5 shadow-xl sm:p-8">
      <header className="mb-5 sm:mb-6">
        <h1 id="login-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back
        </h1>
        <p className="mt-1.5 text-xs text-text-secondary sm:mt-2 sm:text-sm">
          Sign in to continue tracking your progress.
        </p>
      </header>

      {/* Prikaz greške ako postoji */}
      {error && (
        <div className="mb-4 rounded-button bg-red-500/10 p-3 text-xs sm:text-sm text-red-500 border border-red-500/20 animate-shake">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-button border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between sm:mb-2">
            <label htmlFor="password" className="text-xs font-medium sm:text-sm">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-primary hover:text-primary-hover sm:text-sm transition">
              Forgot password?
            </Link>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full rounded-button border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-button bg-primary py-2.5 font-semibold text-black transition hover:bg-primary-hover active:scale-[0.98] sm:py-3 text-sm sm:text-base cursor-pointer disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-button border border-border py-2.5 font-medium transition hover:bg-surface-light sm:py-3 text-sm sm:text-base cursor-pointer"
        >
          Continue with Google
        </button>
      </form>

      <footer className="mt-5 text-center text-xs text-text-secondary sm:mt-6 sm:text-sm">
        Don't have an account?
        <Link href="/signup" className="ml-1 font-medium text-primary hover:text-primary-hover transition">
          Sign up
        </Link>
      </footer>
    </article>
  );
}