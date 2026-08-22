
import { getFood, getUnits, getGramUnitsId } from "@/app/lib/data/food";
import AddFoodForm from "./AddFoodForm";
import { getMeals } from "@/app/lib/data/meals";


export default async function AddFoodPage(
  {
    params,
    searchParams
}: {
    params: Promise<{
        foodId:string,
        mealId: string
    }>,
    searchParams: Promise<{
      date:string
    }>
}){
  const {foodId, mealId} = await params
  
  const {date} = await searchParams

  

  const food = await getFood(foodId)
  const meal = mealId
  const foodUnits = await getUnits(foodId)

  const gramUnit = await getGramUnitsId()




return (

<div className="min-h-screen text-text p-5 lg:p-8">

  <AddFoodForm 
    food={food}
    mealId={meal}
    units={foodUnits}
    gramUnit={gramUnit}
    selectedDate={date}
  />

</div>

);

}