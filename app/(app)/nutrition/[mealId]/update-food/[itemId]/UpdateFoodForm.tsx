"use client"

import { useState } from "react";
import { Food, Unit } from "@/app/types/food";
import { updateMealItem, deleteMealItem} from "@/app/actions/nutrition";
import { SubmitButton } from "@/components/SubmitButton";
import { DeleteButton } from "@/components/DeleteButton";
import { CalculateCaloriesAndMacros, CalculateDailyNutrition, CalculateMicros } from "@/app/lib/utils/nutrition";
import { useNutrition } from "../../../NutritionProvider";
import Micronutrients from "../../../nutrient-components/Micronutrients";
import Macronutrients from "../../../nutrient-components/Macronutrients";




type MealItem = {
    id: string,
    meal_id: string,
    food_id: string,
    amount: number,
    food_unit_id: string
}


export default function UpdateFoodForm({
    mealItem,
    selectedDate,
    food,
    units,
    gramUnit
}: {
    selectedDate: string,
    mealItem: MealItem,
    food: Food,
    units: Unit[],
    gramUnit: Unit

}){
    const amountValue = mealItem.amount
    const itemUnit = mealItem.food_unit_id

    const initialUnit = units.find(
        (u) => u.id === mealItem.food_unit_id
    );


    const [amount, setAmount] = useState<number | "">(
        mealItem.amount
    );


    const [unit, setUnit] = useState(
        mealItem.food_unit_id
    );


    const [unitGrams, setUnitGrams] = useState(
        initialUnit?.grams ?? 1
    );

    const multiplier = (Number(amount || 0) * unitGrams) / 100;


    const dailyTargets = useNutrition()
    const dailyTotals = CalculateDailyNutrition(null, food, multiplier)
    const micros = CalculateMicros(dailyTotals)

    

    const calsAndMacros = CalculateCaloriesAndMacros(dailyTargets, dailyTotals)



    return (
        <form className="mx-auto max-w-3xl">

            <input
                type="hidden"
                name="itemId"
                value={mealItem.id}
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
        Adjust serving size and view nutrition
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
        onChange={(e) => {
            const newUnitId = e.target.value;

            const oldUnitGrams = unitGrams;

            const newUnit = units.find(
                (u) => u.id === newUnitId
            );

            const newUnitGrams = newUnit?.grams ?? 1;


            // trenutna količina u gramima
            const totalGrams = Number(amount || 0) * oldUnitGrams;


            // koliko je to nove jedinice
            const newAmount = totalGrams / newUnitGrams;


            setUnit(newUnitId);

            setUnitGrams(newUnitGrams);

            setAmount(
                Number(newAmount.toFixed(2))
            );
        }}

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





        <div className="mt-6">
            <Macronutrients 
                dailyTotals={dailyTotals}
                caloriePercent={calsAndMacros.caloriePercent}
                macros={calsAndMacros.macros}
                calorieGoal={Number((dailyTargets.calorie_expenditure).toFixed(1))}
            />
        </div>

        







        {/* Micronutrients */}


        

        <div className="mt-6 mb-2">
            <Micronutrients 
                micros={micros}
            />
        </div>
        









        <div className="mt-8 flex gap-4">

            <SubmitButton
                formAction={updateMealItem}
                className="
                flex-1
                rounded-button
                bg-primary
                py-4
                font-bold
                text-black
                hover:bg-primary-hover
                cursor-pointer
                "
            >
                Update

            </SubmitButton>

            
            <DeleteButton
                formAction={deleteMealItem}
                className="
                flex-1
                rounded-button
                border
                border-red-500/50
                bg-red-500/10
                py-4
                font-bold
                text-red-400
                hover:bg-red-500/20
                cursor-pointer
                "
            >
                Delete from meal
            </DeleteButton >
             
        </div>




        </form>


            )
}