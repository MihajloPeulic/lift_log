"use client"


import Micronutrients from "./Micronutrients";
import { NutritionTotals } from "@/app/types/food"
import Macronutrients from "./Macronutrients";


export default function CaloriesAndNutrients(
   {
    dailyTotals,
    calorieGoal,
    caloriePercent,
    macros
   } :{
    dailyTotals: NutritionTotals,
    calorieGoal: number,
    caloriePercent: number,
    macros: any[]
}

) {

        
    return(
        <>
            {/* MACRONUTRIENTS */}
            <Macronutrients 
                dailyTotals={dailyTotals}
                calorieGoal={calorieGoal}
                macros={macros}
                caloriePercent={caloriePercent}
            />

            {/* MICRONUTRIENTS */}

            <Micronutrients />
            
        </>
)
    
}