import Link from "next/link";

interface SectionHeaderProps {
  /** The main heading text */
  title: string;
  /** Optional description below the title */
  description?: string;
  /** Optional small eyebrow/kicker text above or beside the title */
  eyebrow?: string;
  /** Optional count displayed as a badge beside the title */
  count?: number;
  /** Optional action link text (e.g., "View All") */
  actionLabel?: string;
  /** Optional href for the action link */
  actionHref?: string;
  /** Optional className for outer spacing adjustments */
  className?: string;
}

export function SectionHeader({
  title,
  description,
  eyebrow,
  count,
  actionLabel,
  actionHref,
  className = "",
}: SectionHeaderProps) {
  const hasAction = actionLabel && actionHref;

  return (
    <div className={`mb-5 ${className}`}>
      {/* Eyebrow */}
      {eyebrow && (
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-violet-400">
          {eyebrow}
        </p>
      )}

      {/* Title row */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight text-white sm:text-xl lg:text-2xl">
          {title}
          {typeof count === "number" && (
            <span className="rounded bg-white/[0.06] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
              {count} {count === 1 ? "title" : "titles"}
            </span>
          )}
        </h2>

        {hasAction && (
          <Link
            href={actionHref}
            className="flex-shrink-0 text-xs font-medium text-white/50 transition-colors hover:text-violet-400"
          >
            {actionLabel}
          </Link>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="mt-2 max-w-2xl text-sm text-white/50">{description}</p>
      )}
    </div>
  );
}
