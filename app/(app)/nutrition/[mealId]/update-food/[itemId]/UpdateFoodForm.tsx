"use client"

import { useState } from "react";
import { Food, Unit } from "@/app/types/food";
import { updateMealItem, deleteMealItem } from "@/app/actions/nutrition";
import { SubmitButton } from "@/components/SubmitButton";
import { DeleteButton } from "@/components/DeleteButton";
import { CalculateCaloriesAndMacros, CalculateDailyNutrition, CalculateMicros } from "@/app/lib/utils/nutrition";
import { useNutrition } from "../../../NutritionProvider";
import Micronutrients from "../../../nutrient-components/Micronutrients";
import Macronutrients from "../../../nutrient-components/Macronutrients";

type MealItem = {
  id: string,
  meal_id: string,
  food_id: string,
  amount: number,
  food_unit_id: string
}

export default function UpdateFoodForm({
  mealItem,
  selectedDate,
  food,
  units,
  gramUnit
}: {
  selectedDate: string,
  mealItem: MealItem,
  food: Food,
  units: Unit[],
  gramUnit: Unit
}){
  const initialUnit = units.find(
    (u) => u.id === mealItem.food_unit_id
  );

  const [amount, setAmount] = useState<number | "">(
    mealItem.amount
  );

  const [unit, setUnit] = useState(
    mealItem.food_unit_id
  );

  const [unitGrams, setUnitGrams] = useState(
    initialUnit?.grams ?? 1
  );

  const multiplier = (Number(amount || 0) * unitGrams) / 100;

  const dailyTargets = useNutrition();
  const dailyTotals = CalculateDailyNutrition(null, food, multiplier);
  const micros = CalculateMicros(dailyTotals);

  const calsAndMacros = CalculateCaloriesAndMacros(dailyTargets, dailyTotals);

  return (
    <form className="mx-auto w-full max-w-3xl space-y-6 sm:space-y-8">

      <input
        type="hidden"
        name="itemId"
        value={mealItem.id}
      />

      <input
        type="hidden"
        name="date"
        value={selectedDate}
      />

      {/* Header */}
      <header>
        <h1 className="text-h1">
          {food.name}
        </h1>
        <p className="text-caption mt-1">
          Adjust serving size and view nutrition
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
            value={amount}
            onChange={(e)=>{
              const value = e.target.value;
              setAmount(value === "" ? "" : Number(value));
            }}
            className="input-box w-1/2 min-w-0 text-lg sm:text-xl font-bold text-text"
          />

          <select
            value={unit}
            name="unit"
            onChange={(e) => {
              const newUnitId = e.target.value;
              const oldUnitGrams = unitGrams;
              const newUnit = units.find((u) => u.id === newUnitId);
              const newUnitGrams = newUnit?.grams ?? 1;

              const totalGrams = Number(amount || 0) * oldUnitGrams;
              const newAmount = totalGrams / newUnitGrams;

              setUnit(newUnitId);
              setUnitGrams(newUnitGrams);
              setAmount(Number(newAmount.toFixed(2)));
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
          macros={calsAndMacros.macros}
          calorieGoal={Number((dailyTargets.calorie_expenditure).toFixed(1))}
        />
      </div>

      {/* Micronutrients */}
      <div>
        <Micronutrients 
          micros={micros}
        />
      </div>

      {/* Akcije (Update / Delete) */}
      <div className="mt-6 flex w-full gap-2.5 sm:mt-8 sm:gap-4">
        
        <SubmitButton
          formAction={updateMealItem}
          className="btn-primary flex-1 py-3 sm:py-4 text-sm sm:text-base font-bold text-black"
        >
          Update
        </SubmitButton>
        
        <DeleteButton
          formAction={deleteMealItem}
          className="flex-1 cursor-pointer rounded-button border border-red-500/50 bg-red-500/10 py-3 sm:py-4 text-sm sm:text-base font-bold text-red-400 transition-colors hover:bg-red-500/20"
        >
          Delete
        </DeleteButton>

      </div>
    </form>
  )
}