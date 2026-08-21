import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen text-text">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8 sm:py-5 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold sm:gap-3 sm:text-2xl"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-button bg-primary text-sm text-black sm:h-10 sm:w-10 sm:text-base">
            L
          </span>
          LiftLog
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/login"
            className="rounded-button px-3 py-2 text-sm text-text-secondary transition hover:text-text sm:px-5 sm:text-base"
          >
            Log in
          </Link>
          <Link
            href="/choose_a_role"
            className="rounded-button bg-primary px-4 py-2 text-sm font-semibold text-black transition hover:bg-primary-hover sm:px-5 sm:py-2.5 sm:text-base"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1.5 text-xs text-primary sm:mb-5 sm:px-4 sm:py-2 sm:text-sm">
            Your complete fitness tracking platform
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
            Track your training.
            <br />
            Build your strongest version.
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:mt-6 sm:text-lg">
            LiftLog helps you track workouts, nutrition, progress and personal
            records in one powerful fitness dashboard.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:mt-10 sm:flex-row">
            <Link
              href="/choose_a_role"
              className="w-full rounded-button bg-primary px-8 py-3.5 text-base font-semibold text-black transition hover:bg-primary-hover sm:w-auto sm:py-4 sm:text-lg"
            >
              Start for free
            </Link>
            <Link
              href="/login"
              className="w-full rounded-button border border-border px-8 py-3.5 text-base font-semibold transition hover:bg-surface sm:w-auto sm:py-4 sm:text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-6 px-5 pb-16 sm:px-8 sm:pb-20 md:grid-cols-3">
        {[
          [
            "💪 Workout Tracking",
            "Log every set, rep and personal record. See your strength progress over time."
          ],
          [
            "🥗 Nutrition",
            "Track calories, macros and meals with a simple Chronometer-style interface."
          ],
          [
            "📈 Progress",
            "Analyze your body stats, volume, consistency and achievements."
          ]
        ].map(([title, description]) => (
          <article
            key={title}
            className="rounded-card border border-border bg-surface p-5"
          >
            <h3 className="text-lg font-bold sm:text-xl">
              {title}
            </h3>
            <p className="mt-2 text-sm text-text-secondary sm:mt-3 sm:text-base">
              {description}
            </p>
          </article>
        ))}
      </section>

      {/* Dashboard preview */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="rounded-card border border-border bg-surface p-5">
          <div className="rounded-card bg-background p-5">
            
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-xs text-text-secondary sm:text-sm">
                  Today's progress
                </p>
                <p className="mt-1 truncate text-xl font-bold sm:mt-2 sm:text-3xl">
                  1850 / 2600 kcal
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[6px] border-primary text-sm font-bold sm:h-20 sm:w-20 sm:border-8 sm:text-base">
                71%
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
              <div className="rounded-button bg-surface p-4">
                <p className="text-xs text-text-secondary sm:text-sm">
                  Protein
                </p>
                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  128g
                </p>
              </div>

              <div className="rounded-button bg-surface p-4">
                <p className="text-xs text-text-secondary sm:text-sm">
                  Workouts
                </p>
                <p className="mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">
                  126
                </p>
              </div>

              <div className="rounded-button bg-surface p-4">
                <p className="text-xs text-text-secondary sm:text-sm">
                  Streak
                </p>
                <p className="mt-1 text-xl font-bold text-primary sm:mt-2 sm:text-2xl">
                  24 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border px-5 py-16 text-center sm:px-8 sm:py-20">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to start tracking?
        </h2>
        
        <p className="mx-auto mt-3 max-w-md text-sm text-text-secondary sm:mt-4 sm:text-base">
          Create your account and start building better habits today.
        </p>
        
        <Link
          href="/choose_a_role"
          className="mt-6 inline-block w-full rounded-button bg-primary px-8 py-3.5 text-base font-semibold text-black transition hover:bg-primary-hover sm:mt-8 sm:w-auto sm:py-4 sm:text-lg"
        >
          Create free account
        </Link>
      </section>

    </main>
  );
}