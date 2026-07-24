import { createServerSupabaseClient } from "@/utils/supabase/server"

export async function getCurrentUserWithProfile(){

    const supabase = await createServerSupabaseClient();


    const {
        data:{
            user
        }
    } = await supabase.auth.getUser();


    if(!user){
        return null;
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
        return null;
    }

    return user
}