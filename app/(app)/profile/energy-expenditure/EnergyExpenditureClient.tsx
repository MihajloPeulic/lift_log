"use client"

import Link from "next/link"
import { ActivityLevel, activityMultiplier, activityLevelListForUi } from "@/app/constants/nutrition"
import { useEffect, useState } from "react";
import { updateActivityLevel } from "@/app/actions/nutrition";


export default function EnergyExpenditureClient({
    activityLevel,
    usersActivityLevel,
    bmr,
}: {
    activityLevel: Record<ActivityLevel, string>,
    usersActivityLevel: ActivityLevel;
    bmr: number;
}) {

    const [actLvl, setActivityLevel] = useState(usersActivityLevel)

    const multiplier = activityMultiplier[actLvl];

    const activityCalories = bmr * (multiplier - 1);

    const totalExpenditure = bmr + activityCalories;

    const bmrPercent = Math.round(
        (bmr / totalExpenditure) * 100
    );

    const activityPercent = Math.round(
        (activityCalories / totalExpenditure) * 100
    );

    
    


    return (
    

                <div
                    className="
                        mt-3
                        rounded-card
                        border
                        border-border
                        bg-surface
                        p-card
                    "
                >


                    <header className="mb-6">

                        <h1 className="text-2xl font-bold">
                            Energy Settings
                        </h1>

                        <p className="mt-1 text-sm text-text-secondary">
                            Manage your calorie calculation.
                        </p>

                    </header>



                    <div
                        className="
                            divide-y
                            divide-white/10
                        "
                    >



                        {/* ACTIVITY LEVEL */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                py-5
                            "
                        >

                            <div>

                                <h3 className="font-medium">
                                    Baseline Activity
                                </h3>

                                <p className="
                                    mt-1
                                    max-w-xs
                                    text-sm
                                    text-text-secondary
                                ">
                                    Your daily movement level used to
                                    estimate calories burned outside of exercise.
                                </p>

                            </div>


                            <select
                                value={actLvl}
                                onChange={(e) => {

                                    const value = e.target.value as ActivityLevel;
                                    setActivityLevel(value)
                                    updateActivityLevel(value)
                                }}
                                className="
                                    rounded-button
                                    border
                                    border-border
                                    bg-background
                                    px-4
                                    py-2
                                    text-sm
                                    outline-none
                                    focus:border-primary
                                "
                            >
                                {
                                    (Object.entries(activityLevel) as [ActivityLevel, string][]).map(([value, label]) => (
                                        <option
                                            key={value}
                                            value={value}
                                        >
                                            {label}
                                        </option>
                                    ))
                                }
                            </select>


                        </div>





                        {/* BMR */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                py-5
                            "
                        >

                            <div>

                                <h3 className="font-medium">
                                    Basal Metabolic Rate
                                </h3>

                                <p className="
                                    mt-1
                                    max-w-xs
                                    text-sm
                                    text-text-secondary
                                ">
                                    Calories your body burns at complete rest
                                    to maintain basic functions.
                                </p>

                            </div>


                            <div
                                className="
                                    text-right
                                    font-semibold
                                "
                            >
                                {bmr} kcal
                            </div>


                        </div>




                    </div>






                    {/* BREAKDOWN GRAPH */}


                    <div
                        className="
                            mt-8
                            border-t
                            border-border
                            pt-6
                        "
                    >

                        <h3 className="font-semibold">
                            Energy Expenditure Breakdown
                        </h3>


                        <div
                            className="
                                mt-5
                                h-4
                                w-full
                                overflow-hidden
                                rounded-full
                                bg-background
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-full
                                "
                            >

                                <div
                                    className="
                                        bg-primary
                                    "
                                    style={{
                                        width:`${bmrPercent}%`
                                    }}
                                />


                                <div
                                    className="
                                        bg-blue-400
                                    "
                                    style={{
                                        width:`${activityPercent}%`
                                    }}
                                />


                            </div>


                        </div>




                        <div
                            className="
                                mt-4
                                flex
                                justify-between
                                text-sm
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <span
                                    className="
                                        h-3
                                        w-3
                                        rounded-full
                                        bg-primary
                                    "
                                />

                                <span>
                                    BMR {bmrPercent}%
                                </span>

                            </div>



                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <span
                                    className="
                                        h-3
                                        w-3
                                        rounded-full
                                        bg-blue-400
                                    "
                                />

                                <span>
                                    Activity {activityPercent}%
                                </span>

                            </div>


                        </div>


                    </div>



                </div>


    )
}