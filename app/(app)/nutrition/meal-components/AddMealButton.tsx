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
          className="btn-primary px-3.5 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-bold text-black"
        >
          + Add meal
        </button>
      </Tooltip>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="card-main w-full max-w-md min-w-0 shadow-2xl p-5 sm:p-6 space-y-5">
            
            <header>
              <h2 className="text-h1">Add meal</h2>
              <p className="text-caption mt-1">
                Create a new meal and add foods later.
              </p>
            </header>

            <div className="space-y-4">
              {/* Meal type */}
              <div>
                <label className="text-label block mb-1.5">
                  Meal type
                </label>

                <select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  className="input-box bg-background text-text w-full appearance-none cursor-pointer"
                >
                  <option className="bg-surface text-text font-medium" value="breakfast">Breakfast</option>
                  <option className="bg-surface text-text font-medium" value="lunch">Lunch</option>
                  <option className="bg-surface text-text font-medium" value="dinner">Dinner</option>
                  <option className="bg-surface text-text font-medium" value="snack">Snack</option>
                  <option className="bg-surface text-text font-medium" value="pre-workout meal">Pre-workout meal</option>
                  <option className="bg-surface text-text font-medium" value="post-workout meal">Post-workout meal</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-button border border-border px-4 py-2.5 text-sm font-semibold hover:bg-surface-light transition-colors text-text"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={createMealPage}
                  className="cursor-pointer flex items-center justify-center gap-2 rounded-button bg-primary px-4 py-2.5 text-sm font-bold text-black hover:bg-primary-hover transition-colors disabled:opacity-50"
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