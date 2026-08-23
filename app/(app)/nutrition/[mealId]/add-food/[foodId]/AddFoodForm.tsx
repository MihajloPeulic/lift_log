"use client"

import { useState } from "react";
import { Food, Unit } from "@/app/types/food";
import { addFood } from "@/app/actions/nutrition";
import { SubmitButton } from "@/components/SubmitButton";
import Micronutrients from "../../../nutrient-components/Micronutrients";
import { useNutrition } from "../../../NutritionProvider";
import Macronutrients from "../../../nutrient-components/Macronutrients";
import { CalculateCaloriesAndMacros, CalculateDailyNutrition, CalculateMicros } from "@/app/lib/utils/nutrition";

export default function AddFoodForm({
  food,
  units,
  mealId,
  gramUnit,
  selectedDate,
}: {
  food: Food,
  units: Unit[],
  gramUnit: Unit,
  mealId: string,
  selectedDate: string,
}) {

  const [amount, setAmount] = useState<number | string>(100);
  const [unit, setUnit] = useState("grams");
  const [unitGrams, setUnitGrams] = useState<number>(1);

  const dailyTargets = useNutrition();

  const numericAmount = amount === "" ? 0 : Number(amount);
  const multiplier = (numericAmount * unitGrams) / 100;

  const dailyTotals = CalculateDailyNutrition(null, food, multiplier);
  const micros = CalculateMicros(dailyTotals);
  const calsAndMacros = CalculateCaloriesAndMacros(dailyTargets, dailyTotals);
  const macros = calsAndMacros.macros;

  return (
    <form action={addFood} className="mx-auto w-full max-w-3xl space-y-6 sm:space-y-8">
      <input type="hidden" name="mealId" value={mealId} />
      <input type="hidden" name="foodId" value={food.id} />
      <input type="hidden" name="date" value={selectedDate} />

      {/* Header */}
      <header>
        <h1 className="text-h1">
          {food.name}
        </h1>
        <p className="text-caption mt-1">
          Adjust serving size and view daily totals
        </p>
      </header>

      {/* Amount selector */}
      <section className="card-main">
        <h2 className="text-base sm:text-lg font-bold text-text">
          Serving size
        </h2>

        <div className="mt-4 flex w-full items-stretch gap-2.5 sm:mt-5 sm:gap-3">
          
          <input
            type="number"
            name="amount"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              setAmount(value === "" ? "" : Number(value));
            }}
            className="input-box w-1/2 min-w-0 text-lg sm:text-xl font-bold text-text"
          />

          <select
            value={unit}
            name="unit"
            onChange={(e) => {
              const value = e.target.value;
              setUnit(value);

              if (value === gramUnit.id) {
                setUnitGrams(1);
                setAmount(100);
                return;
              }

              const selectedUnit = units.find((u) => u.id === value);
              if (selectedUnit) {
                setUnitGrams(selectedUnit.grams);
                setAmount(1);
                return;
              }
            }}
            className="input-box bg-background text-text w-1/2 min-w-0 appearance-none cursor-pointer"
          >
            {units.map(u => (
              u.id === gramUnit.id ? (
                <option className="bg-surface text-text font-medium" value={u.id} key={u.id}>
                  {u.unit_name}
                </option>
              ) : (
                <option className="bg-surface text-text font-medium" value={u.id} key={u.id}>
                  {u.unit_name} ({u.grams}g)
                </option>
              )
            ))}
          </select>
        </div>
      </section>

      {/* Calories & Macros */}
      <div>
        <Macronutrients 
          dailyTotals={dailyTotals}
          caloriePercent={calsAndMacros.caloriePercent}
          macros={macros}
          calorieGoal={Number((dailyTargets?.calorie_expenditure || 0).toFixed(1))}
        />
      </div>

      {/* MICRONUTRIENTS */}
      <div>
        <Micronutrients micros={micros} />
      </div>

      <SubmitButton
        pendingText="Adding..."
        className="btn-primary w-full py-3.5 sm:py-4 text-sm sm:text-base font-bold text-black"
      >
        Add to meal
      </SubmitButton>

    </form>
  );
}