"use client";

import { useState } from "react";
import { signUpAction } from "@/app/actions/auth";
import Link from "next/link";

export default function SignUpForm({ role }: { role: string }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

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
    <article className="card-main w-full p-5 sm:p-8 space-y-5">
      <header>
        <h1 id="register-title" className="text-h1">
          Create account
        </h1>
        <p className="text-caption mt-1.5 sm:mt-2">
          Start tracking your workouts and reach new personal records.
        </p>
      </header>

      {/* Prikaz greške */}
      {error && (
        <div className="rounded-button bg-red-500/10 p-3 text-xs sm:text-sm text-red-500 border border-red-500/20 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <input type="hidden" name="role" value={role} />

        <div>
          <label htmlFor="full_name" className="text-label block mb-1.5 sm:mb-2">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            placeholder="john_lifts2"
            autoComplete="name"
            className="input-box w-full placeholder:text-text-muted"
          />
        </div>

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
            autoComplete="email"
            className="input-box w-full placeholder:text-text-muted"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-label block mb-1.5 sm:mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Create a password"
            autoComplete="new-password"
            className="input-box w-full placeholder:text-text-muted"
          />
        </div>

        <div>
          <label htmlFor="confirm_password" className="text-label block mb-1.5 sm:mb-2">
            Confirm password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            required
            placeholder="Repeat your password"
            autoComplete="new-password"
            className="input-box w-full placeholder:text-text-muted"
          />
        </div>

        <div className="flex items-start gap-3 pt-1">
          <input
            id="terms"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary cursor-pointer accent-primary"
            name="terms_of_service"
          />
          <label htmlFor="terms" className="text-xs sm:text-sm text-text-secondary leading-normal">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:text-primary-hover font-semibold transition">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:text-primary-hover font-semibold transition">
              Privacy Policy
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-2.5 sm:py-3 text-sm sm:text-base font-bold text-black cursor-pointer disabled:opacity-50 mt-2"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <button
          type="button"
          className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-button border border-border bg-surface px-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-text transition hover:bg-surface-light"
        >
          Continue with Google
        </button>
      </form>

      <footer className="mt-5 text-center text-xs sm:text-sm text-text-secondary">
        Already have an account?
        <Link href="/login" className="ml-1 font-semibold text-primary hover:text-primary-hover transition">
          Sign in
        </Link>
      </footer>
    </article>
  );
}