

import { searchFoods } from "@/app/lib/data/food";
import SearchFood from "./SearchFood";


export default async function AddFoodPage({
    params,
    searchParams
}:{
    params: Promise<{
        mealId:string
    }>,
    searchParams: Promise<{
      date:string
    }>
})  {

  const {mealId} = await params
  const {date} = await searchParams
  return (


    <main className="min-h-screen bg-background text-text p-5 lg:p-8">


      <SearchFood 
        mealId={mealId}
        selectedDate={date}
      />


    </main>


  );

}