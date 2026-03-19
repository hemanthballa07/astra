/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { PageContainer } from "@/components/shared/PageContainer";
import { mockMedia } from "@/lib/data/mock-media";
import type { Episode, MediaTitle } from "@/lib/types/media";

/* ────────────────────────────────────────────────────────────────────────
 * Local demo data for sections that mockMedia doesn't cover
 * ──────────────────────────────────────────────────────────────────────── */

const demoCast: { name: string; role: string; initials: string; color: string }[] = [
  { name: "Taito Ban", role: "Lead Voice", initials: "TB", color: "bg-violet-600" },
  { name: "Reina Ueda", role: "Supporting Voice", initials: "RU", color: "bg-fuchsia-600" },
  { name: "Genta Nakamura", role: "Supporting Voice", initials: "GN", color: "bg-indigo-600" },
  { name: "Haruna Mikawa", role: "Supporting Voice", initials: "HM", color: "bg-pink-600" },
];

const fallbackEpisodes: Episode[] = [
  {
    id: "fb-e1",
    number: 1,
    title: "Pilot",
    durationMinutes: 48,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=800&auto=format&fit=crop",
    description: "The story begins.",
  },
  {
    id: "fb-e2",
    number: 2,
    title: "The Awakening",
    durationMinutes: 45,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
    description: "Things take an unexpected turn.",
  },
];

const episodeDescriptions: Record<string, string> = {
  e1: "Sung Jin-woo is known as the world's weakest hunter. During a routine raid, his team discovers a hidden dungeon with terrifying power.",
  e2: "Trapped in a room of deadly traps, the hunting party must solve riddles or face annihilation. Jin-woo pushes himself to the limit.",
};

/* ────────────────────────────────────────────────────────────────────────
 * Inline SVG icons
 * ──────────────────────────────────────────────────────────────────────── */

function PlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14.12a1 1 0 001.5.86l11-7.06a1 1 0 000-1.72l-11-7.06A1 1 0 008 5.14z" />
    </svg>
  );
}

function PlusIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ChevronDown({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
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

/* ────────────────────────────────────────────────────────────────────────
 * Local presentational components
 * ──────────────────────────────────────────────────────────────────────── */

function GenreTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/20 hover:text-white/90">
      {children}
    </span>
  );
}

function EpisodeCard({
  episode,
  titleSlug,
}: {
  episode: Episode;
  titleSlug: string;
}) {
  const desc =
    episode.description ??
    episodeDescriptions[episode.id] ??
    "A new chapter unfolds.";

  return (
    <Link
      href={`/watch/${titleSlug}`}
      className="group flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.04] lg:gap-5 lg:p-4"
    >
      {/* Thumbnail */}
      <div className="relative h-[90px] w-[150px] flex-shrink-0 overflow-hidden rounded-lg bg-[#0d121f] lg:h-[110px] lg:w-[190px]">
        <img
          src={episode.thumbnailUrl}
          alt={`Episode ${episode.number}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Episode number badge */}
        <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-black/70 text-[10px] font-bold text-white backdrop-blur-sm lg:h-7 lg:w-7 lg:text-xs">
          {episode.number}
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg">
            <PlayIcon className="ml-0.5 h-4 w-4 text-black" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
        <h3 className="mb-1.5 truncate text-sm font-semibold text-white lg:text-base">
          {episode.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-white/40 lg:text-sm">
          {desc}
        </p>
        {/* Duration */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-white/30">
          <ClockIcon className="h-3 w-3" />
          <span>{episode.durationMinutes} min</span>
        </div>
      </div>
    </Link>
  );
}

function RelatedCard({ item }: { item: MediaTitle }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="group w-[140px] flex-shrink-0 lg:w-[165px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/[0.06] bg-[#0d121f] shadow-lg transition-all duration-300 group-hover:border-white/[0.12] group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.15)]">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 p-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="w-full rounded-lg bg-white py-2 text-center text-xs font-bold text-black">
            View Details
          </span>
        </div>
      </div>
      <div className="mt-3 px-0.5">
        <h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-violet-400">
          {item.title}
        </h3>
        <p className="mt-0.5 text-xs text-white/40">
          {item.kind === "movie"
            ? `${item.year} · ${item.runtime ?? "Movie"}`
            : item.seasonLabel ?? String(item.year)}
        </p>
      </div>
    </Link>
  );
}

function CastMember({ member }: { member: (typeof demoCast)[number] }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold shadow-lg ${member.color}`}
      >
        {member.initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{member.name}</p>
        <p className="text-xs text-white/40">{member.role}</p>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-sm text-white/40">{label}</span>
      <span className="text-right text-sm text-white/80">{value}</span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Utility
 * ──────────────────────────────────────────────────────────────────────── */

const scrollRow =
  "flex gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

function kindLabel(kind: MediaTitle["kind"]): string {
  if (kind === "anime") return "Anime";
  if (kind === "movie") return "Movie";
  return "Series";
}

/* ────────────────────────────────────────────────────────────────────────
 * Page component
 * ──────────────────────────────────────────────────────────────────────── */

export default async function TitleDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = mockMedia.find((m) => m.slug === slug);

  if (!title) {
    notFound();
  }

  const relatedTitles = mockMedia.filter(
    (m) => m.slug !== slug && m.kind === title.kind
  ).slice(0, 10);
  const moreFromCollection = mockMedia.filter(
    (m) => m.slug !== slug && m.kind !== title.kind
  ).slice(0, 8);

  const episodes =
    title.seasons?.[0]?.episodes ??
    (title.kind !== "movie" ? fallbackEpisodes : []);
  const hasEpisodes = episodes.length > 0 && title.kind !== "movie";

  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="relative -mt-16 w-full overflow-hidden">
        {/* Backdrop image */}
        <div className="absolute inset-0">
          <img
            src={title.backdropUrl}
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Multi-layer gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(to top, #050811 0%, rgba(5,8,17,0.85) 40%, rgba(5,8,17,0.6) 70%, rgba(5,8,17,0.4) 100%)",
                "linear-gradient(to right, #050811 0%, rgba(5,8,17,0.7) 35%, transparent 70%)",
              ].join(", "),
            }}
          />
        </div>

        {/* Hero content */}
        <PageContainer className="relative z-10 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-12 lg:gap-16">
            {/* Poster */}
            <div className="mx-auto w-44 flex-shrink-0 md:mx-0 md:w-52 lg:w-64">
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
                <img
                  src={title.posterUrl}
                  alt={`${title.title} poster`}
                  className="h-full w-full object-cover"
                />
                {/* Subtle inner glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                {/* Sub/Dub badge */}
                {(title.isDubbed || title.isSubbed) && (
                  <div className="absolute right-2.5 top-2.5">
                    <span className="rounded-md bg-violet-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wide shadow-lg">
                      {title.isDubbed && title.isSubbed
                        ? "Sub | Dub"
                        : title.isSubbed
                          ? "Sub"
                          : "Dub"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:pb-4 md:text-left">
              {/* Back link */}
              <Link
                href="/"
                className="mb-5 inline-flex items-center gap-1.5 text-xs font-medium text-white/40 transition-colors hover:text-white"
              >
                <ArrowLeftIcon className="h-3.5 w-3.5" />
                Back
              </Link>

              {/* Type badge + meta */}
              <div className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start">
                <span className="rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                  {kindLabel(title.kind)}
                </span>
                <span className="text-sm text-white/50">{title.year}</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span className="rounded border border-white/20 px-1.5 py-0.5 text-[10px] font-semibold text-white/60">
                  {title.rating}
                </span>
                {title.runtime && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span className="text-sm text-white/50">{title.runtime}</span>
                  </>
                )}
                {title.studio && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-white/30" />
                    <span className="text-sm text-white/50">{title.studio}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="mb-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                {title.title}
              </h1>

              {/* Genres + status */}
              <div className="mb-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                {title.genres.map((g) => (
                  <GenreTag key={g}>{g}</GenreTag>
                ))}
                {title.status && (
                  <span
                    className={`ml-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      title.status === "ongoing"
                        ? "bg-green-500/15 text-green-400"
                        : title.status === "upcoming"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-white/[0.06] text-white/50"
                    }`}
                  >
                    {title.status}
                  </span>
                )}
              </div>

              {/* Season/episode info */}
              {title.seasonCount && (
                <p className="mb-5 text-sm text-white/50">
                  {title.seasonCount} {title.seasonCount === 1 ? "Season" : "Seasons"}
                  {title.episodeCount ? ` · ${title.episodeCount} Episodes` : ""}
                </p>
              )}

              {/* Description */}
              <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/60 md:mx-0 lg:text-base lg:leading-relaxed">
                {title.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                <Link
                  href={`/watch/${title.slug}`}
                  className="flex items-center gap-2.5 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-black shadow-lg shadow-white/10 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/20 active:scale-100"
                >
                  <PlayIcon className="h-5 w-5" />
                  Watch Now
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition-all duration-200 hover:border-white/30 hover:bg-white/15"
                >
                  <PlusIcon className="h-5 w-5" />
                  My List
                </button>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Main Content ────────────────────────────────────────── */}
      <div className="space-y-16 pb-20 pt-12 lg:space-y-20 lg:pt-16">
        {/* ── Episodes ───────────────────────────────────────────── */}
        {hasEpisodes && (
          <section>
            <PageContainer>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold tracking-tight lg:text-2xl">
                  Episodes
                </h2>
                {title.seasons && title.seasons.length > 0 && (
                  <div className="relative">
                    <select className="appearance-none rounded-lg border border-white/10 bg-white/[0.04] py-2.5 pl-4 pr-10 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                      {title.seasons.map((s) => (
                        <option key={s.id} className="bg-[#0d121f]" value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {episodes.map((ep) => (
                  <EpisodeCard
                    key={ep.id}
                    episode={ep}
                    titleSlug={title.slug}
                  />
                ))}
              </div>
            </PageContainer>
          </section>
        )}

        {/* ── About / Details ────────────────────────────────────── */}
        <section>
          <PageContainer>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Story */}
              <div className="lg:col-span-2">
                <h2 className="mb-5 text-xl font-semibold tracking-tight lg:text-2xl">
                  About
                </h2>
                <div className="space-y-4 text-sm leading-[1.8] text-white/60 lg:text-base lg:leading-[1.85]">
                  <p>{title.description}</p>
                  {title.kind === "anime" && (
                    <p>
                      After narrowly surviving an overwhelmingly powerful encounter
                      that nearly wiped out everything, a mysterious program selects
                      the protagonist as its sole player — granting an extremely rare
                      ability to grow stronger beyond any known limits. What follows
                      is a journey through impossible odds and ever-escalating stakes.
                    </p>
                  )}
                  {title.kind === "series" && (
                    <p>
                      As the layers of this enigmatic world unfold, nothing is quite
                      what it seems. Each revelation raises more questions, pulling
                      the viewer deeper into a meticulously crafted narrative.
                    </p>
                  )}
                  {title.kind === "movie" && (
                    <p>
                      A cinematic experience that combines breathtaking visuals with
                      a deeply human story. The scale of the production matches the
                      ambition of its storytelling.
                    </p>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-10">
                {/* Cast */}
                <div>
                  <h3 className="mb-4 text-base font-semibold tracking-tight lg:text-lg">
                    Cast & Crew
                  </h3>
                  <div className="space-y-3.5">
                    {demoCast.map((member) => (
                      <CastMember key={member.initials} member={member} />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h3 className="mb-3 text-base font-semibold tracking-tight lg:text-lg">
                    Details
                  </h3>
                  <div className="divide-y divide-white/[0.06]">
                    {title.studio && (
                      <DetailRow label="Studio" value={title.studio} />
                    )}
                    <DetailRow label="Release Year" value={String(title.year)} />
                    <DetailRow label="Rating" value={title.rating ?? "Not Rated"} />
                    {title.runtime && (
                      <DetailRow label="Runtime" value={title.runtime} />
                    )}
                    <DetailRow
                      label="Audio"
                      value={
                        [
                          title.isSubbed ? "Japanese (Sub)" : null,
                          title.isDubbed ? "English (Dub)" : null,
                        ]
                          .filter(Boolean)
                          .join(", ") || "Original"
                      }
                    />
                    <DetailRow label="Genres" value={title.genres.join(", ")} />
                  </div>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* ── More Like This ─────────────────────────────────────── */}
        {relatedTitles.length > 0 && (
          <section>
            <PageContainer>
              <h2 className="mb-6 text-xl font-semibold tracking-tight lg:text-2xl">
                More {kindLabel(title.kind)}
              </h2>
              <div className={`${scrollRow} lg:gap-5`}>
                {relatedTitles.map((item) => (
                  <RelatedCard key={item.id} item={item} />
                ))}
              </div>
            </PageContainer>
          </section>
        )}

        {/* ── You May Also Like ──────────────────────────────────── */}
        {moreFromCollection.length > 0 && (
          <section>
            <PageContainer>
              <h2 className="mb-6 text-xl font-semibold tracking-tight lg:text-2xl">
                You May Also Like
              </h2>
              <div className={`${scrollRow} lg:gap-5`}>
                {moreFromCollection.map((item) => (
                  <RelatedCard key={item.id} item={item} />
                ))}
              </div>
            </PageContainer>
          </section>
        )}
      </div>

      {/* ─── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06]">
        <PageContainer className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <span className="text-base font-semibold tracking-tight text-white/80">
            Astra
          </span>
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
            <Link href="/anime" className="transition-colors hover:text-white">Anime</Link>
            <Link href="/series" className="transition-colors hover:text-white">Series</Link>
            <Link href="/movies" className="transition-colors hover:text-white">Movies</Link>
            <Link href="/my-list" className="transition-colors hover:text-white">My List</Link>
          </nav>
          <p className="text-xs text-white/25">
            © 2025 Astra. All rights reserved.
          </p>
        </PageContainer>
      </footer>
    </main>
  );
}
