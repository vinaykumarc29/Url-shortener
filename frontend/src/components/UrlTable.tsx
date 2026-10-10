"use client";

import { useState, useEffect } from "react";
import { useUrls } from "@/hooks/urls/useUrls";
import { useDeleteUrl } from "@/hooks/urls/useDeleteUrl";
import { useDebounce } from "@/hooks/useDebounce";

export default function UrlTable() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const {
    data: urls,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useUrls(debouncedSearch);
  const deleteMutation = useDeleteUrl();

  function handleDelete(urlId: number, name: string) {
    const confirm = window.confirm(
      `Are you sure to delete ${name} short link ?`,
    );

    if (confirm) {
      deleteMutation.mutate(urlId);
    }
  }

  const apiBaseUrl = (
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"
  ).replace(/\/$/, "");

  async function handleCopy(urlId: number, shortUrl: string) {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(urlId);

      window.setTimeout(() => {
        setCopiedId((current) => (current === urlId ? null : current));
      }, 2000);
    } catch {
      window.alert("Unable to copy the URL. Please copy it manually.");
    }
  }

  return (
    <section className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700/70 dark:bg-slate-900/80">
      {/* Section heading and search */}
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-2xl text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
            ☷
          </div>

          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              All Shortened URLs
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage, copy, open or delete your shortened links.
            </p>
          </div>
        </div>

        <div className="flex w-full items-center gap-3 rounded-xl border border-slate-300 bg-slate-50 px-4 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 lg:max-w-md dark:border-slate-700 dark:bg-slate-950/50">
          <span className="text-xl text-slate-500">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or URL..."
            aria-label="Search shortened URLs"
            className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {deleteMutation.isError && (
        <p role="alert" className="mb-4 text-sm text-red-500">
          Failed to delete the URL. Please try again.
        </p>
      )}

      {/* Full-width table */}
      <div className="w-full overflow-x-auto rounded-xl">
        <table className="w-full min-w-262.5 table-auto text-left text-sm">
          <thead className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              <th className="px-4 py-4 font-semibold">#</th>
              <th className="px-4 py-4 font-semibold">Name</th>
              <th className="px-4 py-4 font-semibold">Original URL</th>
              <th className="px-4 py-4 font-semibold">Shortened URL</th>
              <th className="px-4 py-4 font-semibold">Clicks</th>
              <th className="px-4 py-4 font-semibold">Created At</th>
              <th className="px-4 py-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {isLoading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  Loading your shortened URLs...
                </td>
              </tr>
            )}

            {isError && !isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <p className="mb-3 text-red-500">
                    Unable to load URLs. Check your backend connection.
                  </p>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    className="font-medium text-indigo-500 hover:underline"
                  >
                    Try again
                  </button>
                </td>
              </tr>
            )}

            {!isLoading && !isError && (urls?.length ?? 0) === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-slate-500"
                >
                  {search.trim()
                    ? "No URLs match your search."
                    : "No shortened URLs yet. Create your first one above."}
                </td>
              </tr>
            )}

            {!isLoading &&
              !isError &&
              urls?.map((url, index) => {
                const shortUrl = `${apiBaseUrl}/${url.short_code}`;

                return (
                  <tr
                    key={url.id}
                    className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="whitespace-nowrap px-4 py-4">{index + 1}</td>

                    <td className="max-w-48 px-4 py-4 font-medium">
                      <span className="block truncate" title={url.name}>
                        {url.name}
                      </span>
                    </td>

                    <td className="max-w-64 px-4 py-4">
                      <a
                        href={url.original_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={url.original_url}
                        className="block max-w-64 truncate hover:text-indigo-500 hover:underline"
                      >
                        {url.original_url}
                      </a>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex min-w-56 max-w-72 items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 dark:bg-slate-800">
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={shortUrl}
                          className="min-w-0 flex-1 truncate font-medium text-indigo-600 dark:text-indigo-400"
                        >
                          {shortUrl}
                        </a>

                        {/* <button
                          type="button"
                          onClick={() => handleCopy(url.id, shortUrl)}
                          aria-label={`Copy short URL for ${url.name}`}
                          title="Copy short URL"
                          className="shrink-0 rounded-md px-1 text-lg hover:bg-indigo-100 dark:hover:bg-slate-700"
                        >
                          {copiedId === url.id ? "✓" : "▢"}
                        </button> */}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 tabular-nums">
                      {url.click_count}
                    </td>

                    <td className="min-w-36 whitespace-nowrap px-4 py-4 text-slate-600 dark:text-slate-400">
                      {url.created_at
                        ? new Date(url.created_at).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "—"}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleCopy(url.id, shortUrl)}
                          disabled={deleteMutation.isPending}
                          className="rounded-lg border border-slate-300 px-3 py-2 font-medium transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-700"
                        >
                          {copiedId === url.id ? "✓ Copied" : "Copy"}
                        </button>

                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-blue-600 px-3 py-2 font-medium text-white transition hover:bg-blue-700"
                        >
                          ↗ Open
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDelete(url.id, url.name)}
                          disabled={deleteMutation.isPending}
                          className="rounded-lg bg-red-600 px-3 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {!isLoading && !isError && (urls?.length ?? 0) > 0 && (
        <p className="mt-4 text-sm text-slate-500">
          Showing {urls?.length} URL{urls?.length === 1 ? "" : "s"}
        </p>
      )}
    </section>
  );
}
