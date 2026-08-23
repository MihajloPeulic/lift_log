"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

type CaloriesData = {
    date_logged: string;
    calories: number;
};

export default function CaloriesProgressChart({
    data
}: {
    data: CaloriesData[]
}) {
    return (
        <section className="card-main h-full w-full">
            {/* Zaglavlje */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className="text-lg font-bold sm:text-xl text-text">
                        Calories Consumed
                    </h2>
                    <p className="text-caption mt-0.5">
                        Track your daily calorie intake
                    </p>
                </div>

                <span className="self-start sm:self-auto rounded-pill bg-primary/10 px-3 py-1 text-xs sm:text-sm font-medium text-primary">
                    kcal
                </span>
            </div>

            {/* Kontejner za grafikon */}
            <div className="mt-6 h-64 w-full sm:mt-8 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="rgba(255, 255, 255, 0.1)"
                        />

                        <XAxis
                            dataKey="date_logged"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "currentColor", fontSize: 11 }}
                            className="text-text-secondary"
                            dy={10}
                        />

                        <YAxis
                            domain={[0, "auto"]}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "currentColor", fontSize: 11 }}
                            className="text-text-secondary"
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "black",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "8px",
                                padding: "8px 12px",
                                whiteSpace: "nowrap",
                            }}
                            labelStyle={{
                                color: "white",
                                fontSize: "13px",
                                marginBottom: "4px",
                            }}
                            itemStyle={{
                                color: "white",
                                fontSize: "13px",
                                fontWeight: 500,
                            }}
                            cursor={{
                                fill: "rgba(255,255,255,0.05)"
                            }}
                            formatter={(value) => [
                                `${value} kcal`,
                                "Calories"
                            ]}
                        />

                        <Bar
                            dataKey="calories"
                            fill="#22c55e"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}