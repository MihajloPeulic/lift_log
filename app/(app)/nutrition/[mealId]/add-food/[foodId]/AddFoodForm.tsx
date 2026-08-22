"use client"

import { useState } from "react";
import { Food, NutritionTotals, Unit } from "@/app/types/food";
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

  const [amount, setAmount] = useState<number | "">(100);
  const [unit, setUnit] = useState("grams");
  const [unitGrams, setUnitGrams] = useState<number>(1);

  const dailyTargets = useNutrition();

  const multiplier = (Number(amount || 0) * unitGrams) / 100;

  const dailyTotals = CalculateDailyNutrition(null, food, multiplier);
  const micros = CalculateMicros(dailyTotals);
  const calsAndMacros = CalculateCaloriesAndMacros(dailyTargets, dailyTotals);
  const macros = calsAndMacros.macros;

  return (
    <form action={addFood} className="mx-auto w-full max-w-3xl">
      <input type="hidden" name="mealId" value={mealId} />
      <input type="hidden" name="foodId" value={food.id} />
      <input type="hidden" name="date" value={selectedDate} />

      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {food.name}
        </h1>
        <p className="mt-1 text-sm text-text-secondary sm:text-base">
          Adjust serving size and view daily totals
        </p>
      </header>

      {/* Amount selector */}
      <section className="w-full rounded-card border border-border bg-surface p-4 sm:p-5">
        <h2 className="text-base font-bold sm:text-lg">
          Serving size
        </h2>

        {/* Input & Select stoje u redu na svim ekranima */}
        <div className="mt-4 flex w-full items-stretch gap-2 sm:mt-5 sm:gap-3">
          
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              setAmount(value === "" ? "" : Number(value));
            }}
            className="
              w-1/2 min-w-0
              rounded-button
              border border-border
              bg-background
              px-3 py-2.5
              text-lg font-bold
              outline-none
              transition-colors
              focus:border-primary
              sm:px-4 sm:py-3 sm:text-xl
            "
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
            className="
              w-1/2 min-w-0
              truncate
              rounded-button
              border border-border
              bg-background
              px-2 py-2.5
              text-sm
              outline-none
              transition-colors
              focus:border-primary
              sm:px-4 sm:py-3 sm:text-base
            "
          >
            {units.map(unit => (
              unit.id === gramUnit.id ? (
                <option value={unit.id} key={unit.id}>
                  {unit.unit_name}
                </option>
              ) : (
                <option value={unit.id} key={unit.id}>
                  {unit.unit_name} ({unit.grams}g)
                </option>
              )
            ))}
          </select>
        </div>
      </section>

      {/* Calories */}
      <div className="mt-5 sm:mt-6">
        <Macronutrients 
          dailyTotals={dailyTotals}
          caloriePercent={calsAndMacros.caloriePercent}
          macros={macros}
          calorieGoal={Number((dailyTargets.calorie_expenditure).toFixed(1))}
        />
      </div>

      {/* MICRONUTRIENTS */}
      <div className="mb-2 mt-5 sm:mt-6">
        <Micronutrients micros={micros} />
      </div>

      <SubmitButton
        pendingText="Adding..."
        className="
          mt-6 w-full
          cursor-pointer
          rounded-button
          bg-primary
          py-3.5 text-base
          font-bold text-black
          transition hover:bg-primary-hover
          sm:mt-8 sm:py-4 sm:text-lg
        "
      >
        Add to meal
      </SubmitButton>

    </form>
  );
}