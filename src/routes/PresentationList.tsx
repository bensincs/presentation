import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import presentations from "../presentations";
import type { PresentationEntry, PresentationState } from "../types";

const stateStyles: Record<PresentationState, string> = {
  WIP: "border-amber-400/40 bg-amber-500/10 text-amber-100",
  "In Review": "border-sky-400/40 bg-sky-500/10 text-sky-100",
  Ready: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  Archived: "border-slate-400/40 bg-slate-500/10 text-slate-100",
};

const stateLabels: Record<PresentationState, string> = {
  WIP: "WIP",
  "In Review": "In Review",
  Ready: "Ready",
  Archived: "Archived",
};

const subjectPalette = [
  "border-violet-400/40 bg-violet-500/10 text-violet-100",
  "border-indigo-400/40 bg-indigo-500/10 text-indigo-100",
  "border-cyan-400/40 bg-cyan-500/10 text-cyan-100",
  "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
  "border-orange-400/40 bg-orange-500/10 text-orange-100",
  "border-rose-400/40 bg-rose-500/10 text-rose-100",
  "border-amber-400/40 bg-amber-500/10 text-amber-100",
];

const getSubjectClass = (subject: string): string => {
  if (subjectPalette.length === 0) {
    return "border-white/20 bg-white/10 text-white/80";
  }

  let hash = 0;
  for (let i = 0; i < subject.length; i += 1) {
    hash = (hash << 5) - hash + subject.charCodeAt(i);
    hash |= 0; // Convert to 32bit int
  }
  const index = Math.abs(hash) % subjectPalette.length;
  return subjectPalette[index];
};

export default function PresentationList() {
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const [stateFilter, setStateFilter] = useState<PresentationState | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const authors = useMemo(
    () => Array.from(new Set(presentations.map((p) => p.author))).sort(),
    []
  );

  const states = useMemo<PresentationState[]>(
    () =>
      Array.from(
        new Set(presentations.map((p) => p.state))
      ).sort() as PresentationState[],
    []
  );

  const subjects = useMemo<string[]>(
    () =>
      Array.from(
        new Set(presentations.flatMap((presentation) => presentation.subjects))
      ).sort((a, b) => a.localeCompare(b)),
    []
  );

  const [subjectFilter, setSubjectFilter] = useState<string[]>(() => subjects);

  useEffect(() => {
    setSubjectFilter((prev) => {
      if (subjects.length === 0) {
        return [];
      }
      if (prev.length === 0) {
        return subjects;
      }
      const filtered = prev.filter((subject) => subjects.includes(subject));
      if (filtered.length === 0) {
        return subjects;
      }
      if (filtered.length !== prev.length) {
        return filtered;
      }
      return prev;
    });
  }, [subjects]);

  const filteredPresentations = useMemo(() => {
    return presentations.filter((p) => {
      const matchesAuthor =
        authorFilter === "all" ? true : p.author === authorFilter;
      const matchesState =
        stateFilter === "all" ? true : p.state === stateFilter;
      const matchesSubject =
        subjectFilter.length === subjects.length ||
        subjectFilter.some((subject) => p.subjects.includes(subject));
      const matchesSearch = searchQuery
        ? `${p.title} ${p.subtitle ?? ""} ${p.subjects.join(" ")}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;
      return matchesAuthor && matchesState && matchesSubject && matchesSearch;
    });
  }, [authorFilter, stateFilter, subjectFilter, subjects, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Presentations
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Browse the current AI-generated decks, refine by owner, state, or
            subject, and scan each card for its subject tags.
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
            <label className="flex w-full max-w-xs flex-col gap-2 font-medium text-[var(--muted)] lg:text-right">
              <span className="text-xs uppercase tracking-wide text-white/70">
                Filter by state
              </span>
              <select
                value={stateFilter}
                onChange={(event) =>
                  setStateFilter(
                    event.target.value as PresentationState | "all"
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2.5 text-sm text-white shadow-lg shadow-black/10 transition focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300/50"
              >
                <option value="all">All states</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {stateLabels[state]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {subjects.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-wide text-white/70">
                  Filter by subject
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => {
                  const isActive = subjectFilter.includes(subject);
                  const badgeClass =
                    "rounded-full border px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wide transition";
                  const colorClass = getSubjectClass(subject);
                  const activeClass = "opacity-100";
                  const inactiveClass = "opacity-30 hover:opacity-95";
                  return (
                    <button
                      key={subject}
                      type="button"
                      onClick={() =>
                        setSubjectFilter((current) =>
                          current.includes(subject)
                            ? current.filter((value) => value !== subject)
                            : [...current, subject]
                        )
                      }
                      className={`${badgeClass} ${colorClass} ${
                        isActive ? activeClass : inactiveClass
                      }`}
                    >
                      {subject}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
                setStateFilter("all");
                setSubjectFilter(subjects);
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
            const stateClass = stateStyles[p.state];
            const badgeClass = "rounded-full border px-3 py-1";

            return (
              <Link
                key={p.id}
                to={`/p/${p.id}`}
                className="surface relative flex h-full flex-col p-4 transition-shadow duration-200 hover:shadow-glow"
              >
                <div className="absolute right-4 top-4 text-[0.68rem] font-semibold uppercase tracking-wide">
                  <span className={`${badgeClass} ${stateClass}`}>
                    {stateLabels[p.state]}
                  </span>
                </div>
                <div className="text-sm text-[var(--muted)]">ID: {p.id}</div>
                <div className="mt-1 font-bold text-lg text-white">
                  {p.title}
                </div>
                {p.subtitle && (
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    {p.subtitle}
                  </div>
                )}
                <div className="mt-2 text-xs text-[var(--muted)]">
                  Author: {p.author}
                </div>

                <div className="mt-auto pt-4">
                  <div className="text-xs text-[var(--muted)]">
                    Slides: {p.slides?.length ?? "—"}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-[0.68rem] font-semibold uppercase tracking-wide">
                    {p.subjects.map((subject) => (
                      <span
                        key={subject}
                        className={`${badgeClass} ${getSubjectClass(subject)}`}
                      >
                        {subject}
                      </span>
                    ))}
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
