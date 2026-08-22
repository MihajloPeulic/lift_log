"use client";

import { useState } from "react";
import { signUpAction } from "@/app/actions/auth"; // Prilagodi putanju do auth akcija
import Link from "next/link";

export default function SignUpForm({ role }: { role: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // Klijentska provjera lozinki prije slanja na server
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");

    if (password !== confirmPassword) {
      setError("Lozinke se ne podudaraju.");
      setLoading(false);
      return;
    }

    try {
      const result = await signUpAction(formData);

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
        <h1 id="register-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Create account
        </h1>
        <p className="mt-1.5 text-xs text-text-secondary sm:mt-2 sm:text-sm">
          Start tracking your workouts and reach new personal records.
        </p>
      </header>

      {/* Prikaz greške ako postoji */}
      {error && (
        <div className="mb-4 rounded-button bg-red-500/10 p-3 text-xs sm:text-sm text-red-500 border border-red-500/20">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4 sm:space-y-5">
        <input type="hidden" name="role" value={role} />

        <div>
          <label htmlFor="full_name" className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            placeholder="john_lifts2"
            autoComplete="name"
            className="w-full rounded-button border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3"
          />
        </div>

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
            autoComplete="email"
            className="w-full rounded-button border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Create a password"
            autoComplete="new-password"
            className="w-full rounded-button border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3"
          />
        </div>

        <div>
          <label htmlFor="confirm_password" className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
            Confirm password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            required
            placeholder="Repeat your password"
            autoComplete="new-password"
            className="w-full rounded-button border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 sm:px-4 sm:py-3"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="terms"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 rounded border-border bg-surface text-primary focus:ring-primary cursor-pointer"
            name="terms_of_service"
          />
          <label htmlFor="terms" className="text-xs sm:text-sm text-text-secondary leading-normal">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:text-primary-hover transition">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:text-primary-hover transition">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-button bg-primary py-2.5 font-semibold text-black transition hover:bg-primary-hover active:scale-[0.98] sm:py-3 text-sm sm:text-base cursor-pointer disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-button border border-border py-2.5 font-medium transition hover:bg-surface-light sm:py-3 text-sm sm:text-base cursor-pointer"
        >
          Continue with Google
        </button>
      </form>

      <footer className="mt-5 text-center text-xs text-text-secondary sm:mt-6 sm:text-sm">
        Already have an account?
        <Link href="/login" className="ml-1 font-medium text-primary hover:text-primary-hover transition">
          Sign in
        </Link>
      </footer>
    </article>
  );
}