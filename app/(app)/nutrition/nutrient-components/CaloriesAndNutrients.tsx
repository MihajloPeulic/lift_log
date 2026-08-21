"use client";

import { useState, useRef, useEffect } from "react";
import Micronutrients from "./Micronutrients";
import Macronutrients from "./Macronutrients";
import { NutritionTotals } from "@/app/types/food";

export default function CaloriesAndNutrients({
  dailyTotals,
  calorieGoal,
  caloriePercent,
  macros,
  micros
}: {
  dailyTotals: NutritionTotals;
  calorieGoal: number;
  caloriePercent: number;
  macros: any[];
  micros: any[];
}) {
  const [page, setPage] = useState(0);
  const [macroHeight, setMacroHeight] = useState<number | null>(null);
  const macroRef = useRef<HTMLDivElement>(null);

  // Merimo visinu Macronutrients komponente na renderu i na promene veličine ekrana
  useEffect(() => {
    function updateHeight() {
      if (macroRef.current) {
        setMacroHeight(macroRef.current.offsetHeight);
      }
    }

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [macros]);

  return (
    <div className="relative w-full min-w-0 overflow-hidden">
      <div className="w-full min-w-0 overflow-hidden rounded-card">
        <div
          className="flex w-full items-start transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${page * 100}%)`,
          }}
        >
          {/* Slajd 1: Macronutrients sa ref-om */}
          <div ref={macroRef} className="w-full shrink-0 min-w-0">
            <Macronutrients
              dailyTotals={dailyTotals}
              calorieGoal={calorieGoal}
              macros={macros}
              caloriePercent={caloriePercent}
            />
          </div>

          {/* Slajd 2: Micronutrients dobija tačnu visinu prvog slajda */}
          <div className="w-full shrink-0 min-w-0">
            <Micronutrients micros={micros} maxHeight={macroHeight} />
          </div>
        </div>
      </div>

      {/* Kontrole slidera */}
      <div className="mt-4 flex items-center justify-center gap-4 sm:mt-6">
        <button
          onClick={() => setPage(0)}
          disabled={page === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border disabled:cursor-default disabled:opacity-40"
        >
          ←
        </button>

        <div className="flex gap-2">
          <div
            className={`h-2 w-2 rounded-full transition-colors ${
              page === 0 ? "bg-primary" : "bg-surface-light"
            }`}
          />
          <div
            className={`h-2 w-2 rounded-full transition-colors ${
              page === 1 ? "bg-primary" : "bg-surface-light"
            }`}
          />
        </div>

        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border disabled:cursor-default disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
}