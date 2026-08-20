"use client"

import Link from "next/link"
import {
    calculateFoodNutrition,
    calculateMealNutrition
} from "@/app/lib/data/calculateNutrition";
import { Tooltip } from "@/components/Tooltip";
import { useState } from "react";
import { deleteMeal } from "@/app/actions/nutrition";

export default function MealsList({
    meals,
    selectedDate,
}: {
    meals: any[]
    selectedDate: string
}) {
    const [open, setOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    async function handleDelete(idd: string, date: string) {
        await deleteMeal(idd, date);
        setShowDeleteModal(false);
    }

    return (
        <div className="mt-8 space-y-5">

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
                        {/* 1. Dodat gap-2 da se lijeva i desna strana ne sudare */}
                        <header className="flex items-center justify-between gap-2">

                            {/* 2. min-w-0 dozvoljava ovom div-u da se suzi umjesto da gura dugmiće desno */}
                            <div className="min-w-0">
                                <h3 className="text-lg font-bold truncate">
                                    {
                                        meal.meal_type.charAt(0).toUpperCase()
                                        +
                                        meal.meal_type.slice(1).toLowerCase()
                                    }
                                </h3>

                                {/* 3. flex-wrap omogućava da dugački makrosi padnu u novi red na malom telefonu */}
                                <p className="text-xs sm:text-sm text-text-secondary flex flex-wrap gap-x-1">
                                    <span>{mealTotals.calories.toFixed(0)} kcal</span>
                                    <span>• {mealTotals.protein.toFixed(1)}g P</span>
                                    <span>• {mealTotals.carbs.toFixed(1)}g C</span>
                                    <span>• {mealTotals.fat.toFixed(1)}g F</span>
                                </p>
                            </div>

                            {/* 4. shrink-0 strogo štiti dugmiće od smanjivanja ili guranja */}
                            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                                <Tooltip text="Add Food">
                                    <Link
                                        href={`nutrition/${meal.id}/add-food?date=${selectedDate}`}
                                        className="
                                        flex h-10 w-10 items-center justify-center
                                        rounded-button bg-primary text-black
                                        transition hover:bg-primary-hover
                                        "
                                    >
                                        <span className="text-2xl font-bold">+</span>
                                    </Link>
                                </Tooltip>
                                
                                <div className="relative">
                                    <Tooltip text="More options">
                                        <button
                                            onClick={() => setOpen(!open)}
                                            className="
                                                flex h-10 w-10 items-center justify-center
                                                rounded-button text-text-secondary
                                                hover:bg-background cursor-pointer
                                            "
                                        >
                                            <span className="text-2xl leading-none">⋮</span>
                                        </button>
                                    </Tooltip>

                                    {open && (
                                        <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-card border border-border bg-surface shadow-lg">
                                            <button
                                                onClick={() => {
                                                    setOpen(false);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="w-full px-4 py-2 text-left text-red-500 hover:bg-background"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </header>

                        <div className="mt-5 space-y-3">
                            {
                                meal.meal_items?.length > 0 ?
                                meal.meal_items.map((item:any)=>{
                                    const nutrition = calculateFoodNutrition(item);
                                    const grams = item.amount * item.food_units.grams;

                                    return (
                                        <Link
                                            key={item.id}
                                            href={`nutrition/${meal.id}/update-food/${item.id}?date=${selectedDate}`}
                                            className="
                                            flex justify-between gap-3
                                            rounded-button bg-background p-3 sm:p-4
                                            transition hover:bg-border
                                            "
                                        >
                                            {/* 6. flex-1 i min-w-0 naređuju imenu hrane da zauzme raspoloživi prostor i da prelomi tekst ako treba */}
                                            <div className="flex-1 min-w-0">
                                                {/* truncate reže dugačko ime (stavlja ...) umjesto da izbija izvan kutije */}
                                                <p className="font-semibold truncate text-sm sm:text-base">
                                                    {item.foods.name}
                                                </p>
                                                <p className="text-xs sm:text-sm text-text-secondary truncate">
                                                    {item.amount} {item.food_units.unit_name} ({grams.toFixed(0)}g)
                                                </p>
                                            </div>

                                            {/* 7. shrink-0 na desnoj strani osigurava da podaci o nutrijentima nikad ne budu zgnječeni */}
                                            <div className="text-right shrink-0">
                                                <p className="font-semibold text-sm sm:text-base">
                                                    {nutrition.calories.toFixed(0)} kcal
                                                </p>
                                                <p className="text-xs sm:text-sm text-text-secondary">
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
                                <div className="rounded-button border border-dashed border-border p-5 text-center text-text-secondary">
                                    No foods added yet
                                </div>
                            }
                        </div>
                    </article>
                )
            })}

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-card border border-border bg-surface p-6">
                        <h3 className="text-lg font-bold">Delete meal?</h3>
                        <p className="mt-2 text-sm text-text-secondary">
                            This action cannot be undone.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="rounded-button px-4 py-2 hover:bg-background"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete("dummy", selectedDate)} // Fiksiran warning za map
                                className="rounded-button bg-red-500 px-4 py-2 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}