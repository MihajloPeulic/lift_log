"use client";

import { useState } from "react";
import { createMeal } from "@/app/actions/nutrition";


export default function AddMealModal({
    setMeals,
    selectedDate
}:{
    setMeals: React.Dispatch<React.SetStateAction<any[]>>
    selectedDate: string
})  {

  const [open, setOpen] = useState(false);

  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("breakfast");



    async function createMealPage(){



        const newMeal = await createMeal(
            mealType,
            selectedDate
        );


        setMeals(prev => [
            ...prev,
            newMeal
        ]);


        setMealName("");
        setOpen(false);

    }



  return (

    <>

      {/* Add meal button */}

      <button
        onClick={()=>setOpen(true)}
        className=" cursor-pointer rounded-button bg-primary px-5 py-3 font-semibold text-black transition hover:bg-primary-hover"
      >
        + Add meal
      </button>





      {
        open && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">


            <div className="w-full max-w-md rounded-card border border-border bg-surface p-card shadow-xl">



              <header className="mb-6">

                <h2 className="text-2xl font-bold">
                  Add meal
                </h2>


                <p className="mt-1 text-sm text-text-secondary">
                  Create a new meal and add foods later.
                </p>

              </header>







              <div className="space-y-5">


                {/* Meal name */}

                {/* <div>

                  <label className="mb-2 block text-sm font-medium">
                    Meal name
                  </label>


                  <input
                    value={mealName}
                    onChange={(e)=>setMealName(e.target.value)}
                    placeholder="Example: Post workout meal"
                    className="
                      w-full rounded-button
                      border border-border
                      bg-background
                      px-4 py-3
                      outline-none
                      focus:border-primary
                    "
                  />

                </div> */}

                {/* Meal type */}

                <div>

                  <label className="mb-2 block text-sm font-medium">
                    Meal type
                  </label>


                  <select
                    value={mealType}
                    onChange={(e)=>setMealType(e.target.value)}
                    className="
                      w-full rounded-button
                      border border-border
                      bg-background
                      px-4 py-3
                    "
                  >

                    <option value={"breakfast"}>
                      Breakfast
                    </option>

                    <option value={"lunch"}>
                      Lunch
                    </option>

                    <option value={"dinner"}>
                      Dinner
                    </option>

                    <option value={"snack"}>
                      Snack
                    </option>

                    <option value={"pre-workout meal"}>
                      Pre-workout meal
                    </option>

                    <option value={"post-workout meal"}>
                      Post-workout meal
                    </option>


                  </select>

                </div>


                {/* Buttons */}

                <div className="flex gap-3 pt-3">


                  <button
                    onClick={()=>setOpen(false)}
                    className="
                      flex-1 rounded-button
                      border border-border
                      py-3
                      hover:bg-surface-light
                    "
                  >
                    Cancel
                  </button>





                  <button
                    onClick={createMealPage}
                    className="
                      flex-1 rounded-button
                      bg-primary
                      py-3
                      font-semibold
                      text-black
                      hover:bg-primary-hover
                    "
                  >
                    Create meal
                  </button>



                </div>


              </div>


            </div>


          </div>

        )
      }


    </>

  );

}