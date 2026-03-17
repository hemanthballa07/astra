import type { MediaTitle } from "@/lib/types/media";

export const mockMedia: MediaTitle[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // ANIME
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "solo-leveling",
    title: "Solo Leveling",
    description:
      "A weak hunter gains access to a mysterious system that lets him grow stronger through deadly quests.",
    kind: "anime",
    // Dark dungeon/shadow aesthetic with blue-purple tones
    posterUrl:
      "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/4BfvNRpVtzZ5zfLkZEUvvYCmfTr.jpg",
    genres: ["Action", "Fantasy"],
    year: 2024,
    rating: "TV-14",
    seasonLabel: "Season 2",
    episodeCount: 12,
    seasonCount: 2,
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
              "https://image.tmdb.org/t/p/w500/4BfvNRpVtzZ5zfLkZEUvvYCmfTr.jpg",
          },
          {
            id: "e2",
            number: 2,
            title: "If I Had One More Chance",
            durationMinutes: 24,
            thumbnailUrl:
              "https://image.tmdb.org/t/p/w500/4BfvNRpVtzZ5zfLkZEUvvYCmfTr.jpg",
          },
        ],
      },
      {
        id: "s2",
        number: 2,
        title: "Season 2",
        episodes: [
          {
            id: "e1-s2",
            number: 1,
            title: "I Will Fight",
            durationMinutes: 24,
            thumbnailUrl:
              "https://image.tmdb.org/t/p/w500/4BfvNRpVtzZ5zfLkZEUvvYCmfTr.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    slug: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    description:
      "A boy swallows a cursed talisman and becomes host to a powerful curse, joining a secret school of sorcerers.",
    kind: "anime",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/hFWP5HkbVEe40hrXgtCeQxoccHE.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/gmECX1DvFgdpH79YG3daqHT6gLu.jpg",
    genres: ["Action", "Supernatural"],
    year: 2023,
    rating: "TV-MA",
    seasonLabel: "Season 2",
    episodeCount: 47,
    seasonCount: 2,
    isDubbed: true,
    isSubbed: true,
    studio: "MAPPA",
    status: "ongoing",
  },
  {
    id: "5",
    slug: "frieren",
    title: "Frieren: Beyond Journey's End",
    description:
      "An elf mage begins a journey to understand humanity after outliving her former adventuring companions.",
    kind: "anime",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/dqZENchTd7lp5zht7BdlqM7RBhD.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/rgHaEbH15fWvHLz0DJFM0tB5b0r.jpg",
    genres: ["Fantasy", "Adventure"],
    year: 2024,
    rating: "TV-14",
    seasonLabel: "Season 1",
    episodeCount: 28,
    seasonCount: 1,
    isDubbed: true,
    isSubbed: true,
    studio: "Madhouse",
    status: "completed",
  },
  {
    id: "6",
    slug: "attack-on-titan",
    title: "Attack on Titan",
    description:
      "Humanity fights for survival against giant humanoid creatures that devour people without reason.",
    kind: "anime",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg",
    genres: ["Action", "Drama"],
    year: 2023,
    rating: "TV-MA",
    seasonLabel: "Final Season",
    episodeCount: 88,
    seasonCount: 4,
    isDubbed: true,
    isSubbed: true,
    studio: "MAPPA",
    status: "completed",
  },
  {
    id: "7",
    slug: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    description:
      "A young boy becomes a demon slayer to avenge his family and cure his sister who was turned into a demon.",
    kind: "anime",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/nGlBnNrpHpoQzF7gYozy0IeOvXo.jpg",
    genres: ["Action", "Fantasy"],
    year: 2024,
    rating: "TV-14",
    seasonLabel: "Season 4",
    episodeCount: 55,
    seasonCount: 4,
    isDubbed: true,
    isSubbed: true,
    studio: "Ufotable",
    status: "ongoing",
  },
  {
    id: "16",
    slug: "spy-x-family",
    title: "Spy x Family",
    description:
      "A spy forms a fake family with an assassin and a telepath to complete a mission, unaware of each other's secrets.",
    kind: "anime",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/3r4LYFuXrg2s8IiM6EVfGKzFpNG.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/wlYsoobdMgBp0d2t2rZHS1PvSY1.jpg",
    genres: ["Action", "Comedy"],
    year: 2024,
    rating: "TV-14",
    seasonLabel: "Season 2",
    episodeCount: 37,
    seasonCount: 2,
    isDubbed: true,
    isSubbed: true,
    studio: "Wit Studio",
    status: "ongoing",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MOVIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "2",
    slug: "dune-part-two",
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with the Fremen while preparing for war against those who destroyed his family.",
    kind: "movie",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genres: ["Sci-Fi", "Adventure"],
    year: 2024,
    rating: "PG-13",
    runtime: "2h 46m",
    isDubbed: true,
    isSubbed: true,
    status: "completed",
  },
  {
    id: "8",
    slug: "oppenheimer",
    title: "Oppenheimer",
    description:
      "The story of physicist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    kind: "movie",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    genres: ["Biography", "Drama"],
    year: 2023,
    rating: "R",
    runtime: "3h 1m",
    isDubbed: true,
    isSubbed: true,
    status: "completed",
  },
  {
    id: "9",
    slug: "the-batman",
    title: "The Batman",
    description:
      "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    kind: "movie",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fvber9suvzl3VuAW.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    genres: ["Action", "Crime"],
    year: 2022,
    rating: "PG-13",
    runtime: "2h 56m",
    isDubbed: true,
    isSubbed: true,
    status: "completed",
  },
  {
    id: "10",
    slug: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    description:
      "A middle-aged woman discovers she can access parallel universe versions of herself to save the multiverse.",
    kind: "movie",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/fgw4rFs4XMWdJTWp1eMacHKQqbZ.jpg",
    genres: ["Sci-Fi", "Action"],
    year: 2022,
    rating: "R",
    runtime: "2h 19m",
    isDubbed: true,
    isSubbed: true,
    status: "completed",
  },
  {
    id: "17",
    slug: "spider-man-across-the-spider-verse",
    title: "Spider-Man: Across the Spider-Verse",
    description:
      "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People fighting a new threat.",
    kind: "movie",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    genres: ["Animation", "Action"],
    year: 2023,
    rating: "PG",
    runtime: "2h 20m",
    isDubbed: true,
    isSubbed: true,
    status: "completed",
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // SERIES
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "3",
    slug: "severance",
    title: "Severance",
    description:
      "Employees undergo a procedure that separates their work memories from their personal lives.",
    kind: "series",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/lFf6LLrQjYldcZItzOkGmMMigP7.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/9kXS5dDzGAjpUJRc8yNMYOKl8Av.jpg",
    genres: ["Thriller", "Drama"],
    year: 2022,
    rating: "TV-MA",
    seasonLabel: "Season 2",
    episodeCount: 19,
    seasonCount: 2,
    status: "ongoing",
    seasons: [
      {
        id: "sev-s1",
        number: 1,
        title: "Season 1",
        episodes: [
          {
            id: "sev-e1",
            number: 1,
            title: "Good News About Hell",
            durationMinutes: 57,
            thumbnailUrl:
              "https://image.tmdb.org/t/p/w500/9kXS5dDzGAjpUJRc8yNMYOKl8Av.jpg",
          },
          {
            id: "sev-e2",
            number: 2,
            title: "Half Loop",
            durationMinutes: 54,
            thumbnailUrl:
              "https://image.tmdb.org/t/p/w500/9kXS5dDzGAjpUJRc8yNMYOKl8Av.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "11",
    slug: "the-bear",
    title: "The Bear",
    description:
      "A young chef returns home to run his family's sandwich shop after a tragedy.",
    kind: "series",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/sHFlbKS8WfJsLR54yv1AT4Ve2mA.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/uDrLfDaPYVQQzXRS0cU683Yeq2C.jpg",
    genres: ["Drama", "Comedy"],
    year: 2024,
    rating: "TV-MA",
    seasonLabel: "Season 3",
    episodeCount: 28,
    seasonCount: 3,
    status: "ongoing",
  },
  {
    id: "12",
    slug: "shogun",
    title: "Shōgun",
    description:
      "An English sailor becomes embroiled in a power struggle between warring factions in feudal Japan.",
    kind: "series",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/bWTCMdRwzkPdnJwfnOPP2GDV56t.jpg",
    genres: ["Drama", "Historical"],
    year: 2024,
    rating: "TV-MA",
    seasonLabel: "Limited Series",
    episodeCount: 10,
    seasonCount: 1,
    status: "completed",
  },
  {
    id: "13",
    slug: "the-last-of-us",
    title: "The Last of Us",
    description:
      "A hardened survivor escorts a teenage girl across a post-apocalyptic United States.",
    kind: "series",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/uKvhYvp5a3J8CbNXJieLiTijfZo.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg",
    genres: ["Drama", "Action"],
    year: 2024,
    rating: "TV-MA",
    seasonLabel: "Season 2",
    episodeCount: 16,
    seasonCount: 2,
    status: "ongoing",
  },
  {
    id: "14",
    slug: "true-detective",
    title: "True Detective",
    description:
      "An anthology series following different detectives investigating dark and disturbing crimes.",
    kind: "series",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/cuV2O5ZyDLHSOWzg3nLVljp1ubw.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/fM3PQ6vHiTBRVP7dU2FRNRqsRCv.jpg",
    genres: ["Crime", "Drama"],
    year: 2024,
    rating: "TV-MA",
    seasonLabel: "Season 4",
    episodeCount: 31,
    seasonCount: 4,
    status: "ongoing",
  },
  {
    id: "15",
    slug: "breaking-bad",
    title: "Breaking Bad",
    description:
      "A chemistry teacher diagnosed with terminal cancer turns to manufacturing methamphetamine.",
    kind: "series",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    genres: ["Crime", "Drama"],
    year: 2013,
    rating: "TV-MA",
    seasonLabel: "Complete Series",
    episodeCount: 62,
    seasonCount: 5,
    status: "completed",
  },
  {
    id: "18",
    slug: "house-of-the-dragon",
    title: "House of the Dragon",
    description:
      "The story of the Targaryen civil war that took place about 200 years before the events of Game of Thrones.",
    kind: "series",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    backdropUrl:
      "https://image.tmdb.org/t/p/original/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
    genres: ["Fantasy", "Drama"],
    year: 2024,
    rating: "TV-MA",
    seasonLabel: "Season 2",
    episodeCount: 18,
    seasonCount: 2,
    status: "ongoing",
  },
];
