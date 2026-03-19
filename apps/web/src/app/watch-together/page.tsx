"use client";

import Link from "next/link";
import { HeaderNavigation } from "@/components/navigation/HeaderNavigation";
import { Footer } from "@/components/navigation/Footer";
import { PageContainer } from "@/components/shared/PageContainer";

/* ────────────────────────────────────────────────────────────────────────
 * Inline Icons
 * ──────────────────────────────────────────────────────────────────────── */

function UsersIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function VideoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function MessageCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function MicIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function PlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5.14v14.12a1 1 0 001.5.86l11-7.06a1 1 0 000-1.72l-11-7.06A1 1 0 008 5.14z" />
    </svg>
  );
}

function PauseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────
 * Mock Data (Static Display Only)
 * ──────────────────────────────────────────────────────────────────────── */

const mockParticipants = [
  { id: "1", name: "Alex", avatar: "bg-gradient-to-br from-violet-500 to-fuchsia-500", status: "watching" },
  { id: "2", name: "Jordan", avatar: "bg-gradient-to-br from-blue-500 to-cyan-500", status: "watching" },
  { id: "3", name: "Taylor", avatar: "bg-gradient-to-br from-green-500 to-emerald-500", status: "watching" },
  { id: "4", name: "Morgan", avatar: "bg-gradient-to-br from-orange-500 to-red-500", status: "idle" },
];

const plannedFeatures = [
  {
    icon: UsersIcon,
    title: "Private Rooms",
    description: "Create watch rooms and invite friends to join your viewing session.",
  },
  {
    icon: VideoIcon,
    title: "Synced Playback",
    description: "Everyone in the room sees the same moment—play, pause, and seek together.",
  },
  {
    icon: MessageCircleIcon,
    title: "Live Reactions",
    description: "React in real-time with emoji reactions and chat without leaving the player.",
  },
  {
    icon: MicIcon,
    title: "Voice Chat",
    description: "Optional voice channels for discussing plot twists as they happen.",
  },
];

/* ────────────────────────────────────────────────────────────────────────
 * Page Component
 * ──────────────────────────────────────────────────────────────────────── */

export default function WatchTogetherPage() {
  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <HeaderNavigation />

      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <PageContainer>
          <div className="text-center max-w-4xl mx-auto">
            {/* Future Feature Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-2">
              <span className="text-xs font-bold uppercase tracking-widest text-fuchsia-400">
                Future Experience
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl font-bold tracking-tight mb-4 lg:text-7xl">
              Watch{" "}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Together
              </span>
            </h1>

            <p className="text-lg text-white/60 mb-6 lg:text-xl">
              Shared viewing, synced playback, and group rooms are planned for a
              later version of Astra.
            </p>

            <p className="text-sm text-white/40 mb-8">
              This feature is not available in V1. The experience below is a
              preview of what's coming.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition-all hover:bg-white/90"
              >
                Back to Home
              </Link>
              <Link
                href="/browse"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-6 py-3 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/20"
              >
                Browse Titles
              </Link>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Static Mockup: Synchronized Viewing ────────────────── */}
      <section className="py-16">
        <PageContainer>
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2 lg:text-3xl">
                The Experience
              </h2>
              <p className="text-sm text-white/50">
                A glimpse of synchronized viewing with friends
              </p>
            </div>

            {/* Mockup Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0d121f]">
              {/* Static Video Player Mockup */}
              <div className="relative aspect-video bg-black">
                {/* Placeholder for video */}
                <img
                  src="https://image.tmdb.org/t/p/original/4BfvNRpVtzZ5zfLkZEUvvYCmfTr.jpg"
                  alt="Watch Together Preview"
                  className="w-full h-full object-cover opacity-60"
                />

                {/* Synced Indicator Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-2 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-green-400">
                    Synced with 4 viewers
                  </span>
                </div>

                {/* Static Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    {/* Play/Pause */}
                    <div className="flex items-center gap-4">
                      <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black opacity-50 cursor-not-allowed">
                        <PlayIcon className="ml-0.5 h-5 w-5" />
                      </button>
                      <span className="text-sm text-white/50">
                        0:15:32 / 0:24:00
                      </span>
                    </div>

                    {/* Host Label */}
                    <span className="text-xs text-white/40">
                      Playback controlled by room host
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1 w-full rounded-full bg-white/20">
                    <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                  </div>
                </div>
              </div>

              {/* Participant Sidebar */}
              <div className="border-t border-white/[0.08] bg-[#0a0f1a] p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Participants */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white/70">
                      In Room:
                    </span>
                    <div className="flex -space-x-2">
                      {mockParticipants.map((p) => (
                        <div
                          key={p.id}
                          className={`h-10 w-10 rounded-full ${p.avatar} ring-2 ring-[#0a0f1a] flex items-center justify-center text-xs font-bold text-white`}
                          title={p.name}
                        >
                          {p.name[0]}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Static Activity Feed */}
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
                    <span>Taylor reacted with 🔥</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Planned Features ────────────────────────────────────── */}
      <section className="py-16">
        <PageContainer>
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-3 lg:text-3xl">
                Planned Features
              </h2>
              <p className="text-base text-white/50 max-w-2xl mx-auto">
                Watch Together will bring synchronized viewing experiences to
                Astra in a future release.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {plannedFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.06]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Static Participant Showcase ─────────────────────────── */}
      <section className="py-16 border-t border-white/[0.05]">
        <PageContainer>
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2 lg:text-3xl">
                Watch with Friends
              </h2>
              <p className="text-sm text-white/50">
                Invite up to 10 friends to your viewing room
              </p>
            </div>

            {/* Static Participant Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {mockParticipants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex flex-col items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-6"
                >
                  {/* Avatar */}
                  <div
                    className={`mb-3 h-16 w-16 rounded-full ${participant.avatar} flex items-center justify-center text-xl font-bold text-white ring-2 ring-white/10`}
                  >
                    {participant.name[0]}
                  </div>

                  {/* Name */}
                  <span className="mb-2 text-sm font-semibold text-white">
                    {participant.name}
                  </span>

                  {/* Status */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        participant.status === "watching"
                          ? "bg-green-500"
                          : "bg-white/30"
                      }`}
                    />
                    <span className="text-xs text-white/40 capitalize">
                      {participant.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ─── Coming Later Notice ─────────────────────────────────── */}
      <section className="py-16">
        <PageContainer>
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 lg:p-12">
              <h3 className="text-xl font-bold text-white mb-3 lg:text-2xl">
                Not Available in V1
              </h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Watch Together is a planned feature for a future Astra release.
                We're focusing on building a strong V1 viewer experience first,
                with profiles, playback, progress tracking, and content
                discovery.
              </p>
              <p className="text-xs text-white/40">
                This page is a concept preview. No real-time synchronization,
                rooms, or social features are implemented yet.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      <Footer />
    </main>
  );
}
