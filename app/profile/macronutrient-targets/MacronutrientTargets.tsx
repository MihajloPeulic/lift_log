"use client"

import { useEffect, useState } from "react";
import Link from "next/link"
import { CalorieNeeds } from "@/app/types/food"
import { TriangleAlert } from "lucide-react";
import { deleteCustomCalorieTarget, updateCustomCalorieTarget, updateMacro } from "@/app/actions/nutrition"

export default function EditMacronutrientTargets(
    {
        nutrient_needs,
        activityMultiplier,
    }: {
        nutrient_needs: CalorieNeeds,
        activityMultiplier: number,
    }
) {


    const [protein, setProtein] = useState(Math.round(nutrient_needs.protein_needs))
    const [carbs, setCarbs] = useState(Math.round(nutrient_needs.carbs_needs))
    const [fat, setFat] = useState(Math.round(nutrient_needs.fat_needs))

    const [customEnergy, setCustomEnergy] = useState(false)
    const [customTarget, setCustomTarget] = useState<number | "">(0);
    const [showDisablePopup, setShowDisablePopup] = useState(false)

    useEffect(() => {
        if (nutrient_needs.custom_calorie_target !== null) {
            setCustomEnergy(true);
            setCustomTarget(nutrient_needs.custom_calorie_target);
        }
    }, [nutrient_needs.custom_calorie_target]);

    const [showBreakdown, setShowBreakdown] = useState(false)
    
        
    



    const proteinCalories = protein * 4
    const carbsCalories = carbs * 4
    const fatCalories = fat * 9


    const totalMacroCalories =
    proteinCalories + carbsCalories + fatCalories;

    const targetsMatch =
        Math.abs(totalMacroCalories - nutrient_needs.calorie_expenditure) <= 1;

    
   




    return (
        <>
        


            {/* POPUP */}



    <div
        className="
            fixed
            inset-0
            z-50
            overflow-y-auto
            bg-background
        "
    >

        <div
            className="
                mx-auto
                min-h-screen
                w-full
                max-w-2xl
                px-6
                py-8
            "
        >

            <Link
                href={"/profile"}
                className="
                    flex
                    items-center
                    gap-2
                    text-secondary
                    hover:text-foreground
                    cursor-pointer
                "
            >
                <span className="text-2xl">
                    ←
                </span>

                <span>
                    Back
                </span>

            </Link>


            <div
                className="
                    mt-10
                    space-y-8
                    pb-10
                "
            >

                {/* ENERGY TARGET */}

                    <section className="
                        rounded-card
                        border
                        border-border
                        bg-surface
                        p-6
                    ">

                        <p className="text-sm text-secondary">
                            {customEnergy === false ? "Energy Target" : "Custom Energy Target"}
                        </p>


                        <h1 className="mt-2 text-4xl font-bold">
                            {customEnergy 
                                ? customTarget 
                                : Number(nutrient_needs.calorie_expenditure.toFixed(1))
                            }

                            <span className="ml-2 text-lg font-normal text-secondary">
                                kcal
                            </span>

                        </h1>



                        {customEnergy === false ? (
                            <>
                                <button 
                                    type="button"
                                    onClick={() => setShowBreakdown(!showBreakdown)}
                                    className="
                                        mt-4
                                        text-sm
                                        text-primary
                                        cursor-pointer
                                    "
                                >
                                    {showBreakdown 
                                        ? "Hide breakdown"
                                        : "Show breakdown"
                                    }
                                </button>


                                {showBreakdown && (

                                    <div className="
                                        mt-6
                                        border-t
                                        border-border
                                        pt-5
                                        space-y-3
                                    ">

                                        <div className="flex justify-between">
                                            <span className="text-secondary">
                                                BMR
                                            </span>

                                            <span>
                                                {nutrient_needs.bmr}
                                            </span>
                                        </div>


                                        <div className="flex justify-between">
                                            <span className="text-secondary">
                                                Baseline Activity
                                            </span>

                                            <span>
                                                + {Number(((activityMultiplier - 1) * nutrient_needs.bmr).toFixed(1))}
                                            </span>
                                        </div>


                                        <div className="flex justify-between">
                                            <span className="text-secondary">
                                                Baseline Expenditure
                                            </span>

                                            <span>
                                                = {nutrient_needs.calorie_expenditure} kcal
                                            </span>
                                        </div>


                                        <div className="flex justify-between">
                                            <span className="text-secondary">
                                                Weight Maintenance
                                            </span>

                                            <span>
                                                + 0
                                            </span>
                                        </div>


                                        <div className="
                                            flex
                                            justify-between
                                            border-t
                                            border-border
                                            pt-3
                                            font-semibold
                                        ">
                                            <span>
                                                Energy Target
                                            </span>

                                            <span>
                                                = {nutrient_needs.calorie_expenditure} kcal
                                            </span>
                                        </div>

                                    </div>

                                )}

                            </>
                        ) : (
                            ""
                        )}
                    </section>



                {/* MACROS */}

                    <section className="
                        rounded-card
                        border
                        border-border
                        bg-surface
                        p-6
                    ">

                        <h2 className="text-xl font-bold">
                            Macro Targets
                        </h2>


                        <div className="mt-6 space-y-4">


                            {/* PROTEIN */}

                            <div className="
                                flex
                                items-center
                                justify-between
                                gap-4
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <span className="
                                        h-3
                                        w-3
                                        rounded-full
                                        bg-green-500
                                    "/>

                                    <span className="font-bold">
                                        Protein
                                    </span>
                                    
                                    <span >
                                        {Number(((proteinCalories/nutrient_needs.calorie_expenditure)*100).toFixed(2))} %
                                    </span>



                                </div>


                                <div className="
                                    flex
                                    items-center
                                    gap-4
                                ">
                                    <span className="
                                        w-20
                                        text-right
                                        text-secondary
                                    ">
                                        {proteinCalories} kcal
                                    </span>

                                    <div className="
                                        flex
                                        items-center
                                        gap-1
                                    ">

                                        <input
                                            type="number"
                                            name="protein"
                                            value={protein}
                                            onChange={(e)=>setProtein(Number(e.target.value))}
                                            onBlur={(e) =>
                                                    updateMacro("protein", Number(e.currentTarget.value))
                                                }
                                            className="
                                                w-16
                                                rounded-button
                                                border
                                                border-border
                                                bg-background
                                                px-2
                                                py-2
                                                text-center
                                            "
                                        />

                                        <span className="text-secondary">
                                            g
                                        </span>

                                    </div>


                                    


                                </div>


                            </div>





                            {/* CARBS */}

                            <div className="
                                flex
                                items-center
                                justify-between
                                gap-4
                            ">

                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <span className="
                                        h-3
                                        w-3
                                        rounded-full
                                        bg-sky-400
                                    "/>

                                    <span className="font-bold">
                                        Carbohydrates
                                    </span>

                                    <span >
                                        {Number(((carbsCalories/nutrient_needs.calorie_expenditure)*100).toFixed(2))} %
                                    </span>

                                </div>



                                <div className="
                                    flex
                                    items-center
                                    gap-4
                                ">

                                    <span className="
                                        w-20
                                        text-right
                                        text-secondary
                                    ">
                                        {carbsCalories} kcal
                                    </span>

                                    <div className="
                                        flex
                                        items-center
                                        gap-1
                                    ">

                                        <input
                                            type="number"
                                            value={carbs}
                                            onChange={(e)=>setCarbs(Number(e.target.value))}
                                            onBlur={(e) =>
                                                    updateMacro("carbs", Number(e.currentTarget.value))
                                                }
                                            className="
                                                w-16
                                                rounded-button
                                                border
                                                border-border
                                                bg-background
                                                px-2
                                                py-2
                                                text-center
                                            "
                                        />

                                        <span className="text-secondary">
                                            g
                                        </span>

                                    </div>


                                    


                                </div>


                            </div>





                            {/* FAT */}

                            <div className="
                                flex
                                items-center
                                justify-between
                                gap-4
                            ">


                                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                    <span className="
                                        h-3
                                        w-3
                                        rounded-full
                                        bg-red-500
                                    "/>


                                    <span className="font-bold">
                                        Fat
                                    </span>

                                    <span >
                                        {Number(((fatCalories/nutrient_needs.calorie_expenditure)*100).toFixed(2))} %
                                    </span>
                                </div>



                                <div className="
                                    flex
                                    items-center
                                    gap-4
                                ">
                                    <span className="
                                        w-20
                                        text-right
                                        text-secondary
                                    ">
                                        {fatCalories} kcal
                                    </span>


                                    <div className="
                                        flex
                                        items-center
                                        gap-1
                                    ">

                                        <input
                                            type="number"
                                            value={fat}
                                            onChange={(e)=>setFat(Number(e.target.value))}
                                            onBlur={(e) =>
                                                    updateMacro("fat", Number(e.currentTarget.value))
                                                }
                                            className="
                                                w-16
                                                rounded-button
                                                border
                                                border-border
                                                bg-background
                                                px-2
                                                py-2
                                                text-center
                                            "
                                        />

                                        <span className="text-secondary">
                                            g
                                        </span>


                                    </div>



                                    

                                </div>


                            </div>



                        </div>


                        <div
                            className="
                                mt-6
                                border-t
                                border-border
                                pt-5
                                space-y-3
                            "
                        >

                            <div className="flex flex-col gap-1">

                            <div
                                className="
                                    flex
                                    justify-between
                                    text-sm
                                "
                            >
                                <span className="text-secondary">
                                    Total from macros
                                </span>

                                <span className="font-medium">
                                    {totalMacroCalories} kcal
                                </span>

                            </div>

                            {!targetsMatch && (
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        text-xs
                                        text-orange-400
                                    "
                                >
                                <div className="flex items-center gap-2">
                                    <TriangleAlert className="h-4 w-4 text-orange-400" />
                                    <span>Targets don't match</span>
                                </div>

                                <span>
                                    {customEnergy 
                                        ? customTarget 
                                        : Number(nutrient_needs.calorie_expenditure.toFixed(1))
                                    } kcal
                                </span>
                                </div>
)}

</div>



                            {customEnergy === false ? (<div
                                className="
                                    flex
                                    justify-between
                                    font-semibold
                                "
                            >

                                <span>
                                    Calorie Target
                                </span>

                                <span>
                                    {customEnergy ? customTarget : Number(nutrient_needs.calorie_expenditure.toFixed(1))} kcal
                                </span>

                            </div>): ""}

                        </div>
                    


                    </section>




                {/* CUSTOM ENERGY TARGET */}


                <section className="
                    rounded-card
                    border
                    border-border
                    bg-surface
                    p-6
                ">


                    <div className="
                        flex
                        items-center
                        justify-between
                    ">


                        <div>

                            <h3 className="font-semibold">
                                Custom Energy Target
                            </h3>

                            <p className="text-sm text-secondary">
                                Manually override calculated calories
                            </p>

                        </div>


                        {/* TOGGLE */}

                        <button
                            onClick={() => {
                                if(customEnergy === false){
                                    setCustomEnergy(true)
                                }else{
                                    setShowDisablePopup(true)
                                }
                            }}
                            className={`
                                h-6
                                w-11
                                rounded-full
                                transition
                                ${customEnergy 
                                    ? "bg-primary"
                                    : "bg-border"
                                }
                            `}
                        >

                            <div
                                className={`
                                    h-5
                                    w-5
                                    rounded-full
                                    bg-white
                                    transition
                                    ${
                                    customEnergy
                                    ? "translate-x-5"
                                    : "translate-x-0"
                                    }
                                `}
                            />

                        </button>


                    </div>

                    {showDisablePopup && (

                        <div
                            className="
                                fixed
                                inset-0
                                z-50
                                flex
                                items-center
                                justify-center
                                bg-black/50
                                px-6
                            "
                        >

                            <div
                                className="
                                    w-full
                                    max-w-sm
                                    rounded-card
                                    border
                                    border-border
                                    bg-surface
                                    p-6
                                    shadow-xl
                                "
                            >

                                <h2 className="text-lg font-bold">
                                    Disable Custom Energy Target?
                                </h2>


                                <p className="
                                    mt-3
                                    text-sm
                                    text-text-secondary
                                    leading-relaxed
                                ">
                                    Are you sure you want to disable custom energy target?
                                    Your previous custom target will be deleted.
                                </p>



                                <div
                                    className="
                                        mt-6
                                        flex
                                        justify-end
                                        gap-3
                                    "
                                >

                                    <button
                                        onClick={() => setShowDisablePopup(false)}
                                        className="
                                            rounded-button
                                            border
                                            border-border
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            hover:bg-surface-light
                                        "
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        onClick={() => {
                                            deleteCustomCalorieTarget(nutrient_needs.custom_calorie_target)
                                            setCustomEnergy(false)
                                            setShowDisablePopup(false)
                                        }}
                                        className="
                                            rounded-button
                                            bg-primary
                                            px-4
                                            py-2
                                            text-sm
                                            font-medium
                                            text-black
                                            hover:bg-primary-hover
                                        "
                                    >
                                        Okay
                                    </button>


                                </div>


                            </div>


                        </div>

                    )}


                    {customEnergy === true ? (

                        <div className="mt-5">

                            <label className="mb-2 block">
                                Custom Calories
                            </label>


                            <input
                                type="number"
                                value={customTarget === 0 ? "" : customTarget}
                                onChange={(e) =>
                                    setCustomTarget(
                                        e.target.value === "" ? "" : Number(e.target.value)
                                    )
                                }
                                onBlur={(e) => {
                                    const value = customTarget === "" ? 0 : customTarget;
                                    updateCustomCalorieTarget(value)
                                }}
                                placeholder="None"
                                className="
                                    w-full
                                    rounded-button
                                    border
                                    border-border
                                    bg-background
                                    p-3
                                "
                            />

                        </div>

                    ): ""}


                </section>


                        </div>

        </div>

    </div>


</>
)

}