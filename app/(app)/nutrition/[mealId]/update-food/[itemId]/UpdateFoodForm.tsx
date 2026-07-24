"use client"

import { useState } from "react";
import { Food, Unit } from "@/app/types/food";
import { updateMealItem, deleteMealItem} from "@/app/actions/nutrition";
import { SubmitButton } from "@/components/SubmitButton";
import { DeleteButton } from "@/components/DeleteButton";




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




    const nutrition = {

        calories: (food.calories * multiplier).toFixed(1),

        protein: (food.protein * multiplier).toFixed(1),

        carbs: (food.carbs * multiplier).toFixed(1),

        fat: (food.fat * multiplier).toFixed(1),


        /* micronutrients: Object.fromEntries(

        Object.entries(food.micronutrients)
        .map(([key,value])=>[
            key,
            Math.round(value * multiplier * 10) / 10
        ])

        ) */

    };



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









        {/* Calories */}


        <section className="mt-6 rounded-card border border-border bg-surface p-card">


        <div className="flex items-center justify-between">


        <div>

        <p className="text-text-secondary">
        Calories
        </p>


        <p className="mt-2 text-4xl font-bold">
        {nutrition.calories}
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


        </section>









        {/* Macronutrients */}


        <section className="mt-8">


        <h2 className="text-xl font-bold">
        Macronutrients
        </h2>



        <div className="mt-5 grid gap-4 sm:grid-cols-3">



        {
        [
        ["Protein",nutrition.protein,"g"],
        ["Carbs",nutrition.carbs,"g"],
        ["Fat",nutrition.fat,"g"]

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



        </section>









        {/* Micronutrients */}


        <section className="mt-8">


        <h2 className="text-xl font-bold">
        Micronutrients
        </h2>



        <div className="mt-5 rounded-card border border-border bg-surface">


        {/* {
        Object.entries(nutrition.micronutrients)
        .map(([name,value])=>(


        <div

        key={name}

        className="
        flex
        items-center
        justify-between
        border-b
        border-border
        p-4
        last:border-none
        "

        >


        <p className="capitalize text-text-secondary">
        {name}
        </p>


        <p className="font-semibold">

        {value}

        <span className="ml-1 text-sm text-text-secondary">
        mg
        </span>

        </p>


        </div>


        ))

        }
        */}

        </div>



        </section>









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