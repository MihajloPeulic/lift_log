import EditBodyStats from "./EditBodysStats";
import { getCurrentUserWithProfile } from "@/app/lib/data/user";
import BackButton from "@/components/BackButton";
import { redirect } from "next/navigation";

export default async function BodyStats() {
  const data = await getCurrentUserWithProfile();

  if (!data) {
    redirect("/login");
  }

  const { user, profile } = data;

  let bodyweight = 0;
  let totalInches = 0;
  let height = 0;

  if (profile.unit_system === "imperial") {
    bodyweight = Number((profile?.current_bodyweight * 2.20462).toFixed(1));
    totalInches = profile?.height ? profile.height / 2.54 : 0;
    height = totalInches;
  } else {
    bodyweight = Number((profile?.current_bodyweight).toFixed(1));
    height = Number((profile?.height).toFixed(0));
  }

  return (
    <div className="min-h-screen sm:pt-8 pb-10">
      
      {/* Omotač za Back dugme - Savršeno poravnanje */}
      <div className="mx-auto max-w-2xl px-4 sm:px-0 mb-2">
        <BackButton href="/profile" />
      </div>
      
      <EditBodyStats
        bodyweight={bodyweight}
        height={height}
        unit_system={profile.unit_system}
        date_of_birth={profile.date_of_birth}
        bodyFat={profile.body_fat}
        gender={profile.gender}
      />
      
    </div>
  );
}