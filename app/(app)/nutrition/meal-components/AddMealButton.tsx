"use client";

import { useState } from "react";
import { createMeal } from "@/app/actions/nutrition";
import { Tooltip } from "@/components/Tooltip";

export default function AddMealModal({
  setMeals,
  selectedDate
}: {
  setMeals: React.Dispatch<React.SetStateAction<any[]>>;
  selectedDate: string;
}) {
  const [open, setOpen] = useState(false);
  const [mealType, setMealType] = useState("breakfast");
  const [loading, setLoading] = useState(false);

  async function createMealPage() {
    try {
      setLoading(true);
      const newMeal = await createMeal(mealType, selectedDate);

      setMeals((prev) => [...prev, newMeal]);
      setOpen(false);
    } catch (error) {
      console.error("Failed to create meal:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Add meal button */}
      <Tooltip text="Add Meals">
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded-button bg-primary px-3.5 py-2.5 text-sm font-semibold text-black transition hover:bg-primary-hover sm:px-5 sm:py-3 sm:text-base"
        >
          + Add meal
        </button>
      </Tooltip>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md min-w-0 rounded-card border border-border bg-surface p-5 shadow-xl sm:p-card">
            <header className="mb-5 sm:mb-6">
              <h2 className="text-xl font-bold sm:text-2xl">Add meal</h2>
              <p className="mt-1 text-xs text-text-secondary sm:text-sm">
                Create a new meal and add foods later.
              </p>
            </header>

            <div className="space-y-4 sm:space-y-5">
              {/* Meal type */}
              <div>
                <label className="mb-2 block text-xs font-medium sm:text-sm">
                  Meal type
                </label>

                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="w-full rounded-button border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary sm:px-4 sm:py-3 sm:text-base"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                  <option value="pre-workout meal">Pre-workout meal</option>
                  <option value="post-workout meal">Post-workout meal</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-2 sm:gap-3 sm:pt-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 cursor-pointer rounded-button border border-border py-2.5 text-sm transition hover:bg-surface-light sm:py-3 sm:text-base"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={createMealPage}
                  className="flex-1 cursor-pointer rounded-button bg-primary py-2.5 text-sm font-semibold text-black transition hover:bg-primary-hover disabled:opacity-50 sm:py-3 sm:text-base"
                >
                  {loading ? "Creating..." : "Create meal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}