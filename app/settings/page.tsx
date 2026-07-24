

import Link from "next/link";
import Sidebar from "@/components/Sidebar_desktop";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { getCurrentUserWithProfile } from "../lib/data/user";
import { redirect } from "next/navigation"
import AppPreferences from "./app_pereferences_component";
import {signOutAction} from "../actions/auth";


export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient()

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
            href="/profile"
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-button border border-border bg-surface px-4 py-2 text-sm font-medium transition hover:bg-surface-light"
          >
            <span className="text-lg">←</span>
            Back to Profile
          </Link>

          <header className="border-b border-border pb-6">


            <h1 className="text-3xl font-bold">
              Settings
            </h1>


            <p className="mt-1 text-text-secondary">
              Manage your account and application preferences.
            </p>


          </header>






          {/* Account */}


          <section className="mt-8 rounded-card border border-border bg-surface p-card">


            <h2 className="text-xl font-bold">
              Account
            </h2>



            <div className="mt-5 space-y-4">
              {
                <div
                  key={"email_change"}
                  className="flex flex-col gap-3 rounded-button bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                >


                  <div>

                    <p className="font-medium">
                      {"Email"}
                    </p>


                    <p className="text-sm text-text-secondary">
                      {user.email}
                    </p>


                  </div>



                  <button className="rounded-lg border border-border-light px-4 py-2 text-sm hover:bg-surface-light">

                    {"Edit"}

                  </button>


                </div>
              }
            </div>

            <div className="mt-5 space-y-4">
              {
                <div
                  key={"password_change"}
                  className="flex flex-col gap-3 rounded-button bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                >


                  <div>

                    <p className="font-medium">
                      {"Password"}
                    </p>


                    <p className="text-sm text-text-secondary">
                      {"Change your password"}
                    </p>


                  </div>



                  <button className="rounded-lg border border-border-light px-4 py-2 text-sm hover:bg-surface-light">

                    {"Edit"}

                  </button>


                </div>
              }
            </div>


          </section>









          {/* Preferences */}

          <AppPreferences 
            unit_system={profile.unit_system}
            theme="dark"
          />
          









          {/* Notifications */}


          
              








          {/* Account Actions */}


          <section className="mt-6 rounded-card border border-border bg-surface p-card">


            <h2 className="text-xl font-bold">
              Account Actions
            </h2>



            <form action={signOutAction} className="mt-5 flex flex-col gap-4 sm:flex-row">



              <button className="rounded-button border border-border-light px-5 py-3 hover:bg-surface-light">

                Log out

              </button>




              <button className="rounded-button border border-red-500/50 px-5 py-3 text-red-400 hover:bg-red-500/10">

                Delete account

              </button>



            </form>


          </section>



        </main>


      </div>






      {/* Mobile Navigation */}


      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur lg:hidden">


        <div className="grid grid-cols-5 px-2 py-3 text-center text-xs">


          {[
            ["🏠","Home"],
            ["💪","Workout"],
            ["📈","Progress"],
            ["🥗","Food"],
            ["👤","Profile"],
          ].map(([icon,name],index)=>(

            <a
              key={name}
              className={`${
                index === 4
                ? "text-primary"
                : "text-text-secondary"
              }`}
            >

              {icon}

              <span className="block">
                {name}
              </span>

            </a>

          ))}


        </div>


      </nav>



    </div>

  );
}