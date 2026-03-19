"use client";

/* eslint-disable @next/next/no-img-element */
import { useState, useMemo } from "react";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/section-header";
import { GenreChip } from "@/components/shared/genre-chip";
import { MediaPosterCard } from "@/components/media/media-poster-card";
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

/* ────────────────────────────────────────────────────────────────────────────
 * Helpers
 * ──────────────────────────────────────────────────────────────────────────── */

function buildMeta(item: (typeof mockMedia)[number]): string {
  const parts: string[] = [String(item.year)];

  if (item.runtime) {
    parts.push(item.runtime);
  } else if (item.seasonCount) {
    parts.push(`${item.seasonCount} ${item.seasonCount === 1 ? "Season" : "Seasons"}`);
  }

  if (item.genres.length > 0) {
    parts.push(item.genres.slice(0, 2).join(" · "));
  }

  return parts.join(" · ");
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
                    <MediaPosterCard
                      key={item.id}
                      slug={item.slug}
                      title={item.title}
                      posterUrl={item.posterUrl}
                      badge={<KindBadge kind={item.kind} />}
                      badgePosition="top-right"
                      hoverVariant="cta"
                      ctaLabel="View Details"
                      meta={buildMeta(item)}
                    />
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
                        <GenreChip
                          key={suggestion}
                          label={suggestion}
                          onClick={() => setQuery(suggestion)}
                        />
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
                <SectionHeader title="Popular Searches" />
                <div className={`${scrollRow} gap-2.5`}>
                  {popularSearches.map((term) => (
                    <GenreChip
                      key={term}
                      label={term}
                      onClick={() => setQuery(term)}
                    />
                  ))}
                </div>
              </PageContainer>
            </section>

            {/* Browse Anime */}
            {animeItems.length > 0 && (
              <section>
                <PageContainer>
                  <SectionHeader
                    title="Browse Anime"
                    count={animeItems.length}
                    actionLabel="View All"
                    actionHref="/anime"
                  />
                  <div className={`${scrollRow} lg:gap-5`}>
                    {animeItems.map((item) => (
                      <div key={item.id} className="w-[140px] flex-shrink-0 lg:w-[165px]">
                        <MediaPosterCard
                          slug={item.slug}
                          title={item.title}
                          posterUrl={item.posterUrl}
                          badge={<KindBadge kind={item.kind} />}
                          badgePosition="top-right"
                          hoverVariant="cta"
                          ctaLabel="View Details"
                          meta={buildMeta(item)}
                        />
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
                  <SectionHeader
                    title="Browse Series"
                    count={seriesItems.length}
                    actionLabel="View All"
                    actionHref="/series"
                  />
                  <div className={`${scrollRow} lg:gap-5`}>
                    {seriesItems.map((item) => (
                      <div key={item.id} className="w-[140px] flex-shrink-0 lg:w-[165px]">
                        <MediaPosterCard
                          slug={item.slug}
                          title={item.title}
                          posterUrl={item.posterUrl}
                          badge={<KindBadge kind={item.kind} />}
                          badgePosition="top-right"
                          hoverVariant="cta"
                          ctaLabel="View Details"
                          meta={buildMeta(item)}
                        />
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
                  <SectionHeader
                    title="Browse Movies"
                    count={movieItems.length}
                    actionLabel="View All"
                    actionHref="/movies"
                  />
                  <div className={`${scrollRow} lg:gap-5`}>
                    {movieItems.map((item) => (
                      <div key={item.id} className="w-[140px] flex-shrink-0 lg:w-[165px]">
                        <MediaPosterCard
                          slug={item.slug}
                          title={item.title}
                          posterUrl={item.posterUrl}
                          badge={<KindBadge kind={item.kind} />}
                          badgePosition="top-right"
                          hoverVariant="cta"
                          ctaLabel="View Details"
                          meta={buildMeta(item)}
                        />
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
