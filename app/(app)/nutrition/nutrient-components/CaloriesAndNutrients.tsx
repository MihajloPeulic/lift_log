"use client"


import Micronutrients from "./Micronutrients";
import { NutritionTotals } from "@/app/types/food"
import Macronutrients from "./Macronutrients";
import { useState } from "react";



export default function CaloriesAndNutrients(
   {
    dailyTotals,
    calorieGoal,
    caloriePercent,
    macros,
    micros
   } :{
    dailyTotals: NutritionTotals,
    calorieGoal: number,
    caloriePercent: number,
    macros: any[],
    micros: any[]
}

) {
const [page, setPage] = useState(0);
        
    return (
    <div className="relative">

        <div className="overflow-hidden">

            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                    transform: `translateX(-${page * 100}%)`,
                }}
            >
                <div className="w-full shrink-0">
                    <Macronutrients
                        dailyTotals={dailyTotals}
                        calorieGoal={calorieGoal}
                        macros={macros}
                        caloriePercent={caloriePercent}
                    />
                </div>

                <div className="w-full shrink-0">
                    <Micronutrients
                        micros={micros}
                    />
                </div>
            </div>

        </div>

        <div className="mt-6 flex items-center justify-center gap-4">

            <button
                onClick={() => setPage(0)}
                disabled={page === 0}
                className="disabled:cursor-default cursor-pointer rounded-full border border-border px-3 py-2 disabled:opacity-40"
            >
                ←
            </button>

            <div className="flex gap-2">
                <div
                    className={`h-2 w-2 rounded-full ${
                        page === 0 ? "bg-primary" : "bg-surface-light"
                    }`}
                />
                <div
                    className={`h-2 w-2 rounded-full ${
                        page === 1 ? "bg-primary" : "bg-surface-light"
                    }`}
                />
            </div>

            <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="disabled:cursor-default cursor-pointer rounded-full border border-border px-3 py-2 disabled:opacity-40"
            >
                →
            </button>

        </div>

    </div>
);
    
}