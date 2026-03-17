/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { PageContainer } from "@/components/shared/PageContainer";
import { mockMedia } from "@/lib/data/mock-media";

/* ────────────────────────────────────────────────────────────────────────
 * Local fixture data
 * ──────────────────────────────────────────────────────────────────────── */

const continueWatching = [
  {
    id: "cw-1",
    title: "Cyberpunk: Edgerunners",
    episode: "S1:E8",
    remaining: "4 min left",
    progress: 65,
    imageUrl:
      "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=800&auto=format&fit=crop",
    slug: "cyberpunk-edgerunners",
  },
  {
    id: "cw-2",
    title: "The Dark Knight",
    episode: "Movie",
    remaining: "1h 42m left",
    progress: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop",
    slug: "the-dark-knight",
  },
  {
    id: "cw-3",
    title: "Arcane",
    episode: "S1:E9",
    remaining: "2 min left",
    progress: 92,
    imageUrl:
      "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop",
    slug: "arcane",
  },
  {
    id: "cw-4",
    title: "Interstellar",
    episode: "Movie",
    remaining: "55 min left",
    progress: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop",
    slug: "interstellar",
  },
];

const trendingAnime = [
  { id: "ta-1", title: "Jujutsu Kaisen", meta: "S2 · 24 Ep", slug: "jujutsu-kaisen", badge: "Sub | Dub", posterUrl: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?q=80&w=600&auto=format&fit=crop" },
  { id: "ta-2", title: "Demon Slayer", meta: "S4 · 11 Ep", slug: "demon-slayer", posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop" },
  { id: "ta-3", title: "Attack on Titan", meta: "Final Season", slug: "attack-on-titan", posterUrl: "https://images.unsplash.com/photo-1560972550-aba3456e5fa1?q=80&w=600&auto=format&fit=crop" },
  { id: "ta-4", title: "Vinland Saga", meta: "S2 · 24 Ep", slug: "vinland-saga", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop" },
  { id: "ta-5", title: "Chainsaw Man", meta: "S1 · 12 Ep", slug: "chainsaw-man", posterUrl: "https://images.unsplash.com/photo-1611457194403-d3f8c5d68db1?q=80&w=600&auto=format&fit=crop" },
  { id: "ta-6", title: "One Piece", meta: "Ep 1089", slug: "one-piece", posterUrl: "https://images.unsplash.com/photo-1607604276583-3d22aa77eb82?q=80&w=600&auto=format&fit=crop" },
];

const categoryPills = [
  "Trending Now",
  "Action & Adventure",
  "Fantasy",
  "Shonen",
  "Cyberpunk",
  "Sci-Fi Thrillers",
  "Top Airing",
];

const popularMovies = [
  { id: "pm-1", title: "The Shawshank Redemption", year: "1994", genre: "Drama", posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=600&auto=format&fit=crop", slug: "shawshank-redemption" },
  { id: "pm-2", title: "Inception", year: "2010", genre: "Sci-Fi", posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=600&auto=format&fit=crop", slug: "inception" },
  { id: "pm-3", title: "Pulp Fiction", year: "1994", genre: "Crime", posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop", slug: "pulp-fiction" },
  { id: "pm-4", title: "The Dark Knight", year: "2008", genre: "Action", posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop", slug: "the-dark-knight" },
  { id: "pm-5", title: "The Prestige", year: "2006", genre: "Mystery", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", slug: "the-prestige" },
  { id: "pm-6", title: "The Matrix", year: "1999", genre: "Action", posterUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop", slug: "the-matrix" },
];

const latestEpisodes = [
  { id: "le-1", title: "One Piece: Egghead Island Arc", episode: "Ep 1089 · Entering a New Chapter", time: "12 min ago", imageUrl: "https://images.unsplash.com/photo-1540224769541-7e6e96a7fd33?q=80&w=400&auto=format&fit=crop", slug: "one-piece" },
  { id: "le-2", title: "Bleach: TYBW", episode: "Ep 26 · Black", time: "2 hours ago", imageUrl: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=400&auto=format&fit=crop", slug: "bleach-tybw" },
  { id: "le-3", title: "Spy x Family", episode: "S2:E12 · Part of the Family", time: "5 hours ago", imageUrl: "https://images.unsplash.com/photo-1620336655055-088d06e76fc0?q=80&w=400&auto=format&fit=crop", slug: "spy-x-family" },
];

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
      <section className="relative -mt-16 h-[80vh] w-full overflow-hidden sm:h-[85vh] lg:h-[92vh]">
        <img
          src={hero.backdropUrl}
          alt={hero.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dual gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to top, #050811 0%, rgba(5,8,17,0.5) 50%, rgba(5,8,17,0) 100%)",
              "linear-gradient(to right, #050811 0%, rgba(5,8,17,0.6) 35%, transparent 100%)",
            ].join(", "),
          }}
        />

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
            <SectionHeader>Trending Anime</SectionHeader>
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

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="border-t border-white/[0.05] pt-8">
          <PageContainer className="flex flex-col items-center justify-between gap-4 pb-8 sm:flex-row">
            <span className="text-base font-semibold tracking-tight text-white/80">
              Astra
            </span>
            <nav className="flex flex-wrap justify-center gap-5 text-sm text-white/40">
              <Link href="/anime" className="transition-colors hover:text-white">Anime</Link>
              <Link href="/series" className="transition-colors hover:text-white">Series</Link>
              <Link href="/movies" className="transition-colors hover:text-white">Movies</Link>
              <Link href="/my-list" className="transition-colors hover:text-white">My List</Link>
            </nav>
            <p className="text-xs text-white/20">
              © 2025 Astra. All rights reserved.
            </p>
          </PageContainer>
        </footer>
      </div>
    </main>
  );
}
