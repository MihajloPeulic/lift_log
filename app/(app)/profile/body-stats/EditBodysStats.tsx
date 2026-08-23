"use client";

import { updateBodyStats } from "@/app/actions/updateProfile";
import { CalendarDays, UserRound, Scale, Ruler, Percent } from "lucide-react";

export default function EditBodyStats({
  bodyweight,
  height,
  unit_system,
  gender,
  bodyFat,
  date_of_birth
}: {
  bodyweight: number;
  height: number;
  unit_system: string,
  gender: string,
  bodyFat: number,
  date_of_birth: string
}) {

  let feet = 0;
  let inch = 0;

  if (unit_system === "imperial") {
    const totalInches = height;
    feet = Math.floor(totalInches / 12);
    inch = Math.round(totalInches % 12);
  }

  return (
    <div className="layout-container">
      <div className="card-main">
        
        {/* Header */}
        <header>
          <h1 className="text-h1">
            Edit Body Stats
          </h1>
          <p className="text-caption mt-1">
            Update your current measurements.
          </p>
        </header>

        <form action={updateBodyStats}>
          <input 
            name="unitSystem"
            defaultValue={unit_system}
            hidden
          />

          <div className="mt-5 divide-y divide-border border-t border-border">
            
            {/* Age / Date of Birth */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="icon-sm text-primary" />
                <label className="text-sm sm:text-base font-bold text-text">
                  Date of birth
                </label>
              </div>

              <input
                type="date"
                name="date_of_birth"
                defaultValue={date_of_birth}
                className="input-box w-full sm:w-44 text-left appearance-none cursor-pointer"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
              <div className="flex items-center gap-2">
                <UserRound className="icon-sm text-primary" />
                <label className="text-sm sm:text-base font-bold text-text">
                  Gender
                </label>
              </div>

              <select
                name="gender"
                defaultValue={gender}
                className="input-box w-full sm:w-44 text-left appearance-none cursor-pointer"
              >
                <option className="bg-surface text-text font-medium" value="male">Male</option>
                <option className="bg-surface text-text font-medium" value="female">Female</option>
                <option className="bg-surface text-text font-medium" value="other">Other</option>
              </select>
            </div>

            {/* Bodyweight */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
              <div className="flex items-center gap-2">
                <Scale className="icon-sm text-primary" />
                <label className="text-sm sm:text-base font-bold text-text">
                  Bodyweight
                </label>
              </div>

              <div className="relative w-full sm:w-44">
                <input
                  type="number"
                  step="0.1"
                  name="bodyweight"
                  defaultValue={bodyweight.toString()}
                  className="input-box w-full pr-12 text-left"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-text-secondary font-medium pointer-events-none">
                  {unit_system === "imperial" ? "lbs" : "kg"}
                </span>
              </div>
            </div>

            {/* Height */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
              <div className="flex items-center gap-2">
                <Ruler className="icon-sm text-primary" />
                <label className="text-sm sm:text-base font-bold text-text">
                  Height
                </label>
              </div>

              {unit_system === "metric" ? (
                <div className="relative w-full sm:w-44">
                  <input
                    type="number"
                    name="height"
                    defaultValue={height}
                    className="input-box w-full pr-12 text-left"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-text-secondary font-medium pointer-events-none">
                    cm
                  </span>
                </div>
              ) : (
                <div className="flex w-full gap-2 sm:w-44">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      name="feet"
                      defaultValue={feet}
                      className="input-box w-full pr-10 text-left"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary font-medium pointer-events-none">
                      ft
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      name="inch"
                      defaultValue={inch}
                      className="input-box w-full pr-10 text-left"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary font-medium pointer-events-none">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Body fat */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3">
              <div className="flex items-center gap-2">
                <Percent className="icon-sm text-primary" />
                <label className="text-sm sm:text-base font-bold text-text">
                  Body fat
                </label>
              </div>

              <div className="relative w-full sm:w-44">
                <input
                  type="number"
                  name="bodyFat"
                  step="0.1"
                  defaultValue={bodyFat}
                  className="input-box w-full pr-10 text-left"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-text-secondary font-medium pointer-events-none">
                  %
                </span>
              </div>
            </div>
            
          </div>

          <button
            type="submit"
            className="btn-primary mt-6"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}