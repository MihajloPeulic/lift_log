"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, Trophy, Plus, Minus, Flame, Check, ArrowLeft } from "lucide-react";
import { CalorieNeeds } from "@/app/types/food";
import { setWeightGoals } from "@/app/actions/nutrition";
import BackButton from "@/components/BackButton";

export default function EditWeightGoal(
  {
    nutrient_needs,
    usersWeight
  }: {
    nutrient_needs: CalorieNeeds,
    usersWeight: number
  }
) {
  // Unesene tekstualne vrednosti u inputima
  const [currentWeight, setCurrentWeight] = useState<number>(usersWeight);
  const [targetWeight, setTargetWeight] = useState<number>(nutrient_needs.weight_goal);
/*   const [energyTarget] = useState<number>(nutrient_needs.calorie_expenditure); // Statički cilj kalorija
 */
  // Potvrđene primenjene vrednosti (ažuriraju se TEK na onBlur ili Enter)
  const [appliedCurrent, setAppliedCurrent] = useState<number>(usersWeight);
  const [appliedTarget, setAppliedTarget] = useState<number>(nutrient_needs.weight_goal);

  // Koraci za nedeljnu promenu težine (kg/nedeljno)
  const lossSteps = [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0];

  const defaultStepIndex = lossSteps.indexOf(
      nutrient_needs.weight_change_rate ?? 1
  );

  const [selectedStepIndex, setSelectedStepIndex] = useState(
      defaultStepIndex !== -1 ? defaultStepIndex : lossSteps.indexOf(1)
  );

  const currentLossRate = lossSteps[selectedStepIndex];

  // Tip cilja se računa ISKLJUČIVO iz potvrđenih (applied) vrednosti
  const getGoalType = () => {
    const diff = appliedTarget - appliedCurrent;

    if (Math.abs(diff) <= 0.2) {
      return "Maintenance";
    } else if (diff < -0.2) {
      return "Weight Loss";
    } else {
      return "Weight Gain";
    }
  };

  const goalType = getGoalType();

  // Primena novih težina TEK kada korisnik napusti input (onBlur)
  const handleInputBlur = () => {
    const cur = currentWeight;
    const tgt = targetWeight;

    if (!isNaN(cur) && !isNaN(tgt)) {
      setAppliedCurrent(cur);
      setAppliedTarget(tgt);
    }
  };

  // Omogućava potvrđivanje pritiskom na Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  // Kontrole za promenu stope (- i +)
  const handleDecreaseRate = () => {
    if (selectedStepIndex > 0) setSelectedStepIndex((prev) => prev - 1);
  };

  const handleIncreaseRate = () => {
    if (selectedStepIndex < lossSteps.length - 1)
      setSelectedStepIndex((prev) => prev + 1);
  };

  // Dinamički opis tempa
  const getPacingDescription = (rate: number) => {
    if (rate <= 0.5) {
      return {
        tag: "Sustainable & Recommended",
        tagColor: "bg-primary/10 text-primary border-primary/20",
        desc: "Moderate pace. Easy to sustain long-term while keeping energy levels and muscle mass stable.",
      };
    } else if (rate <= 0.75) {
      return {
        tag: "Challenging Pace",
        tagColor: "bg-warning/10 text-warning border-warning/20",
        desc: "Requires higher discipline. Make sure your nutrition focus is high on proteins to prevent muscle loss.",
      };
    } else {
      return {
        tag: "Aggressive Pace",
        tagColor: "bg-danger/10 text-danger border-danger/20",
        desc: "Very aggressive target. May cause fatigue, increased hunger, and energy fluctuations.",
      };
    }
  };

  // Proračun procenjenog trajanja u nedeljama
  const calculateWeeks = () => {
    const diff = Math.abs(appliedCurrent - appliedTarget);
    if (diff <= 0.2) return "0 weeks";

    const weeks = Math.ceil(diff / currentLossRate);
    return `~${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  };

  const activePacing = getPacingDescription(currentLossRate);

  const calculateEnergyTarget = () => {
    const diff = appliedTarget - appliedCurrent;

    // Maintenance
    if (Math.abs(diff) <= 0.2) {
        return nutrient_needs.calorie_expenditure;
    }

    const dailyCaloriesChange = (currentLossRate * 7700) / 7;

    // Weight Loss
    if (diff < -0.2) {
        return Math.round(
            nutrient_needs.calorie_expenditure - dailyCaloriesChange
        );
    }

    // Weight Gain
    return Math.round(
        nutrient_needs.calorie_expenditure + dailyCaloriesChange
    );
};

const energyTarget = calculateEnergyTarget();

  return (
      <form action={setWeightGoals} className="mt-3 mx-auto max-w-2xl space-y-6">

        <input 
          type="hidden" 
          value={currentLossRate}
          name="weightChangeRate"
          />

          <input 
          type="hidden" 
          value={usersWeight}
          name="usersWeightOld"
          />

          <input 
          type="hidden" 
          value={energyTarget}
          name="energyTarget"
          />
        

        {/* Zaglavlje - Trenutni cilj */}
        <header className="flex items-center justify-between rounded-card border border-border bg-surface p-card shadow-card">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Current Goal
            </span>
            <h1 className="text-2xl font-bold text-text mt-1">{goalType}</h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-button bg-primary/10 text-primary border border-primary/20">
            <Scale className="h-6 w-6" />
          </div>
        </header>

        {/* Unos težine: Trenutna i Ciljana */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Trenutna težina */}
          <div className="group rounded-card border border-border bg-surface p-card transition hover:border-border-light focus-within:border-primary">
            <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wider">
              Current Weight
            </label>
            <div className="flex items-baseline gap-2">
              <input
                type="number"
                name="currentWeight"
                step="0.5"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-3xl font-bold text-text outline-none focus:ring-0"
                placeholder="0.0"
              />
              <span className="text-sm font-semibold text-text-muted">kg</span>
            </div>
          </div>

          {/* Ciljana težina */}
          <div className="group rounded-card border border-border bg-surface p-card transition hover:border-border-light focus-within:border-primary">
            <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wider">
              Target Weight
            </label>
            <div className="flex items-baseline gap-2">
              <input
                type="number"
                step="0.5"
                name="weightGoal"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-3xl font-bold text-text outline-none focus:ring-0"
                placeholder="0.0"
              />
              <span className="text-sm font-semibold text-text-muted">kg</span>
            </div>
          </div>
        </div>

        {/* AKO NIJE MAINTENANCE: PRIKAZUJE SE PACE SEKCIJA I GOAL SUMMARY */}
        {goalType !== "Maintenance" ? (
          <>
            {/* Weekly Pace Controls */}
            <section className="rounded-card border border-border bg-surface p-card space-y-4 shadow-card animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    Weekly {goalType === "Weight Gain" ? "Gain" : "Loss"} Pace
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5">
                    Select how fast you want to progress each week
                  </p>
                </div>
                <span
                  className={`inline-block rounded-pill border px-2.5 py-1 text-xs font-semibold ${activePacing.tagColor}`}
                >
                  {activePacing.tag}
                </span>
              </div>

              {/* Kontrola sa - / + dugmadima */}
              <div className="flex items-center justify-between rounded-button bg-background p-3 border border-border">
                <button
                  type="button"
                  onClick={handleDecreaseRate}
                  disabled={selectedStepIndex === 0}
                  className="flex h-12 w-12 items-center justify-center rounded-button bg-surface-light text-text hover:bg-border-light disabled:opacity-30 disabled:cursor-not-allowed transition"
                  aria-label="Decrease rate"
                >
                  <Minus className="h-5 w-5" />
                </button>

                <div className="text-center">
                  <span className="text-3xl font-extrabold text-primary">
                    {currentLossRate}
                  </span>
                  <span className="text-sm font-medium text-text-secondary ml-1">
                    kg / week
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleIncreaseRate}
                  disabled={selectedStepIndex === lossSteps.length - 1}
                  className="flex h-12 w-12 items-center justify-center rounded-button bg-surface-light text-text hover:bg-border-light disabled:opacity-30 disabled:cursor-not-allowed transition"
                  aria-label="Increase rate"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Opis tempa */}
              <div className="rounded-button bg-background/50 p-3 border border-border/60">
                <p className="text-xs text-text-secondary leading-relaxed">
                  {activePacing.desc}
                </p>
              </div>
            </section>

            {/* Goal Summary Section (Orijentiri) */}
            <section className="rounded-card border border-border bg-surface p-card space-y-4 shadow-card animate-in fade-in duration-200">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary border-b border-border pb-3">
                Goal Summary
              </h2>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Target Weight */}
                <div className="flex items-center gap-3 rounded-button bg-background p-4 border border-border">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-surface-light text-primary">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Target Weight</p>
                    <p className="text-base font-bold text-text">
                      {appliedTarget} kg
                    </p>
                  </div>
                </div>

                {/* Estimated Duration */}
                <div className="flex items-center gap-3 rounded-button bg-background p-4 border border-border">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-surface-light text-warning">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Estimated Duration</p>
                    <p className="text-base font-bold text-text">
                      {calculateWeeks()}
                    </p>
                  </div>
                </div>

                {/* Energy Target (Tekst umesto inputa) */}
                <div className="flex items-center gap-3 rounded-button bg-background p-4 border border-border">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-surface-light text-info">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Daily Target</p>
                    <p className="text-base font-bold text-text">
                      {energyTarget} kcal
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* AKO JESTE MAINTENANCE: PRIKAZUJE SE SAMO KARTICA SA KALORIJAMA KAO TEKST */
          <section className="rounded-card border border-border bg-surface p-card space-y-4 shadow-card animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Weight Maintenance
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Maintaining current weight at {appliedCurrent} kg
                </p>
              </div>
              <span className="inline-block rounded-pill border px-2.5 py-1 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
                Maintenance
              </span>
            </div>

            {/* Prikaz kalorija bez inputa */}
            <div className="flex items-center gap-3 rounded-button bg-background p-4 border border-border">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-surface-light text-info">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">Daily Energy Target</p>
                <p className="text-lg font-bold text-text mt-0.5">
                  {energyTarget} <span className="text-sm font-semibold text-text-muted">kcal / day</span>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Glavno dugme za čuvanje na dnu */}
        {  getGoalType() === "Maintenance" ? (
          <button
            disabled
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-button
              bg-primary
              py-4
              text-base
              font-bold
              text-black
              transition
              shadow-card
              disabled:opacity-50
              disabled:cursor-not-allowed
          "
          >
            <Check className="h-5 w-5" />
          <span>Save Changes</span>
        </button>
        ): (
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-button bg-primary py-4 text-base font-bold text-black hover:bg-primary-hover transition shadow-card cursor-pointer"
          >
            <Check className="h-5 w-5" />
          <span>Save Changes</span>
        </button>
        )}
        
      </form>
  );
}