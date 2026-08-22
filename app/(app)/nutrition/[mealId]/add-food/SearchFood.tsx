"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { searchFoods } from "@/app/lib/data/food";

export default function SearchFood({
  mealId,
  selectedDate
}: {
  mealId: string,
  selectedDate: string
}) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    "All",
    "Protein",
    "Carbs",
    "Dairy",
    "Fruit",
    "Vegetables",
    "Meat"
  ];

  useEffect(() => {
    async function getFoods() {
      try {
        setLoading(true);
        // Pretpostavljam da backend funkcija za sada prima samo search
        const data = await searchFoods(search);
        console.log(data);
        setFoods(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      getFoods();
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, category]);

  return (
    <div className="mx-auto max-w-5xl">
      
      <header className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Add Food
        </h1>
        <p className="mt-1 text-xs text-text-secondary sm:text-sm">
          Search foods and manage your nutrition.
        </p>
      </header>

      {/* Search & Filters Section */}
      <section className="rounded-card border border-border bg-surface p-4 sm:p-5">
        
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search food..."
          className="
            w-full
            rounded-button
            border border-border
            bg-background
            px-4 py-2.5
            text-sm
            outline-none
            transition
            focus:border-primary
            sm:px-5 sm:py-3 sm:text-base
          "
        />

        {/* Categories (Manji čipovi na fonu, malo veći na desktopu) */}
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
          {categories.map(item => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`
                cursor-pointer
                rounded-full
                px-3 py-1.5
                text-[11px] font-medium
                transition
                sm:px-4 sm:py-2 sm:text-sm
                ${
                  category === item
                    ? "bg-primary text-black"
                    : "bg-background text-text-secondary hover:bg-surface-light hover:text-text"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Foods List */}
      <section className="mt-6 sm:mt-8">
        
        <h2 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl">
          Foods
        </h2>

        {loading && (
          <p className="text-sm text-text-secondary sm:text-base">
            Searching...
          </p>
        )}

        <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
          {foods.map(food => (
            <button
              key={food.id}
              onClick={() =>
                router.push(
                  `/nutrition/${mealId}/add-food/${food.id}?date=${selectedDate}`
                )
              }
              className="
                cursor-pointer
                w-full
                rounded-button
                border border-border
                bg-surface
                p-3
                text-left
                transition
                hover:border-primary
                hover:bg-surface-light
                sm:p-4
              "
            >
              {/* Prvi red: Ime i Kalorije */}
              <div className="flex w-full items-center justify-between gap-2">
                <h3 className="truncate text-sm font-semibold sm:text-base">
                  {food.name}
                </h3>
                <span className="shrink-0 text-sm font-semibold text-primary sm:text-base">
                  {food.calories} kcal
                </span>
              </div>

              {/* Drugi red: Kategorija i Makrosi */}
              <div className="mt-1 flex w-full items-center justify-between text-[11px] text-text-secondary sm:mt-1.5 sm:text-xs">
                <p>{food.category}</p>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span>{food.protein}P</span>
                  <span>•</span>
                  <span>{food.carbs}C</span>
                  <span>•</span>
                  <span>{food.fat}F</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}