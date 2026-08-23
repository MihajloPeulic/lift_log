import DateSelector from "@/components/DateSelector";
import MealsSection from "./meal-components/MealsSection";
import { getMeals } from "@/app/lib/data/meals";
import { getCalorieNeeds } from "@/app/lib/data/food";
import { getCurrentUser } from "@/app/lib/data/user";
import { redirect } from "next/navigation";

export default async function NutritionPage({
  searchParams
}: {
  searchParams: Promise<{
    date?: string
  }>
}) {
  const user = await getCurrentUser();
  const params = await searchParams;

  if (!user) {
    redirect("/login");
  }

  const dailyTargets = await getCalorieNeeds(user.id);

  const selectedDate =
    params.date ??
    new Date().toISOString().split("T")[0];

  const meals = await getMeals(selectedDate);

  return (
    <div className="min-h-screen w-full overflow-x-hidden text-text">
      <div className="flex min-h-screen w-full">
        <main className="mx-auto w-full max-w-6xl min-w-0 p-4 pb-28 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          
          <header className="space-y-4">
            <div>
              <h1 className="text-h1">
                Nutrition
              </h1>
              <p className="text-caption mt-1">
                Track calories, macros and meals.
              </p>
            </div>

            {/* Date selector */}
            <DateSelector />
          </header>

          <MealsSection 
            initialMeals={meals}
            selectedDate={selectedDate}
            dailyTargets={dailyTargets}
          />
        </main>
      </div>
    </div>
  );
}