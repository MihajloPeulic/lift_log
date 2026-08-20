"use client"

import { useState } from "react";

import { NutritionTotals } from "@/app/types/food"

export default function Macronutrients(
    {
        dailyTotals,
        calorieGoal,
        caloriePercent,
        macros
    }: {
        dailyTotals: NutritionTotals,
        calorieGoal: number,
        caloriePercent: number,
        macros: any[]

    }
    
) {

    const [page, setPage] = useState(0);


    return (
        <>
            <section className="">

                <h2 className="text-xl font-bold">
                    Calories
                </h2>

            <div className=" mt-5 rounded-card border border-border bg-surface p-card">
                <div className="flex items-center justify-between">


                    <div>

                        <p className="text-text-secondary">
                            Calories
                        </p>


                        <p className="mt-2 text-4xl font-bold">

                            {dailyTotals.calories.toFixed(0)}

                            <span className="ml-2 text-xl text-text-secondary">
                                /{calorieGoal} kcal
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
                        font-bold
                    ">

                        {caloriePercent.toFixed(0)}%

                    </div>


                </div>



                <div className="mt-6 h-3 rounded-full bg-surface-light">

                    <div
                        className="h-full rounded-full bg-primary"
                        style={{
                            width:`${caloriePercent}%`,
                            maxWidth: "100%"
                        }}
                    />


                </div>
            </div>

            </section>






            {/* MACROS */}


            <section className="mt-8">


                <h2 className="text-xl font-bold">
                    Macro Breakdown
                </h2>



                <div className="mt-5 grid gap-5 md:grid-cols-3">


                    {macros.map(
                        (macro) => (


                        <article
                            key={macro.name}
                            className="
                            rounded-card
                            border
                            border-border
                            bg-surface
                            p-card
                            "
                        >


                            <div className="flex justify-between">


                                <p className="text-text-secondary">
                                    {macro.name}
                                </p>


                                <span className="text-primary">
                                    {macro.percent}%
                                </span>


                            </div>



                            <p className="mt-2 text-3xl font-bold">

                                {macro.value}

                                <span className="ml-1 text-base text-text-secondary">
                                    /{macro.daily_target} g
                                </span>

                            </p>



                            <div className="mt-4 h-2 rounded-full bg-surface-light">


                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${macro.percent}%`
                                    }}
                                />


                            </div>


                        </article>


                    ))}


                </div>


            </section>
        </>
    )
}