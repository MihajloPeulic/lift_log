import Sidebar from "@/components/Sidebar_desktop";
import {getCurrentUserWithProfile} from "../lib/data/user"
import {redirect} from "next/navigation"
import Link from "next/link";
import EditBodyStats from "./EditBodysStats";
import { updateBodyStats } from "../actions/updateProfile";


export default async function ProfilePage() {

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
    bodyweight = Number((profile?.bodyweight * 2.20462).toFixed(1)) ;
    /* bodyweightFull = bodyweight?.toString() + " lbs" */


    totalInches = profile?.height ? profile.height / 2.54 : 0;

    /* feet = Math.floor(totalInches / 12);
    inches = Math.round(totalInches % 12); */

    height = totalInches
    /* heightFull = feet.toString() + " ft " + inches.toString() + " in " */
  }else{
    bodyweight = Number((profile?.bodyweight).toFixed(1))
    /* bodyweightFull = bodyweight?.toString() + " kg" */


    height = Number((profile?.height).toFixed(0)) 
    /* heightFull = height.toString() + " cm" */
  }

  

  return (

    <div className="min-h-screen bg-background text-text">


      <div className="flex min-h-screen">





        <main className="mx-auto flex-1 max-w-6xl p-5 pb-28 lg:p-8 lg:pb-8">

          <Link
            href="/dashboard"
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-button border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-light"
          >
            <span className="text-lg">←</span>
            Back to Dashboard
          </Link>


          <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Profile
              </h1>

              <p className="mt-1 text-text-secondary">
                Your fitness identity and achievements.
              </p>

            </div>


            <a
              href="/settings"
              className="rounded-button border border-border-light px-5 py-3 text-center hover:bg-surface-light"
            >
              Settings ⚙️
            </a>


          </header>






          {/* User Card */}

          <section className="mt-8 rounded-card border border-border bg-surface p-card">


            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">


              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-4xl font-bold text-black">
                {
                  profile?.avatar_url ? (
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={profile.avatar_url}
                      alt=""
                    />
                  ) : (
                    profile?.full_name
                      ?.slice(0, 2)
                      .toUpperCase()
                  )
                }
              </div>


              <div>

                <h2 className="text-3xl font-bold">
                  {user.user_metadata.username}
                </h2>


                <p className="mt-1 text-text-secondary">
                  {
                    profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
                  }
                </p>


                <p className="mt-3 text-sm text-text-muted">
                  Member since{" "}
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>


              </div>


            </div>


          </section>








          {/* Body Stats */}

          <section className="mt-8">

            

              <EditBodyStats
                  bodyweight={bodyweight}
                  height={height}
                  unit_system={profile.unit_system}
                  date_of_birth={profile.date_of_birth}
                  bodyFat={profile.body_fat}
                  gender={profile.gender}
              ></EditBodyStats>


            


          </section>









          {/* Training Stats */}




        </main>


      </div>







      {/* Mobile Navigation */}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur lg:hidden">

        <div className="grid grid-cols-5 px-2 py-3 text-center text-xs">


          <a className="text-text-secondary">
            🏠
            <span className="block">
              Home
            </span>
          </a>


          <a className="text-text-secondary">
            💪
            <span className="block">
              Workout
            </span>
          </a>


          <a className="text-text-secondary">
            📈
            <span className="block">
              Progress
            </span>
          </a>


          <a className="text-text-secondary">
            🥗
            <span className="block">
              Food
            </span>
          </a>


          <a className="text-primary">
            👤
            <span className="block">
              Profile
            </span>
          </a>


        </div>

      </nav>


    </div>

  );
}