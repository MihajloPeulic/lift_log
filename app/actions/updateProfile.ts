"use server"

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function updateUnit(unit: string) {


    const supabase = await createServerSupabaseClient();

    const { data: { user } } = await supabase.auth.getUser();

    if(!user){
        throw new Error("Not authenticated");
    }

    const { data, error } = await supabase
        .from("profiles")
        .update({
            unit_system: unit
        })
        .eq("id", user.id)
        .select();;


    if(error){
        throw new Error(error.message);
    }
}

export async function updateBodyStats(formData: FormData) {

    const supabase = await createServerSupabaseClient();

    let bodyweight = Number(formData.get("bodyweight"));
    let height = Number(formData.get("height"));
    let feet = Number(formData.get("feet"));
    let inch = Number(formData.get("inch"));

    let date_of_birth = String(formData.get("date_of_birth"));
    let gender = String(formData.get("gender"));
    let bodyFat = Number(formData.get("bodyFat"));

    const unitSystem = String(formData.get("unitSystem"));

    if(unitSystem === "imperial"){
        const totalInches = (feet * 12) + inch;

        height = totalInches * 2.54;
        bodyweight = bodyweight * 0.45359237;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if(!user){
        throw new Error("Not authenticated");
    }


    const updates: Record<string, unknown> = {};

    if(formData.get("height") !== null){
        updates.height = height;
    }

    if(formData.get("bodyweight") !== null){
        updates.bodyweight = bodyweight;
    }

    if(formData.get("bodyFat") !== null){
        updates.body_fat = bodyFat;
    }

    if(formData.get("gender") !== null){
        updates.gender = gender;
    }

    if(formData.get("date_of_birth") !== null){
        updates.date_of_birth = date_of_birth;
    }


    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id)
        .select();

    if(error){
        throw new Error(error.message);
    }

    redirect("/profile");

}