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


export default function WeightProgressChart(
    {
        data,
        unit_system
    }: {
        data: WeightData[],
        unit_system: string
    }
) {

    const chartData = unit_system === "imperial"
    ? data.map((item) => ({
        ...item,
        bodyweight: Number((item.bodyweight * 2.20462).toFixed(1))
    }))
    : data;

    return (

        <section className="h-full rounded-card border border-border bg-surface p-card">

            <div className="flex items-center justify-between">


                <div>

                    <h2 className="text-xl font-bold">
                        Bodyweight Progress
                    </h2>


                    <p className="mt-1 text-sm text-text-secondary">
                        Your weight changes over time
                    </p>

                </div>


                <span
                    className="
                    rounded-pill
                    bg-primary/10
                    px-3
                    py-1
                    text-sm
                    text-primary
                    "
                >
                    {unit_system === "imperial" ? "lbs" : "kg"}
                </span>


            </div>



            <div className="mt-8 h-72 w-full">


                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart data={chartData}>


                        <CartesianGrid
                            strokeDasharray="3 3"
                        />


                        <XAxis
                            dataKey="date_logged"
                        />


                        <YAxis
                            domain={[
                                "dataMin - 2",
                                "dataMax + 2"
                            ]}
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
                                fontSize: "14px",
                                marginBottom: "4px",
                            }}
                            itemStyle={{
                                color: "white",
                                fontSize: "14px",
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
                            radius={[
                                8,
                                8,
                                0,
                                0
                            ]}
                        />


                    </BarChart>


                </ResponsiveContainer>


            </div>


        </section>

    )

}