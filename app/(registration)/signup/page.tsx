import Link from "next/link";
import { redirect } from "next/navigation";
import SignUpForm from "./FormClient"; // Prilagodi putanju do klijentske forme

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;

  if (!role) {
    redirect("/choose_a_role");
  }

  return (
    <main className="min-h-[100dvh] text-text flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        
        {/* Logo - centriran */}
        <header className="mb-6 text-center sm:mb-8 w-full flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl transition hover:opacity-80"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-button bg-primary text-black sm:h-10 sm:w-10 font-bold">
              L
            </span>
            LiftLog
          </Link>
        </header>

        {/* Forma komponenta koja prima role */}
        <section aria-labelledby="register-title" className="w-full">
          <SignUpForm role={role} />
        </section>

      </div>
    </main>
  );
}