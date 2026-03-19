/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { Footer } from "@/components/navigation/Footer";
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
        ? `${m.year} · ${m.runtime ?? "2h"}`
        : `S${m.seasonCount ?? 1} · ${m.episodeCount ?? "?"} Episodes`,
  })),
  { slug: "cyberpunk-edgerunners", title: "Cyberpunk: Edgerunners", posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop", kind: "anime", meta: "S1 · Completed" },
  { slug: "arcane", title: "Arcane", posterUrl: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=800&auto=format&fit=crop", kind: "series", meta: "S1 · 9 Episodes" },
  { slug: "interstellar", title: "Interstellar", posterUrl: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=800&auto=format&fit=crop", kind: "movie", meta: "2014 · 2h 49m" },
  { slug: "jujutsu-kaisen", title: "Jujutsu Kaisen", posterUrl: "https://images.unsplash.com/photo-1611457194403-d3f8c5514477?q=80&w=800&auto=format&fit=crop", kind: "anime", meta: "S2 · 23 Episodes" },
  { slug: "attack-on-titan", title: "Attack on Titan", posterUrl: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?q=80&w=800&auto=format&fit=crop", kind: "anime", meta: "Final Season" },
  { slug: "chainsaw-man", title: "Chainsaw Man", posterUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=800&auto=format&fit=crop", kind: "anime", meta: "S1 · Completed" },
  { slug: "the-prestige", title: "The Prestige", posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop", kind: "movie", meta: "2006 · 2h 10m" },
  { slug: "spider-verse", title: "Across the Spider-Verse", posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop", kind: "movie", meta: "2023 · 2h 20m" },
];

interface RecommendedTitle {
  slug: string;
  title: string;
  posterUrl: string;
  kind: ContentKind;
}

const recommendedTitles: RecommendedTitle[] = [
  { slug: "the-dark-knight", title: "The Dark Knight", posterUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800&auto=format&fit=crop", kind: "movie" },
  { slug: "vinland-saga", title: "Vinland Saga", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop", kind: "anime" },
  { slug: "the-matrix", title: "The Matrix", posterUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop", kind: "movie" },
  { slug: "one-piece", title: "One Piece", posterUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop", kind: "anime" },
  { slug: "breaking-bad", title: "Breaking Bad", posterUrl: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=800&auto=format&fit=crop", kind: "series" },
  { slug: "tenet", title: "Tenet", posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop", kind: "movie" },
];

const tabs = ["All", "Anime", "Movies", "Series"] as const;
const sortOptions = ["Recently Added", "Alphabetical", "Release Year"];

/* ── kind badge styles ──────────────────────────────────────── */

function kindBadgeClass(kind: ContentKind): string {
  switch (kind) {
    case "anime":
      return "bg-violet-600/90";
    case "movie":
      return "bg-fuchsia-600/90";
    case "series":
      return "bg-indigo-600/90";
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

function PlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
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

function BookmarkIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function FilmIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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

function SparklesIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z" />
      <path d="M19 13l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5z" />
    </svg>
  );
}

/* ── stat badge ─────────────────────────────────────────────── */

function StatBadge({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 px-3.5 py-2 bg-white/[0.03] border border-white/[0.06] rounded-xl">
      <span className="text-violet-400">{icon}</span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg font-bold text-white">{value}</span>
        <span className="text-xs text-white/40">{label}</span>
      </div>
    </div>
  );
}

/* ── saved title card ────────────────────────────────────── */

function SavedCard({ item }: { item: SavedTitle }) {
  const kindLabel = item.kind.charAt(0).toUpperCase() + item.kind.slice(1);

  return (
    <Link href={`/title/${item.slug}`} className="group block">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2.5 bg-[#0a0f1a] ring-1 ring-white/[0.06] group-hover:ring-violet-500/30 transition-all duration-300">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Persistent bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 p-3">
          <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
            <PlayIcon className="w-5 h-5 text-black ml-0.5" />
          </button>
          <button className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-red-400 transition-colors mt-1">
            <TrashIcon className="w-3.5 h-3.5" />
            Remove
          </button>
        </div>

        {/* Kind badge */}
        <div className="absolute top-2 left-2 z-10">
          <span
            className={`${kindBadgeClass(item.kind)} text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded shadow-sm backdrop-blur-sm`}
          >
            {kindLabel}
          </span>
        </div>
      </div>

      <h3 className="font-semibold text-[13px] leading-tight truncate group-hover:text-violet-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-[11px] text-white/35 mt-0.5">{item.meta}</p>
    </Link>
  );
}

/* ── recommended card ────────────────────────────────────── */

function RecommendedCard({ item }: { item: RecommendedTitle }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="shrink-0 w-32 sm:w-36 group"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-[#0a0f1a] ring-1 ring-white/[0.06] group-hover:ring-violet-500/25 transition-all duration-300 mb-2">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Add button */}
        <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 ring-1 ring-white/10 hover:bg-violet-600 hover:ring-violet-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
          <PlusIcon className="w-3.5 h-3.5" />
        </button>

        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      <h4 className="text-xs font-semibold truncate text-white/80 group-hover:text-violet-400 transition-colors">
        {item.title}
      </h4>
    </Link>
  );
}

/* ── page component ──────────────────────────────────────── */

export default function MyListPage() {
  const animeCount = savedTitles.filter((t) => t.kind === "anime").length;
  const movieCount = savedTitles.filter((t) => t.kind === "movie").length;
  const seriesCount = savedTitles.filter((t) => t.kind === "series").length;

  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ── page header ──────────────────────────────── */}
      <header className="pt-20 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto w-full">
        {/* Title row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-600/20">
                <BookmarkIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                My List
              </h1>
            </div>
            <p className="text-sm text-white/40 ml-[52px]">
              Your personal collection of saved titles
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-2.5 ml-[52px] lg:ml-0">
            <StatBadge icon={<BookmarkIcon className="w-4 h-4" />} value={savedTitles.length} label="Saved" />
            <StatBadge icon={<FilmIcon className="w-4 h-4" />} value={movieCount} label="Movies" />
            <StatBadge icon={<SparklesIcon className="w-4 h-4" />} value={animeCount} label="Anime" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent mb-6" />

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Tabs */}
          <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  i === 0
                    ? "bg-gradient-to-r from-violet-600 to-violet-700 text-white shadow-sm"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                }`}
              >
                {tab}
                {i === 0 && (
                  <span className="ml-1.5 text-[10px] text-white/60">
                    ({savedTitles.length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right: Search + Sort */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search list..."
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl pl-9 pr-4 py-2 text-sm w-44 sm:w-52 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.05] text-white placeholder:text-white/30 transition-colors"
              />
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <select className="appearance-none bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-2 pr-9 text-sm font-medium focus:outline-none cursor-pointer hover:bg-white/[0.05] text-white/70 transition-colors">
                {sortOptions.map((opt) => (
                  <option key={opt} className="bg-[#0d121f]">
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </header>

      {/* ── saved titles grid ────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-16 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 lg:gap-5">
          {savedTitles.map((item) => (
            <SavedCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      {/* ── recommended section ────────────────────── */}
      <section className="border-t border-white/[0.05] bg-gradient-to-b from-white/[0.01] to-transparent">
        <div className="px-4 sm:px-6 lg:px-10 py-12 max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                <SparklesIcon className="w-4 h-4 text-violet-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Expand Your List</h2>
                <p className="text-xs text-white/35">Based on what you've saved</p>
              </div>
            </div>
            <Link
              href="/browse"
              className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors"
            >
              Browse All
            </Link>
          </div>

          {/* Cards row */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {recommendedTitles.map((item) => (
              <RecommendedCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
