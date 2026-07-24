"use client"

import { useState } from "react";

export default function Micronutrients(
    {

    }: {

    }
) {

    const [showAllMicros, setShowAllMicros] = useState(false);


    const micronutrients = [
        {
            name:"Fiber",
            value:"18g",
            goal:"30g",
            percent:60
        },
        {
            name:"Sodium",
            value:"1200mg",
            goal:"2300mg",
            percent:52
        },
        {
            name:"Potassium",
            value:"2500mg",
            goal:"3500mg",
            percent:71
        },
        {
            name:"Calcium",
            value:"700mg",
            goal:"1000mg",
            percent:70
        },
        {
            name:"Iron",
            value:"12mg",
            goal:"18mg",
            percent:67
        },
        {
            name:"Magnesium",
            value:"280mg",
            goal:"400mg",
            percent:70
        }
    ];
    
    
    const visibleMicros = showAllMicros
        ? micronutrients
        : micronutrients.slice(0,4);


    return (
            <section className="mt-8">


                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-bold">
                        Micronutrients
                    </h2>


                </div>



                <div className="mt-5 space-y-2">

                    {visibleMicros.map((micro)=>(

                        <article
                            key={micro.name}
                            className="
                            w-full
                            rounded-card
                            border
                            border-border
                            bg-surface
                            px-4
                            py-2.5
                            "
                        >

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2">

                                    <p className="font-medium">
                                        {micro.name}
                                    </p>

                                    <span className="text-sm text-text-secondary">
                                        {micro.value} / {micro.goal}
                                    </span>

                                </div>

                                <span className="text-sm font-semibold text-primary">
                                    {micro.percent}%
                                </span>

                            </div>

                            <div className="mt-1.5 h-2 rounded-full bg-surface-light">

                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${micro.percent}%`
                                    }}
                                />

                            </div>

                        </article>

                    ))}

                </div>




                <button
                    onClick={()=>setShowAllMicros(!showAllMicros)}
                    className="
                    mt-5
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-primary
                    hover:underline
                    cursor-pointer
                    "
                    type="button"
                >

                    {showAllMicros 
                        ? "Show less"
                        : "See all"
                    }


                    <span
                        className={`
                        transition-transform
                        ${showAllMicros ? "rotate-180" : ""}
                        `}
                    >
                        ↓
                    </span>


                </button>


            </section>
    )
}