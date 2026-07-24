"use server"

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createMeal(
    mealType:string,
    date:string
) {

    const supabase = await createServerSupabaseClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


    if(!user){
        throw new Error("Not authenticated");
    }



    const { data, error } = await supabase
    .from("meals")
    .insert({
        user_id:user.id,
        meal_type: mealType,
        eaten_at: date
    })
    .select()
    .single();



    if(error){
        throw new Error(error.message);
    }


    return data

}


export async function addFood(
    formData: FormData
) {

    const supabase = await createServerSupabaseClient();

    const mealId = String(formData.get("mealId"));
    const foodId = String(formData.get("foodId"));
    const amount = Number(formData.get("amount"));
    const foodUnitId = String(formData.get("unit"));

    const date = String(formData.get("date"));


    const { error } = await supabase
    .from("meal_items")
    .insert({
        meal_id: mealId,
        food_id: foodId,
        amount,
        food_unit_id: foodUnitId
    });

    if (error) {
        throw new Error(error.message);
    }


    revalidatePath("/nutrition")

    redirect(`/nutrition?date=${date}`);

}


export async function updateMealItem(
    formData: FormData
) {

    const supabase = await createServerSupabaseClient();

    const itemId = String(formData.get("itemId"));
    const amount = Number(formData.get("amount"));
    const unitId = String(formData.get("unit"));

    const date = String(formData.get("date"))


    const { error } = await supabase
    .from("meal_items")
    .update({
        amount,
        food_unit_id: unitId
    })
    .eq("id", itemId);

    if (error) {
        throw new Error(error.message);
    }


    revalidatePath("/nutrition")

    redirect(`/nutrition?date=${date}`);

}

export async function deleteMealItem(
    formData: FormData
) {

    const supabase = await createServerSupabaseClient();

    const itemId = String(formData.get("itemId"));

    const date = String(formData.get("date"))


    const { error } = await supabase
    .from("meal_items")
    .delete()
    .eq("id", itemId);

    if (error) {
        throw new Error(error.message);
    }


    revalidatePath("/nutrition")

    redirect(`/nutrition?date=${date}`);

}