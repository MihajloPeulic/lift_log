"use server"

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CalculateExpenditure } from "../lib/utils/calculateActiviry";





export async function signUpAction(
    formData: FormData
) {
    
    const supabase = await createServerSupabaseClient();

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirm_password"));

    const fullName = String(formData.get("full_name"));
    const username = String(formData.get("username"));
    const role = String(formData.get("role"));




    if(password !== confirmPassword){
        throw new Error("Passwords do not match");
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                username,
                role,
            },
        },
    });

    if(error){
        throw new Error(error.message);
    }

    redirect("/profile_finishing")

}

export async function finishProfileAction(
    formData: FormData
) {
    
    const supabase = await createServerSupabaseClient();


    let bodyweight = Number(formData.get("bodyweight"))
    let height = Number(formData.get("height"))
    const date_of_birth = String(formData.get("date_of_birth"))
    const inch = Number(formData.get("inch"));
    const feet = Number(formData.get("feet"));
    const gender = String(formData.get("gender"))
    const unit = String(formData.get("unit"))
    const activity = String(formData.get("activity"))
    const bodyFat = String(formData.get("bodyFat"))



    if(unit === "imperial"){
        let feetToInch = feet * 12;
        height = (feetToInch + inch)*2.54

        let bodyweightMetric = bodyweight * 0.45359237;
        bodyweight = bodyweightMetric;
    }

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();

    if(!user){
        throw new Error("User not authenticated");
    }

    const {
        calorie_expenditure, 
        protein_needs, 
        fat_needs, 
        carbs_needs} = CalculateExpenditure(
                        bodyweight, 
                        height, 
                        date_of_birth, 
                        activity, 
                        gender)




    const { data: calorieNeedsData, error: calorieNeedsError } = await supabase
    .from('calorie_needs') 
    .insert({
        user_id: user.id,
        calorie_expenditure: calorie_expenditure,
        protein_needs: protein_needs,
        fat_needs: fat_needs,
        carbs_needs: carbs_needs

    })

    if (calorieNeedsError){
        throw new Error(calorieNeedsError.message)
    }

    const { data: profileData, error: profileError } = await supabase
    .from('profiles') 
    .insert({
        id: user.id,
        full_name: user.user_metadata.full_name,
        username: user.user_metadata.username,
        role: user.user_metadata.role,

        bodyweight,
        height,
        date_of_birth,
        gender,
        unit_system: unit,
        activity_level: activity,
        body_fat: bodyFat
    })

    if(profileError){
        throw new Error(profileError.message)
    }

    


    redirect("/dashboard")

}


export async function signOutAction() {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.auth.signOut();

    if(error){
        throw new Error(error.message);
    }

    redirect("/login");

}

export async function logInAction(formData: FormData) {

    const supabase = await createServerSupabaseClient();

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if(error){
        throw new Error(error.message);
    }

    redirect("/dashboard");
}