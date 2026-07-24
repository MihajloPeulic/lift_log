
import { finishProfileAction } from "@/app/actions/auth";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import ProfileMeasurements from "./ProfileMeasurements";


export default async function ProfileFinishing() {

  const supabase = await createServerSupabaseClient();

    const {
        data: {
            user
        }
    } = await supabase.auth.getUser();


    if(!user){
        redirect("/login");
    }


    const role = user.user_metadata.role;


    if(!role){
        redirect("/choose-role");
    }



  return (

    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white flex items-center justify-center">

     <ProfileMeasurements />
      


    </main>

  );
}