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
        <h2 className="text-lg sm:text-xl font-bold text-text mb-3 sm:mb-5">Calories</h2>

        <div className="card-main w-full min-w-0 p-4 sm:p-card">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-caption">Calories</p>
              <div className="mt-1 flex items-baseline gap-1.5 flex-wrap sm:mt-2">
                <span className="text-2xl sm:text-4xl font-bold text-text">
                  {dailyTotals.calories.toFixed(0)}
                </span>
                <span className="text-xs sm:text-xl font-semibold text-text-secondary">
                  /{calorieGoal} kcal
                </span>
              </div>
            </div>

            {/* Krug postotka */}
            <div className="flex h-16 w-16 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-full border-4 sm:border-8 border-primary text-sm sm:text-base font-bold text-text">
              {caloriePercent.toFixed(0)}%
            </div>
          </div>

          <div className="mt-4 h-2.5 sm:h-3 w-full overflow-hidden rounded-full bg-surface-light sm:mt-6">
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
        <h2 className="text-lg sm:text-xl font-bold text-text mb-3 sm:mb-5">Macro Breakdown</h2>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {macros.map((macro) => {
            const safeMacroPercent = Math.min(Math.max(macro.percent, 0), 100);

            return (
              <article
                key={macro.name}
                className="card-main w-full min-w-0 p-4 sm:p-card"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-caption">
                    {macro.name}
                  </p>
                  <span className="text-xs sm:text-sm font-semibold text-primary">
                    {macro.percent}%
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-1 sm:mt-2">
                  <span className="text-xl sm:text-3xl font-bold text-text">
                    {macro.value}
                  </span>
                  <span className="text-xs sm:text-base font-semibold text-text-secondary">
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