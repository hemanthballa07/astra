/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { PageContainer } from "@/components/shared/PageContainer";
import { mockMedia } from "@/lib/data/mock-media";

/* ────────────────────────────────────────────────────────────────────────────
 * Local series fixture data
 * ──────────────────────────────────────────────────────────────────────────── */

const trendingSeries = [
  { id: "ts-1", rank: 1, title: "Severance", seasons: "2 Seasons", score: 8.9, network: "Apple TV+", posterUrl: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=600&auto=format&fit=crop", slug: "severance" },
  { id: "ts-2", rank: 2, title: "The Bear", seasons: "3 Seasons", score: 8.7, network: "FX", posterUrl: "https://images.unsplash.com/photo-1574966739987-65d040a05caa?q=80&w=600&auto=format&fit=crop", slug: "the-bear" },
  { id: "ts-3", rank: 3, title: "Shogun", seasons: "1 Season", score: 9.0, network: "FX", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", slug: "shogun" },
  { id: "ts-4", rank: 4, title: "True Detective", seasons: "4 Seasons", score: 8.5, network: "HBO", posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop", slug: "true-detective" },
  { id: "ts-5", rank: 5, title: "The Last of Us", seasons: "2 Seasons", score: 8.8, network: "HBO", posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=600&auto=format&fit=crop", slug: "the-last-of-us" },
];

const bingeWorthy = [
  { id: "bw-1", title: "Breaking Bad", meta: "5 Seasons · 62 Episodes", score: 9.5, genre: "Crime Drama", posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop", slug: "breaking-bad" },
  { id: "bw-2", title: "Dark", meta: "3 Seasons · 26 Episodes", score: 8.7, genre: "Sci-Fi Mystery", posterUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop", slug: "dark" },
  { id: "bw-3", title: "Chernobyl", meta: "Limited Series · 5 Episodes", score: 9.4, genre: "Historical Drama", posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop", slug: "chernobyl" },
  { id: "bw-4", title: "Band of Brothers", meta: "Limited Series · 10 Episodes", score: 9.4, genre: "War Drama", posterUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=600&auto=format&fit=crop", slug: "band-of-brothers" },
  { id: "bw-5", title: "The Wire", meta: "5 Seasons · 60 Episodes", score: 9.3, genre: "Crime Drama", posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop", slug: "the-wire" },
  { id: "bw-6", title: "Mr. Robot", meta: "4 Seasons · 45 Episodes", score: 8.6, genre: "Thriller", posterUrl: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=600&auto=format&fit=crop", slug: "mr-robot" },
];

const newSeasons = [
  { id: "ns-1", title: "Severance", season: "Season 2 Now Streaming", episodes: "10 Episodes", addedAt: "New episodes weekly", thumbnailUrl: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=800&auto=format&fit=crop", slug: "severance", network: "Apple TV+" },
  { id: "ns-2", title: "The White Lotus", season: "Season 3 Now Streaming", episodes: "8 Episodes", addedAt: "All episodes available", thumbnailUrl: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=800&auto=format&fit=crop", slug: "the-white-lotus", network: "HBO" },
  { id: "ns-3", title: "Slow Horses", season: "Season 4 Now Streaming", episodes: "6 Episodes", addedAt: "All episodes available", thumbnailUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop", slug: "slow-horses", network: "Apple TV+" },
  { id: "ns-4", title: "Fargo", season: "Season 5 Now Streaming", episodes: "10 Episodes", addedAt: "All episodes available", thumbnailUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop", slug: "fargo", network: "FX" },
  { id: "ns-5", title: "The Gilded Age", season: "Season 2 Now Streaming", episodes: "8 Episodes", addedAt: "All episodes available", thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop", slug: "the-gilded-age", network: "HBO" },
];

const genreChips = ["Drama", "Thriller", "Crime", "Sci-Fi", "Mystery", "Comedy", "Horror", "Romance"];
const themeChips = ["Prestige TV", "Limited Series", "True Crime", "Workplace", "Period Drama", "Psychological", "Dark Comedy"];

const awardWinners = [
  { id: "aw-1", title: "Succession", meta: "4 Seasons", score: 8.9, genre: "Drama", posterUrl: "https://images.unsplash.com/photo-1611457194403-d3f8c5d68db1?q=80&w=600&auto=format&fit=crop", slug: "succession" },
  { id: "aw-2", title: "The Crown", meta: "6 Seasons", score: 8.6, genre: "Historical", posterUrl: "https://images.unsplash.com/photo-1607604276583-3d22aa77eb82?q=80&w=600&auto=format&fit=crop", slug: "the-crown" },
  { id: "aw-3", title: "Better Call Saul", meta: "6 Seasons", score: 9.0, genre: "Crime Drama", posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop", slug: "better-call-saul" },
  { id: "aw-4", title: "Mare of Easttown", meta: "Limited Series", score: 8.5, genre: "Crime Drama", posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop", slug: "mare-of-easttown" },
  { id: "aw-5", title: "The Morning Show", meta: "3 Seasons", score: 8.2, genre: "Drama", posterUrl: "https://images.unsplash.com/photo-1560972550-aba3456e5fa1?q=80&w=600&auto=format&fit=crop", slug: "the-morning-show" },
  { id: "aw-6", title: "Fleabag", meta: "2 Seasons", score: 8.7, genre: "Comedy Drama", posterUrl: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=600&auto=format&fit=crop", slug: "fleabag" },
];

const hiddenGems = [
  { id: "hg-1", title: "Patriot", meta: "2 Seasons", score: 8.3, genre: "Dark Comedy", posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop", slug: "patriot" },
  { id: "hg-2", title: "The Leftovers", meta: "3 Seasons", score: 8.3, genre: "Drama Mystery", posterUrl: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=600&auto=format&fit=crop", slug: "the-leftovers" },
  { id: "hg-3", title: "Rectify", meta: "4 Seasons", score: 8.3, genre: "Drama", posterUrl: "https://images.unsplash.com/photo-1574966739987-65d040a05caa?q=80&w=600&auto=format&fit=crop", slug: "rectify" },
  { id: "hg-4", title: "Halt and Catch Fire", meta: "4 Seasons", score: 8.4, genre: "Period Drama", posterUrl: "https://images.unsplash.com/photo-1540224769541-7e6e96a7fd33?q=80&w=600&auto=format&fit=crop", slug: "halt-and-catch-fire" },
  { id: "hg-5", title: "The Americans", meta: "6 Seasons", score: 8.4, genre: "Spy Thriller", posterUrl: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=600&auto=format&fit=crop", slug: "the-americans" },
  { id: "hg-6", title: "Counterpart", meta: "2 Seasons", score: 8.1, genre: "Sci-Fi Thriller", posterUrl: "https://images.unsplash.com/photo-1620336655055-088d06e76fc0?q=80&w=600&auto=format&fit=crop", slug: "counterpart" },
];

/* ────────────────────────────────────────────────────────────────────────────
 * Inline SVG icons
 * ──────────────────────────────────────────────────────────────────────────── */

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

function StarIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function TrendingIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrophyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 15a6 6 0 006-6V3H6v6a6 6 0 006 6zm0 2a8 8 0 01-8-8V1h16v8a8 8 0 01-8 8zM5 3H2v5a3 3 0 003 3V3zm14 0v8a3 3 0 003-3V3h-3zM9 21v-4h6v4H9zm-1 2h8v-2H8v2z" />
    </svg>
  );
}

function SparklesIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.962 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.582a.5.5 0 010 .962L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.962 0L9.937 15.5z" />
      <path d="M3.5 18.5l-.724-2.447a.25.25 0 00-.329-.168l-2.447.724a.25.25 0 010-.477l2.447-.724a.25.25 0 00.168-.33L1.891 12.633a.25.25 0 01.477 0l.724 2.447a.25.25 0 00.33.168l2.447-.724a.25.25 0 010 .477l-2.447.724a.25.25 0 00-.168.33l.724 2.447a.25.25 0 01-.477 0z" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Local presentational components
 * ──────────────────────────────────────────────────────────────────────────── */

function SectionHeader({
  children,
  badge,
  action,
}: {
  children: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white sm:text-xl lg:text-2xl">
        {children}
        {badge}
      </h2>
      {action}
    </div>
  );
}

function NetworkBadge({ network }: { network: string }) {
  return (
    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm">
      {network}
    </span>
  );
}

function TrendingCard({ item }: { item: (typeof trendingSeries)[number] }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-200 hover:bg-white/[0.05] hover:border-white/[0.1]"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-lg font-bold">
        {item.rank}
      </span>
      <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="truncate text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">
          {item.title}
        </h4>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-white/40">
          <span>{item.seasons}</span>
          <span className="flex items-center gap-0.5 text-yellow-500">
            <StarIcon className="h-2.5 w-2.5" />
            {item.score}
          </span>
        </div>
        <p className="mt-0.5 text-[10px] text-white/30">{item.network}</p>
      </div>
    </Link>
  );
}

function SeriesCard({
  title,
  meta,
  score,
  genre,
  posterUrl,
  slug,
}: {
  title: string;
  meta: string;
  score: number;
  genre: string;
  posterUrl: string;
  slug: string;
}) {
  return (
    <Link
      href={`/title/${slug}`}
      className="group w-[150px] flex-shrink-0 lg:w-[175px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d121f] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.15)]">
        <img
          src={posterUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-lg bg-white py-1.5 text-center text-xs font-bold text-black">
            Watch Now
          </span>
        </div>
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-violet-400">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-white/50">
          <span>{meta}</span>
          <span className="flex items-center gap-0.5 text-yellow-500">
            <StarIcon className="h-2.5 w-2.5" />
            {score}
          </span>
        </div>
        <p className="mt-0.5 text-[10px] text-violet-400/80">{genre}</p>
      </div>
    </Link>
  );
}

function NewSeasonCard({ item }: { item: (typeof newSeasons)[number] }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="group flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-200 hover:bg-white/[0.05] hover:border-white/[0.1]"
    >
      <div className="relative h-[85px] w-[150px] flex-shrink-0 overflow-hidden rounded-xl bg-[#0d121f]">
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
            <PlayIcon className="ml-0.5 h-4 w-4 text-white" />
          </div>
        </div>
        <div className="absolute left-1.5 top-1.5">
          <span className="rounded bg-violet-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide">
            New
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="mb-1">
          <NetworkBadge network={item.network} />
        </div>
        <h4 className="truncate text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">
          {item.title}
        </h4>
        <p className="mt-0.5 truncate text-xs text-violet-400">{item.season}</p>
        <div className="mt-1.5 flex items-center gap-2 text-[10px] text-white/30">
          <span>{item.episodes}</span>
          <span>·</span>
          <span>{item.addedAt}</span>
        </div>
      </div>
    </Link>
  );
}

function Chip({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`flex-shrink-0 cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all ${
        active
          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/20"
          : "border border-white/[0.08] bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.15]"
      }`}
    >
      {children}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Scroll row utility
 * ──────────────────────────────────────────────────────────────────────────── */

const scrollRow =
  "flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

/* ────────────────────────────────────────────────────────────────────────────
 * Hero data from mockMedia
 * ──────────────────────────────────────────────────────────────────────────── */

const heroSeries = mockMedia.find((m) => m.kind === "series") ?? mockMedia[0];

/* ────────────────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────────────────── */

export default function SeriesPage() {
  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ─── Hero Banner ──────────────────────────────────────────── */}
      <section className="relative -mt-16 h-[75vh] w-full overflow-hidden sm:h-[80vh] lg:h-[88vh]">
        <img
          src={heroSeries.backdropUrl}
          alt={heroSeries.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to top, #050811 0%, rgba(5,8,17,0.6) 50%, rgba(5,8,17,0.2) 100%)",
              "linear-gradient(to right, #050811 0%, rgba(5,8,17,0.7) 40%, transparent 100%)",
            ].join(", "),
          }}
        />

        <div className="relative flex h-full max-w-3xl flex-col justify-end px-4 pb-20 sm:px-6 lg:px-10 lg:pb-28">
          {/* Badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded bg-fuchsia-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
              Series
            </span>
            <span className="flex items-center gap-1.5 rounded bg-gradient-to-r from-amber-500/90 to-yellow-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              <TrophyIcon className="h-3 w-3" />
              Critically Acclaimed
            </span>
            <span className="rounded border border-white/20 px-2 py-0.5 text-[10px] font-medium text-white/70">
              Apple TV+
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-3 text-4xl font-bold leading-[1.05] tracking-tighter sm:text-5xl lg:text-7xl">
            {heroSeries.title}
          </h1>

          {/* Meta row */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/70 lg:gap-3">
            <span>{heroSeries.year}</span>
            <span className="rounded border border-white/20 px-1.5 py-px text-[10px] font-medium">
              {heroSeries.rating}
            </span>
            {heroSeries.seasonCount && (
              <span>
                {heroSeries.seasonCount} {heroSeries.seasonCount === 1 ? "Season" : "Seasons"}
              </span>
            )}
            {heroSeries.episodeCount && (
              <span>{heroSeries.episodeCount} Episodes</span>
            )}
            {heroSeries.genres.map((g) => (
              <span key={g} className="rounded bg-fuchsia-500/20 px-2 py-0.5 text-xs text-fuchsia-300">
                {g}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mb-6 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/60 sm:line-clamp-3 sm:text-base lg:text-lg">
            {heroSeries.description}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href={`/watch/${heroSeries.slug}`}
              className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-white/90 hover:scale-[1.02] sm:px-8 sm:py-3.5"
            >
              <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Start Watching
            </Link>
            <Link
              href={`/title/${heroSeries.slug}`}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-6 py-3 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/20 sm:px-8 sm:py-3.5"
            >
              <InfoIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Details
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Content Sections ─────────────────────────────────────── */}
      <div className="relative z-10 -mt-20 space-y-12 pb-16 sm:-mt-24 sm:space-y-16 lg:-mt-28">

        {/* ── Trending Now ─────────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              badge={
                <span className="flex items-center gap-1.5 rounded bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-400">
                  <TrendingIcon className="h-3 w-3" />
                  This Week
                </span>
              }
            >
              Trending Now
            </SectionHeader>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {trendingSeries.map((item) => (
                <TrendingCard key={item.id} item={item} />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Binge-Worthy Picks ───────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              badge={
                <span className="rounded bg-fuchsia-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">
                  Complete Series
                </span>
              }
              action={
                <Link
                  href="/browse?kind=series&status=completed"
                  className="text-xs font-medium text-white/50 transition-colors hover:text-violet-400"
                >
                  View All
                </Link>
              }
            >
              Binge-Worthy Picks
            </SectionHeader>
            <div className={`${scrollRow} lg:gap-5`}>
              {bingeWorthy.map((item) => (
                <SeriesCard
                  key={item.id}
                  title={item.title}
                  meta={item.meta}
                  score={item.score}
                  genre={item.genre}
                  posterUrl={item.posterUrl}
                  slug={item.slug}
                />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── New Seasons ──────────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              badge={
                <span className="rounded bg-green-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-green-400">
                  Just Added
                </span>
              }
              action={
                <Link
                  href="/browse?kind=series&sort=latest"
                  className="text-xs font-medium text-white/50 transition-colors hover:text-violet-400"
                >
                  See All
                </Link>
              }
            >
              New Seasons
            </SectionHeader>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {newSeasons.slice(0, 6).map((item) => (
                <NewSeasonCard key={item.id} item={item} />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Browse by Genre / Theme ──────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader>Browse by</SectionHeader>
            <div className="space-y-4">
              {/* Genres */}
              <div>
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Genre
                </p>
                <div className={`${scrollRow} gap-2.5 pb-2`}>
                  {genreChips.map((chip, i) => (
                    <Chip key={chip} active={i === 0}>
                      {chip}
                    </Chip>
                  ))}
                </div>
              </div>
              {/* Themes */}
              <div>
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Category
                </p>
                <div className={`${scrollRow} gap-2.5 pb-2`}>
                  {themeChips.map((chip) => (
                    <Chip key={chip}>{chip}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* ── Award Winners ────────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              badge={
                <span className="flex items-center gap-1.5 rounded bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  <TrophyIcon className="h-3 w-3" />
                  Emmy &amp; Golden Globe
                </span>
              }
              action={
                <Link
                  href="/browse?kind=series&award=true"
                  className="text-xs font-medium text-white/50 transition-colors hover:text-violet-400"
                >
                  Browse All
                </Link>
              }
            >
              Award Winners
            </SectionHeader>
            <div className={`${scrollRow} lg:gap-5`}>
              {awardWinners.map((item) => (
                <SeriesCard
                  key={item.id}
                  title={item.title}
                  meta={item.meta}
                  score={item.score}
                  genre={item.genre}
                  posterUrl={item.posterUrl}
                  slug={item.slug}
                />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Hidden Gems ──────────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              badge={
                <span className="flex items-center gap-1.5 rounded bg-violet-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-400">
                  <SparklesIcon className="h-3 w-3" />
                  Underrated
                </span>
              }
            >
              Hidden Gems
            </SectionHeader>
            <div className={`${scrollRow} lg:gap-5`}>
              {hiddenGems.map((item) => (
                <SeriesCard
                  key={item.id}
                  title={item.title}
                  meta={item.meta}
                  score={item.score}
                  genre={item.genre}
                  posterUrl={item.posterUrl}
                  slug={item.slug}
                />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── From mockMedia ───────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader>Featured on Astra</SectionHeader>
            <div className={`${scrollRow} lg:gap-5`}>
              {mockMedia
                .filter((m) => m.kind === "series")
                .map((item) => (
                  <SeriesCard
                    key={item.id}
                    title={item.title}
                    meta={item.seasonLabel ?? `${item.year}`}
                    score={8.5}
                    genre={item.genres[0] ?? "Drama"}
                    posterUrl={item.posterUrl}
                    slug={item.slug}
                  />
                ))}
            </div>
          </PageContainer>
        </section>
      </div>
    </main>
  );
}
