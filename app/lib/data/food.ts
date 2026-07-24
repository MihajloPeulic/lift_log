"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function searchFoods(search: string) {

    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from("foods")
        .select(`
            id,
            name,
            default_unit,
            calories,
            protein,
            carbs,
            fat,
            fiber
        `)
        .ilike("name", `%${search}%`)
        .order("name")
        .limit(30);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getFood(foodId: string) {

    const supabase  = await createServerSupabaseClient()
    
      const { data, error } = await supabase
        .from("foods")
        .select("*")
        .eq("id", foodId)
        .single();

    
      if (error) {
        throw new Error(error.message);
      }
    

    return data;
}

export async function getMealItem(itemId: string) {

    const supabase  = await createServerSupabaseClient()
    
      const { data, error } = await supabase
        .from("meal_items")
        .select("*")
        .eq("id", itemId)
        .single();

    
      if (error) {
        throw new Error(error.message);
      }
    

    return data;
}

export async function getUnits(foodId: string) {

    const supabase  = await createServerSupabaseClient()
    
      const { data, error } = await supabase
        .from("food_units")
        .select("*")
        .eq("food_id", foodId);

    
      if (error) {
        throw new Error(error.message);
      }
    

    return data;
    
}



export async function getGramUnitsId() {

    const supabase  = await createServerSupabaseClient()
    
      const { data, error } = await supabase
        .from("food_units")
        .select()
        .eq("unit_name", "grams")
        .limit(1)
        .single();

    
      if (error) {
        throw new Error(error.message);
      }
    

    return data;
    
}


export async function getCalorieNeeds(userId: string) {
    const supabase  = await createServerSupabaseClient()

    const { data, error } = await supabase
          .from("calorie_needs")
          .select()
          .eq("user_id", userId)
          .limit(1)
          .single();

    if (error) {
        throw new Error(error.message);
      }
    

    return data;

}