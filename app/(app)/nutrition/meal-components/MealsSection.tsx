"use client"

import { useEffect, useState } from "react";
import AddMealButton from "./AddMealButton";
import MealsList from "./MealsList";
import CaloriesAndNutrients from "@/app/(app)/nutrition/nutrient-components/CaloriesAndNutrients";
import { NutritionTotals } from "@/app/types/food"

import {
    calculateFoodNutrition,
    calculateMealNutrition
} from "@/app/lib/data/calculateNutrition";
import { CalorieNeeds } from "@/app/types/food";
import { CalculateCaloriesAndMacros, CalculateDailyNutrition, CalculateMicros } from "@/app/lib/utils/nutrition";

export default function MealsSection({
    initialMeals,
    selectedDate,
    dailyTargets
}:{
    initialMeals:any[]
    selectedDate: string,
    dailyTargets: CalorieNeeds
}) {
    // console.log("render");
    const [meals, setMeals] = useState(initialMeals);

    useEffect(() => {
        setMeals(initialMeals);
    }, [initialMeals]);

    const dailyTotals = CalculateDailyNutrition(meals, null,  null)
    const micros = CalculateMicros(dailyTotals)
    const dailyStuffAll = CalculateCaloriesAndMacros(dailyTargets, dailyTotals)

    return (
        <section className="mt-6 sm:mt-10 w-full min-w-0">

            <div className="mb-10 sm:mb-12 w-full">
                {/* 2. Zatvaranje komponente self-closing tagom izgleda malo čistije */}
                <CaloriesAndNutrients
                    dailyTotals={dailyTotals}
                    calorieGoal={dailyStuffAll.calorieGoal}
                    macros={dailyStuffAll.macros}
                    micros={micros}
                    caloriePercent={dailyStuffAll.caloriePercent}
                />
            </div>

            {/* 3. Dodat gap-4 i shrink-0 da dugme i naslov imaju prostora i na uskim ekranima */}
            <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold truncate">
                    Meals
                </h2>

                <div className="shrink-0">
                    <AddMealButton
                        setMeals={setMeals}
                        selectedDate={selectedDate}
                    />
                </div>
            </div>

            {/* 4. Sigurnosni omotač oko liste obroka */}
            <div className="w-full">
                <MealsList meals={meals} selectedDate={selectedDate} />
            </div>

        </section>
    );
}