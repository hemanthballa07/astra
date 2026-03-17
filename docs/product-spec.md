# Astra Product Spec

## Vision
Astra is a Netflix-inspired streaming platform for anime, series, and movies with a unified viewing experience and anime-specific discovery features.

## Primary Goal
Build a strong, resume-worthy, actually usable viewer app with solid fundamentals, clean architecture, and consistent design.

## V1 In Scope
- Responsive web app
- Profile selection
- Home page
- Anime / Series / Movies hubs
- Browse / category page
- Title details page
- Video player page
- My List
- Search
- Continue Watching
- Watch progress tracking
- Subtitle/audio track selection
- Anime-specific filters: season, genre, studio, sub/dub
- Seasonal calendar
- Trending / Popular / Latest / Upcoming sections

## V1 Out of Scope
- Community
- Watch Together
- Random discover
- Comments / forums
- Ratings / reviews
- Payments
- DRM
- Native mobile apps
- Full admin CMS
- AI features

## Core User Flow
Profile Select -> Home -> Title Details -> Episode -> Player -> Progress Saved -> Continue Watching Updated -> Add/Remove from My List

## Content Types
- Anime
- Series
- Movie

## Main Routes
- /
- /anime
- /series
- /movies
- /browse
- /title/[slug]
- /watch/[title]/[episode]
- /my-list
- /profiles
- /search

## Success Criteria
- Consistent design system
- Reusable components
- One complete vertical slice working end to end
- Easy for future AI agents to extend without breaking structure