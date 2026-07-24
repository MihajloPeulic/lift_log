import { logInAction } from "@/app/actions/auth";
import Link from "next/link";


export default function LoginPage() {

  return (

    <main className="min-h-screen bg-background text-text flex items-center justify-center px-4">


      <section
        aria-labelledby="login-title"
        className="w-full max-w-md"
      >


        {/* Logo */}

        <header className="mb-8 text-center">


          <Link
            href="/"
            className="inline-flex items-center gap-2 text-2xl font-bold tracking-tight"
          >

            <span className="flex h-10 w-10 items-center justify-center rounded-button bg-primary text-black">
              L
            </span>


            LiftLog


          </Link>


        </header>





        {/* Card */}

        <article className="rounded-card border border-border bg-surface p-card shadow-xl">


          <header className="mb-6">


            <h1
              id="login-title"
              className="text-3xl font-bold tracking-tight"
            >
              Welcome back
            </h1>


            <p className="mt-2 text-sm text-text-secondary">
              Sign in to continue tracking your progress.
            </p>


          </header>






          <form action={logInAction} className="space-y-5">


            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>


              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-button border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />


            </div>







            <div>


              <div className="mb-2 flex items-center justify-between">


                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                >
                  Password
                </label>



                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary-hover"
                >
                  Forgot password?
                </Link>


              </div>





              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-button border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />


            </div>

            <button
              type="submit"
              className="w-full rounded-button bg-primary py-3 font-semibold text-black transition hover:bg-primary-hover active:scale-[0.98]"
            >
              Sign in
            </button>






            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-button border border-border py-3 font-medium transition hover:bg-surface-light"
            >
              Continue with Google
            </button>




          </form>








          <footer className="mt-6 text-center text-sm text-text-secondary">


            Don't have an account?


            <Link
              href="/signup"
              className="ml-1 font-medium text-primary hover:text-primary-hover"
            >
              Sign up
            </Link>


          </footer>




        </article>



      </section>



    </main>

  );
}