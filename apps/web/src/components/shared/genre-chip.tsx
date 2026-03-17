import Link from "next/link";

interface GenreChipProps {
  /** The chip label text */
  label: string;
  /** Whether the chip is in active/selected state */
  active?: boolean;
  /** Optional href to render as a Link */
  href?: string;
  /** Optional click handler to render as a button */
  onClick?: () => void;
  /** Optional className for custom styling */
  className?: string;
}

export function GenreChip({
  label,
  active = false,
  href,
  onClick,
  className = "",
}: GenreChipProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    flex-shrink-0
    rounded-full
    px-4 py-2
    text-xs font-medium
    transition-all duration-200
    outline-none
    focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050811]
  `;

  const stateStyles = active
    ? `
      bg-gradient-to-r from-violet-600 to-fuchsia-600
      text-white
      shadow-lg shadow-violet-600/20
      border border-transparent
    `
    : `
      border border-white/[0.08]
      bg-white/[0.03]
      text-white/60
      hover:bg-white/[0.06]
      hover:text-white
      hover:border-white/[0.15]
    `;

  const combinedStyles = `${baseStyles} ${stateStyles} ${className}`.trim();

  // Render as Link when href is provided
  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {label}
      </Link>
    );
  }

  // Render as button when onClick is provided
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={combinedStyles}>
        {label}
      </button>
    );
  }

  // Render as span for static display
  return <span className={combinedStyles}>{label}</span>;
}
