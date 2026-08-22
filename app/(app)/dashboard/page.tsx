import WeightProgressChart from "./WeightProgressChart";
import { getBwHistory, getCurrentUser, getUnitSystem, getCalorieHistory } from "../../lib/data/user";
import CaloriesProgressChart from "./CaloriesProgressChart";

export default async function DashboardPage() {
    const user = await getCurrentUser();
    const weightHistory = await getBwHistory();
    const unit_system = await getUnitSystem();
    const calorieHistory = await getCalorieHistory();

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
            (a, b) =>
                new Date(a.date_logged).getTime() -
                new Date(b.date_logged).getTime()
        );

    return (
        <div className="min-h-[100dvh] text-text  overflow-x-hidden">
            {/* Mobilna navigacija na dnu */}
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
                    <a className="flex flex-col items-center gap-1 text-[11px] sm:text-xs text-primary font-medium">
                        🏠
                        Home
                    </a>
                    <a className="flex flex-col items-center gap-1 text-[11px] sm:text-xs text-text-secondary">
                        💪
                        Workout
                    </a>
                    <a className="flex flex-col items-center gap-1 text-[11px] sm:text-xs text-text-secondary">
                        📈
                        Progress
                    </a>
                    <a className="flex flex-col items-center gap-1 text-[11px] sm:text-xs text-text-secondary">
                        📋
                        Programs
                    </a>
                    <a className="flex flex-col items-center gap-1 text-[11px] sm:text-xs text-text-secondary">
                        👤
                        Profile
                    </a>
                </div>
            </nav>

            {/* Glavni sadržaj */}
            <main className="
                mx-auto
                max-w-6xl
                pb-24
                lg:pb-12
                lg:p-8
            ">
                <header className="
                    border-b
                    border-border
                    px-4
                    py-4
                    sm:px-6
                    lg:px-8
                ">
                    <h1 className="text-xl font-bold sm:text-2xl">
                        Dashboard
                    </h1>
                    <p className="mt-0.5 text-xs text-text-secondary sm:text-sm">
                        Track your progress and stay consistent.
                    </p>
                </header>

                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <section className="mb-6 sm:mb-8">
                        <h2 className="text-2xl font-bold sm:text-3xl tracking-tight">
                            Good morning, {user.user_metadata?.username} 👋
                        </h2>
                        <p className="mt-1.5 text-xs text-text-secondary sm:text-sm">
                            Keep pushing towards your goals.
                        </p>
                    </section>

                    {/* Grafikoni u rešetki */}
                    <div className="grid gap-6 lg:grid-cols-2 items-stretch">
                        <div className="w-full">
                            <WeightProgressChart
                                data={weightHistory ?? []}
                                unit_system={unit_system}
                            />
                        </div>
                        
                        {calorieChartData.length > 0 && 
                            (
                                <div className="w-full">
                                    <CaloriesProgressChart
                                        data={calorieChartData ?? []}
                                    />
                                </div>
                            )
                        
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}