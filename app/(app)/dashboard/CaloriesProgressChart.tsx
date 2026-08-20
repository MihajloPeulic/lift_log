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


type CaloriesData = {
    date_logged: string;
    calories: number;
};


export default function CaloriesProgressChart(
    {
        data
    }: {
        data: CaloriesData[]
    }
) {


    return (

        <section className="h-full rounded-card border border-border bg-surface p-card">


            <div className="flex items-center justify-between">


                <div>

                    <h2 className="text-xl font-bold">
                        Calories Consumed
                    </h2>


                    <p className="mt-1 text-sm text-text-secondary">
                        Track your daily calorie intake
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
                    kcal
                </span>


            </div>





            <div className="mt-8 h-72 w-full">


                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >


                    <BarChart
                        data={data}
                    >



                        <CartesianGrid
                            strokeDasharray="3 3"
                        />



                        <XAxis
                            dataKey="date_logged"
                        />



                        <YAxis
                            domain={[
                                "dataMin - 200",
                                "dataMax + 200"
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
                                `${value} kcal`,
                                "Calories"
                            ]}
                        />



                        <Bar
                            dataKey="calories"
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

    );
}