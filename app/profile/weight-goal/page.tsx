import { createServerSupabaseClient } from "@/utils/supabase/server";
import EditWeightGoal from "./EditWeightGoal";
import { getCurrentUser, getCurrentUserWithProfile } from "@/app/lib/data/user";
import { redirect } from "next/navigation";
import { getCalorieNeeds } from "@/app/lib/data/food";
import { activityMultiplier, ActivityLevel  } from "@/app/constants/nutrition";


export default async function WeightGoal() {

    const supabase = await createServerSupabaseClient()

    const data = await getCurrentUserWithProfile()

    if(!data){
        throw new Error("Not logged in")
    }

    const {user, profile} = data
    
    const nutrient_needs = await getCalorieNeeds(user.id)
    const usersWeight = profile.current_bodyweight

    

    return (
        <>
            <EditWeightGoal
                nutrient_needs={nutrient_needs}
                usersWeight={usersWeight}
            ></EditWeightGoal>
        </>
    )
}