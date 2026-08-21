import { createServerSupabaseClient } from "@/utils/supabase/server";
import { getCurrentUserWithProfile } from "../lib/data/user";
import { redirect } from "next/navigation";
import AppPreferences from "./app_pereferences_component";
import { signOutAction } from "../actions/auth";
import BackButton from "@/components/BackButton";
import EditProfile from "./ProfileSettingClient";

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient();
  const data = await getCurrentUserWithProfile();
  
  if (!data) {
    redirect("/login");
  }
  
  const { user, profile } = data;

  return (
    <div className="min-h-screen p-9 md:p-8">
      <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
        
        <BackButton href={"/profile"} />

        {/* Uklonjen max-w-6xl jer roditelj već ograničava širinu na max-w-2xl, što je idealno za Settings */}
        <main className="mt-2 pb-28 sm:mt-3">
          
          <header className="border-b border-border pb-4 sm:pb-6">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Settings
            </h1>
            <p className="mt-1 text-sm text-text-secondary sm:text-base">
              Manage your account and application preferences.
            </p>
          </header>

          {/* Account */}
          <div className="mt-6 sm:mt-8">
            <EditProfile 
              email={user.email as string}
              fullName={profile.full_name} 
            />
          </div>

          {/* Preferences */}
          <div className="mt-6 sm:mt-8">
            <AppPreferences 
              unit_system={profile.unit_system}
              theme="dark"
            />
          </div>

          {/* Account Actions */}
          <section className="mt-6 rounded-card border border-border bg-surface p-4 sm:mt-8 sm:p-card">
            <h2 className="text-lg font-bold sm:text-xl">
              Account Actions
            </h2>

            {/* Dugmad idu jedno ispod drugog na telefonu, a jedno pored drugog na sm+ ekranima */}
            <form action={signOutAction} className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:gap-4">
              
              <button 
                type="submit"
                className="w-full cursor-pointer rounded-button border border-border-light px-4 py-2.5 text-sm transition-colors hover:bg-surface-light sm:w-auto sm:px-5 sm:py-3 sm:text-base"
              >
                Log out
              </button>

              <button 
                type="button" // Pretvoreno u "button" da ne bi slučajno okinulo signOutAction formu, logiku za brisanje dodaješ naknadno
                className="w-full cursor-pointer rounded-button border border-red-500/50 px-4 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10 sm:w-auto sm:px-5 sm:py-3 sm:text-base"
              >
                Delete account
              </button>

            </form>
          </section>

        </main>
      </div>
    </div>
  );
}