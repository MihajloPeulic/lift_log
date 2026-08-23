"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupRolePage() {
    type Role = "athlete" | "coach" | "";

    const [role, setRole] = useState<Role>("");
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!role) return;
      router.push(`/signup?role=${role}`);
    }

    return (
      <main className="min-h-screen text-text flex items-center justify-center px-4 py-12 bg-background">
        <section className="w-full max-w-3xl">

          {/* Logo */}
          <header className="mb-8 text-center sm:mb-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight sm:text-2xl text-text transition hover:opacity-80"
            >
              <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-button bg-primary text-black font-bold">
                L
              </span>
              LiftLog
            </Link>
          </header>

          <div className="mb-8 sm:mb-10 text-center">
            <h1 className="text-h1">
              Choose your role
            </h1>
            <p className="text-caption mt-2">
              Select how you want to use LiftLog.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-4 sm:gap-6 md:grid-cols-2"
          >
            {/* Athlete */}
            <label
              className={`
                card-main group cursor-pointer transition p-5 sm:p-card flex flex-col justify-between
                ${
                  role === "athlete"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary hover:bg-surface-light"
                }
              `}
            >
              <input
                type="radio"
                name="role"
                value="athlete"
                checked={role === "athlete"}
                onChange={(e) => setRole(e.target.value as Role)}
                className="hidden"
              />

              <div>
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-button bg-primary/10 text-2xl sm:text-3xl">
                  💪
                </div>

                <h2 className="mt-5 text-xl sm:text-2xl font-bold text-text">
                  Athlete
                </h2>

                <p className="text-caption mt-2 sm:mt-3 leading-relaxed">
                  Track your workouts, nutrition, progress and personal records.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex items-center text-sm sm:text-base font-semibold text-primary">
                Select
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </label>

            {/* Coach */}
            <label
              className={`
                card-main group cursor-pointer transition p-5 sm:p-card flex flex-col justify-between
                ${
                  role === "coach"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary hover:bg-surface-light"
                }
              `}
            >
              <input
                type="radio"
                name="role"
                value="coach"
                checked={role === "coach"}
                onChange={(e) => setRole(e.target.value as Role)}
                className="hidden"
              />

              <div>
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-button bg-primary/10 text-2xl sm:text-3xl">
                  🏋️
                </div>

                <h2 className="mt-5 text-xl sm:text-2xl font-bold text-text">
                  Coach
                </h2>

                <p className="text-caption mt-2 sm:mt-3 leading-relaxed">
                  Manage athletes, create programs and track client progress.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex items-center text-sm sm:text-base font-semibold text-primary">
                Select
                <span className="ml-2 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </label>

            <button
              type="submit"
              disabled={!role}
              className="btn-primary md:col-span-2 mt-2 w-full py-3.5 sm:py-4 text-base font-bold text-black cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </form>

          <p className="mt-8 text-center text-xs sm:text-sm text-text-secondary">
            Already have an account?
            <Link
              href="/login"
              className="ml-1 font-semibold text-primary hover:text-primary-hover transition"
            >
              Sign in
            </Link>
          </p>

        </section>
      </main>
    );
}