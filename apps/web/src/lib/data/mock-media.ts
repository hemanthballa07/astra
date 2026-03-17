import type { MediaTitle } from "@/lib/types/media";

export const mockMedia: MediaTitle[] = [
  {
    id: "1",
    slug: "solo-leveling",
    title: "Solo Leveling",
    description:
      "A weak hunter gains access to a mysterious system that lets him grow stronger through deadly quests.",
    kind: "anime",
    posterUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1400&auto=format&fit=crop",
    genres: ["Action", "Fantasy"],
    year: 2024,
    rating: "TV-14",
    seasonLabel: "Season 1",
    episodeCount: 12,
    seasonCount: 1,
    isDubbed: true,
    isSubbed: true,
    studio: "A-1 Pictures",
    status: "ongoing",
    seasons: [
      {
        id: "s1",
        number: 1,
        title: "Season 1",
        episodes: [
          {
            id: "e1",
            number: 1,
            title: "I'm Used to It",
            durationMinutes: 24,
            thumbnailUrl:
              "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?q=80&w=800&auto=format&fit=crop",
          },
          {
            id: "e2",
            number: 2,
            title: "If I Had One More Chance",
            durationMinutes: 24,
            thumbnailUrl:
              "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    slug: "dune-part-two",
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with the Fremen while preparing for war against those who destroyed his family.",
    kind: "movie",
    posterUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1400&auto=format&fit=crop",
    genres: ["Sci-Fi", "Adventure"],
    year: 2024,
    rating: "PG-13",
    runtime: "2h 46m",
    isDubbed: true,
    isSubbed: true,
    status: "completed",
  },
  {
    id: "3",
    slug: "severance",
    title: "Severance",
    description:
      "Employees undergo a procedure that separates their work memories from their personal lives.",
    kind: "series",
    posterUrl:
      "https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?q=80&w=800&auto=format&fit=crop",
    backdropUrl:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1400&auto=format&fit=crop",
    genres: ["Thriller", "Drama"],
    year: 2022,
    rating: "TV-MA",
    seasonLabel: "Season 1",
    episodeCount: 9,
    seasonCount: 1,
    status: "ongoing",
  },
];