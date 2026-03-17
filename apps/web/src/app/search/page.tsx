"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from "react";
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { PageContainer } from "@/components/shared/PageContainer";
import { mockMedia } from "@/lib/data/mock-media";

/* ────────────────────────────────────────────────────────────────────────────
 * Search logic
 * ──────────────────────────────────────────────────────────────────────────── */

function searchMedia(query: string) {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  return mockMedia.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
    const genreMatch = item.genres.some((g) =>
      g.toLowerCase().includes(normalizedQuery)
    );
    const kindMatch = item.kind.toLowerCase().includes(normalizedQuery);
    const studioMatch = item.studio?.toLowerCase().includes(normalizedQuery);
    const yearMatch = String(item.year).includes(normalizedQuery);

    return titleMatch || genreMatch || kindMatch || studioMatch || yearMatch;
  });
}

/* ────────────────────────────────────────────────────────────────────────────
 * Popular searches fixture
 * ──────────────────────────────────────────────────────────────────────────── */

const popularSearches = [
  "Solo Leveling",
  "Dune",
  "Severance",
  "Action",
  "Sci-Fi",
  "Drama",
  "2024",
  "MAPPA",
];

/* ────────────────────────────────────────────────────────────────────────────
 * Inline SVG icons
 * ──────────────────────────────────────────────────────────────────────────── */

function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function StarIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function FilmIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Local presentational components
 * ──────────────────────────────────────────────────────────────────────────── */

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 text-lg font-semibold tracking-tight text-white sm:text-xl">
      {children}
    </h2>
  );
}

function KindBadge({ kind }: { kind: string }) {
  const colors: Record<string, string> = {
    anime: "bg-violet-500/20 text-violet-400",
    series: "bg-fuchsia-500/20 text-fuchsia-400",
    movie: "bg-amber-500/20 text-amber-400",
  };
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${colors[kind] ?? "bg-white/10 text-white/60"}`}
    >
      {kind}
    </span>
  );
}

function ResultCard({
  item,
}: {
  item: (typeof mockMedia)[number];
}) {
  return (
    <Link href={`/title/${item.slug}`} className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d121f] transition-all duration-300 group-hover:border-white/[0.15] group-hover:shadow-[0_0_24px_rgba(139,92,246,0.15)]">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute right-2 top-2">
          <KindBadge kind={item.kind} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-lg bg-white py-1.5 text-center text-xs font-bold text-black">
            View Details
          </span>
        </div>
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-violet-400">
          {item.title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-white/50">
          <span>{item.year}</span>
          {item.runtime && (
            <>
              <span className="text-white/20">·</span>
              <span>{item.runtime}</span>
            </>
          )}
          {item.seasonCount && (
            <>
              <span className="text-white/20">·</span>
              <span>
                {item.seasonCount} {item.seasonCount === 1 ? "Season" : "Seasons"}
              </span>
            </>
          )}
        </div>
        <p className="mt-0.5 truncate text-[10px] text-white/30">
          {item.genres.slice(0, 2).join(" · ")}
        </p>
      </div>
    </Link>
  );
}

function TypeChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
        active
          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/20"
          : "border border-white/[0.08] bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.15]"
      }`}
    >
      {children}
    </button>
  );
}

function SearchChip({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/60 transition-all hover:bg-violet-500/10 hover:text-violet-400 hover:border-violet-500/30"
    >
      {children}
    </button>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Scroll row utility
 * ──────────────────────────────────────────────────────────────────────────── */

const scrollRow =
  "flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/* ────────────────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────────────────── */

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchMedia(query), [query]);
  const hasQuery = query.trim().length > 0;

  // Group mockMedia by kind for default browse state
  const animeItems = mockMedia.filter((m) => m.kind === "anime");
  const seriesItems = mockMedia.filter((m) => m.kind === "series");
  const movieItems = mockMedia.filter((m) => m.kind === "movie");

  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ─── Search Hero ──────────────────────────────────────────── */}
      <section className="relative pt-24 pb-8 sm:pt-28 sm:pb-12">
        <PageContainer>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Search{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Astra
              </span>
            </h1>
            <p className="mb-8 text-sm text-white/50 sm:text-base">
              Find your next favorite anime, series, or movie
            </p>

            {/* Search Input */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <SearchIcon className="h-5 w-5 text-white/40" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, genre, year, or studio..."
                className="w-full rounded-2xl border border-white/[0.1] bg-white/[0.05] py-4 pl-12 pr-12 text-base text-white placeholder-white/40 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.08] focus:ring-2 focus:ring-violet-500/20"
                autoFocus
              />
              {hasQuery && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40 transition-colors hover:text-white"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Content ──────────────────────────────────────────────── */}
      <div className="pb-16">
        {hasQuery ? (
          /* ── Search Results ─────────────────────────────────────── */
          <PageContainer>
            {results.length > 0 ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-white/50">
                    <span className="font-medium text-white">{results.length}</span>{" "}
                    {results.length === 1 ? "result" : "results"} for{" "}
                    <span className="font-medium text-violet-400">"{query}"</span>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                  {results.map((item) => (
                    <ResultCard key={item.id} item={item} />
                  ))}
                </div>
              </>
            ) : (
              /* ── No Results ─────────────────────────────────────── */
              <div className="mx-auto max-w-md py-16 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/[0.05]">
                  <FilmIcon className="h-10 w-10 text-white/30" />
                </div>
                <h2 className="mb-2 text-xl font-semibold">No results found</h2>
                <p className="mb-6 text-sm text-white/50">
                  We couldn't find anything matching{" "}
                  <span className="font-medium text-white">"{query}"</span>
                </p>
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-white/30">
                    Try searching for
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["Solo Leveling", "Dune", "Severance", "Action"].map(
                      (suggestion) => (
                        <SearchChip
                          key={suggestion}
                          onClick={() => setQuery(suggestion)}
                        >
                          {suggestion}
                        </SearchChip>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </PageContainer>
        ) : (
          /* ── Default Discovery State ────────────────────────────── */
          <div className="space-y-12">
            {/* Popular Searches */}
            <section>
              <PageContainer>
                <SectionHeader>Popular Searches</SectionHeader>
                <div className={`${scrollRow} gap-2.5`}>
                  {popularSearches.map((term) => (
                    <SearchChip key={term} onClick={() => setQuery(term)}>
                      {term}
                    </SearchChip>
                  ))}
                </div>
              </PageContainer>
            </section>

            {/* Browse Anime */}
            {animeItems.length > 0 && (
              <section>
                <PageContainer>
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white sm:text-xl">
                      Browse Anime
                      <span className="rounded bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-400">
                        {animeItems.length} titles
                      </span>
                    </h2>
                    <Link
                      href="/anime"
                      className="text-xs font-medium text-white/50 transition-colors hover:text-violet-400"
                    >
                      View All
                    </Link>
                  </div>
                  <div className={`${scrollRow} lg:gap-5`}>
                    {animeItems.map((item) => (
                      <div key={item.id} className="w-[140px] flex-shrink-0 lg:w-[165px]">
                        <ResultCard item={item} />
                      </div>
                    ))}
                  </div>
                </PageContainer>
              </section>
            )}

            {/* Browse Series */}
            {seriesItems.length > 0 && (
              <section>
                <PageContainer>
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white sm:text-xl">
                      Browse Series
                      <span className="rounded bg-fuchsia-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">
                        {seriesItems.length} titles
                      </span>
                    </h2>
                    <Link
                      href="/series"
                      className="text-xs font-medium text-white/50 transition-colors hover:text-violet-400"
                    >
                      View All
                    </Link>
                  </div>
                  <div className={`${scrollRow} lg:gap-5`}>
                    {seriesItems.map((item) => (
                      <div key={item.id} className="w-[140px] flex-shrink-0 lg:w-[165px]">
                        <ResultCard item={item} />
                      </div>
                    ))}
                  </div>
                </PageContainer>
              </section>
            )}

            {/* Browse Movies */}
            {movieItems.length > 0 && (
              <section>
                <PageContainer>
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white sm:text-xl">
                      Browse Movies
                      <span className="rounded bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        {movieItems.length} titles
                      </span>
                    </h2>
                    <Link
                      href="/movies"
                      className="text-xs font-medium text-white/50 transition-colors hover:text-violet-400"
                    >
                      View All
                    </Link>
                  </div>
                  <div className={`${scrollRow} lg:gap-5`}>
                    {movieItems.map((item) => (
                      <div key={item.id} className="w-[140px] flex-shrink-0 lg:w-[165px]">
                        <ResultCard item={item} />
                      </div>
                    ))}
                  </div>
                </PageContainer>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
