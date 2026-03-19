/* eslint-disable @next/next/no-img-element */
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { Footer } from "@/components/navigation/Footer";
import { MediaPosterCard } from "@/components/media/media-poster-card";
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
const ratingFilters = ["4.5+", "4.0+", "3.5+"];
const sortOptions = ["Trending Now", "Latest Releases", "Top Rated", "A – Z"];
const contentTypes = ["All", "Anime", "Series", "Movies"];

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

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── filter section ─────────────────────────────────────────── */

function FilterSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold uppercase tracking-widest text-white/35">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ── rating badge ─────────────────────────────────────────── */

function RatingBadge({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[10px] font-bold text-yellow-400">
      <StarIcon className="w-2.5 h-2.5" />
      {rating.toFixed(1)}
    </span>
  );
}

/* ── helpers ─────────────────────────────────────────────── */

function getKindLabel(kind: string): string {
  return kind === "anime" ? "Anime" : kind === "movie" ? "Movie" : "Series";
}

/* ── page ─────────────────────────────────────────────────── */

export default function BrowsePage() {
  const totalResults = browseCards.length * 24;

  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ── hero banner ──────────────────────────────── */}
      <section className="relative h-[45vh] lg:h-[55vh] w-full overflow-hidden -mt-16">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop"
          alt="Action & Adventure Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050811]/90 via-[#050811]/40 to-transparent" />

        <div className="relative h-full flex flex-col justify-end px-4 sm:px-6 lg:px-10 pb-12 lg:pb-16 max-w-3xl">
          <span className="inline-flex items-center gap-2 text-violet-400 font-semibold text-xs mb-3 tracking-wide">
            <span className="w-8 h-px bg-violet-400" />
            COLLECTION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tracking-tight leading-[1.1]">
            Action &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Adventure
            </span>
          </h1>
          <p className="text-white/50 text-sm lg:text-base max-w-xl leading-relaxed">
            High-octane battles, epic journeys, and legendary heroes. Explore
            adrenaline-fueled stories in our curated collection.
          </p>
        </div>
      </section>

      {/* ── content area ─────────────────────────────── */}
      <div className="px-4 sm:px-6 lg:px-10 py-10 flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto">
        {/* ── sidebar (desktop) ──────────────────────── */}
        <aside className="w-full lg:w-64 shrink-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <FilterIcon className="w-4 h-4 text-violet-500" />
              Filters
            </h3>
            <button className="text-xs text-white/40 hover:text-white transition-colors">
              Reset
            </button>
          </div>

          <div className="space-y-6">
            {/* Sort by */}
            <FilterSection label="Sort By">
              <div className="relative">
                <select className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-violet-500/50 appearance-none text-white/80 transition-colors">
                  {sortOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0d121f]">
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </FilterSection>

            {/* Divider */}
            <div className="h-px bg-white/[0.05]" />

            {/* Content type */}
            <FilterSection label="Type">
              <div className="flex flex-wrap gap-2">
                {contentTypes.map((ct, i) => (
                  <button
                    key={ct}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                      i === 0
                        ? "bg-violet-600 text-white font-medium shadow-sm"
                        : "bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:border-white/15"
                    }`}
                  >
                    {ct}
                  </button>
                ))}
              </div>
            </FilterSection>

            {/* Divider */}
            <div className="h-px bg-white/[0.05]" />

            {/* Sub-genres */}
            <FilterSection label="Sub-Genres">
              <div className="space-y-2">
                {subGenres.map((genre, i) => (
                  <label
                    key={genre}
                    className="flex items-center gap-2.5 text-sm text-white/60 cursor-pointer hover:text-white transition-colors group"
                  >
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        i === 0
                          ? "bg-violet-600 border-violet-600"
                          : "border-white/20 group-hover:border-white/40"
                      }`}
                    >
                      {i === 0 && (
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    {genre}
                  </label>
                ))}
              </div>
            </FilterSection>

            {/* Divider */}
            <div className="h-px bg-white/[0.05]" />

            {/* Release year */}
            <FilterSection label="Release Year">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="From"
                  defaultValue="2020"
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="To"
                  defaultValue="2024"
                  className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                />
              </div>
            </FilterSection>

            {/* Divider */}
            <div className="h-px bg-white/[0.05]" />

            {/* Rating */}
            <FilterSection label="Rating">
              <div className="flex gap-2">
                {ratingFilters.map((rf, i) => (
                  <button
                    key={rf}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-all ${
                      i === 0
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white"
                    }`}
                  >
                    <StarIcon className="w-3 h-3" />
                    {rf}
                  </button>
                ))}
              </div>
            </FilterSection>
          </div>

          {/* Apply button */}
          <button className="w-full mt-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-violet-600/20">
            Apply Filters
          </button>
        </aside>

        {/* ── results area ───────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.05]">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold">
                {totalResults.toLocaleString()} titles
              </h2>

              {/* Active filter chips */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-violet-500/15 text-violet-400 rounded-full">
                  Shonen
                  <button className="hover:text-white transition-colors">
                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
                <span className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 bg-yellow-500/15 text-yellow-400 rounded-full">
                  4.5+ Rating
                  <button className="hover:text-white transition-colors">
                    <XIcon className="w-3 h-3" />
                  </button>
                </span>
              </div>
            </div>

            {/* View toggles */}
            <div className="flex items-center bg-white/[0.03] rounded-lg p-1 border border-white/[0.06]">
              <button className="p-1.5 rounded-md bg-white/[0.08] text-violet-400">
                <GridIcon className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-md text-white/30 hover:text-white/60 transition-colors">
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {browseCards.map((card) => (
              <MediaPosterCard
                key={card.slug}
                slug={card.slug}
                title={card.title}
                posterUrl={card.posterUrl}
                badge={<RatingBadge rating={card.rating} />}
                badgePosition="top-right"
                hoverVariant="play"
                meta={`${getKindLabel(card.kind)} · ${card.year}`}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-1.5">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/25 cursor-not-allowed">
              <ChevronLeftIcon className="w-4 h-4" />
            </button>

            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  n === 1
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {n}
              </button>
            ))}

            <span className="text-white/25 px-1 text-sm">…</span>

            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all text-sm font-medium">
              24
            </button>

            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all">
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Results summary */}
          <p className="text-center text-xs text-white/30 mt-4">
            Showing 1–{browseCards.length} of {totalResults.toLocaleString()} results
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
