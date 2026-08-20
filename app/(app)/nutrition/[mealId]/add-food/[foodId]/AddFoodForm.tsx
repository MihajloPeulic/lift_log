"use client"

import { useState } from "react";
import { Food, NutritionTotals, Unit } from "@/app/types/food";
import { addFood } from "@/app/actions/nutrition";
import { SubmitButton } from "@/components/SubmitButton";
import Micronutrients from "../../../nutrient-components/Micronutrients";
import { useNutrition } from "../../../NutritionProvider";
import Macronutrients from "../../../nutrient-components/Macronutrients";
import { CalculateCaloriesAndMacros, CalculateDailyNutrition, CalculateMicros } from "@/app/lib/utils/nutrition";



export default function AddFoodForm({
    food,
    units,
    mealId,
    gramUnit,
    selectedDate,
}: {
    food: Food,
    units: Unit[],
    gramUnit: Unit,
    mealId: string,
    selectedDate: string,
}){

    const [amount, setAmount] = useState<number | "">(100);
    const [unit,setUnit] = useState("grams");
    const [unitGrams,setUnitGrams] = useState<number>(1);

    
    const dailyTargets = useNutrition()

    const multiplier = (Number(amount || 0) * unitGrams) / 100;


    const dailyTotals = CalculateDailyNutrition(null, food, multiplier)
    const micros = CalculateMicros(dailyTotals)

    const calsAndMacros = CalculateCaloriesAndMacros(dailyTargets, dailyTotals)

    const macros = calsAndMacros.macros


    



    return (
        <form action={addFood} className="mx-auto max-w-3xl">

            <input
                type="hidden"
                name="mealId"
                value={mealId}
            />
            <input
                type="hidden"
                name="foodId"
                value={food.id}
            />
            <input
                type="hidden"
                name="date"
                value={selectedDate}
            />


        {/* Header */}

        <header className="mb-8">


        <h1 className="text-3xl font-bold">
        {food.name}
        </h1>


        <p className="mt-1 text-text-secondary">
        Adjust serving size and view dailyTotals
        </p>


        </header>








        {/* Amount selector */}


        <section className="rounded-card border border-border bg-surface p-card">


        <h2 className="text-lg font-bold">
        Serving size
        </h2>



        <div className="mt-5 flex gap-3">


        <input

        type="number"
        name="amount"
        value={amount}

        onChange={(e)=>{
            const value = e.target.value;

            setAmount(
                value === ""
                ? ""
                : Number(value)
            );
        }}

        className="
        flex-1
        rounded-button
        border
        border-border
        bg-background
        px-4
        py-3
        text-xl
        font-bold
        outline-none
        focus:border-primary
        "

        />



        <select

        value={unit}
        name="unit"
        onChange={
            (e)=>{
                const value = e.target.value;

                    setUnit(value);

                    if (value === gramUnit.id) {
                        setUnitGrams(1);
                        setAmount(100)
                        return;
                    }

                    const selectedUnit = units.find((u) => u.id === value);

                    if (selectedUnit) {
                        setUnitGrams(selectedUnit.grams);
                        setAmount(1)
                        return
                    }
                
            }
        
        }

        className="
        rounded-button
        border
        border-border
        bg-background
        px-4
        "

        >
        
        

        
        {units.map(unit => (
            unit.id === gramUnit.id ?

            <option value={unit.id} key={unit.id}>
                {unit.unit_name} 
            </option>
            :
            <option value={unit.id} key={unit.id}>
                {unit.unit_name} ({unit.grams})
            </option>
        ))
            
        }




        </select>



        </div>


        </section>









        {/* Calories */}

        <Macronutrients 
            dailyTotals={dailyTotals}
            caloriePercent={calsAndMacros.caloriePercent}
            macros={macros}
            calorieGoal={Number((dailyTargets.calorie_expenditure).toFixed(1))}
        />


      
        {/* MICRONUTRIENTS */}


        <Micronutrients 
            micros={micros}
        />


        <SubmitButton
            pendingText="Adding..."
            className="
                mt-8
                w-full
                rounded-button
                bg-primary
                py-4
                font-bold
                text-black
                hover:bg-primary-hover
            "
        >
            Add to meal
        </SubmitButton>





        </form>


            )
}