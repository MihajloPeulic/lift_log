import Sidebar from "@/components/Sidebar_desktop";
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

  const user = await getCurrentUser() 
  const params = await searchParams;


  if(!user){
    redirect("/login")
  }

  const dailyTargets = await getCalorieNeeds(user.id)

  const selectedDate =
    params.date ??
    new Date().toISOString().split("T")[0];


  const meals = await getMeals(selectedDate)

  
  return (

    <div className="min-h-screen bg-background text-text">


      <div className="flex min-h-screen">





        <main className="mx-auto flex-1 max-w-6xl p-5 pb-28 lg:p-8">


          <header className="space-y-6">


            <div>

              <h1 className="text-3xl font-bold">
                Nutrition
              </h1>


              <p className="text-text-secondary">
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