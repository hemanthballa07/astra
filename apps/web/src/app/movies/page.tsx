/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeader } from "@/components/shared/section-header";
import { mockMedia } from "@/lib/data/mock-media";

/* ────────────────────────────────────────────────────────────────────────────
 * Local movie fixture data
 * ──────────────────────────────────────────────────────────────────────────── */

const trendingMovies = [
  { id: "tm-1", rank: 1, title: "Dune: Part Two", runtime: "2h 46m", score: 8.8, year: 2024, posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", slug: "dune-part-two" },
  { id: "tm-2", rank: 2, title: "Oppenheimer", runtime: "3h 1m", score: 8.9, year: 2023, posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", slug: "oppenheimer" },
  { id: "tm-3", rank: 3, title: "Spider-Verse", runtime: "2h 20m", score: 8.7, year: 2023, posterUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", slug: "spider-man-across-the-spider-verse" },
  { id: "tm-4", rank: 4, title: "The Batman", runtime: "2h 56m", score: 8.5, year: 2022, posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fvber9suvzl3VuAW.jpg", slug: "the-batman" },
  { id: "tm-5", rank: 5, title: "Everything Everywhere", runtime: "2h 19m", score: 8.6, year: 2022, posterUrl: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", slug: "everything-everywhere" },
];

const blockbusters = [
  { id: "bb-1", title: "Avatar: The Way of Water", meta: "2022 · 3h 12m", score: 7.8, genre: "Sci-Fi", posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", slug: "avatar-way-of-water" },
  { id: "bb-2", title: "Top Gun: Maverick", meta: "2022 · 2h 11m", score: 8.6, genre: "Action", posterUrl: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg", slug: "top-gun-maverick" },
  { id: "bb-3", title: "Black Panther: Wakanda Forever", meta: "2022 · 2h 41m", score: 7.3, genre: "Action", posterUrl: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", slug: "black-panther-wakanda" },
  { id: "bb-4", title: "Jurassic World Dominion", meta: "2022 · 2h 27m", score: 5.7, genre: "Adventure", posterUrl: "https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg", slug: "jurassic-world-dominion" },
  { id: "bb-5", title: "The Super Mario Bros. Movie", meta: "2023 · 1h 32m", score: 7.1, genre: "Animation", posterUrl: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", slug: "super-mario-bros" },
  { id: "bb-6", title: "Guardians of the Galaxy Vol. 3", meta: "2023 · 2h 30m", score: 8.1, genre: "Action", posterUrl: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg", slug: "guardians-vol-3" },
];

const criticallyAcclaimed = [
  { id: "ca-1", title: "Oppenheimer", meta: "Christopher Nolan", score: 8.9, awards: "7 Oscars", posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", slug: "oppenheimer" },
  { id: "ca-2", title: "Poor Things", meta: "Yorgos Lanthimos", score: 8.0, awards: "4 Oscars", posterUrl: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3RYvdyJe0EWz.jpg", slug: "poor-things" },
  { id: "ca-3", title: "The Zone of Interest", meta: "Jonathan Glazer", score: 7.4, awards: "2 Oscars", posterUrl: "https://image.tmdb.org/t/p/w500/hUu9zyZmDd8VZegKi1iK1Vk0RYS.jpg", slug: "zone-of-interest" },
  { id: "ca-4", title: "Past Lives", meta: "Celine Song", score: 8.2, awards: "2 Nominations", posterUrl: "https://image.tmdb.org/t/p/w500/rzO71VFu7CpJMfF5TQNMj0d1lSV.jpg", slug: "past-lives" },
  { id: "ca-5", title: "Killers of the Flower Moon", meta: "Martin Scorsese", score: 7.8, awards: "10 Nominations", posterUrl: "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg", slug: "killers-flower-moon" },
  { id: "ca-6", title: "American Fiction", meta: "Cord Jefferson", score: 7.6, awards: "1 Oscar", posterUrl: "https://image.tmdb.org/t/p/w500/57Wna3bXfkSGlASJMCz3XDNiFfk.jpg", slug: "american-fiction" },
];

const genreChips = ["Action", "Sci-Fi", "Drama", "Comedy", "Thriller", "Horror", "Romance", "Animation"];
const moodChips = ["Feel-Good", "Mind-Bending", "Tear-Jerker", "Adrenaline Rush", "Date Night", "Family Friendly"];

const lateNightPicks = [
  { id: "ln-1", title: "The Substance", meta: "2024 · Horror", score: 7.4, posterUrl: "https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6lnqBwSFUWr.jpg", slug: "the-substance" },
  { id: "ln-2", title: "A Quiet Place: Day One", meta: "2024 · Horror", score: 7.0, posterUrl: "https://image.tmdb.org/t/p/w500/hU42CRk14JuPEdqZG3AWmagiPAP.jpg", slug: "quiet-place-day-one" },
  { id: "ln-3", title: "Civil War", meta: "2024 · Action", score: 7.1, posterUrl: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg", slug: "civil-war" },
  { id: "ln-4", title: "Monkey Man", meta: "2024 · Action", score: 7.0, posterUrl: "https://image.tmdb.org/t/p/w500/b2YTF8EwvAI9HQKaGPPSQXzE4xO.jpg", slug: "monkey-man" },
  { id: "ln-5", title: "Challengers", meta: "2024 · Drama", score: 7.6, posterUrl: "https://image.tmdb.org/t/p/w500/H6vke7zGiuLsz4v4RPFPMe2j3e5.jpg", slug: "challengers" },
  { id: "ln-6", title: "Love Lies Bleeding", meta: "2024 · Thriller", score: 7.2, posterUrl: "https://image.tmdb.org/t/p/w500/p7JvZxiMBcR4Vzo1R0E0JVQniWf.jpg", slug: "love-lies-bleeding" },
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

/* ────────────────────────────────────────────────────────────────────────────
 * Local presentational components
 * ──────────────────────────────────────────────────────────────────────────── */

function TrendingCard({ item }: { item: (typeof trendingMovies)[number] }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-200 hover:bg-white/[0.05] hover:border-white/[0.1]"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-lg font-bold text-black">
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
        <h4 className="truncate text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
          {item.title}
        </h4>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-white/40">
          <span>{item.year}</span>
          <span className="text-white/20">·</span>
          <span>{item.runtime}</span>
          <span className="flex items-center gap-0.5 text-yellow-500">
            <StarIcon className="h-2.5 w-2.5" />
            {item.score}
          </span>
        </div>
      </div>
    </Link>
  );
}

function MovieCard({
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
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d121f] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(251,191,36,0.15)]">
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
        <h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-amber-400">
          {title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-white/50">
          <span>{meta}</span>
          <span className="flex items-center gap-0.5 text-yellow-500">
            <StarIcon className="h-2.5 w-2.5" />
            {score}
          </span>
        </div>
        <p className="mt-0.5 text-[10px] text-amber-400/70">{genre}</p>
      </div>
    </Link>
  );
}

function AcclaimedCard({ item }: { item: (typeof criticallyAcclaimed)[number] }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="group w-[150px] flex-shrink-0 lg:w-[175px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d121f] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(251,191,36,0.2)]">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2">
          <span className="flex items-center gap-1 rounded bg-gradient-to-r from-amber-500 to-yellow-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black">
            <TrophyIcon className="h-2.5 w-2.5" />
            {item.awards}
          </span>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-lg bg-white py-1.5 text-center text-xs font-bold text-black">
            Watch Now
          </span>
        </div>
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-amber-400">
          {item.title}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-[11px] text-white/50">
          <span>{item.meta}</span>
          <span className="flex items-center gap-0.5 text-yellow-500">
            <StarIcon className="h-2.5 w-2.5" />
            {item.score}
          </span>
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
          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/20"
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

const heroMovie = mockMedia.find((m) => m.kind === "movie" && m.slug === "dune-part-two") ?? mockMedia.find((m) => m.kind === "movie") ?? mockMedia[0];

/* ────────────────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────────────────── */

export default function MoviesPage() {
  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ─── Hero Banner ──────────────────────────────────────────── */}
      <section className="relative -mt-16 h-[75vh] w-full overflow-hidden sm:h-[80vh] lg:h-[88vh]">
        <img
          src={heroMovie.backdropUrl}
          alt={heroMovie.title}
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
            <span className="rounded bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
              Movie
            </span>
            <span className="flex items-center gap-1.5 rounded bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
              <TrendingIcon className="h-3 w-3" />
              #1 Worldwide
            </span>
            {heroMovie.rating && (
              <span className="rounded border border-white/20 px-2 py-0.5 text-[10px] font-medium text-white/70">
                {heroMovie.rating}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mb-3 text-4xl font-bold leading-[1.05] tracking-tighter sm:text-5xl lg:text-7xl">
            {heroMovie.title.split(":").map((part, i, arr) =>
              i === arr.length - 1 && arr.length > 1 ? (
                <span key={i}>
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    {part.trim()}
                  </span>
                </span>
              ) : arr.length > 1 ? (
                <span key={i}>{part}: </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h1>

          {/* Meta row */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/70 lg:gap-3">
            <span>{heroMovie.year}</span>
            {heroMovie.runtime && (
              <>
                <span className="text-white/30">·</span>
                <span>{heroMovie.runtime}</span>
              </>
            )}
            {heroMovie.genres.map((g) => (
              <span key={g} className="rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                {g}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="mb-6 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/60 sm:line-clamp-3 sm:text-base lg:text-lg">
            {heroMovie.description}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href={`/watch/${heroMovie.slug}`}
              className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-white/90 hover:scale-[1.02] sm:px-8 sm:py-3.5"
            >
              <PlayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              Watch Now
            </Link>
            <Link
              href={`/title/${heroMovie.slug}`}
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

        {/* ── Trending Movies ──────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              eyebrow="This Week"
              title="Trending Movies"
            />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {trendingMovies.map((item) => (
                <TrendingCard key={item.id} item={item} />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Blockbusters ─────────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              eyebrow="Box Office Hits"
              title="Blockbusters"
              actionLabel="View All"
              actionHref="/browse?kind=movie&sort=popular"
            />
            <div className={`${scrollRow} lg:gap-5`}>
              {blockbusters.map((item) => (
                <MovieCard
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

        {/* ── Critically Acclaimed ─────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              eyebrow="Award Winners"
              title="Critically Acclaimed"
              actionLabel="See All"
              actionHref="/browse?kind=movie&award=true"
            />
            <div className={`${scrollRow} lg:gap-5`}>
              {criticallyAcclaimed.map((item) => (
                <AcclaimedCard key={item.id} item={item} />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Browse by Genre / Mood ───────────────────────────────── */}
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
                    <Chip key={chip} active={i === 0}>
                      {chip}
                    </Chip>
                  ))}
                </div>
              </div>
              {/* Moods */}
              <div>
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Mood
                </p>
                <div className={`${scrollRow} gap-2.5 pb-2`}>
                  {moodChips.map((chip) => (
                    <Chip key={chip}>{chip}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* ── Late Night Picks ─────────────────────────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader
              eyebrow="After Hours"
              title="Late Night Picks"
            />
            <div className={`${scrollRow} lg:gap-5`}>
              {lateNightPicks.map((item) => (
                <MovieCard
                  key={item.id}
                  title={item.title}
                  meta={item.meta}
                  score={item.score}
                  genre=""
                  posterUrl={item.posterUrl}
                  slug={item.slug}
                />
              ))}
            </div>
          </PageContainer>
        </section>

        {/* ── Featured on Astra (from mockMedia) ───────────────────── */}
        <section>
          <PageContainer>
            <SectionHeader title="Featured on Astra" />
            <div className={`${scrollRow} lg:gap-5`}>
              {mockMedia
                .filter((m) => m.kind === "movie")
                .map((item) => (
                  <MovieCard
                    key={item.id}
                    title={item.title}
                    meta={`${item.year}${item.runtime ? ` · ${item.runtime}` : ""}`}
                    score={8.5}
                    genre={item.genres[0] ?? ""}
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
