#!/usr/bin/env npx tsx
/**
 * Media Enrichment Script for Astra
 *
 * Automatically fetches poster and backdrop images for media titles
 * that are missing them in mock-media.ts.
 *
 * Usage:
 *   TMDB_API_KEY=your_key npx tsx scripts/enrich-media.ts
 *   TMDB_API_KEY=your_key npx tsx scripts/enrich-media.ts --dry-run
 *
 * APIs used:
 *   - TMDB (themoviedb.org) for movies and TV series - requires API key
 *   - Jikan (jikan.moe) for anime - no API key needed
 */

import * as fs from "fs";
import * as path from "path";

/* ─────────────────────────────────────────────────────────────────────────────
 * Configuration
 * ───────────────────────────────────────────────────────────────────────────── */

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
const JIKAN_BASE = "https://api.jikan.moe/v4";

const MOCK_MEDIA_PATH = path.resolve(
  __dirname,
  "../apps/web/src/lib/data/mock-media.ts"
);

const DRY_RUN = process.argv.includes("--dry-run");
const VERBOSE = process.argv.includes("--verbose") || process.argv.includes("-v");

/* ─────────────────────────────────────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────────────────────────────────────── */

interface MediaTitle {
  id: string;
  slug: string;
  title: string;
  kind: "anime" | "series" | "movie";
  posterUrl?: string;
  backdropUrl?: string;
  year?: number;
  tmdbId?: number;
  malId?: number;
  [key: string]: unknown;
}

interface EnrichmentResult {
  posterUrl?: string;
  backdropUrl?: string;
  tmdbId?: number;
  malId?: number;
}

interface TMDBSearchResult {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
}

interface JikanSearchResult {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  title: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Utilities
 * ───────────────────────────────────────────────────────────────────────────── */

function log(message: string): void {
  console.log(`[enrich] ${message}`);
}

function warn(message: string): void {
  console.warn(`[enrich] ⚠️  ${message}`);
}

function success(message: string): void {
  console.log(`[enrich] ✅ ${message}`);
}

function error(message: string): void {
  console.error(`[enrich] ❌ ${message}`);
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function needsEnrichment(media: MediaTitle): boolean {
  const hasPoster = media.posterUrl && !media.posterUrl.includes("unsplash");
  const hasBackdrop = media.backdropUrl && !media.backdropUrl.includes("unsplash");
  return !hasPoster || !hasBackdrop;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * TMDB API (Movies & Series)
 * ───────────────────────────────────────────────────────────────────────────── */

async function searchTMDB(
  title: string,
  kind: "movie" | "series",
  year?: number
): Promise<EnrichmentResult | null> {
  if (!TMDB_API_KEY) {
    warn("TMDB_API_KEY not set - skipping TMDB lookup");
    return null;
  }

  const endpoint = kind === "movie" ? "movie" : "tv";
  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    query: title,
    include_adult: "false",
  });

  if (year) {
    params.set(kind === "movie" ? "year" : "first_air_date_year", String(year));
  }

  try {
    const url = `https://api.themoviedb.org/3/search/${endpoint}?${params}`;
    if (VERBOSE) log(`Fetching: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    const results: TMDBSearchResult[] = data.results || [];

    if (results.length === 0) {
      return null;
    }

    // Find best match (first result is usually best)
    const match = results[0];

    const result: EnrichmentResult = {
      tmdbId: match.id,
    };

    if (match.poster_path) {
      result.posterUrl = `${TMDB_IMAGE_BASE}/w500${match.poster_path}`;
    }

    if (match.backdrop_path) {
      result.backdropUrl = `${TMDB_IMAGE_BASE}/original${match.backdrop_path}`;
    }

    return result;
  } catch (err) {
    warn(`TMDB search failed for "${title}": ${err}`);
    return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Jikan API (Anime)
 * ───────────────────────────────────────────────────────────────────────────── */

async function searchJikan(title: string): Promise<EnrichmentResult | null> {
  try {
    const params = new URLSearchParams({
      q: title,
      limit: "5",
      sfw: "true",
    });

    const url = `${JIKAN_BASE}/anime?${params}`;
    if (VERBOSE) log(`Fetching: ${url}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Jikan API error: ${response.status}`);
    }

    const data = await response.json();
    const results: JikanSearchResult[] = data.data || [];

    if (results.length === 0) {
      return null;
    }

    // Find best match
    const match = results[0];

    // Jikan only provides poster-style images, not backdrops
    // We'll use the large image for poster
    const result: EnrichmentResult = {
      malId: match.mal_id,
    };

    if (match.images?.jpg?.large_image_url) {
      result.posterUrl = match.images.jpg.large_image_url;
    }

    // For anime, we can try TMDB as fallback for backdrop
    // Many anime are also on TMDB
    const tmdbResult = await searchTMDB(title, "series");
    if (tmdbResult?.backdropUrl) {
      result.backdropUrl = tmdbResult.backdropUrl;
      if (tmdbResult.tmdbId) {
        result.tmdbId = tmdbResult.tmdbId;
      }
    }

    return result;
  } catch (err) {
    warn(`Jikan search failed for "${title}": ${err}`);
    return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────────────
 * File Parsing & Writing
 * ───────────────────────────────────────────────────────────────────────────── */

function parseMediaArray(content: string): MediaTitle[] {
  // Extract the array content between the first [ and last ]
  const arrayMatch = content.match(
    /export\s+const\s+mockMedia:\s*MediaTitle\[\]\s*=\s*(\[[\s\S]*\]);?\s*$/
  );

  if (!arrayMatch) {
    throw new Error("Could not find mockMedia array in file");
  }

  // Use Function constructor to safely evaluate the array
  // This is safe because we control the input file
  try {
    const arrayStr = arrayMatch[1];
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const fn = new Function(`return ${arrayStr}`);
    return fn() as MediaTitle[];
  } catch (err) {
    throw new Error(`Failed to parse media array: ${err}`);
  }
}

function generateMediaFile(media: MediaTitle[]): string {
  const formatValue = (value: unknown, indent: number): string => {
    const spaces = "  ".repeat(indent);
    const nextSpaces = "  ".repeat(indent + 1);

    if (value === null || value === undefined) {
      return String(value);
    }

    if (typeof value === "string") {
      // Use double quotes and escape internal quotes
      const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return `"${escaped}"`;
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return "[]";

      // Check if it's a simple array (strings, numbers)
      const isSimple = value.every(
        (v) => typeof v === "string" || typeof v === "number"
      );

      if (isSimple && value.length <= 4) {
        return `[${value.map((v) => formatValue(v, 0)).join(", ")}]`;
      }

      const items = value
        .map((v) => `${nextSpaces}${formatValue(v, indent + 1)}`)
        .join(",\n");
      return `[\n${items},\n${spaces}]`;
    }

    if (typeof value === "object") {
      const obj = value as Record<string, unknown>;
      const entries = Object.entries(obj)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${nextSpaces}${k}: ${formatValue(v, indent + 1)}`);
      return `{\n${entries.join(",\n")},\n${spaces}}`;
    }

    return String(value);
  };

  const mediaStrings = media.map((item) => {
    // Determine section comment based on first item of each kind
    const lines: string[] = [];

    // Format the media object with proper indentation
    const entries = Object.entries(item)
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => `    ${k}: ${formatValue(v, 2)}`);

    lines.push("  {");
    lines.push(entries.join(",\n"));
    lines.push("  }");

    return lines.join("\n");
  });

  // Group by kind for section comments
  const animeItems: string[] = [];
  const movieItems: string[] = [];
  const seriesItems: string[] = [];

  media.forEach((item, index) => {
    const formatted = mediaStrings[index];
    switch (item.kind) {
      case "anime":
        animeItems.push(formatted);
        break;
      case "movie":
        movieItems.push(formatted);
        break;
      case "series":
        seriesItems.push(formatted);
        break;
    }
  });

  const sections: string[] = [];

  if (animeItems.length > 0) {
    sections.push(
      `  // ${"─".repeat(77)}\n  // ANIME\n  // ${"─".repeat(77)}`
    );
    sections.push(animeItems.join(",\n"));
  }

  if (movieItems.length > 0) {
    sections.push(
      `\n  // ${"─".repeat(77)}\n  // MOVIES\n  // ${"─".repeat(77)}`
    );
    sections.push(movieItems.join(",\n"));
  }

  if (seriesItems.length > 0) {
    sections.push(
      `\n  // ${"─".repeat(77)}\n  // SERIES\n  // ${"─".repeat(77)}`
    );
    sections.push(seriesItems.join(",\n"));
  }

  return `import type { MediaTitle } from "@/lib/types/media";

export const mockMedia: MediaTitle[] = [
${sections.join(",\n")},
];
`;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Main Enrichment Logic
 * ───────────────────────────────────────────────────────────────────────────── */

async function enrichMedia(media: MediaTitle[]): Promise<MediaTitle[]> {
  const enriched: MediaTitle[] = [];
  let updatedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (const item of media) {
    // Check if enrichment is needed
    if (!needsEnrichment(item)) {
      if (VERBOSE) log(`Skipping "${item.title}" - already has images`);
      skippedCount++;
      enriched.push(item);
      continue;
    }

    log(`Enriching "${item.title}" (${item.kind})...`);

    let result: EnrichmentResult | null = null;

    // Choose API based on content kind
    if (item.kind === "anime") {
      result = await searchJikan(item.title);
      // Rate limit for Jikan (3 requests per second)
      await sleep(400);
    } else {
      result = await searchTMDB(item.title, item.kind, item.year);
      // Rate limit for TMDB (40 requests per 10 seconds)
      await sleep(300);
    }

    if (result) {
      const updated = { ...item };
      let changed = false;

      // Only update missing fields
      if (result.posterUrl && (!item.posterUrl || item.posterUrl.includes("unsplash"))) {
        updated.posterUrl = result.posterUrl;
        changed = true;
      }

      if (result.backdropUrl && (!item.backdropUrl || item.backdropUrl.includes("unsplash"))) {
        updated.backdropUrl = result.backdropUrl;
        changed = true;
      }

      // Add source IDs for reference
      if (result.tmdbId) {
        updated.tmdbId = result.tmdbId;
      }
      if (result.malId) {
        updated.malId = result.malId;
      }

      if (changed) {
        success(`Updated "${item.title}"`);
        updatedCount++;
      } else {
        log(`No new images found for "${item.title}"`);
      }

      enriched.push(updated);
    } else {
      warn(`No results found for "${item.title}"`);
      failedCount++;
      enriched.push(item);
    }
  }

  console.log("\n" + "─".repeat(60));
  log(`Summary: ${updatedCount} updated, ${skippedCount} skipped, ${failedCount} failed`);

  return enriched;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Main
 * ───────────────────────────────────────────────────────────────────────────── */

async function main(): Promise<void> {
  console.log("\n🎬 Astra Media Enrichment Script\n" + "─".repeat(60));

  if (DRY_RUN) {
    log("Running in DRY RUN mode - no files will be modified\n");
  }

  if (!TMDB_API_KEY) {
    warn("TMDB_API_KEY not set - movies and series will use Jikan fallback only");
    warn("Get a free API key at: https://www.themoviedb.org/settings/api\n");
  }

  // Read the file
  log(`Reading ${MOCK_MEDIA_PATH}...`);
  const content = fs.readFileSync(MOCK_MEDIA_PATH, "utf-8");

  // Parse media array
  log("Parsing media array...\n");
  const media = parseMediaArray(content);
  log(`Found ${media.length} media titles\n`);

  // Enrich media
  const enriched = await enrichMedia(media);

  // Generate new file content
  const newContent = generateMediaFile(enriched);

  if (DRY_RUN) {
    console.log("\n" + "─".repeat(60));
    log("DRY RUN - Would write the following:\n");
    console.log(newContent.slice(0, 2000) + "\n... (truncated)");
  } else {
    // Write back
    log(`\nWriting to ${MOCK_MEDIA_PATH}...`);
    fs.writeFileSync(MOCK_MEDIA_PATH, newContent, "utf-8");
    success("File updated successfully!");
  }

  console.log("─".repeat(60) + "\n");
}

// Run
main().catch((err) => {
  error(`Script failed: ${err}`);
  process.exit(1);
});
