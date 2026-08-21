"use client"

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
    <div className="mt-3 w-full max-w-2xl">
      <div className="rounded-card border border-border bg-surface p-4 sm:p-card">
        
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h2 className="text-xl font-bold sm:text-2xl">
            Edit Body Stats
          </h2>
          <p className="mt-1 text-xs text-text-secondary sm:text-sm">
            Update your current measurements.
          </p>
        </header>

        <form action={updateBodyStats}>
          <input 
            name="unitSystem"
            defaultValue={unit_system}
            hidden
          />

          <div className="divide-y divide-border">
            
            {/* Age / Date of Birth */}
            <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex shrink-0 items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">
                  Date of birth
                </label>
              </div>

              <input
                type="date"
                name="date_of_birth"
                defaultValue={date_of_birth}
                className="w-full rounded-button border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary sm:w-48 sm:py-2 sm:text-right"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex shrink-0 items-center gap-2">
                <UserRound className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">
                  Gender
                </label>
              </div>

              <select
                name="gender"
                defaultValue={gender}
                className="w-full rounded-button border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary sm:w-48 sm:py-2 sm:text-right"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Bodyweight */}
            <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex shrink-0 items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">
                  Bodyweight
                </label>
              </div>

              <div className="relative w-full sm:w-48">
                <input
                  type="number"
                  name="bodyweight"
                  defaultValue={bodyweight.toString()}
                  className="w-full rounded-button border border-border bg-background px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary sm:py-2 sm:text-right"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary">
                  {unit_system === "imperial" ? "lbs" : "kg"}
                </span>
              </div>
            </div>

            {/* Height */}
            <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex shrink-0 items-center gap-2">
                <Ruler className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">
                  Height
                </label>
              </div>

              {unit_system === "metric" ? (
                <div className="relative w-full sm:w-48">
                  <input
                    type="number"
                    name="height"
                    defaultValue={height}
                    className="w-full rounded-button border border-border bg-background px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary sm:py-2 sm:text-right"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary">
                    cm
                  </span>
                </div>
              ) : (
                <div className="flex w-full gap-2 sm:w-48">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      name="feet"
                      defaultValue={feet}
                      className="w-full rounded-button border border-border bg-background px-3 py-2.5 pr-8 text-sm outline-none focus:border-primary sm:py-2 sm:text-right"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary">
                      ft
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      name="inch"
                      defaultValue={inch}
                      className="w-full rounded-button border border-border bg-background px-3 py-2.5 pr-8 text-sm outline-none focus:border-primary sm:py-2 sm:text-right"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Body fat */}
            <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="flex shrink-0 items-center gap-2">
                <Percent className="h-4 w-4 text-primary" />
                <label className="text-sm font-medium">
                  Body fat
                </label>
              </div>

              <div className="relative w-full sm:w-48">
                <input
                  type="number"
                  name="bodyFat"
                  defaultValue={bodyFat}
                  className="w-full rounded-button border border-border bg-background px-3 py-2.5 pr-8 text-sm outline-none focus:border-primary sm:py-2 sm:text-right"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-secondary">
                  %
                </span>
              </div>
            </div>
            
          </div>

          <button
            type="submit"
            className="mt-6 w-full cursor-pointer rounded-button bg-primary py-3 text-sm font-semibold text-black transition hover:bg-primary-hover sm:text-base"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}