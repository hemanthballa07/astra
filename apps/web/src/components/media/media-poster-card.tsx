"use client";

import Link from "next/link";

// -----------------------------------------------------------------------------
// Icons (inline to avoid external dependencies)
// -----------------------------------------------------------------------------

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface MediaPosterCardProps {
  /** URL slug used to build the `/title/[slug]` link */
  slug: string;
  /** Display title shown below the poster */
  title: string;
  /** Poster image URL */
  posterUrl: string;
  /** Optional metadata rendered below the title (e.g., year, genre, episode count) */
  meta?: React.ReactNode;
  /** Optional badge element rendered as an overlay on the poster */
  badge?: React.ReactNode;
  /** Corner position for the badge overlay */
  badgePosition?: "top-left" | "top-right";
  /** Hover interaction style: centered play button or bottom CTA bar */
  hoverVariant?: "play" | "cta";
  /** Label for CTA variant (ignored when hoverVariant is "play") */
  ctaLabel?: string;
  /** Additional class names for the root element */
  className?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function MediaPosterCard({
  slug,
  title,
  posterUrl,
  meta,
  badge,
  badgePosition = "top-right",
  hoverVariant = "play",
  ctaLabel = "View Details",
  className = "",
}: MediaPosterCardProps) {
  const badgePositionClasses =
    badgePosition === "top-left" ? "top-2 left-2" : "top-2 right-2";

  return (
    <Link
      href={`/title/${slug}`}
      className={`group block ${className}`}
    >
      {/* Poster container */}
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2.5 bg-[#0a0f1a] ring-1 ring-white/[0.06] group-hover:ring-violet-500/30 transition-all duration-300">
        {/* Poster image */}
        <img
          src={posterUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Hover overlay */}
        {hoverVariant === "play" ? (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <PlayIcon className="w-5 h-5 text-black ml-0.5" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="block w-full text-center text-sm font-medium text-white py-2 px-4 bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors">
              {ctaLabel}
            </span>
          </div>
        )}

        {/* Badge slot */}
        {badge && (
          <div className={`absolute ${badgePositionClasses} z-10`}>
            {badge}
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-[13px] text-white/90 truncate group-hover:text-violet-400 transition-colors duration-200">
        {title}
      </h3>

      {/* Meta slot */}
      {meta && (
        <div className="text-[11px] text-white/40 truncate mt-0.5">
          {meta}
        </div>
      )}
    </Link>
  );
}

export default MediaPosterCard;
