"use client"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

type WeightData = {
    date_logged: string;
    bodyweight: number;
};

export default function WeightProgressChart({
    data,
    unit_system
}: {
    data: WeightData[],
    unit_system: string
}) {

    const chartData = unit_system === "imperial"
        ? data.map((item) => ({
            ...item,
            bodyweight: Number((item.bodyweight * 2.20462).toFixed(1))
        }))
        : data;

    return (
        <section className="h-full w-full rounded-card border border-border bg-surface p-4 sm:p-card">
            {/* Zaglavlje */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 className="text-lg font-bold sm:text-xl">
                        Bodyweight Progress
                    </h2>
                    <p className="mt-0.5 text-xs text-text-secondary sm:text-sm">
                        Your weight changes over time
                    </p>
                </div>

                <span className="self-start sm:self-auto rounded-pill bg-primary/10 px-3 py-1 text-xs sm:text-sm font-medium text-primary">
                    {unit_system === "imperial" ? "lbs" : "kg"}
                </span>
            </div>

            {/* Kontejner za grafikon */}
            <div className="mt-6 h-64 w-full sm:mt-8 sm:h-72">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart 
                        data={chartData}
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
                            domain={[
                                "dataMin - 2",
                                "dataMax + 2"
                            ]}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: "currentColor", fontSize: 11 }}
                            className="text-text-secondary"
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "black",
                                border: "none",
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
                                `${value} ${unit_system === "imperial" ? "lbs" : "kg"}`,
                                "Weight"
                            ]}
                        />

                        <Bar
                            dataKey="bodyweight"
                            fill="#22c55e"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}