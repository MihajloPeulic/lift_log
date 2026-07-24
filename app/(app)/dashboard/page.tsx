import Sidebar from "@/components/Sidebar_desktop";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import {getCurrentUser} from "../../lib/data/user"
import {redirect} from "next/navigation"

export default async function DashboardPage() {
  {
    const user = await getCurrentUser();
    
      if(!user){
          redirect("/login");
      }
    


  return (
    <div className="min-h-screen bg-background text-text">

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-5 px-2 py-3">

          <a href="#" className="flex flex-col items-center gap-1 text-xs text-primary">
            <span className="text-xl">🏠</span>
            Home
          </a>

          <a href="#" className="flex flex-col items-center gap-1 text-xs text-text-secondary hover:text-text">
            <span className="text-xl">💪</span>
            Workout
          </a>

          <a href="#" className="flex flex-col items-center gap-1 text-xs text-text-secondary hover:text-text">
            <span className="text-xl">📈</span>
            Progress
          </a>

          <a href="#" className="flex flex-col items-center gap-1 text-xs text-text-secondary hover:text-text">
            <span className="text-xl">📋</span>
            Programs
          </a>

          <a href="#" className="flex flex-col items-center gap-1 text-xs text-text-secondary hover:text-text">
            <span className="text-xl">👤</span>
            Profile
          </a>

        </div>
      </nav>


      <div className="flex min-h-screen">


        




        {/* Main */}
        <main className="mx-auto flex-1 max-w-6xl pb-mobile-nav lg:p-8">


          <header className="flex items-center justify-between border-b border-border px-5 py-5 lg:px-8">

            <div>

              <h1 className="text-2xl font-bold">
                Dashboard
              </h1>

              <p className="text-sm text-text-secondary">
                Track your progress and stay consistent.
              </p>

            </div>


            <button className="rounded-button bg-primary px-5 py-3 font-semibold text-black hover:bg-primary-hover">
              Start workout
            </button>


          </header>





          <div className="p-5 lg:p-8">


            <section className="mb-8">

              <h2 className="text-3xl font-bold">
                Good morning, {user?.user_metadata?.username} 👋
              </h2>

              <p className="mt-2 text-text-secondary">
                Ready to beat your personal records?
              </p>

            </section>





            {/* Stats */}
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">


              {[
                ["Weekly Volume", "12,450 kg"],
                ["Workouts", "5"],
                ["Bodyweight", "71.5 kg"],
                ["Latest PR", "+5 kg"],
              ].map(([title, value], index) => (

                <article
                  key={title}
                  className="rounded-card border border-border bg-surface p-card"
                >

                  <p className="text-sm text-text-secondary">
                    {title}
                  </p>

                  <p className={`mt-3 text-3xl font-bold ${
                    index === 3 ? "text-primary" : ""
                  }`}>
                    {value}
                  </p>

                </article>

              ))}


            </section>







            <section className="mt-8 grid gap-6 xl:grid-cols-3">


              {/* Workout Card */}
              <article className="rounded-card border border-border bg-surface p-card xl:col-span-2">

                <header className="flex justify-between">

                  <div>

                    <h3 className="text-xl font-bold">
                      Today's Workout
                    </h3>

                    <p className="text-sm text-text-secondary">
                      Upper Strength Day
                    </p>

                  </div>


                  <span className="rounded-pill bg-primary/10 px-3 py-1 text-sm text-primary">
                    Planned
                  </span>


                </header>



                <ul className="mt-6 space-y-3">

                  {[
                    ["Bench Press", "5 × 5"],
                    ["Weighted Pull Up", "4 × 6"],
                    ["Overhead Press", "3 × 8"],
                  ].map(([exercise, sets]) => (

                    <li
                      key={exercise}
                      className="flex justify-between rounded-button bg-background p-4"
                    >

                      <span>
                        {exercise}
                      </span>

                      <span className="text-text-secondary">
                        {sets}
                      </span>

                    </li>

                  ))}

                </ul>


              </article>





              {/* PR Card */}
              <article className="rounded-card border border-border bg-surface p-card">

                <h3 className="text-xl font-bold">
                  Recent PR
                </h3>


                <div className="mt-6">

                  <p className="text-text-secondary">
                    Squat
                  </p>

                  <p className="text-4xl font-bold">
                    150 kg
                  </p>

                  <span className="text-primary">
                    New record 🔥
                  </span>

                </div>

              </article>


            </section>


          </div>


        </main>


      </div>


    </div>
  );
}
};