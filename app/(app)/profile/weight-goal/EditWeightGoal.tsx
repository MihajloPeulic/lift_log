"use client";

import { useState } from "react";
import { Scale, Trophy, Plus, Minus, Flame, Check } from "lucide-react";
import { CalorieNeeds } from "@/app/types/food";
import { setWeightGoals } from "@/app/actions/nutrition";

export default function EditWeightGoal(
  {
    nutrient_needs,
    usersWeight
  }: {
    nutrient_needs: CalorieNeeds,
    usersWeight: number
  }
) {
  const [currentWeight, setCurrentWeight] = useState<number>(usersWeight);
  const [targetWeight, setTargetWeight] = useState<number>(nutrient_needs.weight_goal);
  
  const [appliedCurrent, setAppliedCurrent] = useState<number>(usersWeight);
  const [appliedTarget, setAppliedTarget] = useState<number>(nutrient_needs.weight_goal);

  const lossSteps = [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0];

  const defaultStepIndex = lossSteps.indexOf(
      nutrient_needs.weight_change_rate ?? 1
  );

  const [selectedStepIndex, setSelectedStepIndex] = useState(
      defaultStepIndex !== -1 ? defaultStepIndex : lossSteps.indexOf(1)
  );

  const currentLossRate = lossSteps[selectedStepIndex];

  const getGoalType = () => {
    const diff = appliedTarget - appliedCurrent;
    if (Math.abs(diff) <= 0.2) return "Maintenance";
    if (diff < -0.2) return "Weight Loss";
    return "Weight Gain";
  };

  const goalType = getGoalType();

  const handleInputBlur = () => {
    const cur = currentWeight;
    const tgt = targetWeight;
    if (!isNaN(cur) && !isNaN(tgt)) {
      setAppliedCurrent(cur);
      setAppliedTarget(tgt);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleDecreaseRate = () => {
    if (selectedStepIndex > 0) setSelectedStepIndex((prev) => prev - 1);
  };

  const handleIncreaseRate = () => {
    if (selectedStepIndex < lossSteps.length - 1)
      setSelectedStepIndex((prev) => prev + 1);
  };

  const getPacingDescription = (rate: number) => {
    if (rate <= 0.5) {
      return {
        tag: "Sustainable & Recommended",
        tagColor: "bg-primary/10 text-primary border-primary/20",
        desc: "Moderate pace. Easy to sustain long-term while keeping energy levels stable.",
      };
    } else if (rate <= 0.75) {
      return {
        tag: "Challenging Pace",
        tagColor: "bg-warning/10 text-warning border-warning/20",
        desc: "Requires discipline. Keep your protein intake high to prevent muscle loss.",
      };
    } else {
      return {
        tag: "Aggressive Pace",
        tagColor: "bg-danger/10 text-danger border-danger/20",
        desc: "Very aggressive target. May cause fatigue and increased hunger.",
      };
    }
  };

  const calculateWeeks = () => {
    const diff = Math.abs(appliedCurrent - appliedTarget);
    if (diff <= 0.2) return "0 weeks";
    const weeks = Math.ceil(diff / currentLossRate);
    return `~${weeks} ${weeks === 1 ? "week" : "weeks"}`;
  };

  const activePacing = getPacingDescription(currentLossRate);

  const calculateEnergyTarget = () => {
    const diff = appliedTarget - appliedCurrent;
    if (Math.abs(diff) <= 0.2) return nutrient_needs.calorie_expenditure;

    const dailyCaloriesChange = (currentLossRate * 7700) / 7;
    if (diff < -0.2) {
        return Math.round(nutrient_needs.calorie_expenditure - dailyCaloriesChange);
    }
    return Math.round(nutrient_needs.calorie_expenditure + dailyCaloriesChange);
  };

  const energyTarget = calculateEnergyTarget();

  return (
      <form action={setWeightGoals} className="layout-container">
        <input type="hidden" value={currentLossRate} name="weightChangeRate" />
        <input type="hidden" value={usersWeight} name="usersWeightOld" />
        <input type="hidden" value={energyTarget} name="energyTarget" />
        
        {/* ZAGLAVLJE */}
        <header className="card-main flex items-center justify-between">
          <div>
            <span className="text-label">Current Goal</span>
            <h1 className="text-h1 mt-0.5 sm:mt-1">{goalType}</h1>
          </div>
          <div className="icon-wrapper-primary">
            <Scale className="icon-md" />
          </div>
        </header>

        {/* UNOS TEŽINE - Savršeno formatiran uz pomoć novih klasa */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
          
          {/* Trenutna težina */}
          <div className="card-inner flex items-center justify-between sm:flex-col sm:items-start sm:justify-start">
            <label className="text-label sm:mb-2">
              Current Weight
            </label>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <input
                type="number"
                name="currentWeight"
                step="0.5"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(Number(e.target.value))}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="input-ghost text-value w-16 sm:w-full text-right sm:text-left"
                placeholder="0.0"
              />
              <span className="text-xs sm:text-sm font-semibold text-text-muted">kg</span>
            </div>
          </div>

          {/* Ciljana težina */}
          <div className="card-inner flex items-center justify-between sm:flex-col sm:items-start sm:justify-start">
            <label className="text-label sm:mb-2">
              Target Weight
            </label>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <input
                type="number"
                step="0.5"
                name="weightGoal"
                value={targetWeight}
                onChange={(e) => setTargetWeight(Number(e.target.value))}
                onBlur={handleInputBlur}
                onKeyDown={handleKeyDown}
                className="input-ghost text-value w-16 sm:w-full text-right sm:text-left"
                placeholder="0.0"
              />
              <span className="text-xs sm:text-sm font-semibold text-text-muted">kg</span>
            </div>
          </div>

        </div>

        {goalType !== "Maintenance" ? (
          <>
            {/* WEEKLY PACE */}
            <section className="card-main space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-label">
                    Weekly {goalType === "Weight Gain" ? "Gain" : "Loss"} Pace
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5">
                    Select how fast you want to progress
                  </p>
                </div>
                <span className={`badge-tag self-start sm:self-auto ${activePacing.tagColor}`}>
                  {activePacing.tag}
                </span>
              </div>

              {/* Kontrola */}
              <div className="flex items-center justify-between rounded-button bg-background p-2 sm:p-3 border border-border">
                <button
                  type="button"
                  onClick={handleDecreaseRate}
                  disabled={selectedStepIndex === 0}
                  className="btn-icon"
                >
                  <Minus className="icon-sm" />
                </button>

                <div className="text-center">
                  <span className="text-2xl sm:text-3xl font-extrabold text-primary">
                    {currentLossRate}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-text-secondary ml-1 sm:ml-1.5">
                    kg / wk
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleIncreaseRate}
                  disabled={selectedStepIndex === lossSteps.length - 1}
                  className="btn-icon"
                >
                  <Plus className="icon-sm" />
                </button>
              </div>

              {/* Opis */}
              <div className="rounded-button bg-background/50 p-3 sm:p-4 border border-border/60">
                <p className="text-[11px] sm:text-xs text-text-secondary leading-relaxed">
                  {activePacing.desc}
                </p>
              </div>
            </section>

            {/* GOAL SUMMARY */}
            <section className="card-main space-y-4">
              <h2 className="text-label border-b border-border pb-2 sm:pb-3">
                Goal Summary
              </h2>

              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                <div className="card-block">
                  <div className="icon-badge text-primary">
                    <Scale className="icon-sm" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-text-secondary">Target Weight</p>
                    <p className="text-sm sm:text-base font-bold text-text">
                      {appliedTarget} kg
                    </p>
                  </div>
                </div>

                <div className="card-block">
                  <div className="icon-badge text-warning">
                    <Trophy className="icon-sm" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-text-secondary">Estimated Duration</p>
                    <p className="text-sm sm:text-base font-bold text-text">
                      {calculateWeeks()}
                    </p>
                  </div>
                </div>

                <div className="card-block">
                  <div className="icon-badge text-info">
                    <Flame className="icon-sm" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-xs text-text-secondary">Daily Target</p>
                    <p className="text-sm sm:text-base font-bold text-text">
                      {energyTarget} kcal
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="card-main space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h2 className="text-label">
                  Weight Maintenance
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Maintaining current weight at {appliedCurrent} kg
                </p>
              </div>
              <span className="badge-tag self-start sm:self-auto bg-primary/10 text-primary border-primary/20">
                Maintenance
              </span>
            </div>

            <div className="card-block">
              <div className="icon-badge text-info">
                <Flame className="icon-sm" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-text-secondary">Daily Energy Target</p>
                <p className="text-base sm:text-lg font-bold text-text mt-0.5">
                  {energyTarget} <span className="text-[11px] sm:text-sm font-semibold text-text-muted">kcal / day</span>
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SAVE DUGME */}
        <button
          type={getGoalType() === "Maintenance" ? "button" : "submit"}
          disabled={getGoalType() === "Maintenance"}
          className="btn-primary"
        >
          <Check className="icon-sm" />
          <span>Save Changes</span>
        </button>
      </form>
  );
}