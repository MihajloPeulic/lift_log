"use client";

import { NutritionTotals } from "@/app/types/food";

export default function Macronutrients({
  dailyTotals,
  calorieGoal,
  caloriePercent,
  macros
}: {
  dailyTotals: NutritionTotals;
  calorieGoal: number;
  caloriePercent: number;
  macros: any[];
}) {
  const safeCaloriePercent = Math.min(Math.max(caloriePercent, 0), 100);

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">
      {/* CALORIES SECTION */}
      <section className="w-full min-w-0">
        <h2 className="text-lg font-bold sm:text-xl">Calories</h2>

        <div className="mt-3 w-full min-w-0 rounded-card border border-border bg-surface p-4 sm:mt-5 sm:p-card">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-text-secondary sm:text-sm">Calories</p>
              <div className="mt-1 flex items-baseline gap-1.5 flex-wrap sm:mt-2">
                <span className="text-2xl font-bold sm:text-4xl">
                  {dailyTotals.calories.toFixed(0)}
                </span>
                <span className="text-xs text-text-secondary sm:text-xl">
                  /{calorieGoal} kcal
                </span>
              </div>
            </div>

            {/* Responzivni krug koji se smanjuje na mobilnom */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-primary text-sm font-bold sm:h-24 sm:w-24 sm:border-8 sm:text-base">
              {caloriePercent.toFixed(0)}%
            </div>
          </div>

          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-surface-light sm:mt-6 sm:h-3">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{
                width: `${safeCaloriePercent}%`
              }}
            />
          </div>
        </div>
      </section>

      {/* MACROS BREAKDOWN */}
      <section className="w-full min-w-0">
        <h2 className="text-lg font-bold sm:text-xl">Macro Breakdown</h2>

        <div className="mt-3 grid gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-5">
          {macros.map((macro) => {
            const safeMacroPercent = Math.min(Math.max(macro.percent, 0), 100);

            return (
              <article
                key={macro.name}
                className="w-full min-w-0 rounded-card border border-border bg-surface p-4 sm:p-card"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-text-secondary sm:text-sm">
                    {macro.name}
                  </p>
                  <span className="text-xs font-semibold text-primary sm:text-sm">
                    {macro.percent}%
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-1 sm:mt-2">
                  <span className="text-xl font-bold sm:text-3xl">
                    {macro.value}
                  </span>
                  <span className="text-xs text-text-secondary sm:text-base">
                    /{macro.daily_target}g
                  </span>
                </div>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-light sm:mt-4">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{
                      width: `${safeMacroPercent}%`
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}