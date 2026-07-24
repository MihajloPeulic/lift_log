"use client"

import { useState } from "react";
import { updateBodyStats } from "../actions/updateProfile";
import { profile } from "console";


export default function EditBodyStats({
    bodyweight,
    height,
    unit_system,
    gender,
    bodyFat,
    date_of_birth
}: {
    bodyweight: number;
    height: number;
    unit_system: string,
    gender: string,
    bodyFat: number,
    date_of_birth: string
}) {

    const [popupState, setPopupState] = useState(false);

    let feet = 0;
    let inch = 0;

    console.log(height);
    if (unit_system === "imperial") {
        const totalInches = height 

        feet = Math.floor(totalInches / 12);
        inch = Math.round(totalInches % 12);

        console.log(feet, inch);
    }
    


    return (

        <>
            <button
                type="button"
                onClick={() => setPopupState(true)}
                className="
                flex
                w-full
                items-center
                justify-between
                rounded-card
                border
                border-border
                bg-surface
                px-5
                py-4
                transition
                hover:bg-surface-light
                hover:border-primary
                cursor-pointer
                "
            >

                <span className="font-medium">
                    Edit Body Stats
                </span>

                <span className="text-text-secondary">
                    →
                </span>

            </button>

            <div
                className={`
                fixed
                inset-0
                z-50
                items-center
                justify-center
                bg-black/60
                p-5

                ${popupState ? "flex" : "hidden"}
                `
            }
            >


                <div
                    className="
                    w-full
                    max-w-md
                    rounded-card
                    border
                    border-border
                    bg-surface
                    p-6
                    shadow-xl
                    "
                >



                    {/* Header */}

                    <header className="mb-6">

                        <h2 className="text-2xl font-bold">
                            Edit Body Stats
                        </h2>


                        <p className="mt-1 text-sm text-text-secondary">
                            Update your current measurements.
                        </p>

                    </header>





                    {/* Inputs */}
                    <form action={updateBodyStats}>
                        <input 
                            name="unitSystem"
                            defaultValue={unit_system}
                            hidden
                        />

                        <div className="space-y-5">
                                {/* Age */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium">
                                        Age
                                    </label>


                                    <div className="relative">

                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            defaultValue={date_of_birth}
                                            className="
                                            w-full
                                            rounded-button
                                            border
                                            border-border
                                            bg-background
                                            px-4
                                            py-3
                                            pr-14
                                            outline-none
                                            focus:border-primary
                                            "
                                        />


                                        <span
                                            className="
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-sm
                                            text-text-secondary
                                            "
                                        >
                                            years
                                        </span>

                                    </div>

                                </div>





                                {/* Gender */}

                                <div>

                                    <label className="mb-2 block text-sm font-medium">
                                        Gender
                                    </label>


                                    <select
                                        name="gender"
                                        defaultValue={gender}
                                        className="
                                        w-full
                                        rounded-button
                                        border
                                        border-border
                                        bg-background
                                        px-4
                                        py-3
                                        outline-none
                                        focus:border-primary
                                        "
                                    >

                                        <option value="male">
                                            Male
                                        </option>


                                        <option value="female">
                                            Female
                                        </option>


                                        <option value="other">
                                            Other
                                        </option>


                                    </select>

                                </div>


                            {/* Weight */}

                            <div>

                                <label className="mb-2 block text-sm font-medium">
                                    Bodyweight
                                </label>


                                <div className="relative">


                                    <input
                                        type="number"
                                        defaultValue={bodyweight.toString()}
                                        name="bodyweight"
                                        className="
                                        w-full
                                        rounded-button
                                        border
                                        border-border
                                        bg-background
                                        px-4
                                        py-3
                                        pr-14
                                        outline-none
                                        focus:border-primary
                                        "
                                    />


                                    <span
                                        className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-sm
                                        text-text-secondary
                                        "
                                    >
                                        {unit_system === "imperial" ? "lbs" : "kg"}
                                    </span>


                                </div>


                            </div>





                            {/* Height */}

                            <div>

                                <label className="mb-2 block text-sm font-medium">
                                    Height
                                </label>


                                {unit_system === "metric" ? (

                                    <div className="relative">

                                        <input
                                            type="number"
                                            name="height"
                                            defaultValue={height}
                                            className="
                                            w-full
                                            rounded-button
                                            border
                                            border-border
                                            bg-background
                                            px-4
                                            py-3
                                            pr-14
                                            outline-none
                                            focus:border-primary
                                            "
                                        />

                                        <span
                                            className="
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-sm
                                            text-text-secondary
                                            "
                                        >
                                            cm
                                        </span>

                                    </div>

                                ) : (

                                    <div className="grid grid-cols-2 gap-3">

                                        <div className="relative">

                                            <input
                                                type="number"
                                                name="feet"
                                                defaultValue={feet}
                                                className="
                                                w-full
                                                rounded-button
                                                border
                                                border-border
                                                bg-background
                                                px-4
                                                py-3
                                                pr-10
                                                outline-none
                                                focus:border-primary
                                                "
                                            />

                                            <span
                                                className="
                                                absolute
                                                right-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-sm
                                                text-text-secondary
                                                "
                                            >
                                                ft
                                            </span>

                                        </div>

                                        <div className="relative">

                                            <input
                                                type="number"
                                                name="inch"
                                                defaultValue={inch}
                                                className="
                                                w-full
                                                rounded-button
                                                border
                                                border-border
                                                bg-background
                                                px-4
                                                py-3
                                                pr-10
                                                outline-none
                                                focus:border-primary
                                                "
                                            />

                                            <span
                                                className="
                                                absolute
                                                right-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-sm
                                                text-text-secondary
                                                "
                                            >
                                                in
                                            </span>

                                        </div>

                                    </div>

                                )}


                            </div>


                            {/* Body fat */}

                                    <div>

                                        <label className="mb-2 block text-sm font-medium">
                                            Body fat %
                                        </label>


                                        <div className="relative">


                                            <input
                                                type="number"
                                                name="bodyFat"
                                                defaultValue={bodyFat}
                                                className="
                                                w-full
                                                rounded-button
                                                border
                                                border-border
                                                bg-background
                                                px-4
                                                py-3
                                                pr-14
                                                outline-none
                                                focus:border-primary
                                                "
                                            />


                                            <span
                                                className="
                                                absolute
                                                right-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-sm
                                                text-text-secondary
                                                "
                                            >
                                                %
                                            </span>


                                        </div>


                                    </div>


                        </div>

                                





                        {/* Actions */}

                        <div
                            className="
                            mt-8
                            flex
                            justify-end
                            gap-3
                            "
                        >

                            <button
                                onClick={() => setPopupState(false)}
                                type="button"
                                className="
                                rounded-button
                                border
                                border-border
                                px-5
                                py-3
                                text-sm
                                font-medium
                                text-text-primary
                                hover:bg-background
                                cursor-pointer
                                "
                            >
                                Cancel
                            </button>



                            <button
                                type="submit"
                                className="
                                rounded-button
                                bg-primary
                                px-6
                                py-3
                                text-sm
                                font-semibold
                                text-black
                                transition
                                hover:bg-primary-hover
                                cursor-pointer
                                "
                            >
                                Save Changes
                            </button>


                        </div>


                    </form>

                </div>


            </div>
        </>

    )

}