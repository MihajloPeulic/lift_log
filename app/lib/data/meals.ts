import { createServerSupabaseClient } from "@/utils/supabase/server";


export async function getMeals(date: string) {

    const supabase = await createServerSupabaseClient();


    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();


    if(!user){
        throw new Error("User not authenticated");
    }



    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);



    const { data, error } = await supabase
        .from("meals")
        .select(`
            *,
            meal_items(
                id,
                amount,
                food_unit_id,
                foods(
                    id,
                    name,
                    calories,
                    protein,
                    carbs,
                    fat
                ),
                food_units(
                    id,
                    unit_name,
                    grams
                )
            )
        `)
        .eq("user_id", user.id)
        .gte(
            "eaten_at",
            startOfDay.toISOString()
        )
        .lte(
            "eaten_at",
            endOfDay.toISOString()
        )
        .order("eaten_at", {
            ascending: false
        });

    if(error){
        throw new Error(error.message);
    }


    return data;
}