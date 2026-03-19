/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/section-header";
import { GenreChip } from "@/components/shared/genre-chip";
import { MediaPosterCard } from "@/components/media/media-poster-card";
import { mockMedia } from "@/lib/data/mock-media";

/* ────────────────────────────────────────────────────────────────────────────
 * Local anime fixture data
 * ──────────────────────────────────────────────────────────────────────────── */

const seasonalHighlights = [
  { id: "sh-1", title: "Solo Leveling", season: "Season 2", studio: "A-1 Pictures", score: 8.9, isSubbed: true, isDubbed: true, status: "airing", posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop", slug: "solo-leveling" },
  { id: "sh-2", title: "Mushoku Tensei", season: "Season 3", studio: "Studio Bind", score: 8.7, isSubbed: true, isDubbed: true, status: "airing", posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop", slug: "mushoku-tensei" },
  { id: "sh-3", title: "Frieren", season: "Season 1", studio: "Madhouse", score: 9.1, isSubbed: true, isDubbed: true, status: "airing", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", slug: "frieren" },
  { id: "sh-4", title: "Blue Lock", season: "Season 2", studio: "8bit", score: 8.4, isSubbed: true, isDubbed: false, status: "airing", posterUrl: "https://images.unsplash.com/photo-1611457194403-d3f8c5d68db1?q=80&w=600&auto=format&fit=crop", slug: "blue-lock" },
  { id: "sh-5", title: "Dandadan", season: "Season 1", studio: "Science SARU", score: 8.6, isSubbed: true, isDubbed: true, status: "airing", posterUrl: "https://images.unsplash.com/photo-1607604276583-3d22aa77eb82?q=80&w=600&auto=format&fit=crop", slug: "dandadan" },
  { id: "sh-6", title: "Re:Zero", season: "Season 3", studio: "White Fox", score: 8.5, isSubbed: true, isDubbed: false, status: "airing", posterUrl: "https://images.unsplash.com/photo-1560972550-aba3456e5fa1?q=80&w=600&auto=format&fit=crop", slug: "re-zero" },
];

const topAiring = [
  { id: "ta-1", rank: 1, title: "Frieren: Beyond Journey's End", episodes: "28 Episodes", score: 9.1, posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", slug: "frieren" },
  { id: "ta-2", rank: 2, title: "Solo Leveling", episodes: "24 Episodes", score: 8.9, posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop", slug: "solo-leveling" },
  { id: "ta-3", rank: 3, title: "Jujutsu Kaisen", episodes: "47 Episodes", score: 8.7, posterUrl: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=600&auto=format&fit=crop", slug: "jujutsu-kaisen" },
  { id: "ta-4", rank: 4, title: "Demon Slayer", episodes: "55 Episodes", score: 8.6, posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop", slug: "demon-slayer" },
  { id: "ta-5", rank: 5, title: "One Piece", episodes: "1100+ Episodes", score: 9.0, posterUrl: "https://images.unsplash.com/photo-1607604276583-3d22aa77eb82?q=80&w=600&auto=format&fit=crop", slug: "one-piece" },
];

const latestEpisodes = [
  { id: "le-1", title: "Solo Leveling", episode: "S2:E04 · I Will Fight", airedAt: "2 hours ago", duration: "24 min", thumbnailUrl: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=800&auto=format&fit=crop", slug: "solo-leveling", isSubbed: true, isDubbed: true },
  { id: "le-2", title: "Frieren: Beyond Journey's End", episode: "S1:E28 · The Height of Magic", airedAt: "5 hours ago", duration: "24 min", thumbnailUrl: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=800&auto=format&fit=crop", slug: "frieren", isSubbed: true, isDubbed: true },
  { id: "le-3", title: "Mushoku Tensei", episode: "S3:E06 · Turning Point", airedAt: "8 hours ago", duration: "24 min", thumbnailUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop", slug: "mushoku-tensei", isSubbed: true, isDubbed: false },
  { id: "le-4", title: "Blue Lock", episode: "S2:E12 · Awakening", airedAt: "1 day ago", duration: "24 min", thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop", slug: "blue-lock", isSubbed: true, isDubbed: false },
  { id: "le-5", title: "Dandadan", episode: "S1:E10 · Turbo Granny", airedAt: "1 day ago", duration: "24 min", thumbnailUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop", slug: "dandadan", isSubbed: true, isDubbed: true },
  { id: "le-6", title: "Re:Zero", episode: "S3:E08 · Return by Death", airedAt: "2 days ago", duration: "24 min", thumbnailUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop", slug: "re-zero", isSubbed: true, isDubbed: false },
];

const genreChips = ["Action", "Fantasy", "Romance", "Isekai", "Slice of Life", "Horror", "Mecha", "Sports"];
const studioChips = ["MAPPA", "Ufotable", "Wit Studio", "Madhouse", "Bones", "Kyoto Animation", "A-1 Pictures"];
const themeChips = ["Shonen", "Seinen", "Shoujo", "Josei", "Supernatural", "Psychological", "Comedy"];

const discoverAnime = [
  { id: "da-1", title: "Attack on Titan", meta: "Final Season", score: 9.1, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=600&auto=format&fit=crop", slug: "attack-on-titan" },
  { id: "da-2", title: "Vinland Saga", meta: "Season 2", score: 8.8, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=600&auto=format&fit=crop", slug: "vinland-saga" },
  { id: "da-3", title: "Chainsaw Man", meta: "Season 1", score: 8.4, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=600&auto=format&fit=crop", slug: "chainsaw-man" },
  { id: "da-4", title: "Spy x Family", meta: "Season 2", score: 8.6, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1620336655055-088d06e76fc0?q=80&w=600&auto=format&fit=crop", slug: "spy-x-family" },
  { id: "da-5", title: "Bleach: TYBW", meta: "Cour 3", score: 9.0, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=600&auto=format&fit=crop", slug: "bleach-tybw" },
  { id: "da-6", title: "My Hero Academia", meta: "Season 7", score: 8.2, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1540224769541-7e6e96a7fd33?q=80&w=600&auto=format&fit=crop", slug: "my-hero-academia" },
];

const classicAnime = [
  { id: "ca-1", title: "Death Note", meta: "37 Episodes", score: 9.0, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop", slug: "death-note" },
  { id: "ca-2", title: "Steins;Gate", meta: "24 Episodes", score: 9.1, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop", slug: "steins-gate" },
  { id: "ca-3", title: "Fullmetal Alchemist", meta: "64 Episodes", score: 9.2, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop", slug: "fullmetal-alchemist" },
  { id: "ca-4", title: "Code Geass", meta: "50 Episodes", score: 8.7, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop", slug: "code-geass" },
  { id: "ca-5", title: "Hunter x Hunter", meta: "148 Episodes", score: 9.0, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=600&auto=format&fit=crop", slug: "hunter-x-hunter" },
  { id: "ca-6", title: "Cowboy Bebop", meta: "26 Episodes", score: 8.9, isSubbed: true, isDubbed: true, posterUrl: "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=600&auto=format&fit=crop", slug: "cowboy-bebop" },
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

function FireIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 23c-4.97 0-9-3.58-9-8 0-2.52 1.08-4.27 2.34-5.77.85-.97 1.83-1.93 2.73-2.83A54.3 54.3 0 0010 4.34c.62-.65 1.2-1.26 1.71-1.83l.5-.56.51.56c.51.57 1.09 1.18 1.71 1.83.83.87 1.75 1.83 2.57 2.83l.16.19c1.21 1.42 2.84 3.33 2.84 6.64 0 4.42-4.03 8-9 8zm0-18.27c-.35.38-.73.79-1.13 1.21a52.3 52.3 0 00-1.91 2.05c-.88.87-1.82 1.8-2.64 2.74C5.2 11.86 5 13.44 5 15c0 3.31 3.13 6 7 6s7-2.69 7-6c0-2.56-1.13-3.87-2.29-5.24l-.15-.18c-.79-.97-1.69-1.9-2.56-2.77-.61-.64-1.2-1.26-1.71-1.83-.17-.19-.34-.37-.5-.56-.16.19-.33.37-.5.56-.17.19-.34.38-.5.57z" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Local badge components
 * ──────────────────────────────────────────────────────────────────────────── */

function SubDubBadge({ isSubbed, isDubbed }: { isSubbed?: boolean; isDubbed?: boolean }) {
  if (!isSubbed && !isDubbed) return null;
  return (
    <span className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide backdrop-blur-sm">
      {isSubbed && isDubbed ? "Sub | Dub" : isSubbed ? "Sub" : "Dub"}
    </span>
  );
}

function AiringBadge({ status }: { status?: string }) {
  if (status !== "airing") return null;
  return (
    <span className="flex items-center gap-1 rounded bg-green-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-green-400">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
      Airing
    </span>
  );
}

function SeasonalBadges({ status, isSubbed, isDubbed }: { status?: string; isSubbed?: boolean; isDubbed?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 items-end">
      <AiringBadge status={status} />
      <SubDubBadge isSubbed={isSubbed} isDubbed={isDubbed} />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * Local presentational components (custom layouts)
 * ──────────────────────────────────────────────────────────────────────────── */

function TopAiringCard({ item }: { item: (typeof topAiring)[number] }) {
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
          <span>{item.episodes}</span>
          <span className="flex items-center gap-0.5 text-yellow-500">
            <StarIcon className="h-2.5 w-2.5" />
            {item.score}
          </span>
        </div>
      </div>
    </Link>
  );
}

function LatestEpisodeCard({ item }: { item: (typeof latestEpisodes)[number] }) {
  return (
    <Link
      href={`/watch/${item.slug}`}
      className="group flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-200 hover:bg-white/[0.05] hover:border-white/[0.1]"
    >
      <div className="relative h-[80px] w-[140px] flex-shrink-0 overflow-hidden rounded-xl bg-[#0d121f]">
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
            <PlayIcon className="ml-0.5 h-4 w-4 text-white" />
          </div>
        </div>
        <div className="absolute bottom-1.5 right-1.5">
          <span className="rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-medium text-white/90 backdrop-blur-sm">
            {item.duration}
          </span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="mb-1 flex items-center gap-2">
          <SubDubBadge isSubbed={item.isSubbed} isDubbed={item.isDubbed} />
        </div>
        <h4 className="truncate text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">
          {item.title}
        </h4>
        <p className="mt-0.5 truncate text-xs text-violet-400">{item.episode}</p>
        <span className="mt-1.5 text-[10px] uppercase tracking-wider text-white/30">
          {item.airedAt}
        </span>
      </div>
    </Link>
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

const heroAnime = mockMedia.find((m) => m.kind === "anime") ?? mockMedia[0];

/* ────────────────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────────────────── */

export default function AnimePage() {
  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ─── Hero Banner ──────────────────────────────────────────── */}
      <section className="relative -mt-16 h-[75vh] w-full overflow-hidden sm:h-[80vh] lg:h-[88vh]">
        <img
          src={heroAnime.backdropUrl}
          alt={heroAnime.title}
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
            <span className="rounded bg-violet-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
              Anime
            </span>
            <span className="flex items-center gap-1.5 rounded bg-gradient-to-r from-orange-500/90 to-red-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
              <FireIcon className="h-3 w-3" />
              #1 This Season
            </span>
            {heroAnime.studio && (
              <span className="rounded border border-white/20 px-2 py-0.5 text-[10px] font-medium text-white/70">
                {heroAnime.studio}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mb-3 text-4xl font-bold leading-[1.05] tracking-tighter sm:text-5xl lg:text-7xl">
            {heroAnime.title.split(" ").map((word, i, arr) =>
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
            <span>{heroAnime.year}</span>
            <span className="rounded border border-white/20 px-1.5 py-px text-[10px] font-medium">
              {heroAnime.rating}
            </span>
            {heroAnime.seasonCount && (
              <span>
                {heroAnime.seasonCount} {heroAnime.seasonCount === 1 ? "Season" : "Seasons"}
              </span>
            )}
            {heroAnime.episodeCount && (
              <span>{heroAnime.episodeCount} Episodes</span>
            )}
            {(heroAnime.isSubbed || heroAnime.isDubbed) && (
              <span className="rounded bg-white/10 px-2 py-0.5 text-xs">
                {heroAnime.isSubbed && heroAnime.isDubbed ? "Sub & Dub" : heroAnime.isSubbed ? "Subbed" : "Dubbed"}
              </span>
            )}
            {heroAnime.genres.slice(0, 2).map((g) => (
              <span key={g} className="rounded bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300">
                {g}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mb-6 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/60 sm:line-clamp-3 sm:text-base lg:text-lg">
            {heroAnime.description}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href={`/watch/${heroAnime.slug}`}
              className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-white/90 hover:scale-[1.02] sm:px-8 sm:py-3.5"
            >
              <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Watch Now
            </Link>
            <Link
              href={`/title/${heroAnime.slug}`}
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

        {/* ── Seasonal Highlights ──────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              eyebrow="Winter 2026"
              title="Seasonal Highlights"
              actionLabel="View All"
              actionHref="/browse?season=winter-2026"
            />
            <div className={`${scrollRow} lg:gap-5`}>
              {seasonalHighlights.map((item) => (
                <div key={item.id} className="w-[150px] flex-shrink-0 lg:w-[180px]">
                  <MediaPosterCard
                    slug={item.slug}
                    title={item.title}
                    posterUrl={item.posterUrl}
                    badge={<SeasonalBadges status={item.status} isSubbed={item.isSubbed} isDubbed={item.isDubbed} />}
                    badgePosition="top-right"
                    hoverVariant="cta"
                    ctaLabel="Play"
                    meta={`${item.season} · ${item.studio}`}
                  />
                </div>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Top Airing ───────────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              eyebrow="Hot"
              title="Top Airing"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {topAiring.map((item) => (
                <TopAiringCard key={item.id} item={item} />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Latest Episodes ──────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              eyebrow="Just Released"
              title="Latest Episodes"
              actionLabel="See All"
              actionHref="/browse?sort=latest"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {latestEpisodes.map((item) => (
                <LatestEpisodeCard key={item.id} item={item} />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Browse by Genre / Studio / Theme ─────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader title="Browse by" />
            <div className="space-y-4">
              {/* Genres */}
              <div>
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Genre
                </p>
                <div className={`${scrollRow} gap-2.5 pb-2`}>
                  {genreChips.map((chip, i) => (
                    <GenreChip key={chip} label={chip} active={i === 0} />
                  ))}
                </div>
              </div>
              {/* Studios */}
              <div>
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Studio
                </p>
                <div className={`${scrollRow} gap-2.5 pb-2`}>
                  {studioChips.map((chip) => (
                    <GenreChip key={chip} label={chip} />
                  ))}
                </div>
              </div>
              {/* Themes */}
              <div>
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Theme
                </p>
                <div className={`${scrollRow} gap-2.5 pb-2`}>
                  {themeChips.map((chip) => (
                    <GenreChip key={chip} label={chip} />
                  ))}
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* ── Discover Anime ───────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              title="Popular Right Now"
              actionLabel="Browse All"
              actionHref="/browse?kind=anime"
            />
            <div className={`${scrollRow} lg:gap-5`}>
              {discoverAnime.map((item) => (
                <div key={item.id} className="w-[140px] flex-shrink-0 lg:w-[165px]">
                  <MediaPosterCard
                    slug={item.slug}
                    title={item.title}
                    posterUrl={item.posterUrl}
                    badge={<SubDubBadge isSubbed={item.isSubbed} isDubbed={item.isDubbed} />}
                    badgePosition="top-right"
                    hoverVariant="cta"
                    ctaLabel="Play"
                    meta={item.meta}
                  />
                </div>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Classic Anime ────────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              eyebrow="All-Time Favorites"
              title="Classic Anime"
            />
            <div className={`${scrollRow} lg:gap-5`}>
              {classicAnime.map((item) => (
                <div key={item.id} className="w-[140px] flex-shrink-0 lg:w-[165px]">
                  <MediaPosterCard
                    slug={item.slug}
                    title={item.title}
                    posterUrl={item.posterUrl}
                    badge={<SubDubBadge isSubbed={item.isSubbed} isDubbed={item.isDubbed} />}
                    badgePosition="top-right"
                    hoverVariant="cta"
                    ctaLabel="Play"
                    meta={item.meta}
                  />
                </div>
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── From mockMedia ───────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader title="Featured on Astra" />
            <div className={`${scrollRow} lg:gap-5`}>
              {mockMedia
                .filter((m) => m.kind === "anime")
                .map((item) => (
                  <div key={item.id} className="w-[140px] flex-shrink-0 lg:w-[165px]">
                    <MediaPosterCard
                      slug={item.slug}
                      title={item.title}
                      posterUrl={item.posterUrl}
                      badge={<SubDubBadge isSubbed={item.isSubbed} isDubbed={item.isDubbed} />}
                      badgePosition="top-right"
                      hoverVariant="cta"
                      ctaLabel="Play"
                      meta={item.seasonLabel ?? String(item.year)}
                    />
                  </div>
                ))}
            </div>
          </PageContainer>
        </section>
      </div>
    </main>
  );
}
