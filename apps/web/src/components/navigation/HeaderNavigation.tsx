import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/anime", label: "Anime" },
  { href: "/series", label: "Series" },
  { href: "/movies", label: "Movies" },
  { href: "/my-list", label: "My List" },
];

export function HeaderNavigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050811]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          Astra
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/75 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/search"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
        >
          Search
        </Link>
      </div>
    </header>
  );
}