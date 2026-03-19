"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ────────────────────────────────────────────────────────────────────────
 * Navigation configuration
 * ──────────────────────────────────────────────────────────────────────── */

const navLinks = [
  { href: "/", label: "Home", id: "home" },
  { href: "/anime", label: "Anime", id: "anime" },
  { href: "/series", label: "TV Series", id: "series" },
  { href: "/movies", label: "Movies", id: "movies" },
  { href: "/browse", label: "New & Popular", id: "popular" },
  { href: "/my-list", label: "My List", id: "mylist" },
];

/* ────────────────────────────────────────────────────────────────────────
 * Icon Components
 * ──────────────────────────────────────────────────────────────────────── */

function SearchIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function BellIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Header Navigation Component
 * ──────────────────────────────────────────────────────────────────────── */

export function HeaderNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Determine active nav item based on current path
  const getActiveItem = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/anime")) return "anime";
    if (pathname.startsWith("/series")) return "series";
    if (pathname.startsWith("/movies")) return "movies";
    if (pathname.startsWith("/browse")) return "popular";
    if (pathname.startsWith("/my-list")) return "mylist";
    return "";
  };

  const activeItem = getActiveItem();

  // Handle scroll for background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery(""); // Clear after navigation
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-5 transition-all duration-300 lg:px-12 ${
        isScrolled
          ? "bg-black"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      {/* Left: Logo + Nav Links */}
      <div className="flex items-center gap-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/5a83edba-c9d3-4fb5-8b76-6f04e2de230e/1773516175986-3ee270de/astra_logo.png"
            alt="Astra"
            className="h-8 w-auto object-contain md:h-9"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`transition-colors hover:text-white ${
                activeItem === link.id ? "text-white" : "text-gray-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: Search + Notifications + Profile */}
      <div className="flex items-center gap-6">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <SearchIcon className="pointer-events-none absolute left-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Titles, genres..."
            className="w-48 rounded-full border border-white/5 bg-white/10 py-1.5 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-1 focus:ring-violet-500/50 lg:w-64"
          />
        </form>

        {/* Notifications */}
        <button className="text-2xl text-gray-300 transition-colors hover:text-white">
          <BellIcon className="h-6 w-6" />
        </button>

        {/* Profile */}
        <div className="group flex cursor-pointer items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-md border border-white/20 bg-gradient-to-tr from-violet-600 to-indigo-600">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Astra"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <ChevronDownIcon className="text-gray-400 transition-transform duration-300 group-hover:rotate-180 group-hover:text-white" />
        </div>
      </div>
    </header>
  );
}