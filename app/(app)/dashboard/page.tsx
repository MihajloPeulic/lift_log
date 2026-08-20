import WeightProgressChart from "./WeightProgressChart";
import { getBwHistory, getCurrentUser, getUnitSystem, getCalorieHistory } from "../../lib/data/user";
import CaloriesProgressChart from "./CaloriesProgressChart";




export default async function DashboardPage() {


    const user = await getCurrentUser()
    const weightHistory = await getBwHistory()
    const unit_system = await getUnitSystem()

    const calorieHistory = await getCalorieHistory()

    const dailyCalories = calorieHistory.reduce(
    (acc, item) => {

        const date = item.eaten_at.split("T")[0];


        const calories =
            ((item.amount * item.unit_grams) / 100) *
            item.calories;


        acc[date] = (acc[date] ?? 0) + calories;


        return acc;

    },
    {} as Record<string, number>
);





  const calorieChartData = Object.entries(dailyCalories)
      .map(([date_logged, calories]) => ({
          date_logged,
          calories: Number(calories.toFixed(1))
      }))
      .sort(
          (a,b) =>
              new Date(a.date_logged).getTime() -
              new Date(b.date_logged).getTime()
      );


    return (

        <div className="min-h-screen bg-background text-text">


            <nav className="
                fixed
                bottom-0
                left-0
                right-0
                z-50
                border-t
                border-border
                bg-background/95
                backdrop-blur
                lg:hidden
            ">

                <div className="grid grid-cols-5 px-2 py-3">

                    <a className="flex flex-col items-center gap-1 text-xs text-primary">
                        🏠
                        Home
                    </a>

                    <a className="flex flex-col items-center gap-1 text-xs text-text-secondary">
                        💪
                        Workout
                    </a>

                    <a className="flex flex-col items-center gap-1 text-xs text-text-secondary">
                        📈
                        Progress
                    </a>

                    <a className="flex flex-col items-center gap-1 text-xs text-text-secondary">
                        📋
                        Programs
                    </a>

                    <a className="flex flex-col items-center gap-1 text-xs text-text-secondary">
                        👤
                        Profile
                    </a>

                </div>

            </nav>




            <main className="
                mx-auto
                max-w-6xl
                pb-mobile-nav
                lg:p-8
            ">


                <header
                    className="
                    border-b
                    border-border
                    px-5
                    py-5
                    lg:px-8
                    "
                >

                    <h1 className="text-2xl font-bold">
                        Dashboard
                    </h1>


                    <p className="mt-1 text-sm text-text-secondary">
                        Track your progress and stay consistent.
                    </p>


                </header>




                <div className="p-5 lg:p-8">


                    <section className="mb-8">

                        <h2 className="text-3xl font-bold">
                            Good morning, {user.user_metadata?.username} 👋
                        </h2>


                        <p className="mt-2 text-text-secondary">
                            Keep pushing towards your goals.
                        </p>


                    </section>




                    <div className="grid gap-6 lg:grid-cols-2 items-stretch">

                      <div className="w-full">
                          <WeightProgressChart
                              data={weightHistory ?? []}
                              unit_system={unit_system}
                          />
                      </div>

                      <div className="w-full">
                          <CaloriesProgressChart
                              data={calorieChartData ?? []}
                          />
                      </div>

                  </div>


                </div>


            </main>


        </div>

    );
}