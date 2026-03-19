export type ContentKind = "anime" | "series" | "movie";

export interface Episode {
  id: string;
  number: number;
  title: string;
  durationMinutes: number;
  thumbnailUrl?: string;
  description?: string;
}

export interface Season {
  id: string;
  number: number;
  title: string;
  episodes: Episode[];
}

export interface MediaTitle {
  id: string;
  slug: string;
  title: string;
  description: string;
  kind: ContentKind;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  year: number;
  rating: string;
  runtime?: string;
  seasonLabel?: string;
  episodeCount?: number;
  seasonCount?: number;
  isDubbed?: boolean;
  isSubbed?: boolean;
  studio?: string;
  status?: "ongoing" | "completed" | "upcoming";
  seasons?: Season[];
  // External source IDs (populated by enrichment script)
  tmdbId?: number;
  malId?: number;
}