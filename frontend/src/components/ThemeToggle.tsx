
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-8 w-16 rounded-full border border-slate-300 bg-slate-200/80 dark:border-[#1e293b] dark:bg-[#0b1222]"
        aria-hidden="true"
      />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      aria-pressed={isDark}
      className="relative flex h-8 w-16 cursor-pointer items-center justify-between rounded-full border border-slate-300 bg-slate-200/80 p-1 transition-colors dark:border-[#1e293b] dark:bg-[#0b1222]"
    >
      {/* Sliding thumb */}
      <span
        className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-blue-600 shadow-sm transition-transform duration-200 ease-in-out ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      />

      {/* Sun icon on the left */}
      <span className="relative z-10 flex h-6 w-6 items-center justify-center">
        <svg
          className={`h-3.5 w-3.5 transition-colors ${
            !isDark ? "text-white" : "text-slate-400 dark:text-slate-500"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </span>

      {/* Moon icon on the right */}
      <span className="relative z-10 flex h-6 w-6 items-center justify-center">
        <svg
          className={`h-3.5 w-3.5 transition-colors ${
            isDark ? "text-white" : "text-slate-500"
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </span>
    </button>
  );
}
