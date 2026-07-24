import { getFood, getMealItem, getUnits, getGramUnitsId } from "@/app/lib/data/food"
import UpdateFoodForm from "./UpdateFoodForm"


export default async function UpdateFood({
    params,
    searchParams
}:{
    params: Promise<{
        mealId:string,
        itemId: string
    }>,
    searchParams: Promise<{
      date:string,
      itemId: string
    }>
}){
    const {mealId} = await params
    const {itemId} = await params
    const {date} = await searchParams

    const mealItem = await getMealItem(itemId)
    const food = await getFood(mealItem.food_id)

    const foodUnits = await getUnits(food.id)
    const gramUnit = await getGramUnitsId()

    return (
        <div className="min-h-screen bg-background text-text p-5 lg:p-8">
        
          <UpdateFoodForm 
            mealItem={mealItem}
            selectedDate={date}
            food={food}
            units={foodUnits}
            gramUnit={gramUnit}
          />
        
        </div>
    )
}