/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { mockMedia } from "@/lib/data/mock-media";
import type { ContentKind } from "@/lib/types/media";

/* ── local saved-list data ───────────────────────────────── */

interface SavedTitle {
  slug: string;
  title: string;
  posterUrl: string;
  kind: ContentKind;
  meta: string;
}

const savedTitles: SavedTitle[] = [
  ...mockMedia.map((m) => ({
    slug: m.slug,
    title: m.title,
    posterUrl: m.posterUrl,
    kind: m.kind,
    meta:
      m.kind === "movie"
        ? `${m.year} \u00b7 ${m.runtime ?? "2h"}`
        : `S${m.seasonCount ?? 1} \u00b7 ${m.episodeCount ?? "?"} Episodes`,
  })),
  { slug: "cyberpunk-edgerunners", title: "Cyberpunk: Edgerunners", posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop", kind: "anime", meta: "S1 \u00b7 Completed" },
  { slug: "arcane", title: "Arcane", posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=800&auto=format&fit=crop", kind: "series", meta: "S1 \u00b7 9 Episodes" },
  { slug: "interstellar", title: "Interstellar", posterUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=800&auto=format&fit=crop", kind: "movie", meta: "2014 \u00b7 2h 49m" },
  { slug: "jujutsu-kaisen", title: "Jujutsu Kaisen", posterUrl: "https://images.unsplash.com/photo-1611457194403-d3f8c5514477?q=80&w=800&auto=format&fit=crop", kind: "anime", meta: "S2 \u00b7 23 Episodes" },
  { slug: "attack-on-titan", title: "Attack on Titan", posterUrl: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=800&auto=format&fit=crop", kind: "anime", meta: "Final Season" },
  { slug: "chainsaw-man", title: "Chainsaw Man", posterUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=800&auto=format&fit=crop", kind: "anime", meta: "S1 \u00b7 Completed" },
  { slug: "the-prestige", title: "The Prestige", posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop", kind: "movie", meta: "2006 \u00b7 2h 10m" },
  { slug: "spider-verse", title: "Across the Spider-Verse", posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop", kind: "movie", meta: "2023 \u00b7 2h 20m" },
];

interface RecommendedTitle {
  slug: string;
  title: string;
  posterUrl: string;
}

const recommendedTitles: RecommendedTitle[] = [
  { slug: "the-dark-knight", title: "The Dark Knight", posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800&auto=format&fit=crop" },
  { slug: "vinland-saga", title: "Vinland Saga", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop" },
  { slug: "the-matrix", title: "The Matrix", posterUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" },
  { slug: "one-piece", title: "One Piece", posterUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop" },
  { slug: "breaking-bad", title: "Breaking Bad", posterUrl: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=800&auto=format&fit=crop" },
  { slug: "tenet", title: "Tenet", posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop" },
];

const tabs = ["All", "Anime", "Movies", "Series"] as const;
const sortOptions = ["Recently Added", "Alphabetical (A-Z)", "Highest Rated", "Release Year"];

/* ── kind badge color map ────────────────────────────────── */

function kindBadgeClass(kind: ContentKind): string {
  switch (kind) {
    case "anime":
      return "bg-violet-600";
    case "movie":
      return "bg-fuchsia-600";
    case "series":
      return "bg-indigo-600";
  }
}

/* ── inline SVG icons ────────────────────────────────────── */

function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
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

function TrashIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function PlusIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
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

/* ── saved title card ────────────────────────────────────── */

function SavedCard({ item }: { item: SavedTitle }) {
  const kindLabel = item.kind.charAt(0).toUpperCase() + item.kind.slice(1);

  return (
    <Link href={`/title/${item.slug}`} className="group block">
      <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 border border-white/[0.06] hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all duration-300">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4"
          style={{
            background:
              "linear-gradient(to top, rgba(5,8,17,0.9) 0%, rgba(5,8,17,0.2) 60%, transparent 100%)",
          }}
        >
          <button className="mb-2 w-full bg-white text-black py-2 sm:py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm hover:bg-gray-200 transition-colors">
            <PlayCircleIcon className="w-4 h-4" />
            Watch
          </button>
          <button className="w-full bg-red-500/20 backdrop-blur-md text-red-400 border border-red-500/30 py-2 sm:py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm hover:bg-red-500/40 transition-all">
            <TrashIcon className="w-4 h-4" />
            Remove
          </button>
        </div>
        {/* kind badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`${kindBadgeClass(item.kind)} text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-lg`}
          >
            {kindLabel}
          </span>
        </div>
      </div>
      <h3 className="font-bold text-sm truncate group-hover:text-violet-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-xs text-white/30">{item.meta}</p>
    </Link>
  );
}

/* ── recommended card ────────────────────────────────────── */

function RecommendedCard({ item }: { item: RecommendedTitle }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="shrink-0 w-40 sm:w-48 group cursor-pointer"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/[0.08] mb-3">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-violet-600 transition-colors">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      <h4 className="text-sm font-bold truncate group-hover:text-violet-400 transition-colors">
        {item.title}
      </h4>
    </Link>
  );
}

/* ── page component ──────────────────────────────────────── */

export default function MyListPage() {
  return (
    <main className="min-h-screen bg-[#050811] text-white flex flex-col">
      <HeaderNavigation />

      {/* ── page header ──────────────────────────────── */}
      <header className="pt-24 pb-10 px-4 sm:px-6 lg:px-10 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-2 tracking-tight">
              My List
            </h1>
            <p className="text-white/50 font-medium">
              <span className="text-violet-400">{savedTitles.length}</span>{" "}
              Titles Saved &bull;{" "}
              <span className="text-violet-400">3</span> Continued recently
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* search in list */}
            <div className="relative">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search in list..."
                className="bg-white/[0.04] border border-white/[0.08] rounded-full pl-10 pr-4 py-2.5 text-sm w-56 sm:w-64 focus:outline-none focus:ring-1 focus:ring-violet-500/50 text-white placeholder:text-white/30"
              />
            </div>

            {/* category tabs */}
            <div className="flex bg-white/[0.04] p-1 rounded-xl border border-white/[0.08]">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                    i === 0
                      ? "bg-violet-600 text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* sort dropdown */}
            <div className="relative">
              <select className="appearance-none bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 pr-10 text-sm font-semibold focus:outline-none cursor-pointer hover:bg-white/[0.08] text-white transition-colors">
                {sortOptions.map((opt) => (
                  <option key={opt} className="bg-[#0d121f]">
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            </div>
          </div>
        </div>
      </header>

      {/* ── saved titles grid ────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-20 flex-grow max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
          {savedTitles.map((item) => (
            <SavedCard key={item.slug} item={item} />
          ))}
        </div>

        {/* ── recommended section ────────────────────── */}
        <section className="mt-20 border-t border-white/[0.06] pt-14">
          <h2 className="text-2xl font-bold mb-8 text-center tracking-tight">
            Recommended for You
          </h2>
          <div className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {recommendedTitles.map((item) => (
              <RecommendedCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
