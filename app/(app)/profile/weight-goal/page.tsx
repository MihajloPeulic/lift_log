import { createServerSupabaseClient } from "@/utils/supabase/server";
import EditWeightGoal from "./EditWeightGoal";
import { getCurrentUserWithProfile } from "@/app/lib/data/user";
import { getCalorieNeeds } from "@/app/lib/data/food";
import BackButton from "@/components/BackButton";

export default async function WeightGoal() {
  const supabase = await createServerSupabaseClient();
  const data = await getCurrentUserWithProfile();

  if (!data) {
    throw new Error("Not logged in");
  }

  const { user, profile } = data;
  
  const nutrient_needs = await getCalorieNeeds(user.id);
  const usersWeight = profile.current_bodyweight;

  return (
    <div className="min-h-screen sm:pt-8 pb-10">
      
      {/* 
        Omotač za Back dugme.
        Koristimo iste dimenzije (max-w-2xl) i isti padding (px-4 sm:px-0) 
        kako bi dugme bilo u savršenoj ravni sa formom ispod.
      */}
      <div className="mx-auto max-w-2xl px-4 sm:px-0 mb-2">
        <BackButton href="/profile" />
      </div>

      <EditWeightGoal
        nutrient_needs={nutrient_needs}
        usersWeight={usersWeight}
      />
      
    </div>
  );
}