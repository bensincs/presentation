import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import presentations from "../presentations";
import type { PresentationEntry } from "../types";
import { color } from "framer-motion";

export default function PresentationList() {
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const [tagFilters, setTagFilters] = useState<string[]>(["in-review"]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const authors = useMemo(
    () => Array.from(new Set(presentations.map((p) => p.author))).sort(),
    []
  );

  const filteredPresentations = useMemo(() => {
    return presentations.filter((p) => {
      const matchesAuthor =
        authorFilter === "all" ? true : p.author === authorFilter;
      const matchesSearch = searchQuery
        ? `${p.title} ${p.subtitle ?? ""}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;
      const inReviewFlag = p.aiOnly ?? true;
      const doNotUseFlag = p.doNotUse ?? false;

      const includeInReview = tagFilters.includes("in-review");
      const includeDoNotUse = tagFilters.includes("do-not-use");

      const matchesInReview = includeInReview ? true : !inReviewFlag;
      const matchesDoNotUse = includeDoNotUse ? true : !doNotUseFlag;

      return (
        matchesAuthor && matchesSearch && matchesInReview && matchesDoNotUse
      );
    });
  }, [authorFilter, searchQuery, tagFilters]);

  const tagOptions = [
    { value: "in-review", label: "In review", color: "emerald" },
    { value: "do-not-use", label: "Do not use", color: "rose" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Presentations
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Browse the current AI-generated decks and refine by owner, AI
            status, or do-not-use flags.
          </p>
        </div>
        <div className="surface flex flex-col gap-6 rounded-3xl bg-white/3 p-6 text-sm text-[var(--muted)] shadow-lg lg:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <label className="flex w-full max-w-xl flex-col gap-2 font-medium text-[var(--muted)]">
              <span className="text-xs uppercase tracking-wide text-white/70">
                Search title or description
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Try “voice” or “medicine”"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm text-white shadow-lg shadow-black/10 transition focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300/50"
                />
              </div>
            </label>

            <label className="flex w-full max-w-xs flex-col gap-2 font-medium text-[var(--muted)] lg:text-right">
              <span className="text-xs uppercase tracking-wide text-white/70">
                Filter by author
              </span>
              <select
                value={authorFilter}
                onChange={(event) => setAuthorFilter(event.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm text-white shadow-lg shadow-black/10 transition focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300/50"
              >
                <option value="all">All authors</option>
                {authors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <label className="flex w-full max-w-xl flex-col gap-2 font-medium text-[var(--muted)]">
              <span className="text-xs uppercase tracking-wide text-white/70">
                Tags
              </span>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map((tag) => {
                  const isSelected = tagFilters.includes(tag.value);
                  return (
                    <button
                      key={tag.value}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setTagFilters((prev) =>
                            prev.filter((t) => t !== tag.value)
                          );
                        } else {
                          setTagFilters((prev) => [...prev, tag.value]);
                        }
                      }}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                        isSelected
                          ? `border-${tag.color}-500/40 bg-${tag.color}-500/10 text-${tag.color}-100 `
                          : "border-white/10 bg-white/10 text-white/70 hover:border-white/20 hover:bg-white/20 hover:text-white opacity-70 hover:shadow-glow"
                      }`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </label>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
            <div>
              Showing {filteredPresentations.length}{" "}
              {filteredPresentations.length === 1
                ? "presentation"
                : "presentations"}
            </div>
            <button
              type="button"
              onClick={() => {
                setAuthorFilter("all");
                setTagFilters(["in-review"]);
                setSearchQuery("");
              }}
              className="text-xs font-semibold uppercase tracking-wide text-white/70 transition hover:text-sky-200"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>

      {filteredPresentations.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-sm text-[var(--muted)]">
          No presentations match the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPresentations.map((p: PresentationEntry) => {
            const isInReview = p.aiOnly ?? true;
            const showDoNotUse = p.doNotUse ?? false;

            return (
              <Link
                key={p.id}
                to={`/p/${p.id}`}
                className="surface relative flex h-full flex-col p-4 transition-shadow duration-200 hover:shadow-glow"
              >
                <div className="text-sm text-[var(--muted)]">ID: {p.id}</div>
                <div className="mt-1 font-bold text-lg text-white">
                  {p.title}
                </div>
                {p.subtitle && (
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    {p.subtitle}
                  </div>
                )}

                <div className="mt-auto pt-4">
                  <div className="text-xs text-[var(--muted)]">
                    Slides: {p.slides?.length ?? "—"}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-wide">
                    <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-sky-100">
                      {p.author}
                    </span>
                    {isInReview && (
                      <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-emerald-100">
                        In Review
                      </span>
                    )}
                    {showDoNotUse && (
                      <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 text-rose-100">
                        Do not use
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
