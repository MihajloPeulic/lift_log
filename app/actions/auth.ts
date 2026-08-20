"use server"

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CalculateExpenditure } from "../lib/utils/calculateActivity";
import { addBwHistory } from "./updateProfile";





export async function signUpAction(
    formData: FormData
) {
    
    const supabase = await createServerSupabaseClient();

    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirm_password"));

    const fullName = String(formData.get("full_name"));
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
        carbs_needs,
        BMR} = CalculateExpenditure(
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
        carbs_needs: carbs_needs,
        activity_level: activity,
        bmr: BMR

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

        current_bodyweight: bodyweight,
        height,
        date_of_birth,
        gender,
        unit_system: unit,
        body_fat: bodyFat
    })

    if(profileError){
        throw new Error(profileError.message)
    }

    await addBwHistory(bodyweight, user.id)


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


export async function changeUserInfo(formData: FormData) {
  const full_name = String(formData.get("fullName"));
  const email = String(formData.get("email"));

  const oldEmail = String(formData.get("oldEmail"));
  const oldName = String(formData.get("oldName"));

  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }


  const profileUpdates: {
    full_name?: string;
  } = {};


  if (full_name !== oldName) {
    profileUpdates.full_name = full_name;
  }


  // Update auth.users email
  if (email !== oldEmail) {
    const { error } = await supabase.auth.updateUser({
      email,
    });

    if (error) {
      throw error;
    }
  }


  // Update profiles table only if needed
  if (Object.keys(profileUpdates).length > 0) {
    const { error } = await supabase
      .from("profiles")
      .update(profileUpdates)
      .eq("id", user.id);

    if (error) {
      throw error;
    }
  }
}