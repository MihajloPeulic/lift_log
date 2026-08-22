"use client";

import { finishProfileAction } from "@/app/actions/auth";
import { useState } from "react";

export default function ProfileMeasurements() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [activityOpen, setActivityOpen] = useState(false);
  const [activity, setActivity] = useState("");
  
  // Novi state za greške i loading
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
      setError("Došlo je do neočekivane greške. Pokušajte ponovo.");
      setLoading(false);
    }
  }

  return (
    <section className="w-full max-w-md">
      {/* Logo */}
      <header className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-2xl font-bold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-black">
            L
          </span>
          LiftLog
        </div>
      </header>

      <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl sm:p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">
            Complete your profile
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Help us personalize your training experience.
          </p>
        </header>

        {/* Prikaz greške ako postoji */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-500/10 p-3 text-xs sm:text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="space-y-5">
          {/* Date of Birth */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Date of Birth
            </label>
            <input
              name="date_of_birth"
              type="date"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Gender
            </label>
            <select
              name="gender"
              required
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-green-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Unit system */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Unit system
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`cursor-pointer rounded-xl border p-4 text-center transition ${
                  unitSystem === "metric"
                    ? "border-green-500 bg-green-500/10 text-green-500"
                    : "border-zinc-700 hover:bg-zinc-800"
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
                <p className="font-semibold">Metric</p>
                <p className="mt-1 text-xs text-zinc-400">kg, cm</p>
              </label>

              <label
                className={`cursor-pointer rounded-xl border p-4 text-center transition ${
                  unitSystem === "imperial"
                    ? "border-green-500 bg-green-500/10 text-green-500"
                    : "border-zinc-700 hover:bg-zinc-800"
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
                <p className="font-semibold">Imperial</p>
                <p className="mt-1 text-xs text-zinc-400">lb, ft/in</p>
              </label>
            </div>
          </div>

          {/* Bodyweight */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Bodyweight
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                required
                placeholder={unitSystem === "metric" ? "70" : "154"}
                name="bodyweight"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 pr-14 outline-none focus:border-green-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                {unitSystem === "metric" ? "kg" : "lb"}
              </span>
            </div>
          </div>

          {/* Height */}
          <div>
            <label className="mb-2 block text-sm font-medium">
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
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 pr-14 outline-none focus:border-green-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
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
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 pr-10 outline-none focus:border-green-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                    ft
                  </span>
                </div>
                <div className="relative">
                  <input
                    name="inch"
                    type="number"
                    required
                    placeholder="10"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 pr-10 outline-none focus:border-green-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                    in
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Activity level */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Activity level
            </label>
            <select
              name="activity"
              required
              onChange={(e) => setActivity(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-green-500"
            >
              <option value="">Select your activity level</option>
              <option value="sedentary">Sedentary - Little or no exercise</option>
              <option value="lightly_active">Lightly active - Exercise 1-3 days/week</option>
              <option value="moderately_active">Moderately active - Exercise 3-5 days/week</option>
              <option value="very_active">Very active - Hard training 6-7 days/week</option>
              <option value="extremely_active">Extremely active - Athlete or physical job</option>
            </select>
          </div>

          {/* Body Fat */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Body Fat (Optional)
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                placeholder="15"
                name="bodyFat"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 pr-14 outline-none focus:border-green-500"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                %
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-green-500 py-3 font-semibold text-black transition hover:bg-green-400 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving profile..." : "Finish setup"}
          </button>
        </form>
      </article>
    </section>
  );
}