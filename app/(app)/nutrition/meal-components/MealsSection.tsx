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
    <section className="mt-6 w-full min-w-0 overflow-hidden sm:mt-10">
      {/* Nutrijenti omotač sa overflow osiguranjem */}
      <div className="mb-8 w-full min-w-0 sm:mb-12">
        <CaloriesAndNutrients
          dailyTotals={dailyTotals}
          calorieGoal={dailyStuffAll.calorieGoal}
          macros={dailyStuffAll.macros}
          micros={micros}
          caloriePercent={dailyStuffAll.caloriePercent}
        />
      </div>

      {/* Zaglavlje i dugme za dodavanje */}
      <div className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
        <h2 className="truncate text-xl font-bold sm:text-2xl">
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
      <div className="w-full min-w-0">
        <MealsList meals={meals} selectedDate={selectedDate} />
      </div>
    </section>
  );
}