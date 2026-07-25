import { createServerSupabaseClient } from "@/utils/supabase/server";
import EditMacronutrientTargets from "./MacronutrientTargets";
import { getCurrentUser, getCurrentUserWithProfile } from "@/app/lib/data/user";
import { redirect } from "next/navigation";
import { getCalorieNeeds } from "@/app/lib/data/food";
import { activityMultiplier, ActivityLevel  } from "@/app/constants/nutrition";


export default async function MacronutrientTargets() {

    const supabase = await createServerSupabaseClient()

    const data = await getCurrentUserWithProfile()

    if(!data){
        throw new Error("Not logged in")
    }

    const {user, profile} = data
    
    const nutrient_needs = await getCalorieNeeds(user.id)
    const activity_level = nutrient_needs.activity_level as ActivityLevel;

    const multiplier = activityMultiplier[activity_level]; 
    

    return (
        <>
            <EditMacronutrientTargets
                nutrient_needs={nutrient_needs}
                activityMultiplier={multiplier}
            ></EditMacronutrientTargets>
        </>
    )
}