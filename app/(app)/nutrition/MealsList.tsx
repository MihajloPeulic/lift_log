"use client"

import Link from "next/link"
import {
    calculateFoodNutrition,
    calculateMealNutrition
} from "@/app/lib/data/calculateNutrition";
import { Tooltip } from "@/components/Tooltip";

import { useState } from "react";


export default function MealsList({
    meals,
    selectedDate,
}: {
    meals: any[]
    selectedDate: string
}) {

    
    



    return (

        <div className="mt-5 space-y-5">


            {/* MEALS */}


            {meals.map((meal)=>{


                const mealTotals = calculateMealNutrition(
                    meal.meal_items ?? []
                );



                return (

                    <article
                        key={meal.id}
                        className="
                        rounded-card
                        border
                        border-border
                        bg-surface
                        p-card
                        "
                    >


                        <header className="flex items-center justify-between">


                            <div>


                                <h3 className="text-lg font-bold">
                                    {
                                        meal.meal_type.charAt(0).toUpperCase()
                                        +
                                        meal.meal_type.slice(1).toLowerCase()
                                    }
                                </h3>


                                <p className="text-sm text-text-secondary">

                                    {mealTotals.calories.toFixed(0)} kcal
                                    {" • "}
                                    {mealTotals.protein.toFixed(1)}g P
                                    {" • "}
                                    {mealTotals.carbs.toFixed(1)}g C
                                    {" • "}
                                    {mealTotals.fat.toFixed(1)}g F

                                </p>


                            </div>




                            <div className="flex items-center gap-2">

                                <Tooltip text="Add Food">
                                    <Link
                                        href={`nutrition/${meal.id}/add-food?date=${selectedDate}`}
                                        className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-button
                                        bg-primary
                                        text-black
                                        transition hover:bg-primary-hover
                                        "
                                    >

                                        <span className="text-2xl font-bold">
                                            +
                                        </span>

                                    </Link>
                                </Tooltip>
                                


                                <Tooltip text="More options">
                                        <button
                                            className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-button
                                            text-text-secondary
                                            hover:bg-background
                                            cursor-pointer
                                            "
                                        >

                                            <span className="text-2xl leading-none">
                                                ⋮
                                            </span>

                                        </button>
                                </Tooltip>

                            </div>


                        </header>





                        <div className="mt-5 space-y-3">


                            {
                                meal.meal_items?.length > 0 ?

                                meal.meal_items.map((item:any)=>{


                                    const nutrition =
                                        calculateFoodNutrition(item);



                                    const grams =
                                        item.amount * item.food_units.grams;



                                    return (

                                        <Link
                                            key={item.id}
                                            href={`nutrition/${meal.id}/update-food/${item.id}?date=${selectedDate}`}
                                            className="
                                            flex
                                            justify-between
                                            rounded-button
                                            bg-background
                                            p-4
                                            transition hover:bg-border
                                            "
                                        >


                                            <div>


                                                <p className="font-semibold">
                                                    {item.foods.name}
                                                </p>


                                                <p className="text-sm text-text-secondary">

                                                    {item.amount}
                                                    {" "}
                                                    {item.food_units.unit_name}

                                                    {" "}
                                                    (
                                                    {grams.toFixed(0)}g
                                                    )

                                                </p>


                                            </div>




                                            <div className="text-right">


                                                <p className="font-semibold">
                                                    {nutrition.calories.toFixed(0)} kcal
                                                </p>


                                                <p className="text-sm text-text-secondary">

                                                    {nutrition.protein.toFixed(1)}P
                                                    {" • "}
                                                    {nutrition.carbs.toFixed(1)}C
                                                    {" • "}
                                                    {nutrition.fat.toFixed(1)}F

                                                </p>


                                            </div>



                                        </Link>

                                    )


                                })

                                :

                                <div className="
                                    rounded-button
                                    border
                                    border-dashed
                                    border-border
                                    p-5
                                    text-center
                                    text-text-secondary
                                ">
                                    No foods added yet
                                </div>

                            }


                        </div>


                    </article>

                )


            })}


        </div>

    )
}