import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen text-text overflow-x-hidden">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8 sm:py-5 lg:px-12 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold sm:gap-3 sm:text-2xl text-text whitespace-nowrap"
        >
          <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-button bg-primary text-sm sm:text-base text-black font-bold">
            L
          </span>
          LiftLog
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/login"
            className="cursor-pointer rounded-button border border-border bg-surface px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold text-text transition hover:bg-surface-light whitespace-nowrap"
          >
            Log in
          </Link>
          <Link
            href="/choose_a_role"
            className="btn-primary cursor-pointer px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-bold text-black whitespace-nowrap"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 sm:mb-5 inline-block rounded-full bg-primary/10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-primary">
            Your complete fitness tracking platform
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-text">
            Track your training.
            <br />
            Build your strongest version.
          </h1>

          <p className="text-caption mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg">
            LiftLog helps you track workouts, nutrition, progress and personal
            records in one powerful fitness dashboard.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-3.5 sm:gap-4">
            <Link
              href="/choose_a_role"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-black text-center whitespace-nowrap"
            >
              Start for free
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto rounded-button border border-border bg-surface px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-text transition hover:bg-surface-light text-center whitespace-nowrap"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-4 sm:gap-6 px-5 pb-16 sm:px-8 sm:pb-20 md:grid-cols-3">
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
            className="card-main p-5 sm:p-6"
          >
            <h3 className="text-lg sm:text-xl font-bold text-text">
              {title}
            </h3>
            <p className="text-caption mt-2 sm:mt-3">
              {description}
            </p>
          </article>
        ))}
      </section>

      {/* Dashboard preview */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="card-main p-5 sm:p-6">
          <div className="rounded-card bg-background p-5 border border-border">
            
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-caption">
                  Today's progress
                </p>
                <p className="mt-1 sm:mt-2 truncate text-xl sm:text-3xl font-bold text-text">
                  1850 / 2600 kcal
                </p>
              </div>

              <div className="flex h-14 w-14 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full border-[6px] sm:border-8 border-primary text-sm sm:text-base font-bold text-text">
                71%
              </div>
            </div>

            <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-3">
              <div className="rounded-button bg-surface p-4 border border-border">
                <p className="text-caption">
                  Protein
                </p>
                <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold text-text">
                  128g
                </p>
              </div>

              <div className="rounded-button bg-surface p-4 border border-border">
                <p className="text-caption">
                  Workouts
                </p>
                <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold text-text">
                  126
                </p>
              </div>

              <div className="rounded-button bg-surface p-4 border border-border">
                <p className="text-caption">
                  Streak
                </p>
                <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold text-primary">
                  24 days
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border px-5 py-16 sm:px-8 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-text">
          Ready to start tracking?
        </h2>
        
        <p className="text-caption mx-auto mt-3 sm:mt-4 max-w-md">
          Create your account and start building better habits today.
        </p>
        
        <Link
          href="/choose_a_role"
          className="btn-primary mt-6 sm:mt-8 inline-block w-full sm:w-auto px-8 py-3.5 sm:py-4 text-base sm:text-lg font-bold text-black whitespace-nowrap"
        >
          Create free account
        </Link>
      </section>

    </main>
  );
}