"use client"

import { useEffect, useState } from "react";
import AddMealButton from "./AddMealButton";
import MealsList from "./MealsList";
import CaloriesAndNutrients from "./CaloriesAndNutrients";

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

    const [meals, setMeals] = useState(initialMeals);

    useEffect(() => {
        setMeals(initialMeals);
    }, [initialMeals]);




    {/*Macros Calculation*/ }
    const [showAllMicros, setShowAllMicros] = useState(false);


const micronutrients = [
    {
        name:"Fiber",
        value:"18g",
        goal:"30g",
        percent:60
    },
    {
        name:"Sodium",
        value:"1200mg",
        goal:"2300mg",
        percent:52
    },
    {
        name:"Potassium",
        value:"2500mg",
        goal:"3500mg",
        percent:71
    },
    {
        name:"Calcium",
        value:"700mg",
        goal:"1000mg",
        percent:70
    },
    {
        name:"Iron",
        value:"12mg",
        goal:"18mg",
        percent:67
    },
    {
        name:"Magnesium",
        value:"280mg",
        goal:"400mg",
        percent:70
    }
];


const visibleMicros = showAllMicros
    ? micronutrients
    : micronutrients.slice(0,4);






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
            };


        },

        {
            calories:0,
            protein:0,
            carbs:0,
            fat:0
        }

    ); // koliko je unijeto do sada u danu



    //ukupne vrijednosti koje treba hitati
    const calorieGoal = Number(dailyTargets.calorie_expenditure.toFixed(1));
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