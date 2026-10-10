
"use client";

import { useState } from "react";
import { useCreateUrl } from "@/hooks/urls/useCreateUrl";

export default function UrlForm() {
  const [name, setName] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");

  const createMutation = useCreateUrl();

  function handleSubmit(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    createMutation.mutate(
      {
        name: name.trim(),
        original_url: originalUrl.trim(),
      },
      {
        onSuccess: () => {
          setName("");
          setOriginalUrl("");
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-[#1e293b] dark:bg-[#0c1427]"
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:border dark:border-[#1e293b] dark:bg-[#131d33] dark:text-[#818cf8]">
          <svg
            className="h-6 w-6 -rotate-45"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Shorten Your Links
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Give a name and a website URL, and get a short link instantly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="url-name"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            <svg
              className="h-3.5 w-3.5 text-indigo-500 dark:text-[#818cf8]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 22 12 12 22 2 12" />
            </svg>
            Name of the website
          </label>

          <div className="relative flex items-center rounded-xl border border-slate-300 bg-slate-50 transition focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 dark:border-[#1e293b] dark:bg-[#080e1d]">
            <span className="pointer-events-none absolute left-3.5 flex items-center justify-center text-slate-400 dark:text-slate-500">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.579a2.426 2.426 0 0 0 0-3.42z" />
                <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
              </svg>
            </span>

            <input
              id="url-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Google, GitHub, My Blog"
              required
              maxLength={100}
              className="w-full bg-transparent py-3.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none sm:text-base dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="original-url"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            <svg
              className="h-3.5 w-3.5 text-indigo-500 dark:text-[#818cf8]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 22 12 12 22 2 12" />
            </svg>
            Original website URL
          </label>

          <div className="relative flex items-center rounded-xl border border-slate-300 bg-slate-50 transition focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 dark:border-[#1e293b] dark:bg-[#080e1d]">
            <span className="pointer-events-none absolute left-3.5 flex items-center justify-center text-slate-400 dark:text-slate-500">
              <svg
                className="h-4 w-4 -rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </span>

            <input
              id="original-url"
              type="url"
              value={originalUrl}
              onChange={(event) => setOriginalUrl(event.target.value)}
              placeholder="e.g. https://www.google.com"
              required
              className="w-full bg-transparent py-3.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none sm:text-base dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {createMutation.isError && (
        <p role="alert" className="mt-4 text-sm text-red-500">
          Failed to create the short URL. Please try again.
        </p>
      )}

      {createMutation.isSuccess && (
        <p role="status" className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
          Short URL created successfully!
        </p>
      )}

      <button
        type="submit"
        disabled={createMutation.isPending}
        className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-500 active:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg
          className="h-4 w-4 -rotate-45"
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
        {createMutation.isPending
          ? "Creating short URL..."
          : "Generate Short URL"}
      </button>
    </form>
  );
}
