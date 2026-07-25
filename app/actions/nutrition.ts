"use server"

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ActivityLevel, activityMultiplier } from "../constants/nutrition";

import { CalculateExpenditure } from "../lib/utils/calculateActivity";



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


export async function updateMacro(
    name: "protein" | "carbs" | "fat",
    value: number
) {
    const supabase = await createServerSupabaseClient();

    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }


    if (name === "protein") {
        const { error } = await supabase
            .from("calorie_needs")
            .update({
                protein_needs: value
            })
            .eq("user_id", user.id);


        if (error) {
            throw new Error(error.message);
        }

    } else if (name === "carbs") {
        const { error } = await supabase
            .from("calorie_needs")
            .update({
                carbs_needs: value
            })
            .eq("user_id", user.id);


        if (error) {
            throw new Error(error.message);
        }

    } else if (name === "fat") {
        const { error } = await supabase
            .from("calorie_needs")
            .update({
                fat_needs: value
            })
            .eq("user_id", user.id);


        if (error) {
            throw new Error(error.message);
        }
    }
}


export async function updateCustomCalorieTarget(
    value: number
) {
    const supabase = await createServerSupabaseClient();

    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    const { error } = await supabase
                .from("calorie_needs")
                .update({
                    custom_calorie_target: value
                })
                .eq("user_id", user.id);


            if (error) {
                throw new Error(error.message);
            }

   
}


export async function deleteCustomCalorieTarget(custom_energy: number) {

    if(custom_energy === null){
        return
    }


    const supabase = await createServerSupabaseClient();

    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    const { error } = await supabase
        .from("calorie_needs")
        .update({
            custom_calorie_target: null
        })
        .eq("user_id", user.id);


    if (error) {
        throw new Error(error.message);
    }

   
}



export async function updateActivityLevel(activity_level: string) {
    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }


    const { data: needs, error: needsError } = await supabase
        .from("calorie_needs")
        .select("bmr")
        .eq("user_id", user.id)
        .single();


    if (needsError) {
        throw new Error(needsError.message);
    }


    const bmr = needs.bmr;

    const multiplier = activityMultiplier[activity_level as ActivityLevel]

    let calorie_expenditure = (bmr * (multiplier - 1)) + bmr

    console.log(calorie_expenditure);

    const { error } = await supabase
        .from("calorie_needs")
        .update({
            activity_level: activity_level,
            calorie_expenditure: calorie_expenditure
        })
        .eq("user_id", user.id);


    if (error) {
        throw new Error(error.message);
    } 
    
}


export async function setWeightGoals(formData: FormData) {
    const supabase = await createServerSupabaseClient();

    const weightGoal = Number(formData.get("weightGoal"))
    const weightChangeRate = Number(formData.get("weightChangeRate"))
    const energyTarget = Number(formData.get("energyTarget"))


    const currentWeight = Number(formData.get("currentWeight"))
    const usersWeightOld = Number(formData.get("usersWeightOld"))


    if(!weightChangeRate){
        return
    }


    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Not authenticated");
    }

    
    if(currentWeight !== usersWeightOld){
        const { error } = await supabase
        .from("profiles")
        .update({
            bodyweight: currentWeight
        })
        .eq("id", user.id);

        if (error) {
            throw new Error(error.message);
        }
        
    }

    const { error: needsError } = await supabase
        .from("calorie_needs")
        .update({
            weight_goal: weightGoal,
            weight_change_rate: weightChangeRate,
            calorie_expenditure: energyTarget
        })
        .eq("user_id", user.id);

    if (needsError) {
        throw new Error(needsError.message);
    }
    


    
}




