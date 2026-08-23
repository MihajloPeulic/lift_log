"use client";

import { useState, useEffect } from "react";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    "All",
    "Protein",
    "Carbs",
    "Dairy",
    "Fats",
    "Fruit",
    "Vegetables",
    "Legumes",
    "Other"
  ];

  async function handleSearch(searchQuery: string = search, selectedCategory: string = category) {
    try {
      setLoading(true);
      const data = await searchFoods(searchQuery);
      
      const filteredData = selectedCategory.toLowerCase() === "all" 
        ? data 
        : data.filter((f: any) => f.category?.toLowerCase() === selectedCategory.toLowerCase());

      setFoods(filteredData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch("", "All");
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Header */}
      <header>
        <h1 className="text-h1">
          Add Food
        </h1>
        <p className="text-caption mt-1">
          Search foods and manage your nutrition.
        </p>
      </header>

      {/* Search & Filters Section */}
      <section className="card-main space-y-4">
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-3 mb-0"
        >
          {/* Input za pretragu */}
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food and press Enter..."
              className="input-box w-full"
            />
          </div>

          {/* Filter dugme */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="cursor-pointer w-full sm:w-auto flex items-center justify-between gap-3 input-box text-text transition hover:border-primary"
            >
              <div className="flex items-center gap-2">
                <span>Filter: <strong className="text-primary">{category}</strong></span>
              </div>
              <span className={`transition-transform duration-300 text-text-secondary ${isFilterOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
          </div>
        </form>

        {/* Animirani padajući meni sa kategorijama */}
        <div 
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${isFilterOpen ? "max-h-48 opacity-100 pt-1" : "max-h-0 opacity-0 pt-0"}
          `}
        >
          <div className="flex flex-wrap gap-2 rounded-card bg-background p-3 border border-border">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat);
                  handleSearch(search, cat);
                  setIsFilterOpen(false);
                }}
                className={`
                  cursor-pointer
                  rounded-full
                  px-3.5 py-1.5
                  text-xs font-medium
                  transition
                  ${
                    category === cat
                      ? "bg-primary text-black font-semibold"
                      : "bg-surface border border-border text-text-secondary hover:text-text hover:border-primary/50"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* Foods List */}
      <section className="space-y-4">
        
        <h2 className="text-lg sm:text-xl font-bold text-text">
          Foods
        </h2>

        {loading && (
          <p className="text-sm sm:text-base text-text-secondary py-8 text-center font-medium">
            Searching...
          </p>
        )}

        {!loading && foods.length === 0 && (
          <p className="text-sm sm:text-base text-text-secondary py-8 text-center border border-dashed border-border rounded-card font-medium">
            No foods found. Try a different search term.
          </p>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          {foods.map(food => (
            <button
              key={food.id}
              type="button"
              onClick={() =>
                router.push(
                  `/nutrition/${mealId}/add-food/${food.id}?date=${selectedDate}`
                )
              }
              className="card-main cursor-pointer w-full text-left transition hover:border-primary hover:bg-surface-light p-4 space-y-2"
            >
              {/* Prvi red: Ime i Kalorije */}
              <div className="flex w-full items-center justify-between gap-2">
                <h3 className="truncate text-sm sm:text-base font-bold text-text">
                  {food.name}
                </h3>
                <span className="shrink-0 text-sm sm:text-base font-bold text-primary">
                  {food.calories} kcal
                </span>
              </div>

              {/* Drugi red: Kategorija i Makrosi */}
              <div className="flex w-full items-center justify-between text-xs text-text-secondary">
                <span className="rounded-md bg-background px-2.5 py-0.5 border border-border font-medium text-text capitalize">
                  {food.category || "Uncategorized"}
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2 font-semibold">
                  <span>{food.protein}g P</span>
                  <span>•</span>
                  <span>{food.carbs}g C</span>
                  <span>•</span>
                  <span>{food.fat}g F</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
}