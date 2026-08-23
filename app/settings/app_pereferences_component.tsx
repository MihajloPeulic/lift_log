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
    <section className="card-main space-y-4">
      
      <h2 className="text-base sm:text-lg font-bold text-text">
        App Preferences
      </h2>

      <div className="divide-y divide-border border-t border-border">
        
        {/* Unit System */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
          <div>
            <p className="text-sm sm:text-base font-bold text-text">
              Unit system
            </p>
            <p className="text-caption mt-0.5">
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
            className="input-box bg-background text-text w-full sm:w-44 text-left appearance-none cursor-pointer"
          >
            <option className="bg-surface text-text font-medium" value="metric">Metric (kg, cm)</option>
            <option className="bg-surface text-text font-medium" value="imperial">Imperial (lb, ft/in)</option>
          </select>
        </div>

        {/* Theme */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
          <div>
            <p className="text-sm sm:text-base font-bold text-text">
              Theme
            </p>
            <p className="text-caption mt-0.5">
              Appearance mode
            </p>
          </div>

          <select 
            defaultValue={theme}
            className="input-box bg-background text-text w-full sm:w-44 text-left appearance-none cursor-pointer"
          >
            <option className="bg-surface text-text font-medium" value="dark">Dark</option>
            <option className="bg-surface text-text font-medium" value="light">Light</option>
          </select>
        </div>

      </div>
    </section>
  );
}