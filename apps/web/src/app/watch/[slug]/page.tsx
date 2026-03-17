/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockMedia } from "@/lib/data/mock-media";
import type { Episode } from "@/lib/types/media";

/* ── local demo data ─────────────────────────────────────── */

const fallbackEpisodes: Episode[] = [
  { id: "e1", number: 1, title: "I'm Used to It", durationMinutes: 24, thumbnailUrl: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=800&auto=format&fit=crop" },
  { id: "e2", number: 2, title: "If I Had One More Chance", durationMinutes: 24, thumbnailUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop" },
  { id: "e3", number: 3, title: "It's Like a Game", durationMinutes: 23, thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop" },
  { id: "e4", number: 4, title: "I've Gotten Stronger", durationMinutes: 24, thumbnailUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop" },
  { id: "e5", number: 5, title: "A Pretty Good Deal", durationMinutes: 24, thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop" },
  { id: "e6", number: 6, title: "The Real Hunt Begins", durationMinutes: 23, thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop" },
];

const playerSettings = [
  { label: "Audio Language", value: "Japanese (Original)" },
  { label: "Subtitles", value: "English" },
  { label: "Quality", value: "4K UHD" },
];

/* ── inline SVG icons ────────────────────────────────────── */

function PlayIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function SkipBackIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 4v6h6" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

function SkipForwardIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </svg>
  );
}

function VolumeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function MaximizeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function SubtitlesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M7 15h4" />
      <path d="M13 15h4" />
      <path d="M7 11h10" />
    </svg>
  );
}

function SettingsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
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

function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ── episode card ─────────────────────────────────────────── */

function EpisodeRow({
  episode,
  isCurrent,
  progress,
}: {
  episode: Episode;
  isCurrent: boolean;
  progress?: number;
}) {
  return (
    <div
      className={`flex gap-4 p-3 rounded-xl transition-colors ${
        isCurrent
          ? "border-l-4 border-l-violet-500 bg-violet-500/10 border border-violet-500/20"
          : "border border-transparent hover:bg-white/5 hover:border-white/5 cursor-pointer"
      }`}
    >
      <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0">
        <img
          src={episode.thumbnailUrl}
          alt={episode.title}
          className={`w-full h-full object-cover ${isCurrent ? "" : "opacity-70"}`}
        />
        {isCurrent && (
          <>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress ?? 65}%`,
                  background: "linear-gradient(to right, #8b5cf6, #d946ef)",
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs font-bold">
              Watching
            </div>
          </>
        )}
        {!isCurrent && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <PlayIcon className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <span
          className={`text-[10px] font-bold uppercase ${
            isCurrent ? "text-violet-400" : "text-white/40"
          }`}
        >
          Episode {episode.number}
        </span>
        <h4 className="text-sm font-semibold line-clamp-2">{episode.title}</h4>
        <span className="text-xs text-white/40">{episode.durationMinutes}m</span>
      </div>
    </div>
  );
}

/* ── page component ──────────────────────────────────────── */

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = mockMedia.find((m) => m.slug === slug);

  if (!title) {
    notFound();
  }

  const hasEpisodes = title.kind !== "movie";
  const episodes: Episode[] =
    title.seasons?.[0]?.episodes ??
    (hasEpisodes ? fallbackEpisodes : []);
  const currentEpisodeIndex = 0;
  const currentEpisode = episodes[currentEpisodeIndex];
  const nextEpisode = episodes[currentEpisodeIndex + 1];

  const displayTitle = currentEpisode
    ? `Episode ${currentEpisode.number}: ${currentEpisode.title}`
    : title.title;

  const displayDescription = currentEpisode
    ? title.description
    : title.description;

  return (
    <main className="min-h-screen bg-[#050811] text-white">
      {/* ── top bar ──────────────────────────────────── */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4 bg-gradient-to-b from-[#050811] to-transparent">
        <Link
          href={`/title/${slug}`}
          className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-sm font-bold uppercase tracking-wider transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          {title.title}
        </Link>
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Astra
        </Link>
      </header>

      {/* ── main layout ──────────────────────────────── */}
      <div className="pt-20 pb-12 px-4 lg:px-10 flex flex-col lg:flex-row gap-8 max-w-[1440px] mx-auto">
        {/* ── left: player + metadata ─────────────────── */}
        <div className="flex-1 flex flex-col gap-6">
          {/* ── player shell ──────────────────────────── */}
          <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden group border border-white/[0.06] shadow-2xl">
            <img
              src={title.backdropUrl}
              alt={displayTitle}
              className="w-full h-full object-cover opacity-80"
            />

            {/* center play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
                <PlayIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white ml-1" />
              </button>
            </div>

            {/* hover controls overlay */}
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 bg-gradient-to-t from-[#050811]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* progress bar */}
              <div className="relative w-full h-1.5 bg-white/20 rounded-full mb-5 cursor-pointer group/progress">
                <div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    width: "65%",
                    background: "linear-gradient(to right, #8b5cf6, #d946ef)",
                  }}
                />
                <div className="absolute top-1/2 left-[65%] -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" />
              </div>

              {/* transport row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-5">
                  <button className="text-white/80 hover:text-violet-400 hover:scale-110 transition-all">
                    <PauseIcon className="w-6 h-6" />
                  </button>
                  <button className="text-white/80 hover:text-violet-400 hover:scale-110 transition-all">
                    <SkipBackIcon />
                  </button>
                  <button className="text-white/80 hover:text-violet-400 hover:scale-110 transition-all">
                    <SkipForwardIcon />
                  </button>
                  <button className="text-white/80 hover:text-violet-400 hover:scale-110 transition-all">
                    <VolumeIcon />
                  </button>
                  <span className="text-sm font-medium text-white/60 hidden sm:inline">
                    14:22 / 23:45
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <button className="text-white/80 hover:text-violet-400 transition-colors flex items-center gap-1.5 text-xs sm:text-sm bg-white/10 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                    <SubtitlesIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">English</span>
                  </button>
                  <button className="text-white/80 hover:text-violet-400 hover:scale-110 transition-all">
                    <SettingsIcon />
                  </button>
                  <button className="text-white/80 hover:text-violet-400 hover:scale-110 transition-all">
                    <MaximizeIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── episode metadata ──────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <Link
                  href={`/title/${slug}`}
                  className="text-violet-400 hover:text-violet-300 flex items-center gap-1 text-sm font-bold uppercase tracking-wider transition-colors"
                >
                  <ChevronLeftIcon className="w-3.5 h-3.5" />
                  {title.title}
                </Link>
                {title.seasonLabel && (
                  <span className="px-2 py-0.5 bg-violet-500/20 text-violet-400 text-[10px] font-bold rounded uppercase">
                    {title.seasonLabel}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {displayTitle}
              </h1>
              <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
                {displayDescription}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {nextEpisode && (
                <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 shadow-lg shadow-violet-900/20 transition-all">
                  Next Episode
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── right sidebar ──────────────────────────── */}
        <aside className="w-full lg:w-96 flex flex-col gap-6 shrink-0">
          {/* ── up next ──────────────────────────────── */}
          {hasEpisodes && episodes.length > 0 && (
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold tracking-tight">Up Next</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-white/40">
                    Autoplay
                  </span>
                  <div className="w-8 h-4 bg-violet-600 rounded-full relative cursor-pointer">
                    <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {episodes.map((ep, i) => (
                  <EpisodeRow
                    key={ep.id}
                    episode={ep}
                    isCurrent={i === currentEpisodeIndex}
                    progress={i === currentEpisodeIndex ? 65 : undefined}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── player settings ──────────────────────── */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="font-bold tracking-tight">Player Settings</h3>
            <div className="flex flex-col gap-3">
              {playerSettings.map((setting) => (
                <div
                  key={setting.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-white/50">{setting.label}</span>
                  <span className="text-violet-400 font-medium cursor-pointer flex items-center gap-1 hover:text-violet-300 transition-colors">
                    {setting.value}
                    <ChevronDownIcon className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── title info card (movies) ─────────────── */}
          {!hasEpisodes && (
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-3">
              <h3 className="font-bold tracking-tight">Now Playing</h3>
              <div className="flex gap-4">
                <img
                  src={title.posterUrl}
                  alt={title.title}
                  className="w-20 h-28 rounded-lg object-cover shrink-0"
                />
                <div className="flex flex-col gap-1.5">
                  <h4 className="font-semibold">{title.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span>{title.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{title.rating}</span>
                    {title.runtime && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{title.runtime}</span>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {title.genres.map((g) => (
                      <span
                        key={g}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
