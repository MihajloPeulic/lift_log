import { getCurrentUserWithProfile } from "@/app/lib/data/user";
import { redirect } from "next/navigation";
import Link from "next/link";
import BackButton from "@/components/BackButton";

export default async function ProfilePage() {
  const data = await getCurrentUserWithProfile();

  if (!data) {
    redirect("/login");
  }

  const { user, profile } = data;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <main className="">
          
          <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Profile</h1>
              <p className="mt-1 text-sm text-text-secondary sm:text-base">
                Your fitness identity and achievements.
              </p>
            </div>
          </header>

         {/* User Card */}
          <div className="mt-6 flex items-center gap-4 rounded-card border border-border bg-surface p-4 transition-colors hover:bg-surface-hover sm:mt-8 sm:gap-6 sm:p-card">
            
            {/* Avatar (Uvek levo, manji na mobilnom, raste na sm i md) */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-black sm:h-24 sm:w-24 sm:text-3xl md:h-28 md:w-28 md:text-4xl">
              {profile?.avatar_url ? (
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={profile.avatar_url}
                  alt={profile.full_name || "Profile"}
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

            {/* User Info */}
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-lg font-bold sm:text-2xl md:text-3xl">
                {profile?.full_name}
              </h2>
              
              <p className="mt-0.5 text-sm text-text-secondary sm:mt-1 sm:text-base">
                {profile?.role 
                  ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) 
                  : "User"}
              </p>
              
              <p className="mt-1 text-xs text-text-muted sm:mt-3 sm:text-sm">
                Member since{" "}
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  month: "short", // 'short' umesto 'long' (npr. Aug 21, 2026) štedi prostor na telefonu
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Profile Settings */}
          <section className="mt-6 overflow-hidden rounded-card border border-border bg-surface sm:mt-8">

            <Link
              href="/settings"
              className="flex items-center justify-between px-4 py-3.5 transition hover:bg-surface-light sm:px-5 sm:py-4"
            >
              <span className="text-sm font-medium sm:text-base">General Settings</span>
              <span className="text-text-secondary">→</span>
            </Link>

            <div className="mx-4 h-px bg-border sm:mx-5" />

            <Link
              href="/profile/body-stats"
              className="flex items-center justify-between px-4 py-3.5 transition hover:bg-surface-light sm:px-5 sm:py-4"
            >
              <span className="text-sm font-medium sm:text-base">Edit Body Stats</span>
              <span className="text-text-secondary">→</span>
            </Link>

            <div className="mx-4 h-px bg-border sm:mx-5" />

            <Link
              href="/profile/macronutrient-targets"
              className="flex items-center justify-between px-4 py-3.5 transition hover:bg-surface-light sm:px-5 sm:py-4"
            >
              <span className="text-sm font-medium sm:text-base">Macronutrient targets</span>
              <span className="text-text-secondary">→</span>
            </Link>

            <div className="mx-4 h-px bg-border sm:mx-5" />

            <Link
              href="/profile/energy-expenditure"
              className="flex items-center justify-between px-4 py-3.5 transition hover:bg-surface-light sm:px-5 sm:py-4"
            >
              <span className="text-sm font-medium sm:text-base">Energy Expenditure</span>
              <span className="text-text-secondary">→</span>
            </Link>

            <div className="mx-4 h-px bg-border sm:mx-5" />

            <Link
              href="/profile/weight-goal"
              className="flex items-center justify-between px-4 py-3.5 transition hover:bg-surface-light sm:px-5 sm:py-4"
            >
              <span className="text-sm font-medium sm:text-base">Weight Goal</span>
              <span className="text-text-secondary">→</span>
            </Link>
          </section>

          {/* Training Stats */}
          
        </main>
      </div>
    </div>
  );
}