"use client";

import { useEffect, useState } from "react";
import { CalorieNeeds } from "@/app/types/food";
import { TriangleAlert } from "lucide-react";
import { deleteCustomCalorieTarget, updateCustomCalorieTarget, updateMacro } from "@/app/actions/nutrition";

export default function EditMacronutrientTargets(
    {
        nutrient_needs,
        activityMultiplier,
    }: {
        nutrient_needs: CalorieNeeds,
        activityMultiplier: number,
    }
) {
    const [protein, setProtein] = useState(Math.round(nutrient_needs.protein_needs));
    const [carbs, setCarbs] = useState(Math.round(nutrient_needs.carbs_needs));
    const [fat, setFat] = useState(Math.round(nutrient_needs.fat_needs));

    const [customEnergy, setCustomEnergy] = useState(false);
    const [customTarget, setCustomTarget] = useState<number | "">(0);
    const [showDisablePopup, setShowDisablePopup] = useState(false);
    const [showBreakdown, setShowBreakdown] = useState(false);

    useEffect(() => {
        if (nutrient_needs.custom_calorie_target !== null) {
            setCustomEnergy(true);
            setCustomTarget(nutrient_needs.custom_calorie_target);
        }
    }, [nutrient_needs.custom_calorie_target]);
    
    const proteinCalories = protein * 4;
    const carbsCalories = carbs * 4;
    const fatCalories = fat * 9;

    const totalMacroCalories = proteinCalories + carbsCalories + fatCalories;
    const targetsMatch = Math.abs(totalMacroCalories - nutrient_needs.calorie_expenditure) <= 1;

    return (
        <div className="layout-container">
            
            {/* ENERGY TARGET KARTICA */}
            <section className="card-main">
                <p className="text-label">
                    {customEnergy === false ? "Energy Target" : "Custom Energy Target"}
                </p>

                <h1 className="text-value mt-1 break-all text-primary">
                    {customEnergy 
                        ? customTarget 
                        : Number(nutrient_needs.calorie_expenditure.toFixed(1))
                    }
                    <span className="ml-2 text-base font-medium text-text-muted">
                        kcal
                    </span>
                </h1>

                {customEnergy === false && (
                    <>
                        <button 
                            type="button"
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            className="mt-3 text-[13px] font-semibold text-primary hover:text-primary-hover transition"
                        >
                            {showBreakdown ? "Hide breakdown" : "Show breakdown"}
                        </button>

                        {showBreakdown && (
                            <div className="mt-5 border-t border-border pt-4 space-y-2.5 text-sm text-text-secondary">
                                <div className="flex justify-between gap-2">
                                    <span>BMR</span>
                                    <span>{nutrient_needs.bmr}</span>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <span>Baseline Activity</span>
                                    <span>+ {Number(((activityMultiplier - 1) * nutrient_needs.bmr).toFixed(1))}</span>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <span>Baseline Expenditure</span>
                                    <span>= {nutrient_needs.calorie_expenditure} kcal</span>
                                </div>
                                <div className="flex justify-between gap-2">
                                    <span>Weight Maintenance</span>
                                    <span>+ 0</span>
                                </div>
                                <div className="flex justify-between border-t border-border pt-2.5 font-bold text-text">
                                    <span>Energy Target</span>
                                    <span>= {nutrient_needs.calorie_expenditure} kcal</span>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* MACROS KARTICA */}
            <section className="card-main space-y-5">
                <h2 className="text-h1 border-b border-border pb-3">
                    Macro Targets
                </h2>

                <div className="space-y-4">
                    {/* PROTEIN */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <span className="h-3 w-3 shrink-0 rounded-pill bg-green-500"/>
                            <span className="font-bold text-sm sm:text-base truncate">Protein</span>
                            <span className="text-caption shrink-0">
                                {Number(((proteinCalories/nutrient_needs.calorie_expenditure)*100).toFixed(2))} %
                            </span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                            <span className="text-right text-xs sm:text-sm text-text-secondary">
                                {proteinCalories} kcal
                            </span>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    value={protein}
                                    onChange={(e)=>setProtein(Number(e.target.value))}
                                    onBlur={(e) => updateMacro("protein", Number(e.currentTarget.value))}
                                    className="input-box w-14 sm:w-16 px-1 py-1.5 text-center text-sm font-semibold"
                                />
                                <span className="text-text-secondary text-sm font-medium">g</span>
                            </div>
                        </div>
                    </div>

                    {/* CARBS */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <span className="h-3 w-3 shrink-0 rounded-pill bg-sky-400"/>
                            <span className="font-bold text-sm sm:text-base truncate">Carbohydrates</span>
                            <span className="text-caption shrink-0">
                                {Number(((carbsCalories/nutrient_needs.calorie_expenditure)*100).toFixed(2))} %
                            </span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                            <span className="text-right text-xs sm:text-sm text-text-secondary">
                                {carbsCalories} kcal
                            </span>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    value={carbs}
                                    onChange={(e)=>setCarbs(Number(e.target.value))}
                                    onBlur={(e) => updateMacro("carbs", Number(e.currentTarget.value))}
                                    className="input-box w-14 sm:w-16 px-1 py-1.5 text-center text-sm font-semibold"
                                />
                                <span className="text-text-secondary text-sm font-medium">g</span>
                            </div>
                        </div>
                    </div>

                    {/* FAT */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <span className="h-3 w-3 shrink-0 rounded-pill bg-red-500"/>
                            <span className="font-bold text-sm sm:text-base truncate">Fat</span>
                            <span className="text-caption shrink-0">
                                {Number(((fatCalories/nutrient_needs.calorie_expenditure)*100).toFixed(2))} %
                            </span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                            <span className="text-right text-xs sm:text-sm text-text-secondary">
                                {fatCalories} kcal
                            </span>
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    value={fat}
                                    onChange={(e)=>setFat(Number(e.target.value))}
                                    onBlur={(e) => updateMacro("fat", Number(e.currentTarget.value))}
                                    className="input-box w-14 sm:w-16 px-1 py-1.5 text-center text-sm font-semibold"
                                />
                                <span className="text-text-secondary text-sm font-medium">g</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ZBIR (SUMMARY) */}
                <div className="mt-6 border-t border-border pt-4 space-y-3">
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-sm sm:text-base">
                            <span className="text-text-secondary">Total from macros</span>
                            <span className="font-bold">{totalMacroCalories} kcal</span>
                        </div>

                        {!targetsMatch && (
                            <div className="flex items-center justify-between text-xs sm:text-sm text-warning gap-2 bg-warning/10 p-2 rounded-md border border-warning/20">
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <TriangleAlert className="h-4 w-4 shrink-0 text-warning" />
                                    <span className="truncate font-medium">Targets don't match</span>
                                </div>
                                <span className="shrink-0 font-bold">
                                    {customEnergy ? customTarget : Number(nutrient_needs.calorie_expenditure.toFixed(1))} kcal
                                </span>
                            </div>
                        )}
                    </div>

                    {customEnergy === false && (
                        <div className="flex justify-between font-bold text-sm sm:text-base text-primary">
                            <span>Calorie Target</span>
                            <span>{Number(nutrient_needs.calorie_expenditure.toFixed(1))} kcal</span>
                        </div>
                    )}
                </div>
            </section>

            {/* CUSTOM ENERGY TARGET */}
            <section className="card-main">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h3 className="text-base font-bold text-text">
                            Custom Energy Target
                        </h3>
                        <p className="text-caption mt-0.5">
                            Manually override calculated calories
                        </p>
                    </div>

                    {/* TOGGLE */}
                    <button
                        onClick={() => {
                            if (!customEnergy) setCustomEnergy(true);
                            else setShowDisablePopup(true);
                        }}
                        className={`h-6 w-11 shrink-0 rounded-pill transition-colors relative border ${
                            customEnergy ? "bg-primary border-primary" : "bg-surface-light border-border"
                        }`}
                    >
                        <div className={`h-4 w-4 rounded-pill bg-white transition-transform absolute top-1/2 -translate-y-1/2 left-1 ${
                            customEnergy ? "translate-x-5" : "translate-x-0"
                        }`} />
                    </button>
                </div>

                {customEnergy && (
                    <div className="mt-5 border-t border-border pt-4">
                        <label className="text-label mb-2 block">Custom Calories</label>
                        <input
                            type="number"
                            value={customTarget === 0 ? "" : customTarget}
                            onChange={(e) => setCustomTarget(e.target.value === "" ? "" : Number(e.target.value))}
                            onBlur={() => updateCustomCalorieTarget(customTarget === "" ? 0 : customTarget)}
                            placeholder="Enter kcal..."
                            className="input-box"
                        />
                    </div>
                )}
            </section>

            {/* MODAL / POPUP */}
            {showDisablePopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
                    <div className="card-main max-w-sm w-full shadow-2xl">
                        <h2 className="text-h1">Disable Custom Target?</h2>
                        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                            Are you sure you want to disable custom energy target? 
                            Your previous custom target will be deleted.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowDisablePopup(false)}
                                className="px-4 py-2 rounded-button text-sm font-semibold border border-border bg-transparent hover:bg-surface-light transition text-text"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    deleteCustomCalorieTarget(nutrient_needs.custom_calorie_target);
                                    setCustomEnergy(false);
                                    setShowDisablePopup(false);
                                }}
                                className="px-4 py-2 rounded-button text-sm font-bold bg-primary text-black hover:bg-primary-hover transition"
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}