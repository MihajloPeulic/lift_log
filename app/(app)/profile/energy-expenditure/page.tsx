
import EnergyExpenditureClient from "./EnergyExpenditureClient"
import { createServerSupabaseClient } from "@/utils/supabase/server"
import { getCurrentUserWithProfile } from "@/app/lib/data/user"
import { getCalorieNeeds } from "@/app/lib/data/food"

import { ActivityLevel, activityMultiplier, activityLevelListForUi } from "@/app/constants/nutrition"
import BackButton from "@/components/BackButton"

export default async function EnergyExpenditure(){

    const supabase = await createServerSupabaseClient()
    
        const data = await getCurrentUserWithProfile()
    
        if(!data){
            throw new Error("Not logged in")
        }
    
        const {user, profile} = data
        
        const nutrient_needs = await getCalorieNeeds(user.id)
        const activity_level = nutrient_needs.activity_level as ActivityLevel;
        
    return(
        
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


                <BackButton href="/profile"></BackButton>
                
                <EnergyExpenditureClient
                    usersActivityLevel={activity_level}
                    bmr={nutrient_needs.bmr}
                    activityLevel={activityLevelListForUi}
                />

            </div>
        </div>
    )
}