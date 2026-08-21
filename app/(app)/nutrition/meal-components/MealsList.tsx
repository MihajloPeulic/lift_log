"use client"

import Link from "next/link"
import { calculateFoodNutrition, calculateMealNutrition } from "@/app/lib/data/calculateNutrition";
import { Tooltip } from "@/components/Tooltip";
import { useState, useEffect } from "react"; // 1. Dodat useEffect
import { deleteMeal } from "@/app/actions/nutrition";

export default function MealsList({
  meals,
  selectedDate,
}: {
  meals: any[];
  selectedDate: string;
}) {
  const [openMealId, setOpenMealId] = useState<string | null>(null);
  const [deletingMealId, setDeletingMealId] = useState<string | null>(null);

  // 2. Logika za zatvaranje na klik izvan
  useEffect(() => {
    const closeDropdown = () => setOpenMealId(null);
    
    if (openMealId) {
      document.addEventListener("click", closeDropdown);
    }
    
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, [openMealId]);

  async function handleDelete(id: string, date: string) {
    await deleteMeal(id, date);
    setDeletingMealId(null);
  }

  return (
    <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
      {meals.map((meal) => {
        const mealTotals = calculateMealNutrition(meal.meal_items ?? []);

        return (
          <article
            key={meal.id}
            className="w-full min-w-0 rounded-card border border-border bg-surface p-4 sm:p-card"
          >
            <header className="flex items-start justify-between gap-2 sm:items-center">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-bold sm:text-lg">
                  {meal.meal_type.charAt(0).toUpperCase() +
                    meal.meal_type.slice(1).toLowerCase()}
                </h3>

                <p className="mt-0.5 flex flex-wrap gap-x-1.5 text-xs text-text-secondary sm:text-sm">
                  <span>{mealTotals.calories.toFixed(0)} kcal</span>
                  <span>• {mealTotals.protein.toFixed(1)}g P</span>
                  <span>• {mealTotals.carbs.toFixed(1)}g C</span>
                  <span>• {mealTotals.fat.toFixed(1)}g F</span>
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                <Tooltip text="Add Food">
                  <Link
                    href={`/nutrition/${meal.id}/add-food?date=${selectedDate}`}
                    className="flex h-9 w-9 items-center justify-center rounded-button bg-primary text-black transition hover:bg-primary-hover sm:h-10 sm:w-10"
                  >
                    <span className="text-xl font-bold sm:text-2xl">+</span>
                  </Link>
                </Tooltip>

                <div className="relative z-10">
                  <Tooltip text={openMealId === meal.id ? "" : "More options"}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // 3. OVO SPREČAVA DA SE MENI ODMAH ZATVORI
                        setOpenMealId(openMealId === meal.id ? null : meal.id);
                      }}
                      className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-button text-text-secondary hover:bg-background sm:h-10 sm:w-10"
                    >
                      <span className="text-xl leading-none sm:text-2xl">⋮</span>
                    </button>
                  </Tooltip>

                  {openMealId === meal.id && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-card border border-border bg-surface p-1 shadow-lg sm:w-40">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // (Opciono) sprečava da dokument registruje klik ako sami zatvaramo
                          setOpenMealId(null);
                          setDeletingMealId(meal.id);
                        }}
                        className="w-full cursor-pointer rounded-button px-3.5 py-2 text-left text-sm text-red-500 transition-colors hover:bg-background"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </header>

            <div className="mt-4 space-y-2.5 sm:mt-5 sm:space-y-3">
              {meal.meal_items?.length > 0 ? (
                meal.meal_items.map((item: any) => {
                  const nutrition = calculateFoodNutrition(item);
                  const grams = item.amount * item.food_units.grams;

                  return (
                    <Link
                      key={item.id}
                      href={`/nutrition/${meal.id}/update-food/${item.id}?date=${selectedDate}`}
                      className="flex w-full min-w-0 items-center justify-between gap-3 rounded-button bg-background p-3 transition hover:bg-border sm:p-4"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold sm:text-base">
                          {item.foods.name}
                        </p>
                        <p className="truncate text-xs text-text-secondary sm:text-sm">
                          {item.amount} {item.food_units.unit_name} ({grams.toFixed(0)}g)
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold sm:text-base">
                          {nutrition.calories.toFixed(0)} kcal
                        </p>
                        <p className="text-xs text-text-secondary">
                          {nutrition.protein.toFixed(1)}P • {nutrition.carbs.toFixed(1)}C • {nutrition.fat.toFixed(1)}F
                        </p>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="rounded-button border border-dashed border-border p-4 text-center text-xs text-text-secondary sm:p-5 sm:text-sm">
                  No foods added yet
                </div>
              )}
            </div>

            {deletingMealId === meal.id && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-sm rounded-card border border-border bg-surface p-6">
                  <h3 className="text-lg font-bold">Delete meal?</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    This action cannot be undone.
                  </p>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={() => setDeletingMealId(null)}
                      className="cursor-pointer rounded-button px-4 py-2 text-sm transition hover:bg-background"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(meal.id, selectedDate)}
                      className="cursor-pointer rounded-button bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}