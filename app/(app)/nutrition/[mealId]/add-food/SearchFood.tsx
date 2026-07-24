"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { searchFoods } from "@/app/lib/data/food";


export default function SearchFood({
    mealId,
    selectedDate
}:{
    mealId:string,
    selectedDate: string
    
}) {


    const router = useRouter();
    
    

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("All");


    const [foods,setFoods] = useState<any[]>([]);

    const [loading,setLoading] = useState(false);



    const categories = [
        "All",
        "Protein",
        "Carbs",
        "Dairy",
        "Fruit",
        "Vegetables",
        "Meat"
    ];




    useEffect(()=>{


        async function getFoods(){


            try{


                setLoading(true);



                const data = await searchFoods(
                    search
                );

                console.log(data)
                setFoods(data);


            }
            catch(error){

                console.log(error);

            }
            finally{

                setLoading(false);

            }


        }




        const timeout = setTimeout(()=>{


            getFoods();


        },300);




        return ()=>clearTimeout(timeout);



    },[search, category]);







    return (

        <div className="mx-auto max-w-5xl">


            <header className="mb-8">

                <h1 className="text-3xl font-bold">
                    Add Food
                </h1>


                <p className="mt-1 text-text-secondary">
                    Search foods and manage your nutrition.
                </p>


            </header>







            <section className="rounded-card border border-border bg-surface p-card">


                <input

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                    placeholder="Search food..."

                    className="
                        w-full
                        rounded-button
                        border border-border
                        bg-background
                        px-5 py-4
                        text-lg
                        outline-none
                        focus:border-primary
                    "

                />




                <div className="mt-5 flex flex-wrap gap-3">


                    {
                        categories.map(item=>(

                            <button

                                key={item}

                                onClick={()=>setCategory(item)}

                                className={`
                                    rounded-full
                                    px-4 py-2
                                    text-sm
                                    transition

                                    ${
                                        category === item
                                        ?
                                        "bg-primary text-black"
                                        :
                                        "bg-background text-text-secondary hover:bg-surface-light"
                                    }
                                `}

                            >

                                {item}

                            </button>

                        ))
                    }


                </div>


            </section>







            <section className="mt-8">


                <h2 className="mb-4 text-xl font-bold">
                    Foods
                </h2>



                {
                    loading && (
                        <p className="text-text-secondary">
                            Searching...
                        </p>
                    )
                }




                <div className="grid gap-3 md:grid-cols-2">


                    {
                        foods.map(food=>(


                            <button

                                key={food.id}

                                onClick={()=>


                                    router.push(
                                        `/nutrition/${mealId}/add-food/${food.id}?date=${selectedDate}`
                                    )

                                }


                                className="
                                    rounded-card
                                    border border-border
                                    bg-surface
                                    p-4
                                    text-left
                                    transition
                                    hover:border-primary
                                    hover:bg-surface-light
                                "

                            >



                                <div className="flex items-center justify-between">


                                    <div>


                                        <h3 className="font-semibold">
                                            {food.name}
                                        </h3>


                                        <p className="mt-1 text-xs text-text-secondary">
                                            {food.category}
                                        </p>


                                    </div>




                                    <span className="text-sm font-medium text-primary">

                                        {food.calories} kcal

                                    </span>


                                </div>





                                <div className="mt-3 flex gap-2 text-xs">


                                    <span className="rounded-lg bg-background px-3 py-1.5 text-text-secondary">

                                        P {food.protein}g

                                    </span>


                                    <span className="rounded-lg bg-background px-3 py-1.5 text-text-secondary">

                                        C {food.carbs}g

                                    </span>


                                    <span className="rounded-lg bg-background px-3 py-1.5 text-text-secondary">

                                        F {food.fat}g

                                    </span>


                                </div>



                            </button>


                        ))
                    }


                </div>



            </section>



        </div>

    );

}