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
    <div className="min-h-screen sm:pt-8 pb-28">
      
      {/* Omotač za Back dugme - Savršeno poravnanje */}
      <div className="mx-auto max-w-2xl px-4 sm:px-0 mb-2">
        <BackButton href="/profile" />
      </div>

      <div className="layout-container space-y-6 sm:space-y-8">
        <main className="space-y-6 sm:space-y-8">
          
          {/* ZAGLAVLJE */}
          <header className="border-b border-border pb-4 sm:pb-6">
            <h1 className="text-h1">
              Settings
            </h1>
            <p className="text-caption mt-1">
              Manage your account and application preferences.
            </p>
          </header>

          {/* Account */}
          <div>
            <EditProfile 
              oldEmail={user.email as string}
              oldFullName={profile.full_name} 
            />
          </div>

          {/* Preferences */}
          <div>
            <AppPreferences 
              unit_system={profile.unit_system}
              theme="dark"
            />
          </div>

          {/* Account Actions */}
          <section className="card-main space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-text">
              Account Actions
            </h2>

            <form action={signOutAction} className="flex flex-col sm:flex-row gap-3">
              <button 
                type="submit"
                className="w-full sm:w-auto cursor-pointer rounded-button border border-border-light px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-colors hover:bg-surface-light text-text"
              >
                Log out
              </button>

              <button 
                type="button"
                className="w-full sm:w-auto cursor-pointer rounded-button border border-red-500/50 px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-red-400 transition-colors hover:bg-red-500/10"
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