import { createServerSupabaseClient } from "@/utils/supabase/server";
import EditMacronutrientTargets from "./MacronutrientTargets";
import { getCurrentUserWithProfile } from "@/app/lib/data/user";
import { getCalorieNeeds } from "@/app/lib/data/food";
import { activityMultiplier, ActivityLevel  } from "@/app/constants/nutrition";
import BackButton from "@/components/BackButton";


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


                <EditMacronutrientTargets
                    nutrient_needs={nutrient_needs}
                    activityMultiplier={multiplier}
                ></EditMacronutrientTargets>

            </div>
        </div>
    )
}