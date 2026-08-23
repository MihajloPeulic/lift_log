import { createServerSupabaseClient } from "@/utils/supabase/server";
import EditMacronutrientTargets from "./MacronutrientTargets";
import { getCurrentUserWithProfile } from "@/app/lib/data/user";
import { getCalorieNeeds } from "@/app/lib/data/food";
import { activityMultiplier, ActivityLevel  } from "@/app/constants/nutrition";
import BackButton from "@/components/BackButton";

export default async function MacronutrientTargets() {
  const supabase = await createServerSupabaseClient();
  const data = await getCurrentUserWithProfile();

  if (!data) {
    throw new Error("Not logged in");
  }

  const { user, profile } = data;
  
  const nutrient_needs = await getCalorieNeeds(user.id);
  const activity_level = nutrient_needs.activity_level as ActivityLevel;
  const multiplier = activityMultiplier[activity_level]; 

  return (
    <div className="min-h-screen sm:pt-8 pb-10">
      
      {/* 
        Omotač za Back dugme - Savršeno poravnanje.
      */}
      <div className="mx-auto max-w-2xl px-4 sm:px-0 mb-2">
        <BackButton href="/profile" />
      </div>

      <EditMacronutrientTargets
        nutrient_needs={nutrient_needs}
        activityMultiplier={multiplier}
      />
      
    </div>
  );
}