import EditBodyStats from "./EditBodysStats";
import { getCurrentUserWithProfile } from "@/app/lib/data/user";
import BackButton from "@/components/BackButton";
import {redirect} from "next/navigation"



export default async function BodyStats() {

    const data = await getCurrentUserWithProfile();

  if(!data){
      redirect("/login");
  }

  const {user, profile} = data;

  let bodyweight = 0
  /* let bodyweightFull = "" */

  let totalInches = 0
  let height = 0

  /* let feet = 0
  let inches = 0
  let heightFull = "" */

  if(profile.unit_system === "imperial"){
    bodyweight = Number((profile?.current_bodyweight * 2.20462).toFixed(1)) ;
    /* bodyweightFull = bodyweight?.toString() + " lbs" */
  

    totalInches = profile?.height ? profile.height / 2.54 : 0;

    /* feet = Math.floor(totalInches / 12);
    inches = Math.round(totalInches % 12); */

    height = totalInches
    /* heightFull = feet.toString() + " ft " + inches.toString() + " in " */
  }else{
    bodyweight = Number((profile?.current_bodyweight).toFixed(1))
    /* bodyweightFull = bodyweight?.toString() + " kg" */
    

    height = Number((profile?.height).toFixed(0)) 
    /* heightFull = height.toString() + " cm" */
  }


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

          <BackButton href={"/profile"}></BackButton>
          
            <EditBodyStats
                bodyweight={bodyweight}
                height={height}
                unit_system={profile.unit_system}
                date_of_birth={profile.date_of_birth}
                bodyFat={profile.body_fat}
                gender={profile.gender}
            />

        </div>
      </div>

    )
}