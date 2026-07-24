import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-text">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-border px-6 py-5 lg:px-12">

        <Link
          href="/"
          className="flex items-center gap-3 text-2xl font-bold"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-button bg-primary text-black">
            L
          </span>

          LiftLog
        </Link>


        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="rounded-button px-5 py-2 text-text-secondary hover:text-text"
          >
            Log in
          </Link>


          <Link
            href="/choose_a_role"
            className="rounded-button bg-primary px-5 py-3 font-semibold text-black hover:bg-primary-hover"
          >
            Sign up
          </Link>

        </div>

      </nav>





      {/* Hero */}

      <section className="mx-auto max-w-6xl px-6 py-20 text-center lg:py-32">


        <div className="mx-auto max-w-3xl">

          <p className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
            Your complete fitness tracking platform
          </p>


          <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
            Track your training.
            <br />
            Build your strongest version.
          </h1>


          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
            LiftLog helps you track workouts, nutrition, progress and personal
            records in one powerful fitness dashboard.
          </p>


          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">


            <Link
              href="/choose_a_role"
              className="rounded-button bg-primary px-8 py-4 text-lg font-semibold text-black hover:bg-primary-hover"
            >
              Start for free
            </Link>


            <Link
              href="/login"
              className="rounded-button border border-border px-8 py-4 text-lg font-semibold hover:bg-surface"
            >
              Login
            </Link>


          </div>


        </div>


      </section>







      {/* Features */}

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">


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
            className="rounded-card border border-border bg-surface p-card"
          >

            <h3 className="text-xl font-bold">
              {title}
            </h3>


            <p className="mt-3 text-text-secondary">
              {description}
            </p>


          </article>

        ))}


      </section>








      {/* Dashboard preview */}

      <section className="mx-auto max-w-6xl px-6 pb-24">


        <div className="rounded-card border border-border bg-surface p-6">


          <div className="rounded-card bg-background p-6">


            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-text-secondary">
                  Today's progress
                </p>

                <p className="mt-2 text-3xl font-bold">
                  1850 / 2600 kcal
                </p>

              </div>


              <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-primary">
                71%
              </div>

            </div>



            <div className="mt-8 grid gap-4 sm:grid-cols-3">


              <div className="rounded-button bg-surface p-4">
                <p className="text-text-secondary">
                  Protein
                </p>

                <p className="mt-2 text-2xl font-bold">
                  128g
                </p>
              </div>



              <div className="rounded-button bg-surface p-4">
                <p className="text-text-secondary">
                  Workouts
                </p>

                <p className="mt-2 text-2xl font-bold">
                  126
                </p>
              </div>



              <div className="rounded-button bg-surface p-4">
                <p className="text-text-secondary">
                  Streak
                </p>

                <p className="mt-2 text-2xl font-bold text-primary">
                  24 days
                </p>
              </div>


            </div>


          </div>


        </div>


      </section>








      {/* Footer CTA */}

      <section className="border-t border-border px-6 py-20 text-center">


        <h2 className="text-4xl font-bold">
          Ready to start tracking?
        </h2>


        <p className="mt-4 text-text-secondary">
          Create your account and start building better habits today.
        </p>


        <Link
          href="/choose_a_role"
          className="mt-8 inline-block rounded-button bg-primary px-8 py-4 font-semibold text-black hover:bg-primary-hover"
        >
          Create free account
        </Link>


      </section>



    </main>
  );
}