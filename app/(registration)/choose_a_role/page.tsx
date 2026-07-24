"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function SignupRolePage() {

    type Role = "athlete" | "coach" | "";

    const [role, setRole] = useState<Role>("");
    const router = useRouter();


    function handleSubmit(e: React.FormEvent) {

    e.preventDefault();
    
        
    if(!role) return

    router.push(`/signup?role=${role}`);
    
  }


  return (

    <main className="min-h-screen bg-background text-text flex items-center justify-center px-4">


      <section className="w-full max-w-3xl">


        {/* Logo */}

        <header className="mb-10 text-center">


          <Link
            href="/"
            className="inline-flex items-center gap-3 text-2xl font-bold"
          >

            <span className="flex h-10 w-10 items-center justify-center rounded-button bg-primary text-black">
              L
            </span>

            LiftLog

          </Link>


        </header>








        <div className="mb-10 text-center">


          <h1 className="text-4xl font-bold">
            Choose your role
          </h1>


          <p className="mt-3 text-text-secondary">
            Select how you want to use LiftLog.
          </p>


        </div>








        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2"
        >






          {/* Athlete */}

          <label
            className={`
              group cursor-pointer rounded-card border bg-surface p-card transition
              ${
                role === "athlete"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary hover:bg-surface-light"
              }
            `}
          >

            <input
              type="radio"
              name="role"
              value="athlete"
              checked={role === "athlete"}
              onChange={(e)=>setRole(e.target.value as Role)}
              className="hidden"
            />



            <div className="flex h-14 w-14 items-center justify-center rounded-button bg-primary/10 text-3xl">
              💪
            </div>



            <h2 className="mt-6 text-2xl font-bold">
              Athlete
            </h2>



            <p className="mt-3 text-text-secondary">
              Track your workouts, nutrition, progress and personal records.
            </p>





            <div className="mt-8 flex items-center text-primary">

              Select

              <span className="ml-2 transition group-hover:translate-x-1">
                →
              </span>

            </div>


          </label>









          {/* Coach */}

          <label
            className={`
              group cursor-pointer rounded-card border bg-surface p-card transition
              ${
                role === "coach"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary hover:bg-surface-light"
              }
            `}
          >

            <input
              type="radio"
              name="role"
              value="coach"
              checked={role === "coach"}
              onChange={(e)=>setRole(e.target.value as Role)}
              className="hidden"
            />



            <div className="flex h-14 w-14 items-center justify-center rounded-button bg-primary/10 text-3xl">
              🏋️
            </div>



            <h2 className="mt-6 text-2xl font-bold">
              Coach
            </h2>



            <p className="mt-3 text-text-secondary">
              Manage athletes, create programs and track client progress.
            </p>





            <div className="mt-8 flex items-center text-primary">

              Select

              <span className="ml-2 transition group-hover:translate-x-1">
                →
              </span>

            </div>


          </label>






          <button
            type="submit"
            disabled={!role}
            className="
              md:col-span-2 mt-4 rounded-button bg-primary py-4
              font-semibold text-black transition
              hover:bg-primary-hover disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            Continue

          </button>




        </form>








        <p className="mt-10 text-center text-sm text-text-secondary">


          Already have an account?


          <Link
            href="/login"
            className="ml-1 text-primary hover:text-primary-hover"
          >
            Sign in
          </Link>


        </p>




      </section>


    </main>

  );
}