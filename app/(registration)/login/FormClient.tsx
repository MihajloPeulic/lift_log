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
      if (err?.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT")) {
        return; 
      }

      setError("Došlo je do neočekivane greške.");
      setLoading(false);
    }
  }

  return (
    <article className="card-main w-full p-5 sm:p-8 space-y-5">
      <header>
        <h1 id="login-title" className="text-h1">
          Welcome back
        </h1>
        <p className="text-caption mt-1.5 sm:mt-2">
          Sign in to continue tracking your progress.
        </p>
      </header>

      {/* Prikaz greške ako postoji */}
      {error && (
        <div className="rounded-button bg-red-500/10 p-3 text-xs sm:text-sm text-red-500 border border-red-500/20 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="text-label block mb-1.5 sm:mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="input-box w-full placeholder:text-text-muted"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between sm:mb-2">
            <label htmlFor="password" className="text-label">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs sm:text-sm text-primary hover:text-primary-hover font-semibold transition">
              Forgot password?
            </Link>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="input-box w-full placeholder:text-text-muted"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-2.5 sm:py-3 text-sm sm:text-base font-bold text-black cursor-pointer disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <button
          type="button"
          className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-button border border-border bg-surface px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-text transition hover:bg-surface-light"
        >
          Continue with Google
        </button>
      </form>

      <footer className="mt-5 text-center text-xs sm:text-sm text-text-secondary">
        Don't have an account?
        <Link href="/signup" className="ml-1 font-semibold text-primary hover:text-primary-hover transition">
          Sign up
        </Link>
      </footer>
    </article>
  );
}