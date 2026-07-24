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

    let bodyweight = Number(formData.get("bodyweight"))
    let height = Number(formData.get("height"))
    let feet = Number(formData.get("feet"))
    let inch = Number(formData.get("inch"))

    let date_of_birth = String(formData.get("date_of_birth"))
    let gender = String(formData.get("gender"))
    let bodyFat = Number(formData.get("bodyFat"))


    const unitSystem = String(formData.get("unitSystem"))

    if(unitSystem === "imperial"){
        const totalInches = (feet * 12) + inch;

        height = totalInches * 2.54;
        bodyweight = bodyweight * 0.45359237;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if(!user){
        throw new Error("Not authenticated");
    }

    const { data, error } = await supabase
        .from("profiles")
        .update({
            height: height,
            bodyweight: bodyweight,
            body_fat: bodyFat,
            gender: gender,
            date_of_birth: date_of_birth
        })
        .eq("id", user.id)
        .select();;

    if(error){
        throw new Error(error.message)
    }

    redirect("/profile")

}