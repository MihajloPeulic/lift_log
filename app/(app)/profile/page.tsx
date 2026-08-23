import { getCurrentUserWithProfile } from "@/app/lib/data/user";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const data = await getCurrentUserWithProfile();

  if (!data) {
    redirect("/login");
  }

  const { user, profile } = data;

  return (
    <div className="layout-container">
      <main className="space-y-6">
        
        {/* ZAGLAVLJE */}
        <header className="flex flex-col gap-2 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-h1">Profile</h1>
            <p className="text-caption mt-1">
              Your fitness identity and achievements.
            </p>
          </div>
        </header>

        {/* KARTICA KORISNIKA */}
        <div className="card-main flex items-center gap-4 sm:gap-6 transition-colors hover:border-border-light">
          
          {/* Avatar */}
          <div className="flex h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 shrink-0 items-center justify-center rounded-pill bg-primary text-xl sm:text-3xl md:text-4xl font-bold text-black">
            {profile?.avatar_url ? (
              <img
                className="h-full w-full rounded-pill object-cover"
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

          {/* Korisničke informacije */}
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg sm:text-2xl md:text-3xl font-bold text-text">
              {profile?.full_name}
            </h2>
            
            <p className="mt-0.5 text-sm sm:text-base text-text-secondary">
              {profile?.role 
                ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) 
                : "User"}
            </p>
            
            <p className="mt-1 sm:mt-3 text-caption">
              Member since{" "}
              {new Date(user.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* SEKCIJA SA PODEŠAVANJIMA */}
        <section className="card-main overflow-hidden p-0">
          <div className="divide-y divide-border">

            <Link
              href="/settings"
              className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 transition hover:bg-surface-light text-sm sm:text-base font-medium text-text"
            >
              <span>General Settings</span>
              <span className="text-text-secondary">→</span>
            </Link>

            <Link
              href="/profile/body-stats"
              className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 transition hover:bg-surface-light text-sm sm:text-base font-medium text-text"
            >
              <span>Edit Body Stats</span>
              <span className="text-text-secondary">→</span>
            </Link>

            <Link
              href="/profile/macronutrient-targets"
              className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 transition hover:bg-surface-light text-sm sm:text-base font-medium text-text"
            >
              <span>Macronutrient targets</span>
              <span className="text-text-secondary">→</span>
            </Link>

            <Link
              href="/profile/energy-expenditure"
              className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 transition hover:bg-surface-light text-sm sm:text-base font-medium text-text"
            >
              <span>Energy Expenditure</span>
              <span className="text-text-secondary">→</span>
            </Link>

            <Link
              href="/profile/weight-goal"
              className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 transition hover:bg-surface-light text-sm sm:text-base font-medium text-text"
            >
              <span>Weight Goal</span>
              <span className="text-text-secondary">→</span>
            </Link>

          </div>
        </section>

      </main>
    </div>
  );
}