"use client"

import { useState } from "react";
import { Food, NutritionTotals, Unit } from "@/app/types/food";
import { addFood } from "@/app/actions/nutrition";
import { SubmitButton } from "@/components/SubmitButton";
import Micronutrients from "../../../Micronutrients";
import { useNutrition } from "../../../NutritionProvider";
import Macronutrients from "../../../Macronutrients";



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


    const dailyTotals = {

        calories: Number((food.calories * multiplier).toFixed(1)),

        protein: Number((food.protein * multiplier).toFixed(1)),

        carbs: Number((food.carbs * multiplier).toFixed(1)),

        fat: Number((food.fat * multiplier).toFixed(1))

    };

    const caloriePercent = dailyTotals.protein === 0 ? 0 : Math.round((dailyTotals.calories/dailyTargets.calorie_expenditure)*100)

    const macros = [
        {
            name: "Protein",
            daily_target: Number((dailyTargets.protein_needs).toFixed(1)),
            percent: dailyTotals.protein === 0 ? 0 : Math.round((dailyTotals.protein/dailyTargets.protein_needs)*100),
            value: Number(dailyTotals.protein.toFixed(1))
        },
        {
            name: "Fat",
            daily_target: Number((dailyTargets.fat_needs).toFixed(1)),
            percent: dailyTotals.fat === 0 ? 0 : Math.round((dailyTotals.fat/dailyTargets.fat_needs)*100),
            value: Number(dailyTotals.fat.toFixed(1))
        },
        {
            name: "Carbs",
            daily_target: Number((dailyTargets.carbs_needs).toFixed(1)),
            percent: dailyTotals.carbs === 0 ? 0 : Math.round((dailyTotals.carbs/dailyTargets.carbs_needs)*100),
            value: Number(dailyTotals.carbs.toFixed(1))
        }
    ]


    



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
            caloriePercent={caloriePercent}
            macros={macros}
            calorieGoal={Number((dailyTargets.calorie_expenditure).toFixed(1))}
        />


       {/*  <section className="mt-6 rounded-card border border-border bg-surface p-card">


        <div className="flex items-center justify-between">


        <div>

        <p className="text-text-secondary">
        Calories
        </p>


        <p className="mt-2 text-4xl font-bold">
        {dailyTotals.calories}
        <span className="ml-2 text-lg text-text-secondary">
        kcal
        </span>
        </p>

        </div>




        <div className="
        flex
        h-24
        w-24
        items-center
        justify-center
        rounded-full
        border-8
        border-primary
        text-xl
        font-bold
        ">

        100%

        </div>


        </div>


        </section> */}









        {/* Macronutrients */}


        {/* <section className="mt-8">


        <h2 className="text-xl font-bold">
        Macronutrients
        </h2>



        <div className="mt-5 grid gap-4 sm:grid-cols-3">



        {
        [
        ["Protein",dailyTotals.protein,"g"],
        ["Carbs",dailyTotals.carbs,"g"],
        ["Fat",dailyTotals.fat,"g"]

        ].map(([name,value,unit])=>(


        <div

        key={name}

        className="
        rounded-card
        border
        border-border
        bg-surface
        p-card
        "

        >


        <p className="text-sm text-text-secondary">
        {name}
        </p>


        <p className="mt-2 text-3xl font-bold">

        {value}

        <span className="ml-1 text-base text-text-secondary">
        {unit}
        </span>

        </p>


        </div>


        ))

        }


        </div>



        </section> */}

        {/* MICRONUTRIENTS */}


        <Micronutrients />


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