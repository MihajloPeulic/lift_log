"use client"

import { useState } from "react";
import { updateUnit } from "../actions/updateProfile";

type AppPreferencesProps = {
  unit_system: string,
  theme: string
}

export default function AppPreferences({
  unit_system,
  theme
}: AppPreferencesProps) {
  const [unit, setUnit] = useState(unit_system);

  return (
    <section className="mt-6 rounded-card border border-border bg-surface p-4 sm:mt-8 sm:p-card">
      
      <h2 className="text-lg font-bold sm:text-xl">
        App Preferences
      </h2>

      <div className="mt-4 space-y-5 sm:mt-6 sm:space-y-6">
        
        {/* Unit System */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div>
            <p className="text-sm font-medium sm:text-base">
              Unit system
            </p>
            <p className="text-xs text-text-secondary sm:text-sm">
              Choose measurement system
            </p>
          </div>

          <select
            name="unit"
            value={unit}
            onChange={async (e) => {
              const newUnit = e.target.value;
              setUnit(newUnit);
              await updateUnit(newUnit);
            }}
            className="w-full cursor-pointer rounded-button border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary sm:w-48 sm:py-2 sm:text-base"
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lb, ft/in)</option>
          </select>
        </div>

        {/* Theme */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div>
            <p className="text-sm font-medium sm:text-base">
              Theme
            </p>
            <p className="text-xs text-text-secondary sm:text-sm">
              Appearance mode
            </p>
          </div>

          <select 
            defaultValue={theme}
            className="w-full cursor-pointer rounded-button border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary sm:w-48 sm:py-2 sm:text-base"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

      </div>
    </section>
  );
}