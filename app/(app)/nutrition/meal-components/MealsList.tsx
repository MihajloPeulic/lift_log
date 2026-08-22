"use client"

import Link from "next/link"
import { calculateFoodNutrition, calculateMealNutrition } from "@/app/lib/data/calculateNutrition";
import { Tooltip } from "@/components/Tooltip";
import { useState, useEffect, useRef } from "react";
import { deleteMeal } from "@/app/actions/nutrition";
import { Trash2, Plus, ChevronDown } from "lucide-react";

export default function MealsList({
  meals,
  selectedDate,
}: {
  meals: any[];
  selectedDate: string;
}) {
  const [openMealId, setOpenMealId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; right: number } | null>(null);
  const [deletingMealId, setDeletingMealId] = useState<string | null>(null);
  
  const [expandedMeals, setExpandedMeals] = useState<string[]>([]);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const closeDropdown = () => {
      setOpenMealId(null);
      setMenuPosition(null);
    };

    if (openMealId) {
      document.addEventListener("click", closeDropdown);
      window.addEventListener("scroll", closeDropdown, true);
    }

    return () => {
      document.removeEventListener("click", closeDropdown);
      window.removeEventListener("scroll", closeDropdown, true);
    };
  }, [openMealId]);

  async function handleDelete(id: string, date: string) {
    await deleteMeal(id, date);
    setDeletingMealId(null);
  }

  const toggleMeal = (mealId: string) => {
    setExpandedMeals((prev) => 
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  const handleMenuToggle = (e: React.MouseEvent<HTMLButtonElement>, mealId: string) => {
    e.stopPropagation();
    
    if (openMealId === mealId) {
      setOpenMealId(null);
      setMenuPosition(null);
    } else {
      const buttonRect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: buttonRect.bottom + 6, // 6px razmaka ispod dugmeta
        right: window.innerWidth - buttonRect.right,
      });
      setOpenMealId(mealId);
    }
  };

  return (
    <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
      {meals.map((meal) => {
        const mealTotals = calculateMealNutrition(meal.meal_items ?? []);
        const isExpanded = expandedMeals.includes(meal.id);
        const isOpen = openMealId === meal.id;

        return (
          <article
            key={meal.id}
            className="relative w-full min-w-0 rounded-card border border-border bg-surface p-4 transition-all sm:p-5"
          >
            <header 
              onClick={() => toggleMeal(meal.id)}
              className="group/header flex cursor-pointer select-none items-center justify-between gap-3"
            >
              
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-bold transition-colors group-hover/header:text-primary sm:text-lg">
                  {meal.meal_type.charAt(0).toUpperCase() +
                    meal.meal_type.slice(1).toLowerCase()}
                </h3>

                <p className="mt-0.5 flex flex-wrap gap-x-1.5 text-[11px] text-text-secondary sm:gap-x-2 sm:text-sm">
                  <span className="font-medium text-text">{mealTotals.calories.toFixed(0)} kcal</span>
                  <span>• {mealTotals.protein.toFixed(1)}g P</span>
                  <span>• {mealTotals.carbs.toFixed(1)}g C</span>
                  <span>• {mealTotals.fat.toFixed(1)}g F</span>
                </p>
              </div>

              <div className="flex shrink-0 items-center justify-center gap-1 sm:gap-2">
                
                <div className="flex items-center justify-center text-text-secondary">
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform duration-300 sm:h-6 sm:w-6 ${isExpanded ? "rotate-180" : ""}`} 
                  />
                </div>

                <div className="relative flex items-center justify-center">
                  <Tooltip 
                    text={isOpen ? "" : "Options"} 
                    position="top"
                  >
                    <button
                      ref={(el) => { buttonRefs.current[meal.id] = el; }}
                      onClick={(e) => handleMenuToggle(e, meal.id)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-button text-text-secondary transition hover:bg-background hover:text-text sm:h-10 sm:w-10"
                    >
                      <span className="text-xl leading-none sm:text-2xl">⋮</span>
                    </button>
                  </Tooltip>
                </div>

              </div>
            </header>

            {/* FIXED MENI: Izbačen skroz van DOM stabla obroka na nivo cijelog ekrana */}
            {isOpen && menuPosition && (
              <div 
                className="fixed z-[99999] w-44 overflow-hidden rounded-card border border-border bg-surface p-1 shadow-2xl sm:w-48"
                style={{
                  top: `${menuPosition.top}px`,
                  right: `${menuPosition.right}px`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  href={`/nutrition/${meal.id}/add-food?date=${selectedDate}`}
                  onClick={(e) => e.stopPropagation()} 
                  className="flex w-full items-center gap-3 rounded-button px-3 py-2.5 text-left text-sm transition-colors hover:bg-surface-light sm:py-3 sm:text-base"
                >
                  <Plus className="h-4 w-4 text-primary" />
                  Add Food
                </Link>

                <div className="my-1 h-px w-full bg-border" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMealId(null);
                    setDeletingMealId(meal.id);
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-button px-3 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-500/10 sm:py-3 sm:text-base"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Meal
                </button>
              </div>
            )}

            <div 
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mt-4 space-y-2 border-t border-border pt-4 sm:mt-5 sm:space-y-3 sm:pt-5">
                  {meal.meal_items?.length > 0 ? (
                    meal.meal_items.map((item: any) => {
                      const nutrition = calculateFoodNutrition(item);
                      const grams = item.amount * item.food_units.grams;

                      return (
                        <Link
                          key={item.id}
                          href={`/nutrition/${meal.id}/update-food/${item.id}?date=${selectedDate}`}
                          className="flex w-full min-w-0 items-center justify-between gap-2 rounded-button bg-background p-3 transition hover:bg-border sm:gap-4 sm:p-4"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold sm:text-base">
                              {item.foods.name}
                            </p>
                            <p className="truncate text-[11px] text-text-secondary sm:text-sm">
                              {item.amount} {item.food_units.unit_name} ({grams.toFixed(0)}g)
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="text-sm font-semibold sm:text-base">
                              {nutrition.calories.toFixed(0)} kcal
                            </p>
                            <p className="text-[11px] text-text-secondary sm:text-xs">
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
              </div>
            </div>

            {deletingMealId === meal.id && (
              <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 p-4 px-4 backdrop-blur-sm">
                <div className="w-full max-w-sm rounded-card border border-border bg-surface p-5 sm:p-6">
                  <h3 className="text-lg font-bold sm:text-xl">Delete meal?</h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    This action cannot be undone. All foods inside will be removed.
                  </p>
                  
                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      onClick={() => setDeletingMealId(null)}
                      className="w-full cursor-pointer rounded-button border border-border bg-background px-4 py-2.5 text-sm transition hover:bg-surface-light sm:w-auto sm:border-transparent sm:bg-transparent sm:py-2"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(meal.id, selectedDate)}
                      className="w-full cursor-pointer rounded-button bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 sm:w-auto sm:py-2"
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