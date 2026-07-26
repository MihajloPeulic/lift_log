"use client"

import { useEffect, useState } from "react";
import AddMealButton from "./AddMealButton";
import MealsList from "./MealsList";
import CaloriesAndNutrients from "@/app/(app)/nutrition/nutrient-components/CaloriesAndNutrients";
import { micronutrientTargets } from "@/app/constants/nutrition";
import { NutritionTotals } from "@/app/types/food"



import {
    calculateFoodNutrition,
    calculateMealNutrition
} from "@/app/lib/data/calculateNutrition";
import { CalorieNeeds } from "@/app/types/food";

export default function MealsSection({
    initialMeals,
    selectedDate,
    dailyTargets
}:{
    initialMeals:any[]
    selectedDate: string,
    dailyTargets: CalorieNeeds
}) {

    console.log("render");
    const [meals, setMeals] = useState(initialMeals);

    useEffect(() => {
        setMeals(initialMeals);
    }, [initialMeals]);

    const dailyTotals = meals.reduce(

    (total, meal) => {

        const mealTotals = calculateMealNutrition(
            meal.meal_items ?? []
        );


        return {
            calories: total.calories + mealTotals.calories,
            protein: total.protein + mealTotals.protein,
            carbs: total.carbs + mealTotals.carbs,
            fat: total.fat + mealTotals.fat,

            fiber: total.fiber + mealTotals.fiber,
            sugar: total.sugar + mealTotals.sugar,
            sodium: total.sodium + mealTotals.sodium,
            cholesterol: total.cholesterol + mealTotals.cholesterol,

            vitamin_a: total.vitamin_a + mealTotals.vitamin_a,
            vitamin_c: total.vitamin_c + mealTotals.vitamin_c,
            vitamin_d: total.vitamin_d + mealTotals.vitamin_d,
            vitamin_e: total.vitamin_e + mealTotals.vitamin_e,
            vitamin_k: total.vitamin_k + mealTotals.vitamin_k,

            vitamin_b1: total.vitamin_b1 + mealTotals.vitamin_b1,
            vitamin_b2: total.vitamin_b2 + mealTotals.vitamin_b2,
            vitamin_b3: total.vitamin_b3 + mealTotals.vitamin_b3,
            vitamin_b5: total.vitamin_b5 + mealTotals.vitamin_b5,
            vitamin_b6: total.vitamin_b6 + mealTotals.vitamin_b6,
            vitamin_b7: total.vitamin_b7 + mealTotals.vitamin_b7,
            vitamin_b9: total.vitamin_b9 + mealTotals.vitamin_b9,
            vitamin_b12: total.vitamin_b12 + mealTotals.vitamin_b12,

            calcium: total.calcium + mealTotals.calcium,
            iron: total.iron + mealTotals.iron,
            magnesium: total.magnesium + mealTotals.magnesium,
            phosphorus: total.phosphorus + mealTotals.phosphorus,
            potassium: total.potassium + mealTotals.potassium,
            zinc: total.zinc + mealTotals.zinc,
            copper: total.copper + mealTotals.copper,
            manganese: total.manganese + mealTotals.manganese,
            selenium: total.selenium + mealTotals.selenium,

            iodine: total.iodine + mealTotals.iodine,
            chromium: total.chromium + mealTotals.chromium,
            molybdenum: total.molybdenum + mealTotals.molybdenum,
            choline: total.choline + mealTotals.choline,

            omega_3: total.omega_3 + mealTotals.omega_3,
            omega_6: total.omega_6 + mealTotals.omega_6,
        };

    },

    {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,

        fiber: 0,
        sugar: 0,
        sodium: 0,
        cholesterol: 0,

        vitamin_a: 0,
        vitamin_c: 0,
        vitamin_d: 0,
        vitamin_e: 0,
        vitamin_k: 0,

        vitamin_b1: 0,
        vitamin_b2: 0,
        vitamin_b3: 0,
        vitamin_b5: 0,
        vitamin_b6: 0,
        vitamin_b7: 0,
        vitamin_b9: 0,
        vitamin_b12: 0,

        calcium: 0,
        iron: 0,
        magnesium: 0,
        phosphorus: 0,
        potassium: 0,
        zinc: 0,
        copper: 0,
        manganese: 0,
        selenium: 0,

        iodine: 0,
        chromium: 0,
        molybdenum: 0,
        choline: 0,

        omega_3: 0,
        omega_6: 0,
    }

);


const micros = Object.entries(micronutrientTargets).map(
    ([name, target]) => {

        const current =
            dailyTotals[name as keyof NutritionTotals] ?? 0;

        return {
            name,

            daily_target: target.value * target.multiplier,

            unit: target.unit,

            value: Number(
                (current * target.multiplier).toFixed(2)
            ),

            percent: current === 0
                ? 0
                : Math.round(
                    (current / target.value) * 100
                )
        };
    }
);




    const cal_exp = dailyTargets.custom_calorie_target !== null ? dailyTargets.custom_calorie_target : dailyTargets.calorie_expenditure
    //ukupne vrijednosti koje treba hitati
    const calorieGoal = Number(cal_exp.toFixed(1));
    const dailyProtein = Number(dailyTargets.protein_needs.toFixed(1))
    const dailyFat = Number(dailyTargets.fat_needs.toFixed(1))
    const dailyCarbs = Number(dailyTargets.carbs_needs.toFixed(1))

    
    const caloriePercent = Math.round((dailyTotals.calories/calorieGoal)*100)

    const macros = [
        {
            name: "Protein",
            daily_target: dailyProtein,
            percent: dailyTotals.protein === 0 ? 0 : Math.round((dailyTotals.protein/dailyProtein)*100),
            value: Number(dailyTotals.protein.toFixed(1))
        },
        {
            name: "Fat",
            daily_target: dailyFat,
            percent: dailyTotals.fat === 0 ? 0 : Math.round((dailyTotals.fat/dailyFat)*100),
            value: Number(dailyTotals.fat.toFixed(1))
        },
        {
            name: "Carbs",
            daily_target: dailyCarbs,
            percent: dailyTotals.carbs === 0 ? 0 : Math.round((dailyTotals.carbs/dailyCarbs)*100),
            value: Number(dailyTotals.carbs.toFixed(1))
        }
    ]


    





    return (
        <section className="mt-10">

            <CaloriesAndNutrients
                dailyTotals={dailyTotals}
                calorieGoal={calorieGoal}
                macros={macros}
                micros={micros}
                caloriePercent={caloriePercent}
            >

            </CaloriesAndNutrients>

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold">
                    Meals
                </h2>

                <AddMealButton
                    setMeals={setMeals}
                    selectedDate={selectedDate}
                />

            </div>

            <MealsList meals={meals} selectedDate={selectedDate} />

        </section>
    );
}