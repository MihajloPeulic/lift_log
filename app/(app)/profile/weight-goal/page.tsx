import { createServerSupabaseClient } from "@/utils/supabase/server";
import EditWeightGoal from "./EditWeightGoal";
import { getCurrentUser, getCurrentUserWithProfile } from "@/app/lib/data/user";
import { redirect } from "next/navigation";
import { getCalorieNeeds } from "@/app/lib/data/food";
import { activityMultiplier, ActivityLevel  } from "@/app/constants/nutrition";
import BackButton from "@/components/BackButton";


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
        <div
            className="
                min-h-screen
                p-4 md:p-8
            "
        >
                <div
                    className="
                        mx-auto
                        max-w-2xl
                        space-y-6
                    "
                >
                <BackButton href={"/profile"}></BackButton>

                <EditWeightGoal
                    nutrient_needs={nutrient_needs}
                    usersWeight={usersWeight}
                ></EditWeightGoal>
            </div>
        </div>
    )
}