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

  // Sve ispravne kategorije usklađene sa ENUM-om u bazi
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

  // Funkcija za pretragu prema tekstu i odabranoj kategoriji
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

  // Učitaj početne namirnice pri prvom renderu
  useEffect(() => {
    handleSearch("", "All");
  }, []);

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
      <section className="rounded-card border border-border bg-surface p-4 sm:p-6 shadow-xl space-y-3">
        
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          {/* Input za pretragu (radi na Enter, nema dugmeta) */}
          <div className="relative flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search food and press Enter..."
              className="
                w-full
                rounded-button
                border border-border
                bg-background
                px-4 py-3
                text-sm
                outline-none
                transition
                focus:border-primary
                sm:text-base
              "
            />
          </div>

          {/* Interaktivno Filter dugme koje otvara animirani meni */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="
                cursor-pointer
                w-full sm:w-auto
                flex items-center justify-between gap-3
                rounded-button
                border border-border
                bg-background
                px-5 py-3
                text-sm font-medium
                text-text
                transition
                hover:border-primary
                sm:text-base
              "
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
            ${isFilterOpen ? "max-h-48 opacity-150 pt-2" : "max-h-0 opacity-0 pt-0"}
          `}
        >
          <div className="flex flex-wrap gap-2 rounded-xl bg-background p-3 border border-border">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setCategory(cat);
                  handleSearch(search, cat);
                  setIsFilterOpen(false); // Automatski zatvori meni po izboru
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
      <section className="mt-6 sm:mt-8">
        
        <h2 className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl">
          Foods
        </h2>

        {loading && (
          <p className="text-sm text-text-secondary sm:text-base py-4 text-center">
            Searching...
          </p>
        )}

        {!loading && foods.length === 0 && (
          <p className="text-sm text-text-secondary sm:text-base py-6 text-center border border-dashed border-border rounded-card">
            No foods found. Try a different search term.
          </p>
        )}

        <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
          {foods.map(food => (
            <button
              key={food.id}
              type="button"
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
                p-3.5
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

              {/* Drugi red: Lepo stilizovana kategorija i Makrosi */}
              <div className="mt-1.5 flex w-full items-center justify-between text-[11px] text-text-secondary sm:text-xs">
                <span className="rounded-md bg-background px-2.5 py-0.5 border border-border font-medium text-text capitalize">
                  {food.category || "Uncategorized"}
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2 font-medium">
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