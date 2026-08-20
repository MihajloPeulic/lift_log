import { createServerSupabaseClient } from "@/utils/supabase/server"
import { CalorieHistoryRow } from "@/app/types/food";

export async function getCurrentUserWithProfile(){

    const supabase = await createServerSupabaseClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


     if(!user){
        throw new Error("Not logged in")
    }


    const {
        data: profile
    } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();


    return {
        user,
        profile
    };
}


export async function getCurrentUser(){

    const supabase = await createServerSupabaseClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


    if(!user){
        throw new Error("Not logged in")
    }

    return user
}


export async function getBwHistory() {
    
        const supabase = await createServerSupabaseClient();

        const user = await getCurrentUser()
            
    
        const { data: weightHistory } = await supabase
            .from("bodyweight_history")
            .select(
                `
                bodyweight,
                date_logged
                `
            )
            .eq("user_id", user.id)
            .order("date_logged", {
                ascending: true
            });

            return weightHistory
}


export async function getUnitSystem(){

    const supabase = await createServerSupabaseClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


     if(!user){
        throw new Error("Not logged in")
    }


    const {
        data: profile
    } = await supabase
        .from("profiles")
        .select("unit_system")
        .eq("id", user.id)
        .single();


    if(!profile){
        throw new Error("Not logged in")
    }

    return profile.unit_system
}


export async function getCalorieHistory() {

    const supabase = await createServerSupabaseClient();


    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();


    if(!user){
        throw new Error("Not logged in");
    }


    const createdAt = new Date(user.created_at);

    const eightWeeksAgo = new Date();

    eightWeeksAgo.setDate(
        eightWeeksAgo.getDate() - 56
    );


    const startDate =
        createdAt > eightWeeksAgo
            ? createdAt
            : eightWeeksAgo;



    const {
        data,
        error
    } = await supabase
        .from("meal_items")
        .select(`
            amount,
            food_units(
                grams
            ),
            foods(
                calories
            ),
            meals(
                eaten_at,
                user_id
            )
        `)
        .eq(
            "meals.user_id",
            user.id
        )
        .gte(
            "meals.eaten_at",
            startDate.toISOString()
        );


    if(error){
        throw new Error(error.message);
    }

   const rows = data as unknown as CalorieHistoryRow[];


    return rows.map(item => ({
        amount: item.amount,
        calories: item.foods.calories,
        eaten_at: item.meals.eaten_at,
        unit_grams: item.food_units.grams
    }));
}