import { searchFoods } from "@/app/lib/data/food";
import SearchFood from "./SearchFood";

export default async function AddFoodPage({
    params,
    searchParams
}:{
    params: Promise<{
        mealId: string
    }>,
    searchParams: Promise<{
        date: string
    }>
})  {

  const { mealId } = await params;
  const { date } = await searchParams;

  return (
    <div className="layout-container">
      <main className="space-y-6 sm:space-y-8">
        <SearchFood 
          mealId={mealId}
          selectedDate={date}
        />
      </main>
    </div>
  );
}