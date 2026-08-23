"use client"

import { ActivityLevel, activityMultiplier } from "@/app/constants/nutrition"
import { useState } from "react";
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

    const [actLvl, setActivityLevel] = useState(usersActivityLevel);

    const multiplier = activityMultiplier[actLvl];
    const activityCalories = bmr * (multiplier - 1);
    const totalExpenditure = bmr + activityCalories;

    const bmrPercent = Math.round((bmr / totalExpenditure) * 100);
    const activityPercent = Math.round((activityCalories / totalExpenditure) * 100);

    return (
        <div className="layout-container">
            <section className="card-main">
                
                <header>
                    <h1 className="text-h1">
                        Energy Settings
                    </h1>
                    <p className="text-caption mt-1">
                        Manage your calorie calculation.
                    </p>
                </header>

                <div className="mt-5 divide-y divide-border border-t border-border">

                    {/* ACTIVITY LEVEL */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-text">
                                Baseline Activity
                            </h3>
                            <p className="text-caption mt-1 max-w-xs leading-relaxed">
                                Your daily movement level used to estimate calories burned outside of exercise.
                            </p>
                        </div>

                        <select
                            value={actLvl}
                            onChange={(e) => {
                                const value = e.target.value as ActivityLevel;
                                setActivityLevel(value);
                                updateActivityLevel(value);
                            }}
                            /* Dodato text-text i bg-background da bi pregledač uvek poštovao našu temu */
                            className="input-box bg-background text-text w-full sm:w-auto py-2 px-3 text-sm font-semibold cursor-pointer appearance-none"
                        >
                            {(Object.entries(activityLevel) as [ActivityLevel, string][]).map(([value, label]) => (
                                <option 
                                    key={value} 
                                    value={value}
                                    /* Eksplicitno dodeljena tamna pozadina za opcije u padajućem meniju */
                                    className="bg-surface text-text font-medium"
                                >
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* BMR */}
                    <div className="flex items-center justify-between py-4 sm:py-5 gap-4">
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-text">
                                Basal Metabolic Rate
                            </h3>
                            <p className="text-caption mt-1 max-w-xs leading-relaxed">
                                Calories your body burns at complete rest to maintain basic functions.
                            </p>
                        </div>

                        <div className="text-base sm:text-lg font-bold text-text whitespace-nowrap">
                            {bmr} kcal
                        </div>
                    </div>

                </div>

                {/* BREAKDOWN GRAPH */}
                <div className="mt-2 border-t border-border pt-5">
                    
                    <h3 className="text-label mb-4">
                        Energy Expenditure Breakdown
                    </h3>

                    <div className="flex h-3 sm:h-4 w-full overflow-hidden rounded-pill bg-background">
                        <div
                            className="bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${bmrPercent}%` }}
                        />
                        <div
                            className="bg-info transition-all duration-500 ease-out"
                            style={{ width: `${activityPercent}%` }}
                        />
                    </div>

                    <div className="mt-4 flex justify-between text-xs sm:text-sm font-medium text-text-secondary">
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-pill bg-primary" />
                            <span>BMR {bmrPercent}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-pill bg-info" />
                            <span>Activity {activityPercent}%</span>
                        </div>
                    </div>
                    
                </div>
                
            </section>
        </div>
    );
}