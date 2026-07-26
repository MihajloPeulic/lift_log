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
                    fat,
                    fiber,
                    sugar,
                    sodium,
                    cholesterol,

                    vitamin_a,
                    vitamin_c,
                    vitamin_d,
                    vitamin_e,
                    vitamin_k,

                    vitamin_b1,
                    vitamin_b2,
                    vitamin_b3,
                    vitamin_b5,
                    vitamin_b6,
                    vitamin_b7,
                    vitamin_b9,
                    vitamin_b12,

                    calcium,
                    iron,
                    magnesium,
                    phosphorus,
                    potassium,
                    zinc,
                    copper,
                    manganese,
                    selenium,

                    iodine,
                    chromium,
                    molybdenum,
                    choline,

                    omega_3,
                    omega_6
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