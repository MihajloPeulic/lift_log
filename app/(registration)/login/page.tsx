import LogInForm from "./FormClient";

export default function LoginPage() {
  return (
    <main className="min-h-[100dvh] text-text flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        
        {/* Logo */}
        <header className="mb-6 text-center sm:mb-8 w-full flex justify-center">
          <div className="cursor-default inline-flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl transition hover:opacity-80">
            <span className="flex h-9 w-9 items-center justify-center rounded-button bg-primary text-black sm:h-10 sm:w-10 font-bold">
              L
            </span>
            LiftLog
          </div>
        </header>

        {/* Forma komponenta */}
        <section aria-labelledby="login-title" className="w-full">
          <LogInForm />
        </section>

      </div>
    </main>
  );
}