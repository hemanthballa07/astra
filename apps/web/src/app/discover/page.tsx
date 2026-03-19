"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { Footer } from "@/components/navigation/Footer";
import { PageContainer } from "@/components/shared/PageContainer";
import { MediaPosterCard } from "@/components/media/media-poster-card";
import { mockMedia } from "@/lib/data/mock-media";
import type { MediaTitle, ContentKind } from "@/lib/types/media";

/* ────────────────────────────────────────────────────────────────────────
 * Types & Constants
 * ──────────────────────────────────────────────────────────────────────── */

type MoodFilter =
  | "all"
  | "mind-bending"
  | "feel-good"
  | "dark"
  | "action"
  | "short-watch"
  | "bingeable";

type ContentFilter = "all" | "anime" | "series" | "movie";

const moodConfig: Record<
  MoodFilter,
  { label: string; matchGenres?: string[]; matchShortRuntime?: boolean; matchLongEpisodes?: boolean }
> = {
  all: { label: "All Moods" },
  "mind-bending": {
    label: "Mind-Bending",
    matchGenres: ["Sci-Fi", "Thriller", "Fantasy", "Biography"],
  },
  "feel-good": {
    label: "Feel-Good",
    matchGenres: ["Comedy", "Adventure", "Animation"],
  },
  dark: {
    label: "Dark",
    matchGenres: ["Crime", "Drama", "Thriller", "Action"],
  },
  action: {
    label: "Action",
    matchGenres: ["Action"],
  },
  "short-watch": {
    label: "Short Watch",
    matchShortRuntime: true,
  },
  "bingeable": {
    label: "Bingeable",
    matchLongEpisodes: true,
  },
};

const contentTypeConfig: Record<ContentFilter, { label: string }> = {
  all: { label: "All" },
  anime: { label: "Anime" },
  series: { label: "Series" },
  movie: { label: "Movies" },
};

/* ────────────────────────────────────────────────────────────────────────
 * Helper Functions
 * ──────────────────────────────────────────────────────────────────────── */

/**
 * Filter media by content type
 */
function filterByContentType(
  media: MediaTitle[],
  contentFilter: ContentFilter
): MediaTitle[] {
  if (contentFilter === "all") return media;
  return media.filter((item) => item.kind === contentFilter);
}

/**
 * Filter media by mood (genre, runtime, episode count)
 */
function filterByMood(media: MediaTitle[], mood: MoodFilter): MediaTitle[] {
  if (mood === "all") return media;

  const config = moodConfig[mood];

  return media.filter((item) => {
    // Genre-based mood matching
    if (config.matchGenres) {
      const hasMatchingGenre = item.genres.some((g) =>
        config.matchGenres!.includes(g)
      );
      if (hasMatchingGenre) return true;
    }

    // Short watch: movies under 2.5 hours or series with < 15 episodes
    if (config.matchShortRuntime) {
      if (item.kind === "movie") {
        const match = item.runtime?.match(/(\d+)h?\s*(\d+)?m?/);
        if (match) {
          const hours = parseInt(match[1] || "0");
          const mins = parseInt(match[2] || "0");
          const totalMinutes = hours * 60 + mins;
          if (totalMinutes <= 150) return true;
        }
      }
      if (item.kind === "series" || item.kind === "anime") {
        if ((item.episodeCount ?? 0) < 15) return true;
      }
    }

    // Bingeable: series/anime with 20+ episodes
    if (config.matchLongEpisodes) {
      if (item.kind === "series" || item.kind === "anime") {
        if ((item.episodeCount ?? 0) >= 20) return true;
      }
    }

    return false;
  });
}

/**
 * Get a random title from filtered results
 */
function getRandomTitle(titles: MediaTitle[]): MediaTitle | null {
  if (titles.length === 0) return null;
  return titles[Math.floor(Math.random() * titles.length)];
}

/**
 * Get titles with similar genres (excluding the current title)
 */
function getSimilarTitles(
  current: MediaTitle,
  allTitles: MediaTitle[],
  limit = 6
): MediaTitle[] {
  return allTitles
    .filter((item) => {
      if (item.id === current.id) return false;
      return item.genres.some((g) => current.genres.includes(g));
    })
    .slice(0, limit);
}

/**
 * Get titles with contrasting genres (different mood)
 */
function getContrastingTitles(
  current: MediaTitle,
  allTitles: MediaTitle[],
  limit = 6
): MediaTitle[] {
  return allTitles
    .filter((item) => {
      if (item.id === current.id) return false;
      return !item.genres.some((g) => current.genres.includes(g));
    })
    .slice(0, limit);
}

/* ────────────────────────────────────────────────────────────────────────
 * Inline Icons
 * ──────────────────────────────────────────────────────────────────────── */

function PlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14.12a1 1 0 001.5.86l11-7.06a1 1 0 000-1.72l-11-7.06A1 1 0 008 5.14z" />
    </svg>
  );
}

function InfoIcon({ className = "w-5 h-5" }: { className?: string }) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function ShuffleIcon({ className = "w-5 h-5" }: { className?: string }) {
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
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Page Component
 * ──────────────────────────────────────────────────────────────────────── */

export default function DiscoverPage() {
  const [contentFilter, setContentFilter] = useState<ContentFilter>("all");
  const [moodFilter, setMoodFilter] = useState<MoodFilter>("all");
  const [selectedTitle, setSelectedTitle] = useState<MediaTitle | null>(null);

  // Filter and get random title
  const filteredTitles = useMemo(() => {
    let titles = filterByContentType(mockMedia, contentFilter);
    titles = filterByMood(titles, moodFilter);
    return titles;
  }, [contentFilter, moodFilter]);

  // Supporting rails
  const similarTitles = useMemo(() => {
    if (!selectedTitle) return [];
    return getSimilarTitles(selectedTitle, mockMedia);
  }, [selectedTitle]);

  const contrastingTitles = useMemo(() => {
    if (!selectedTitle) return [];
    return getContrastingTitles(selectedTitle, mockMedia);
  }, [selectedTitle]);

  // Handle "Surprise Me" action
  const handleSurpriseMe = () => {
    const randomTitle = getRandomTitle(filteredTitles);
    setSelectedTitle(randomTitle);
  };

  // Initial random selection on mount (only once)
  useState(() => {
    if (!selectedTitle && filteredTitles.length > 0) {
      setSelectedTitle(getRandomTitle(filteredTitles));
    }
  });

  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <PageContainer>
          <div className="text-center max-w-3xl mx-auto">
            {/* Heading */}
            <h1 className="font-display text-5xl font-bold tracking-tight mb-4 lg:text-6xl">
              Need Something{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                New?
              </span>
            </h1>

            <p className="text-lg text-white/60 mb-8 lg:text-xl">
              Let Astra pick tonight's watch. Filter by mood and content type,
              then let us surprise you.
            </p>

            {/* Surprise Me CTA */}
            <button
              onClick={handleSurpriseMe}
              className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-violet-600/30 transition-all hover:brightness-110 hover:scale-105 active:scale-95"
            >
              <ShuffleIcon className="h-5 w-5" />
              Surprise Me
            </button>
          </div>
        </PageContainer>
      </section>

      {/* ─── Filters ─────────────────────────────────────────────── */}
      <section className="pb-8">
        <PageContainer>
          {/* Content Type Filters */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
              Content Type
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {(Object.keys(contentTypeConfig) as ContentFilter[]).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setContentFilter(filter)}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                      contentFilter === filter
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20"
                        : "border border-white/[0.08] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {contentTypeConfig[filter].label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Mood Filters */}
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
              Mood
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {(Object.keys(moodConfig) as MoodFilter[]).map((mood) => (
                <button
                  key={mood}
                  onClick={() => setMoodFilter(mood)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    moodFilter === mood
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20"
                      : "border border-white/[0.08] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {moodConfig[mood].label}
                </button>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Featured Spotlight ──────────────────────────────────── */}
      {selectedTitle && (
        <section className="relative py-16">
          <PageContainer>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d121f]">
              {/* Backdrop */}
              <div className="relative h-[50vh] lg:h-[60vh]">
                <img
                  src={selectedTitle.backdropUrl}
                  alt={selectedTitle.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-[#0d121f]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d121f] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12">
                <div className="max-w-2xl">
                  {/* Badge */}
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded bg-violet-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                      {selectedTitle.kind === "anime"
                        ? "Anime"
                        : selectedTitle.kind === "movie"
                          ? "Movie"
                          : "Series"}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
                      Your Pick
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-4xl font-bold leading-tight tracking-tighter lg:text-5xl">
                    {selectedTitle.title}
                  </h2>

                  {/* Meta */}
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/70">
                    <span>{selectedTitle.year}</span>
                    <span className="rounded border border-white/20 px-1.5 py-px text-[10px] font-medium">
                      {selectedTitle.rating}
                    </span>
                    {selectedTitle.runtime && (
                      <span>{selectedTitle.runtime}</span>
                    )}
                    {selectedTitle.seasonLabel && (
                      <span>{selectedTitle.seasonLabel}</span>
                    )}
                    {selectedTitle.genres.map((g) => (
                      <span
                        key={g}
                        className="rounded bg-white/10 px-2 py-0.5 text-xs"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="mb-6 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/70 lg:text-base">
                    {selectedTitle.description}
                  </p>

                  {/* CTAs */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/watch/${selectedTitle.slug}`}
                      className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-white/90"
                    >
                      <PlayIcon className="h-4 w-4" />
                      Play Now
                    </Link>
                    <Link
                      href={`/title/${selectedTitle.slug}`}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-6 py-3 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/20"
                    >
                      <InfoIcon className="h-4 w-4" />
                      More Info
                    </Link>
                    <button
                      onClick={handleSurpriseMe}
                      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/10"
                    >
                      <ShuffleIcon className="h-4 w-4" />
                      Pick Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>
      )}

      {/* ─── Supporting Rails ────────────────────────────────────── */}
      {selectedTitle && (
        <div className="space-y-12 pb-16">
          {/* More Like This */}
          {similarTitles.length > 0 && (
            <section>
              <PageContainer>
                <h2 className="mb-5 text-lg font-semibold tracking-tight text-white sm:text-xl lg:text-2xl">
                  More Like This
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {similarTitles.map((item) => (
                    <MediaPosterCard
                      key={item.id}
                      slug={item.slug}
                      title={item.title}
                      posterUrl={item.posterUrl}
                      meta={
                        item.kind === "movie"
                          ? `${item.year} · ${item.runtime}`
                          : item.seasonLabel ?? String(item.year)
                      }
                      badge={
                        item.isDubbed && item.isSubbed ? (
                          <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm">
                            Sub | Dub
                          </span>
                        ) : item.isSubbed ? (
                          <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm">
                            Sub
                          </span>
                        ) : undefined
                      }
                    />
                  ))}
                </div>
              </PageContainer>
            </section>
          )}

          {/* Try Something Different */}
          {contrastingTitles.length > 0 && (
            <section>
              <PageContainer>
                <h2 className="mb-5 text-lg font-semibold tracking-tight text-white sm:text-xl lg:text-2xl">
                  Try Something Different
                </h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {contrastingTitles.map((item) => (
                    <MediaPosterCard
                      key={item.id}
                      slug={item.slug}
                      title={item.title}
                      posterUrl={item.posterUrl}
                      meta={
                        item.kind === "movie"
                          ? `${item.year} · ${item.runtime}`
                          : item.seasonLabel ?? String(item.year)
                      }
                      badge={
                        item.isDubbed && item.isSubbed ? (
                          <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm">
                            Sub | Dub
                          </span>
                        ) : item.isSubbed ? (
                          <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm">
                            Sub
                          </span>
                        ) : undefined
                      }
                    />
                  ))}
                </div>
              </PageContainer>
            </section>
          )}
        </div>
      )}

      {/* Empty State */}
      {!selectedTitle && filteredTitles.length === 0 && (
        <section className="py-24">
          <PageContainer>
            <div className="text-center max-w-md mx-auto">
              <p className="text-lg text-white/50 mb-4">
                No titles match your filters.
              </p>
              <button
                onClick={() => {
                  setContentFilter("all");
                  setMoodFilter("all");
                }}
                className="text-sm text-violet-400 font-medium hover:text-violet-300 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </PageContainer>
        </section>
      )}

      <Footer />
    </main>
  );
}
