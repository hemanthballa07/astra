/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { Footer } from "@/components/navigation/Footer";
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
      <polygon points="11 19 2 12 11 5 11 19" />
      <polygon points="22 19 13 12 22 5 22 19" />
    </svg>
  );
}

function SkipForwardIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 19 22 12 13 5 13 19" />
      <polygon points="2 19 11 12 2 5 2 19" />
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

function ClockIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function SpeakerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    </svg>
  );
}

function MonitorIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
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
      className={`group flex gap-3.5 rounded-xl p-2 transition-all duration-200 ${
        isCurrent
          ? "bg-gradient-to-r from-violet-500/15 to-fuchsia-500/10 ring-1 ring-violet-500/25"
          : "hover:bg-white/[0.04] cursor-pointer"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-[100px] h-14 rounded-lg overflow-hidden shrink-0 bg-[#0a0f1a]">
        <img
          src={episode.thumbnailUrl}
          alt={episode.title}
          className="w-full h-full object-cover"
        />
        {/* Progress bar for current */}
        {isCurrent && (
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black/60">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              style={{ width: `${progress ?? 65}%` }}
            />
          </div>
        )}
        {/* Play overlay on hover (non-current) */}
        {!isCurrent && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-7 h-7 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
              <PlayIcon className="w-3.5 h-3.5 text-black ml-0.5" />
            </div>
          </div>
        )}
        {/* Now playing indicator */}
        {isCurrent && (
          <div className="absolute top-1 left-1">
            <span className="px-1.5 py-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[8px] font-bold uppercase rounded shadow-sm">
              Now
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center gap-0.5 min-w-0 flex-1 py-0.5">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold ${isCurrent ? "text-violet-400" : "text-white/35"}`}>
            EP {episode.number}
          </span>
          <span className="text-[10px] text-white/25">·</span>
          <span className="text-[10px] text-white/25">{episode.durationMinutes}m</span>
        </div>
        <h4 className={`text-[13px] font-medium leading-snug line-clamp-1 ${isCurrent ? "text-white" : "text-white/70 group-hover:text-white/90"} transition-colors`}>
          {episode.title}
        </h4>
      </div>
    </div>
  );
}

/* ── settings row ─────────────────────────────────────────── */

function SettingRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0 last:pb-0 first:pt-0">
      <div className="flex items-center gap-2.5">
        <span className="text-white/30">{icon}</span>
        <span className="text-sm text-white/50">{label}</span>
      </div>
      <button className="flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
        {value}
        <ChevronDownIcon className="w-3.5 h-3.5" />
      </button>
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

  const isMovie = title.kind === "movie";
  const hasEpisodes = !isMovie;
  const episodes: Episode[] =
    title.seasons?.[0]?.episodes ?? (hasEpisodes ? fallbackEpisodes : []);
  const currentEpisodeIndex = 0;
  const currentEpisode = episodes[currentEpisodeIndex];
  const nextEpisode = episodes[currentEpisodeIndex + 1];

  return (
    <main className="min-h-screen bg-[#020405] text-white">
      {/* Header */}
      <HeaderNavigation />

      {/* ── main content ──────────────────────────────── */}
      <div className="pt-14 pb-12 lg:pb-16">
        {/* ── player area ────────────────────────────── */}
        <div className="px-0 lg:px-8 xl:px-12 max-w-[1900px] mx-auto">
          <div className="relative aspect-video w-full bg-black lg:rounded-2xl overflow-hidden group shadow-2xl shadow-black/80 lg:ring-1 lg:ring-white/[0.06]">
            {/* Video frame (backdrop as placeholder) */}
            <img
              src={title.backdropUrl}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* Multi-layer vignette overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            </div>

            {/* Center play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/30 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-2xl hover:bg-black/40 hover:scale-105 hover:border-white/20 transition-all duration-300 group/play">
                <PlayIcon className="w-9 h-9 sm:w-11 sm:h-11 text-white ml-1 group-hover/play:scale-110 transition-transform" />
              </button>
            </div>

            {/* Controls overlay (visible on hover) */}
            <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Gradient backdrop for controls */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 100%)",
                }}
              />

              <div className="relative px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6 pt-20">
                {/* Progress bar */}
                <div className="group/progress relative w-full h-1 bg-white/15 rounded-full mb-5 cursor-pointer hover:h-1.5 transition-all">
                  {/* Buffered */}
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-white/20"
                    style={{ width: "85%" }}
                  />
                  {/* Progress */}
                  <div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    style={{ width: "65%" }}
                  />
                  {/* Scrubber */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-black/50 opacity-0 group-hover/progress:opacity-100 transition-opacity"
                    style={{ left: "calc(65% - 6px)" }}
                  />
                </div>

                {/* Transport controls */}
                <div className="flex items-center justify-between gap-4">
                  {/* Left controls */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Playback group */}
                    <div className="flex items-center bg-white/[0.06] rounded-full p-1">
                      <button className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                        <SkipBackIcon className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors">
                        <PauseIcon className="w-5 h-5" />
                      </button>
                      <button className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                        <SkipForwardIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Volume */}
                    <div className="hidden sm:flex items-center gap-1.5 ml-1">
                      <button className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors">
                        <VolumeIcon className="w-5 h-5" />
                      </button>
                      <div className="w-16 h-1 bg-white/15 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-white/80 rounded-full" />
                      </div>
                    </div>

                    {/* Time */}
                    <span className="text-[13px] font-medium text-white/50 tabular-nums ml-2 sm:ml-3">
                      14:22 <span className="text-white/25 mx-0.5">/</span> 23:45
                    </span>
                  </div>

                  {/* Right controls */}
                  <div className="flex items-center gap-1.5">
                    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-[13px] text-white/70 hover:text-white transition-colors">
                      <SubtitlesIcon className="w-4 h-4" />
                      <span>CC</span>
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors">
                      <SettingsIcon className="w-[18px] h-[18px]" />
                    </button>
                    <button className="w-9 h-9 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors">
                      <MaximizeIcon className="w-[18px] h-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── below player content ───────────────────── */}
        <div className="px-4 sm:px-6 lg:px-10 xl:px-12 mt-6 lg:mt-8 max-w-[1900px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* ── left: title info ─────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Title section */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-6">
                <div className="min-w-0">
                  {/* Series title + season badge */}
                  <div className="flex items-center gap-3 mb-2.5">
                    <Link
                      href={`/title/${slug}`}
                      className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors truncate"
                    >
                      {title.title}
                    </Link>
                    {title.seasonLabel && (
                      <span className="shrink-0 px-2 py-0.5 bg-white/[0.05] text-[10px] font-bold text-white/45 rounded uppercase tracking-wide">
                        {title.seasonLabel}
                      </span>
                    )}
                  </div>

                  {/* Episode title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold tracking-tight leading-tight mb-3">
                    {currentEpisode
                      ? `${currentEpisode.number}. ${currentEpisode.title}`
                      : title.title}
                  </h1>

                  {/* Meta row */}
                  <div className="flex items-center gap-3 text-sm text-white/45 mb-5">
                    {currentEpisode && (
                      <>
                        <span className="flex items-center gap-1.5">
                          <ClockIcon className="w-3.5 h-3.5" />
                          {currentEpisode.durationMinutes} min
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/25" />
                      </>
                    )}
                    <span>{title.year}</span>
                    <span className="w-1 h-1 rounded-full bg-white/25" />
                    <span className="px-1.5 py-0.5 border border-white/15 rounded text-xs font-medium">
                      {title.rating}
                    </span>
                    {isMovie && title.runtime && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-white/25" />
                        <span>{title.runtime}</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[15px] text-white/45 leading-relaxed max-w-2xl">
                    {title.description}
                  </p>
                </div>

                {/* Next episode CTA */}
                {nextEpisode && (
                  <button className="shrink-0 flex items-center gap-2.5 bg-white text-black px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                    Next Episode
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-white/[0.06] via-white/[0.03] to-transparent mb-5" />

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {title.genres.map((g) => (
                  <span
                    key={g}
                    className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-xs font-medium text-white/50 hover:text-white/70 hover:border-white/10 transition-colors cursor-default"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* ── right: sidebar ───────────────────────── */}
            <aside className="w-full lg:w-[360px] shrink-0 space-y-5">
              {/* Episode list */}
              {hasEpisodes && episodes.length > 0 && (
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.05]">
                    <h2 className="font-semibold text-[15px]">Episodes</h2>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-white/35">
                        Autoplay
                      </span>
                      <div className="w-8 h-[18px] bg-violet-600 rounded-full relative cursor-pointer transition-colors hover:bg-violet-500">
                        <div className="absolute top-[3px] right-[3px] w-3 h-3 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Episode list with fade */}
                  <div className="relative">
                    <div className="p-2.5 space-y-0.5 max-h-[340px] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {episodes.map((ep, i) => (
                        <EpisodeRow
                          key={ep.id}
                          episode={ep}
                          isCurrent={i === currentEpisodeIndex}
                          progress={i === currentEpisodeIndex ? 65 : undefined}
                        />
                      ))}
                    </div>
                    {/* Bottom fade indicator */}
                    {episodes.length > 4 && (
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#080a0d] to-transparent pointer-events-none" />
                    )}
                  </div>
                </div>
              )}

              {/* Player settings */}
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl px-4 py-4">
                <h3 className="font-semibold text-[15px] mb-3">Playback</h3>
                <div>
                  <SettingRow
                    icon={<SpeakerIcon className="w-4 h-4" />}
                    label="Audio"
                    value="Japanese"
                  />
                  <SettingRow
                    icon={<SubtitlesIcon className="w-4 h-4" />}
                    label="Subtitles"
                    value="English"
                  />
                  <SettingRow
                    icon={<MonitorIcon className="w-4 h-4" />}
                    label="Quality"
                    value="4K UHD"
                  />
                </div>
              </div>

              {/* Movie info card (only for movies) */}
              {isMovie && (
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4">
                  <h3 className="font-semibold text-[15px] mb-4">Now Playing</h3>
                  <div className="flex gap-4">
                    <img
                      src={title.posterUrl}
                      alt={title.title}
                      className="w-[72px] h-[108px] rounded-lg object-cover shrink-0 shadow-lg ring-1 ring-white/[0.06]"
                    />
                    <div className="flex flex-col gap-2 min-w-0">
                      <h4 className="font-semibold text-white leading-tight">{title.title}</h4>
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
                            className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] text-white/45"
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
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
