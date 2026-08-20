
import {getCurrentUserWithProfile} from "../lib/data/user"
import {redirect} from "next/navigation"
import Link from "next/link";
import { ChevronRight } from "lucide-react";



export default async function ProfilePage() {

  const data = await getCurrentUserWithProfile();

  if(!data){
      redirect("/login");
  }

  const {user, profile} = data;

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

          <Link
            href="/profile/profile_settings"
            className="
              mt-8
              flex
              items-center
              justify-between
              rounded-card
              border
              border-border
              bg-surface
              p-card
              transition-colors
              hover:bg-surface-hover
              cursor-pointer
            "
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-4xl font-bold text-black">
                {profile?.avatar_url ? (
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={profile.avatar_url}
                    alt=""
                  />
                ) : (
                  profile?.full_name
                    ?.trim()
                    .split(/\s+/)
                    .map((part: string) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                )}
              </div>

              <div>
                <h2 className="text-3xl font-bold">{profile?.full_name}</h2>

                <p className="mt-1 text-text-secondary">
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
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

              <span className="text-text-secondary">
                →
              </span>
          </Link>








          {/* Profile Settings */}

<section
  className="
    mt-8
    overflow-hidden
    rounded-card
    border
    border-border
    bg-surface
  "
>

  <Link
    href="/profile/body-stats"
    className="
      flex
      items-center
      justify-between
      px-5
      py-4
      transition
      hover:bg-surface-light
    "
  >

    <span className="font-medium">
      Edit Body Stats
    </span>

    <span className="text-text-secondary">
      →
    </span>

  </Link>


  <div className="h-px bg-border mx-5" />


  <Link
    href="/profile/macronutrient-targets"
    className="
      flex
      items-center
      justify-between
      px-5
      py-4
      transition
      hover:bg-surface-light
    "
  >

    <span className="font-medium">
      Macronutrient targets
    </span>

    <span className="text-text-secondary">
      →
    </span>

  </Link>


  <div className="h-px bg-border mx-5" />


  <Link
    href="/profile/energy-expenditure"
    className="
      flex
      items-center
      justify-between
      px-5
      py-4
      transition
      hover:bg-surface-light
    "
  >

    <span className="font-medium">
      Energy Expenditure
    </span>

    <span className="text-text-secondary">
      →
    </span>

  </Link>

  <div className="h-px bg-border mx-5" />


  <Link
    href="/profile/weight-goal"
    className="
      flex
      items-center
      justify-between
      px-5
      py-4
      transition
      hover:bg-surface-light
    "
  >

    <span className="font-medium">
      Weight Goal
    </span>

    <span className="text-text-secondary">
      →
    </span>

  </Link>


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