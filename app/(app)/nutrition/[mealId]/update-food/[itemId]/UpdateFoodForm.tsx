"use client"

import { useState } from "react";
import { Food, Unit } from "@/app/types/food";
import { updateMealItem, deleteMealItem} from "@/app/actions/nutrition";
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
  const amountValue = mealItem.amount;
  const itemUnit = mealItem.food_unit_id;

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
    <form className="mx-auto w-full max-w-3xl">

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
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {food.name}
        </h1>
        <p className="mt-1 text-sm text-text-secondary sm:text-base">
          Adjust serving size and view nutrition
        </p>
      </header>

      {/* Amount selector */}
      <section className="w-full rounded-card border border-border bg-surface p-4 sm:p-5">
        
        <h2 className="text-base font-bold sm:text-lg">
          Serving size
        </h2>

        {/* Flex kontejner drži elemente jedan pored drugog na svim ekranima */}
        <div className="mt-4 flex w-full items-stretch gap-2 sm:mt-5 sm:gap-3">
          
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e)=>{
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
              const newUnitId = e.target.value;
              const oldUnitGrams = unitGrams;
              const newUnit = units.find((u) => u.id === newUnitId);
              const newUnitGrams = newUnit?.grams ?? 1;

              // trenutna količina u gramima
              const totalGrams = Number(amount || 0) * oldUnitGrams;

              // koliko je to nove jedinice
              const newAmount = totalGrams / newUnitGrams;

              setUnit(newUnitId);
              setUnitGrams(newUnitGrams);
              setAmount(Number(newAmount.toFixed(2)));
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
          macros={calsAndMacros.macros}
          calorieGoal={Number((dailyTargets.calorie_expenditure).toFixed(1))}
        />
      </div>

      {/* Micronutrients */}
      <div className="mb-2 mt-5 sm:mt-6">
        <Micronutrients 
          micros={micros}
        />
      </div>

      {/* Akcije (Update / Delete) u jednom redu */}
      <div className="mt-6 flex w-full gap-2 sm:mt-8 sm:gap-4">
        
        <SubmitButton
          formAction={updateMealItem}
          className="
            flex-1
            cursor-pointer
            rounded-button
            bg-primary
            py-3 text-sm
            font-bold text-black
            transition-colors
            hover:bg-primary-hover
            sm:py-4 sm:text-base
          "
        >
          Update
        </SubmitButton>
        
        <DeleteButton
          formAction={deleteMealItem}
          className="
            flex-1
            cursor-pointer
            rounded-button
            border border-red-500/50
            bg-red-500/10
            py-3 text-sm
            font-bold text-red-400
            transition-colors
            hover:bg-red-500/20
            sm:py-4 sm:text-base
          "
        >
          Delete
        </DeleteButton >

      </div>
    </form>
  )
}