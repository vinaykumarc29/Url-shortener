import ThemeToggle from "@/components/ThemeToggle";
import UrlForm from "@/components/UrlForm";
import UrlTable from "@/components/UrlTable";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-slate-50 px-4 py-6 text-slate-900 transition-colors sm:px-6 md:px-8 dark:bg-[#070b14] dark:text-slate-100">
      <div className="w-full space-y-6">
        <header className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center text-indigo-500 dark:text-indigo-400">
              <svg
                className="h-6 w-6 -rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              URL Shortener
            </h1>
          </div>

          <ThemeToggle />
        </header>

        <section className="w-full">
          <UrlForm />
          <UrlTable/>
        </section>
      </div>
    </main>
  );
}
