"use client";

import { useEffect, useState } from "react";
import AddMealButton from "./AddMealButton";
import MealsList from "./MealsList";
import CaloriesAndNutrients from "@/app/(app)/nutrition/nutrient-components/CaloriesAndNutrients";
import { CalorieNeeds } from "@/app/types/food";
import { CalculateCaloriesAndMacros, CalculateDailyNutrition, CalculateMicros } from "@/app/lib/utils/nutrition";

export default function MealsSection({
  initialMeals,
  selectedDate,
  dailyTargets
}: {
  initialMeals: any[];
  selectedDate: string;
  dailyTargets: CalorieNeeds;
}) {
  const [meals, setMeals] = useState(initialMeals);

  useEffect(() => {
    setMeals(initialMeals);
  }, [initialMeals]);

  const dailyTotals = CalculateDailyNutrition(meals, null, null);
  const micros = CalculateMicros(dailyTotals);
  const dailyStuffAll = CalculateCaloriesAndMacros(dailyTargets, dailyTotals);

  return (
    <section className="w-full min-w-0 overflow-hidden space-y-6 sm:space-y-8">
      
      {/* Nutrijenti omotač */}
      <div className="w-full min-w-0">
        <CaloriesAndNutrients
          dailyTotals={dailyTotals}
          calorieGoal={dailyStuffAll.calorieGoal}
          macros={dailyStuffAll.macros}
          micros={micros}
          caloriePercent={dailyStuffAll.caloriePercent}
        />
      </div>

      {/* Zaglavlje i dugme za dodavanje */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-text truncate">
          Meals
        </h2>

        <div className="shrink-0">
          <AddMealButton
            setMeals={setMeals}
            selectedDate={selectedDate}
          />
        </div>
      </div>

      {/* Lista obroka omotač */}
      <div className="w-full min-w-0 min-h-[20vh]">
        <MealsList meals={meals} selectedDate={selectedDate} />
      </div>

    </section>
  );
}