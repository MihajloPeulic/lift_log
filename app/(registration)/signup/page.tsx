import Link from "next/link";
import { signUpAction } from "../../actions/auth";
import { SearchParams } from "next/dist/server/request/search-params";
import { redirect } from "next/navigation";

export default async function SignupPage({
  searchParams
} : {
  searchParams: Promise<{role?: string}>
} ) {


  const {role} = await searchParams;

  if(!role){
    redirect("/choose_a_role")
  }


  return (

    <main className="min-h-screen bg-background text-text flex items-center justify-center px-4 py-8">


      <section
        aria-labelledby="register-title"
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








        {/* Register Card */}

        <article className="rounded-card border border-border bg-surface p-card shadow-xl">


          <header className="mb-6">


            <h1
              id="register-title"
              className="text-3xl font-bold tracking-tight"
            >
              Create account
            </h1>


            <p className="mt-2 text-sm text-text-secondary">
              Start tracking your workouts and reach new personal records.
            </p>


          </header>








          <form className="space-y-5" action={signUpAction}>

            <input
              type="hidden"
              name="role"
              value={role ?? ""}
            />

            {/* Full Name */}
            <div>

              <label
                htmlFor="full_name"
                className="mb-2 block text-sm font-medium"
              >
                Full Name
              </label>

              <input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="john_lifts2"
                autoComplete="name"
                className="w-full rounded-button border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />


            </div>

            

            {/* Email */}

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
                autoComplete="email"
                className="w-full rounded-button border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />


            </div>

            {/* Password */}

            <div>


              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>


              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                className="w-full rounded-button border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />


            </div>

            {/* Confirm Password */}

            <div>


              <label
                htmlFor="confirm_password"
                className="mb-2 block text-sm font-medium"
              >
                Confirm password
              </label>


              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Repeat your password"
                autoComplete="new-password"
                className="w-full rounded-button border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />


            </div>

            {/* Terms */}

            <div className="flex items-start gap-3">


              <input
                id="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-border bg-surface text-primary focus:ring-primary"
                name="terms_of_service"
              />


              <label
                htmlFor="terms"
                className="text-sm text-text-secondary"
              >

                I agree to the{" "}


                <Link
                  href="/terms"
                  className="text-primary hover:text-primary-hover"
                >
                  Terms of Service
                </Link>


                {" "}and{" "}


                <Link
                  href="/privacy"
                  className="text-primary hover:text-primary-hover"
                >
                  Privacy Policy
                </Link>


              </label>


            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full rounded-button bg-primary py-3 font-semibold text-black transition hover:bg-primary-hover active:scale-[0.98]"
            >
              Create account
            </button>

            {/* Google */}

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-button border border-border py-3 font-medium transition hover:bg-surface-light"
            >
              Continue with Google
            </button>

          </form>








          <footer className="mt-6 text-center text-sm text-text-secondary">


            Already have an account?


            <Link
              href="/login"
              className="ml-1 font-medium text-primary hover:text-primary-hover"
            >
              Sign in
            </Link>


          </footer>



        </article>



      </section>



    </main>

  );
}