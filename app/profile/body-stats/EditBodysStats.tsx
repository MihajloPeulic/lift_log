"use client"

import { updateBodyStats } from "../../actions/updateProfile";
import Link from "next/link";
import { CalendarDays, UserRound, Scale, Ruler, Percent } from "lucide-react";

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

    let feet = 0;
    let inch = 0;

    if (unit_system === "imperial") {
        const totalInches = height 

        feet = Math.floor(totalInches / 12);
        inch = Math.round(totalInches % 12);

    }
    


    return (

        <>
            

        <div
            className="
                min-h-screen
                bg-background
                p-6
            "
        >


        <div
            className="
                mx-auto
                w-full
                max-w-2xl
                px-2
            "
        >

            <Link
                href={"/profile"}
                className="
                    mb-6
                    flex
                    items-center
                    gap-2
                    text-text-primary
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
                        rounded-card
                        border
                        border-border
                        bg-surface
                        p-6
                    "
                >

    {/* Header */}

    <header className="mb-8">

        <h2 className="text-2xl font-bold">
            Edit Body Stats
        </h2>

        <p className="mt-1 text-sm text-text-secondary">
            Update your current measurements.
        </p>

    </header>



    <form action={updateBodyStats}>

        <input 
            name="unitSystem"
            defaultValue={unit_system}
            hidden
        />


        <div
            className="
            divide-y
            divide-white/10
        "
        >


    {/* Age */}

    <div
        className="
            flex
            items-center
            justify-between
            py-3
        "
    >

        <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />

            <label className="text-sm font-medium">
                Age
            </label>
        </div>

        <input
            type="date"
            name="date_of_birth"
            defaultValue={date_of_birth}
            className="
                w-40
                rounded-button
                border
                border-border
                bg-background
                px-3
                py-2
                outline-none
                focus:border-primary
            "
        />

    </div>



    {/* Gender */}

    <div
        className="
            flex
            items-center
            justify-between
            py-3
        "
    >

        <div className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-primary" />

            <label className="text-sm font-medium">
                Gender
            </label>
        </div>


        <select
            name="gender"
            defaultValue={gender}
            className="
                w-40
                rounded-button
                border
                border-border
                bg-background
                px-3
                py-2
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



    {/* Bodyweight */}

    <div
        className="
            flex
            items-center
            justify-between
            py-3
        "
    >

        <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" />

            <label className="text-sm font-medium">
                Bodyweight
            </label>
        </div>


        <div className="relative w-40">

            <input
                type="number"
                name="bodyweight"
                defaultValue={bodyweight.toString()}
                className="
                    w-full
                    rounded-button
                    border
                    border-border
                    bg-background
                    px-3
                    py-2
                    pr-10
                    text-right
                    outline-none
                    focus:border-primary
                "
            />

            <span
                className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-xs
                    text-text-secondary
                "
            >
                {unit_system === "imperial" ? "lbs" : "kg"}
            </span>

        </div>

    </div>



    {/* Height */}

    <div
        className="
            flex
            items-center
            justify-between
            py-3
        "
    >

        <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-primary" />

            <label className="text-sm font-medium">
                Height
            </label>
        </div>


        {unit_system === "metric" ? (

            <div className="relative w-40">

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
                        px-3
                        py-2
                        pr-10
                        text-right
                        outline-none
                        focus:border-primary
                    "
                />

                <span
                    className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-xs
                        text-text-secondary
                    "
                >
                    cm
                </span>

            </div>

        ) : (

            <div className="flex w-40 gap-2">

                <input
                    type="number"
                    name="feet"
                    defaultValue={feet}
                    className="
                        w-1/2
                        rounded-button
                        border
                        border-border
                        bg-background
                        px-2
                        py-2
                        text-right
                    "
                />

                <input
                    type="number"
                    name="inch"
                    defaultValue={inch}
                    className="
                        w-1/2
                        rounded-button
                        border
                        border-border
                        bg-background
                        px-2
                        py-2
                        text-right
                    "
                />

            </div>

        )}

    </div>



    {/* Body fat */}

    <div
        className="
            flex
            items-center
            justify-between
            py-3
        "
    >

        <div className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-primary" />

            <label className="text-sm font-medium">
                Body fat %
            </label>
        </div>


        <div className="relative w-40">

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
                    px-3
                    py-2
                    pr-8
                    text-right
                    outline-none
                    focus:border-primary
                "
            />

            <span
                className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-xs
                    text-text-secondary
                "
            >
                %
            </span>

        </div>

    </div>


</div>


        <button
            type="submit"
            className="
                mt-6
                w-full
                rounded-button
                bg-primary
                py-3
                font-semibold
                text-black
                hover:bg-primary-hover
            "
        >
            Save Changes
        </button>


    </form>

</div>

                </div>


            </div>
        </>

    )

}