"use client";

import { finishProfileAction } from "@/app/actions/auth";
import { useState } from "react";

export default function ProfileMeasurements() {
  const [unitSystem, setUnitSystem] = useState("metric");
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await finishProfileAction(formData);

      if (result?.error) {
        setError(result.error);
        setLoading(false);
      }
    } catch (err: any) {
      if (err?.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT")) {
        return;
      }

      setError("Došlo je do neočekivane greške. Pokušajte ponovo.");
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-md">
      {/* Logo */}
      <header className="mb-6 text-center sm:mb-8">
        <div className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight sm:text-2xl">
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-button bg-primary text-black font-bold">
            L
          </span>
          LiftLog
        </div>
      </header>

      <article className="card-main p-5 sm:p-8 space-y-5">
        <header>
          <h1 className="text-h1">
            Complete your profile
          </h1>
          <p className="text-caption mt-1.5 sm:mt-2">
            Help us personalize your training experience.
          </p>
        </header>

        {/* Prikaz greške ako postoji */}
        {error && (
          <div className="rounded-button bg-red-500/10 p-3 text-xs sm:text-sm text-red-500 border border-red-500/20 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          {/* Date of Birth */}
          <div>
            <label className="text-label block mb-1.5 sm:mb-2">
              Date of Birth
            </label>
            <input
              name="date_of_birth"
              type="date"
              required
              className="input-box w-full"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-label block mb-1.5 sm:mb-2">
              Gender
            </label>
            <select
              name="gender"
              required
              className="input-box bg-background text-text w-full appearance-none cursor-pointer"
            >
              <option className="bg-surface text-text font-medium" value="">Select gender</option>
              <option className="bg-surface text-text font-medium" value="male">Male</option>
              <option className="bg-surface text-text font-medium" value="female">Female</option>
              <option className="bg-surface text-text font-medium" value="other">Other</option>
            </select>
          </div>

          {/* Unit system */}
          <div>
            <label className="text-label block mb-1.5 sm:mb-2">
              Unit system
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`cursor-pointer rounded-button border p-3.5 text-center transition ${
                  unitSystem === "metric"
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border hover:bg-surface-light text-text"
                }`}
              >
                <input
                  type="radio"
                  name="unit"
                  value="metric"
                  checked={unitSystem === "metric"}
                  onChange={(e) => setUnitSystem(e.target.value)}
                  className="hidden"
                />
                <p className="font-bold text-sm sm:text-base">Metric</p>
                <p className="mt-0.5 text-xs text-text-secondary">kg, cm</p>
              </label>

              <label
                className={`cursor-pointer rounded-button border p-3.5 text-center transition ${
                  unitSystem === "imperial"
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-border hover:bg-surface-light text-text"
                }`}
              >
                <input
                  type="radio"
                  name="unit"
                  value="imperial"
                  checked={unitSystem === "imperial"}
                  onChange={(e) => setUnitSystem(e.target.value)}
                  className="hidden"
                />
                <p className="font-bold text-sm sm:text-base">Imperial</p>
                <p className="mt-0.5 text-xs text-text-secondary">lb, ft/in</p>
              </label>
            </div>
          </div>

          {/* Bodyweight */}
          <div>
            <label className="text-label block mb-1.5 sm:mb-2">
              Bodyweight
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                required
                placeholder={unitSystem === "metric" ? "70" : "154"}
                name="bodyweight"
                className="input-box w-full pr-14 placeholder:text-text-muted"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-text-secondary">
                {unitSystem === "metric" ? "kg" : "lb"}
              </span>
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="text-label block mb-1.5 sm:mb-2">
              Height
            </label>
            {unitSystem === "metric" ? (
              <div className="relative">
                <input
                  name="height"
                  type="number"
                  step="any"
                  required
                  placeholder="180"
                  className="input-box w-full pr-14 placeholder:text-text-muted"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-text-secondary">
                  cm
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    name="feet"
                    type="number"
                    required
                    placeholder="5"
                    className="input-box w-full pr-12 placeholder:text-text-muted"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-text-secondary">
                    ft
                  </span>
                </div>
                <div className="relative">
                  <input
                    name="inch"
                    type="number"
                    required
                    placeholder="10"
                    className="input-box w-full pr-12 placeholder:text-text-muted"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-text-secondary">
                    in
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Activity level */}
          <div>
            <label className="text-label block mb-1.5 sm:mb-2">
              Activity level
            </label>
            <select
              name="activity"
              required
              className="input-box bg-background text-text w-full appearance-none cursor-pointer"
            >
              <option className="bg-surface text-text font-medium" value="">Select your activity level</option>
              <option className="bg-surface text-text font-medium" value="sedentary">Sedentary - Little or no exercise</option>
              <option className="bg-surface text-text font-medium" value="lightly_active">Lightly active - Exercise 1-3 days/week</option>
              <option className="bg-surface text-text font-medium" value="moderately_active">Moderately active - Exercise 3-5 days/week</option>
              <option className="bg-surface text-text font-medium" value="very_active">Very active - Hard training 6-7 days/week</option>
              <option className="bg-surface text-text font-medium" value="extremely_active">Extremely active - Athlete or physical job</option>
            </select>
          </div>

          {/* Body Fat */}
          <div>
            <label className="text-label block mb-1.5 sm:mb-2">
              Body Fat (Optional)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                placeholder="15"
                name="bodyFat"
                className="input-box w-full pr-14 placeholder:text-text-muted"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-text-secondary">
                %
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2 w-full py-2.5 sm:py-3 text-sm sm:text-base font-bold text-black cursor-pointer disabled:opacity-50"
          >
            {loading ? "Saving profile..." : "Finish setup"}
          </button>
        </form>
      </article>
    </section>
  );
}