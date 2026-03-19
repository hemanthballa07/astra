/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { Footer } from "@/components/navigation/Footer";
import { PageContainer } from "@/components/shared/PageContainer";
import { mockMedia } from "@/lib/data/mock-media";

/* ────────────────────────────────────────────────────────────────────────
 * Derived data from mockMedia (source of truth)
 * ──────────────────────────────────────────────────────────────────────── */

// Continue Watching - pick specific titles and add progress context
const continueWatching = [
  {
    id: "cw-1",
    title: mockMedia.find((m) => m.slug === "solo-leveling")!.title,
    episode: "S2:E1",
    remaining: "18 min left",
    progress: 25,
    imageUrl: mockMedia.find((m) => m.slug === "solo-leveling")!.backdropUrl,
    slug: "solo-leveling",
  },
  {
    id: "cw-2",
    title: mockMedia.find((m) => m.slug === "dune-part-two")!.title,
    episode: "Movie",
    remaining: "1h 42m left",
    progress: 37,
    imageUrl: mockMedia.find((m) => m.slug === "dune-part-two")!.backdropUrl,
    slug: "dune-part-two",
  },
  {
    id: "cw-3",
    title: mockMedia.find((m) => m.slug === "severance")!.title,
    episode: "S2:E4",
    remaining: "12 min left",
    progress: 78,
    imageUrl: mockMedia.find((m) => m.slug === "severance")!.backdropUrl,
    slug: "severance",
  },
  {
    id: "cw-4",
    title: mockMedia.find((m) => m.slug === "spy-x-family")!.title,
    episode: "S2:E10",
    remaining: "8 min left",
    progress: 66,
    imageUrl: mockMedia.find((m) => m.slug === "spy-x-family")!.backdropUrl,
    slug: "spy-x-family",
  },
];

// Trending Anime - filter anime from mockMedia
const trendingAnime = mockMedia
  .filter((m) => m.kind === "anime")
  .map((item) => ({
    id: item.id,
    title: item.title,
    meta: item.seasonLabel
      ? `${item.seasonLabel} · ${item.episodeCount} Ep`
      : `${item.episodeCount} Ep`,
    slug: item.slug,
    badge: item.isDubbed && item.isSubbed ? "Sub | Dub" : item.isSubbed ? "Sub" : undefined,
    posterUrl: item.posterUrl,
  }));

const categoryPills = [
  "Trending Now",
  "Action & Adventure",
  "Fantasy",
  "Shonen",
  "Cyberpunk",
  "Sci-Fi Thrillers",
  "Top Airing",
];

// Popular Movies - filter movies from mockMedia
const popularMovies = mockMedia
  .filter((m) => m.kind === "movie")
  .map((item) => ({
    id: item.id,
    title: item.title,
    year: String(item.year),
    genre: item.genres[0],
    posterUrl: item.posterUrl,
    slug: item.slug,
  }));

// Latest Episodes - use ongoing anime/series from mockMedia
const latestEpisodes = mockMedia
  .filter((m) => m.status === "ongoing" && (m.kind === "anime" || m.kind === "series"))
  .slice(0, 3)
  .map((item, idx) => {
    const timeLabels = ["12 min ago", "2 hours ago", "5 hours ago"];
    const episodeLabels =
      item.kind === "anime"
        ? [`Ep ${item.episodeCount} · New Chapter`, "Latest Episode", "Just Released"]
        : ["New Episode", "Latest Drop", "Just Updated"];
    return {
      id: `le-${idx + 1}`,
      title: item.title,
      episode: episodeLabels[idx] || "New Episode",
      time: timeLabels[idx] || "Recently",
      imageUrl: item.backdropUrl,
      slug: item.slug,
    };
  });

/* ────────────────────────────────────────────────────────────────────────
 * Inline SVG icons (no external icon dependency)
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
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function FlameIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 14.5a5.5 5.5 0 0111 0v.5a5.5 5.5 0 11-11 0v-.5zm1.5 1c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4-4 1.79-4 4zm2.25-10.5c-.41-1.33-1.45-2-2.97-2-1.94 0-3.52 1.59-3.52 3.55 0 1.11.5 2.09 1.26 2.76.77.67 1.38 1.38 1.73 2 .35.62.57 1.39.57 2.19v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-1.33-.38-2.48-.99-3.39 2.18-.54 3.99-2.21 3.99-4.61 0-1.96-1.58-3.55-3.52-3.55-.41 0-.75.27-.87.65l-.18.6z" />
    </svg  >
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Local presentational components
 * ──────────────────────────────────────────────────────────────────────── */

function SectionHeader({
  children,
  badge,
}: {
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-lg font-semibold tracking-tight text-white sm:text-xl lg:text-2xl">
      {children}
      {badge}
    </h2>
  );
}

function ContinueWatchingCard({ item }: { item: (typeof continueWatching)[number] }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="group w-[280px] flex-shrink-0 lg:w-[320px]"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d121f]">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
            <PlayIcon className="ml-0.5 h-5 w-5 text-white" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/20">
          <div
            className="h-full bg-violet-500 transition-all"
            style={{ width: `${item.progress}%` }}
          />
        </div>
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="truncate text-sm font-medium text-white">{item.title}</h3>
        <p className="text-xs text-white/50">
          {item.episode} · {item.remaining}
        </p>
      </div>
    </Link>
  );
}

function PosterCard({
  title,
  meta,
  posterUrl,
  slug,
  badge,
}: {
  title: string;
  meta: string;
  posterUrl: string;
  slug: string;
  badge?: string;
}) {
  return (
    <Link
      href={`/title/${slug}`}
      className="group w-[140px] flex-shrink-0 lg:w-[172px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d121f] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.15)]">
        <img
          src={posterUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {badge && (
          <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm">
            {badge}
          </span>
        )}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-lg bg-white py-1.5 text-center text-xs font-bold text-black">
            Play
          </span>
        </div>
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-violet-400">
          {title}
        </h3>
        <p className="text-[11px] text-white/40">{meta}</p>
      </div>
    </Link>
  );
}

function MovieGridCard({ item }: { item: (typeof popularMovies)[number] }) {
  return (
    <Link href={`/title/${item.slug}`} className="group">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d121f]">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md">
            <PlayIcon className="ml-0.5 h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      <div className="mt-2.5">
        <h4 className="truncate text-sm font-semibold text-white">{item.title}</h4>
        <div className="mt-1 flex items-center gap-2">
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">
            {item.year}
          </span>
          <span className="text-[10px] text-violet-400">{item.genre}</span>
        </div>
      </div>
    </Link>
  );
}

function EpisodeCard({ item }: { item: (typeof latestEpisodes)[number] }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="group flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5 transition-colors duration-200 hover:bg-white/[0.06]"
    >
      <div className="relative h-[88px] w-[140px] flex-shrink-0 overflow-hidden rounded-lg bg-[#0d121f] sm:w-[156px]">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <PlayIcon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="flex min-w-0 flex-col justify-center">
        <h4 className="truncate text-sm font-bold text-white">{item.title}</h4>
        <p className="mt-0.5 text-sm text-violet-400">{item.episode}</p>
        <span className="mt-1.5 text-[10px] uppercase tracking-wider text-white/30">
          {item.time}
        </span>
      </div>
    </Link>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Scrollable row utility (hide scrollbar cross-browser via Tailwind arb.)
 * ──────────────────────────────────────────────────────────────────────── */

const scrollRow =
  "flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/* ────────────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────────────── */

const hero = mockMedia[0];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="relative -mt-16 h-[80vh] w-full overflow-hidden sm:h-[85vh] lg:h-[95vh]">
        <img
          src={hero.backdropUrl}
          alt={hero.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dual gradient overlay (using custom hero-gradient from globals.css) */}
        <div className="hero-gradient absolute inset-0" />

        <div className="relative flex h-full max-w-3xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
          {/* Chips */}
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
              {hero.kind === "anime" ? "Anime" : hero.kind === "movie" ? "Movie" : "Series"}
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
              Trending #1
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-4xl font-bold leading-[1.05] tracking-tighter sm:text-5xl lg:text-7xl">
            {hero.title.split(" ").map((word, i, arr) =>
              i === arr.length - 1 && arr.length > 1 ? (
                <span key={i}>
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {word}
                  </span>
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          {/* Meta row */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/70 lg:gap-3">
            <span>{hero.year}</span>
            <span className="rounded border border-white/20 px-1.5 py-px text-[10px] font-medium">
              {hero.rating}
            </span>
            {hero.seasonCount && (
              <span>
                {hero.seasonCount} {hero.seasonCount === 1 ? "Season" : "Seasons"}
              </span>
            )}
            {hero.genres.map((g) => (
              <span key={g} className="rounded bg-white/10 px-2 py-0.5 text-xs">
                {g}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mb-6 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/60 sm:line-clamp-3 sm:text-base lg:text-lg">
            {hero.description}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href={`/watch/${hero.slug}`}
              className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-white/90 sm:px-8 sm:py-3.5"
            >
              <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Play
            </Link>
            <Link
              href={`/title/${hero.slug}`}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-6 py-3 text-sm font-bold backdrop-blur-md transition-colors hover:bg-white/20 sm:px-8 sm:py-3.5"
            >
              <InfoIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              More Info
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Content Sections ────────────────────────────────────── */}
      <div className="relative z-10 -mt-16 space-y-10 pb-16 sm:-mt-20 sm:space-y-14 lg:-mt-24">

        {/* ── Continue Watching ──────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader>Continue Watching</SectionHeader>
            <div className={scrollRow}>
              {continueWatching.map((item) => (
                <ContinueWatchingCard key={item.id} item={item} />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Trending Anime ────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              badge={
                <FlameIcon className="h-5 w-5 text-orange-500" />
              }
            >
              Trending Anime
            </SectionHeader>
            <div className={`${scrollRow} lg:gap-5`}>
              {trendingAnime.map((item) => (
                <PosterCard
                  key={item.id}
                  title={item.title}
                  meta={item.meta}
                  posterUrl={item.posterUrl}
                  slug={item.slug}
                  badge={item.badge}
                />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Category Pills ────────────────────────────────────── */}
        <section>
          <PageContainer>
            <div className={`${scrollRow} gap-2.5 pb-2`}>
              {categoryPills.map((label, i) => (
                <button
                  key={label}
                  className={`flex-shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    i === 0
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/20 hover:brightness-110"
                      : "border border-white/[0.08] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Featured Titles (mockMedia) ───────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader>Featured Titles</SectionHeader>
            <div className={`${scrollRow} lg:gap-5`}>
              {mockMedia.map((item) => (
                <PosterCard
                  key={item.id}
                  title={item.title}
                  meta={
                    item.kind === "movie"
                      ? `${item.year} · ${item.runtime ?? "Movie"}`
                      : item.seasonLabel ?? String(item.year)
                  }
                  posterUrl={item.posterUrl}
                  slug={item.slug}
                  badge={
                    item.isDubbed && item.isSubbed
                      ? "Sub | Dub"
                      : item.isSubbed
                        ? "Sub"
                        : undefined
                  }
                />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Popular Movies ────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader>Popular Movies</SectionHeader>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
              {popularMovies.map((item) => (
                <MovieGridCard key={item.id} item={item} />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Latest Episodes ───────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              badge={
                <span className="rounded bg-green-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400">
                  Just Updated
                </span>
              }
            >
              Latest Episodes
            </SectionHeader>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {latestEpisodes.map((item) => (
                <EpisodeCard key={item.id} item={item} />
              ))}
            </div>
          </PageContainer>
        </section>
      </div>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
