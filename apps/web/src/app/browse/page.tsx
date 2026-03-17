/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { mockMedia } from "@/lib/data/mock-media";

/* ── local browse card data ──────────────────────────────── */

interface BrowseCard {
  slug: string;
  title: string;
  posterUrl: string;
  kind: string;
  year: number;
  rating: number;
  genres: string[];
}

const extraCards: BrowseCard[] = [
  { slug: "jujutsu-kaisen", title: "Jujutsu Kaisen", posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop", kind: "anime", year: 2023, rating: 8.7, genres: ["Action", "Fantasy"] },
  { slug: "demon-slayer", title: "Demon Slayer", posterUrl: "https://images.unsplash.com/photo-1611457194403-d3f8c5514477?q=80&w=800&auto=format&fit=crop", kind: "anime", year: 2024, rating: 8.6, genres: ["Action", "Fantasy"] },
  { slug: "attack-on-titan", title: "Attack on Titan", posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=800&auto=format&fit=crop", kind: "anime", year: 2023, rating: 9.1, genres: ["Action", "Drama"] },
  { slug: "vinland-saga", title: "Vinland Saga", posterUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=800&auto=format&fit=crop", kind: "anime", year: 2023, rating: 8.8, genres: ["Action", "Adventure"] },
  { slug: "chainsaw-man", title: "Chainsaw Man", posterUrl: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=800&auto=format&fit=crop", kind: "anime", year: 2022, rating: 8.4, genres: ["Action", "Horror"] },
  { slug: "inception", title: "Inception", posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop", kind: "movie", year: 2010, rating: 8.8, genres: ["Sci-Fi", "Action"] },
  { slug: "the-dark-knight", title: "The Dark Knight", posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800&auto=format&fit=crop", kind: "movie", year: 2008, rating: 9.0, genres: ["Action", "Crime"] },
];

const browseCards: BrowseCard[] = [
  ...mockMedia.map((m) => ({
    slug: m.slug,
    title: m.title,
    posterUrl: m.posterUrl,
    kind: m.kind,
    year: m.year,
    rating: m.kind === "anime" ? 8.5 : m.kind === "movie" ? 8.3 : 8.1,
    genres: m.genres,
  })),
  ...extraCards,
];

const subGenres = ["Shonen", "Superhero", "Martial Arts", "Military", "Samurai"];
const ratingFilters = ["4.5 & Up", "4.0 & Up", "3.0 & Up"];
const sortOptions = ["Trending Now", "Latest Releases", "Top Rated", "A – Z"];

/* ── inline SVG icons ────────────────────────────────────── */

function FilterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function GridIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function ListIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
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

function PlayCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ── browse card ─────────────────────────────────────────── */

function BrowseCardItem({ card }: { card: BrowseCard }) {
  const kindLabel =
    card.kind === "anime" ? "Anime" : card.kind === "movie" ? "Movie" : "Series";

  return (
    <Link
      href={`/title/${card.slug}`}
      className="group cursor-pointer block"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-white/[0.06] hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-shadow duration-300">
        <img
          src={card.posterUrl}
          alt={card.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="w-full bg-white text-black py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 mb-2">
            <PlayCircleIcon className="w-4 h-4" />
            Play
          </span>
          <span className="w-full bg-white/20 backdrop-blur-md text-white py-2 rounded-lg text-xs font-bold text-center">
            Details
          </span>
        </div>
      </div>
      <h3 className="font-medium text-sm lg:text-base group-hover:text-violet-400 transition-colors line-clamp-1">
        {card.title}
      </h3>
      <div className="flex items-center gap-2 text-[10px] text-white/40">
        <span className="flex items-center gap-0.5 text-yellow-500">
          <StarIcon className="w-2.5 h-2.5" />
          {card.rating.toFixed(1)}
        </span>
        <span>
          {kindLabel} &middot; {card.year}
        </span>
      </div>
    </Link>
  );
}

/* ── page ─────────────────────────────────────────────────── */

export default function BrowsePage() {
  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ── hero banner ──────────────────────────────── */}
      <section className="relative h-[50vh] lg:h-[60vh] w-full overflow-hidden -mt-16">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop"
          alt="Action & Adventure Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* dual gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #050811 0%, rgba(5,8,17,0.4) 40%, rgba(5,8,17,0) 100%), linear-gradient(to right, #050811 0%, rgba(5,8,17,0.6) 30%, rgba(5,8,17,0) 100%)",
          }}
        />
        <div className="relative h-full flex flex-col justify-end px-4 sm:px-6 lg:px-10 pb-16 lg:pb-24 max-w-4xl">
          <span className="text-fuchsia-400 font-bold tracking-widest uppercase text-xs mb-2">
            Browsing Collection
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 tracking-tighter leading-tight">
            ACTION &amp;{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              ADVENTURE
            </span>
          </h1>
          <p className="text-white/60 text-base lg:text-lg max-w-2xl leading-relaxed">
            High-octane battles, epic journeys, and legendary heroes. Explore
            the finest adrenaline-fueled stories in our collection.
          </p>
        </div>
      </section>

      {/* ── content area ─────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-10 py-12 flex flex-col lg:flex-row gap-8 max-w-[1440px] mx-auto">
        {/* ── sidebar (desktop) ──────────────────────── */}
        <aside className="w-full lg:w-72 shrink-0 space-y-8">
          {/* heading */}
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FilterIcon className="w-5 h-5 text-violet-500" />
            Filters
          </h3>

          <div className="space-y-6">
            {/* sort by */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Sort By
              </label>
              <div className="relative">
                <select className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/50 appearance-none text-white">
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0d121f]">
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              </div>
            </div>

            {/* sub-genres */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Sub-Genres
              </label>
              <div className="flex flex-col gap-2.5 text-sm text-white/60">
                {subGenres.map((genre, i) => (
                  <label
                    key={genre}
                    className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={i === 0}
                      className="w-4 h-4 rounded border-white/10 accent-violet-500"
                    />
                    {genre}
                  </label>
                ))}
              </div>
            </div>

            {/* release year */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Release Year
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="From"
                  className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                />
                <input
                  type="text"
                  placeholder="To"
                  className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                />
              </div>
            </div>

            {/* rating */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Rating
              </label>
              <div className="flex flex-col gap-2.5 text-sm text-white/60">
                {ratingFilters.map((rf) => (
                  <label
                    key={rf}
                    className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors"
                  >
                    <input
                      type="radio"
                      name="rating"
                      className="accent-violet-500"
                    />
                    {rf}
                  </label>
                ))}
              </div>
            </div>

            {/* content type chips */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                Content Type
              </label>
              <div className="flex flex-wrap gap-2">
                {["All", "Anime", "Series", "Movies"].map((ct, i) => (
                  <span
                    key={ct}
                    className={`text-xs px-3.5 py-1.5 rounded-full cursor-pointer transition-colors ${
                      i === 0
                        ? "bg-violet-600 text-white font-semibold"
                        : "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {ct}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* apply button */}
          <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all">
            Apply Filters
          </button>
        </aside>

        {/* ── results area ───────────────────────────── */}
        <div className="flex-1 space-y-8">
          {/* toolbar */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold">
              <span className="text-white/40 font-normal">
                {browseCards.length * 24}&nbsp;
              </span>
              Titles Found
            </h2>
            <div className="flex gap-2">
              <button className="p-2 bg-white/[0.06] border border-white/[0.08] rounded-lg text-violet-400">
                <GridIcon className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white/[0.04] border border-transparent rounded-lg text-white/30 hover:text-white/60 transition-colors">
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* results grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 lg:gap-6">
            {browseCards.map((card) => (
              <BrowseCardItem key={card.slug} card={card} />
            ))}
          </div>

          {/* pagination */}
          <div className="pt-8 flex justify-center items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/30 cursor-not-allowed">
              <ChevronLeftIcon />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
                  n === 1
                    ? "bg-violet-600 text-white"
                    : "bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {n}
              </button>
            ))}
            <span className="text-white/30 px-1">&hellip;</span>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors font-bold text-sm">
              24
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors">
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
