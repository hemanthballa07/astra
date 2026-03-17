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

/* Fallback episodes for titles that have seasons but empty episode arrays */
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

/* Episode descriptions keyed by episode id for Solo Leveling */
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

/* ────────────────────────────────────────────────────────────────────────
 * Local presentational components
 * ──────────────────────────────────────────────────────────────────────── */

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs text-white/70">
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
      className="group flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5 transition-colors duration-200 hover:bg-white/[0.06]"
    >
      {/* Thumbnail */}
      <div className="relative h-[100px] w-[160px] flex-shrink-0 overflow-hidden rounded-lg bg-[#0d121f] lg:h-[120px] lg:w-[200px]">
        <img
          src={episode.thumbnailUrl}
          alt={`Episode ${episode.number}`}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-sm">
            <PlayIcon className="ml-0.5 h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-sm font-bold text-white lg:text-base">
            {String(episode.number).padStart(2, "0")}. {episode.title}
          </h3>
          <span className="flex-shrink-0 text-xs text-white/30">
            {episode.durationMinutes}m
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/40 lg:text-sm">
          {desc}
        </p>
      </div>
    </Link>
  );
}

function RelatedCard({ item }: { item: MediaTitle }) {
  return (
    <Link
      href={`/title/${item.slug}`}
      className="group w-[140px] flex-shrink-0 lg:w-[172px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d121f] transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(139,92,246,0.15)]">
        <img
          src={item.posterUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-lg bg-white py-1.5 text-center text-xs font-bold text-black">
            View
          </span>
        </div>
      </div>
      <div className="mt-2.5 px-0.5">
        <h3 className="truncate text-sm font-medium text-white transition-colors group-hover:text-violet-400">
          {item.title}
        </h3>
        <p className="text-[11px] text-white/40">
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
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${member.color}`}
      >
        {member.initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{member.name}</p>
        <p className="text-[11px] text-white/40">{member.role}</p>
      </div>
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

  const relatedTitles = mockMedia.filter((m) => m.slug !== slug);
  const episodes =
    title.seasons?.[0]?.episodes ??
    (title.kind !== "movie" ? fallbackEpisodes : []);
  const hasEpisodes = episodes.length > 0 && title.kind !== "movie";

  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="relative -mt-16 w-full overflow-hidden pb-12 pt-16 sm:pb-16 lg:pb-0">
        {/* Backdrop */}
        <img
          src={title.backdropUrl}
          alt={`${title.title} backdrop`}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />

        {/* Overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "linear-gradient(to top, #050811 0%, rgba(5,8,17,0.5) 50%, rgba(5,8,17,0.7) 100%)",
              "linear-gradient(to right, #050811 0%, rgba(5,8,17,0.6) 40%, transparent 100%)",
            ].join(", "),
          }}
        />

        {/* Content */}
        <PageContainer className="relative z-10 flex flex-col gap-8 pt-10 sm:pt-16 md:flex-row md:items-end md:gap-10 lg:gap-14 lg:pb-16 lg:pt-24">
          {/* Poster */}
          <div className="mx-auto w-48 flex-shrink-0 md:mx-0 md:w-56 lg:w-72">
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border-2 border-white/[0.06] shadow-2xl transition-shadow hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              <img
                src={title.posterUrl}
                alt={`${title.title} poster`}
                className="h-full w-full object-cover"
              />
              {(title.isDubbed || title.isSubbed) && (
                <div className="absolute right-3 top-3">
                  <span className="rounded-full bg-violet-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm">
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
          <div className="flex-1 pb-2 text-center md:text-left">
            {/* Back link */}
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white/70"
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              Back to Home
            </Link>

            {/* Meta line */}
            <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
                {kindLabel(title.kind)}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="text-xs text-white/50">{title.year}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="rounded border border-white/20 px-1.5 py-px text-[10px] font-medium text-white/60">
                {title.rating}
              </span>
              {title.runtime && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-xs text-white/50">{title.runtime}</span>
                </>
              )}
              {title.studio && (
                <>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-xs text-white/50">{title.studio}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tighter sm:text-4xl lg:text-6xl">
              {title.title}
            </h1>

            {/* Genre chips + season info */}
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
              {title.genres.map((g) => (
                <MetaChip key={g}>{g}</MetaChip>
              ))}
              {title.seasonCount && (
                <span className="ml-1 text-sm text-white/40">
                  {title.seasonCount} {title.seasonCount === 1 ? "Season" : "Seasons"}
                  {title.episodeCount ? ` · ${title.episodeCount} Ep` : ""}
                </span>
              )}
              {title.status && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    title.status === "ongoing"
                      ? "bg-green-500/10 text-green-400"
                      : title.status === "upcoming"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-white/[0.06] text-white/40"
                  }`}
                >
                  {title.status}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mx-auto mb-7 max-w-xl text-sm leading-relaxed text-white/60 md:mx-0 lg:text-base">
              {title.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                href={`/watch/${title.slug}`}
                className="flex items-center gap-2.5 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-white/90 hover:scale-[1.02] active:scale-100"
              >
                <PlayIcon className="h-5 w-5" />
                Watch Now
              </Link>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-7 py-3.5 text-sm font-bold backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <PlusIcon className="h-5 w-5" />
                My List
              </button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Main Content ────────────────────────────────────────── */}
      <div className="space-y-14 pb-16 pt-10 lg:space-y-20 lg:pt-16">

        {/* ── Episodes ───────────────────────────────────────────── */}
        {hasEpisodes && (
          <section>
            <PageContainer>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight lg:text-2xl">
                  Episodes
                </h2>
                {title.seasons && title.seasons.length > 0 && (
                  <div className="relative">
                    <select className="appearance-none rounded-lg border border-white/[0.08] bg-white/[0.04] py-2 pl-4 pr-10 text-sm font-medium text-white/80 focus:outline-none focus:ring-2 focus:ring-violet-500/40">
                      {title.seasons.map((s) => (
                        <option key={s.id} className="bg-[#0d121f]" value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
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
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
              {/* Story */}
              <div className="lg:col-span-2">
                <h2 className="mb-4 text-xl font-bold tracking-tight lg:text-2xl">
                  The Story
                </h2>
                <p className="text-sm leading-[1.8] text-white/60 lg:text-base lg:leading-[1.9]">
                  {title.description}
                  {title.kind === "anime" && (
                    <>
                      <br /><br />
                      After narrowly surviving an overwhelmingly powerful encounter
                      that nearly wiped out everything, a mysterious program selects
                      the protagonist as its sole player — granting an extremely rare
                      ability to grow stronger beyond any known limits. What follows
                      is a journey through impossible odds and ever-escalating stakes.
                    </>
                  )}
                  {title.kind === "series" && (
                    <>
                      <br /><br />
                      As the layers of this enigmatic world unfold, nothing is quite
                      what it seems. Each revelation raises more questions, pulling
                      the viewer deeper into a meticulously crafted narrative.
                    </>
                  )}
                  {title.kind === "movie" && (
                    <>
                      <br /><br />
                      A cinematic experience that combines breathtaking visuals with
                      a deeply human story. The scale of the production matches the
                      ambition of its storytelling.
                    </>
                  )}
                </p>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Cast */}
                <div>
                  <h3 className="mb-4 text-base font-bold tracking-tight lg:text-lg">
                    Cast & Crew
                  </h3>
                  <div className="space-y-3">
                    {demoCast.map((member) => (
                      <CastMember key={member.initials} member={member} />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold tracking-tight lg:text-lg">
                    Details
                  </h3>
                  <div className="space-y-2.5 text-sm">
                    {title.studio && (
                      <div className="flex justify-between">
                        <span className="text-white/30">Studio</span>
                        <span className="text-white/70">{title.studio}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-white/30">Year</span>
                      <span className="text-white/70">{title.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/30">Rating</span>
                      <span className="text-white/70">{title.rating}</span>
                    </div>
                    {title.runtime && (
                      <div className="flex justify-between">
                        <span className="text-white/30">Runtime</span>
                        <span className="text-white/70">{title.runtime}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-white/30">Audio</span>
                      <span className="text-white/70">
                        {[
                          title.isSubbed ? "Japanese (Sub)" : null,
                          title.isDubbed ? "English (Dub)" : null,
                        ]
                          .filter(Boolean)
                          .join(", ") || "Original"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/30">Genres</span>
                      <span className="text-right text-white/70">
                        {title.genres.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* ── Related Titles ─────────────────────────────────────── */}
        {relatedTitles.length > 0 && (
          <section>
            <PageContainer>
              <h2 className="mb-5 text-xl font-bold tracking-tight lg:text-2xl">
                You May Also Like
              </h2>
              <div className={`${scrollRow} lg:gap-5`}>
                {relatedTitles.map((item) => (
                  <RelatedCard key={item.id} item={item} />
                ))}
              </div>
            </PageContainer>
          </section>
        )}

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
