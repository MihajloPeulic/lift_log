"use server"

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/data/user";

export async function changeEmail(email: string, oldEmail: string) {
    const supabase = await createServerSupabaseClient();

    if (email === oldEmail) {
        return { error: "This email is the same as your current one." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return { error: email + " is not a valid email." };
    }


    const { error } = await supabase.auth.updateUser({
        email: email
    });

    if (error) {
        return { error: (error as any).message };
    }

    return { success: "Email changed!" };
}

export async function changeFullName(fullName: string, oldFullName: string) {
    const supabase = await createServerSupabaseClient();

    if (fullName === oldFullName) {
        return { error: "This name is the same as your current one" };
    }

    const fullNameRegex = /^[A-ZŠĐČĆŽ][a-zšđčćž]+(\s[A-ZŠĐČĆŽ][a-zšđčćž]+)+$/;

    if(!fullNameRegex.test(fullName)){
        return { error: "This is not a real name." };
    }

    const user = await getCurrentUser()


    const { error } = await supabase
        .from("profiles")
        .update({
            full_name: fullName
        })
        .eq("id", user.id);

    if (error) {
        return { error: (error as any).message };
    }

    return { success: "Full Name changed!" };
}



export async function changePassword(currentPassword: string, newPassword: string, confirmedPassword: string) {
    const supabase = await createServerSupabaseClient();

    if(newPassword !== confirmedPassword){
        return { error: "Passwords do not match!"};
    }

    const { error } = await supabase.auth.updateUser({
            password: newPassword,
            current_password: currentPassword // Supabase ovdje sam bezbjedno provjerava staru lozinku
        });

    if (error) {
        return { error: error.message }; // Ako je stara lozinka netačna, vratiće grešku
    }

    return { success: "Password successfully changed!" };
    

}

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
        updates.current_bodyweight = bodyweight;
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


    const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

    if(error){
        throw new Error(error.message);
    }

    await addBwHistory(bodyweight, user.id)

    redirect("/profile");

}

export async function addBwHistory(newBw: number, userId: string) {

    const supabase = await createServerSupabaseClient();


    const { error } = await supabase
        .from("bodyweight_history")
        .insert({
            user_id: userId,
            bodyweight: newBw
        });

    if(error){
        throw new Error(error.message);
    }


}