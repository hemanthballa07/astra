# Astra AI Working Rules

## Project identity
Astra is a Netflix-inspired streaming platform for anime, series, and movies.
This repo is building the viewer app first, not the full platform.

## Source of truth
Before making any code changes, always read:
- docs/product-spec.md
- docs/routes.md
- docs/design-system.md
- docs/component-inventory.md
- docs/agent-rules.md

Do not invent behavior that conflicts with these docs.

## Current scope
Build only V1 viewer app features:
- profiles
- home
- anime / series / movies hubs
- browse
- title details
- video player
- my list
- search
- continue watching
- progress tracking
- subtitle/audio switching

Not in V1:
- community
- watch together
- random discover
- forums
- comments
- payments
- DRM
- AI features

## Design rules
- follow the design system exactly
- prioritize reusable components
- do not introduce new visual styles without updating docs/design-system.md
- use portrait media cards for titles
- use landscape cards only for continue-watching and progress contexts
- keep the UI cinematic, dark, and content-first
- avoid noisy gradients, heavy borders, or excessive glow

## Engineering rules
- prefer clear architecture over speed
- do not add dependencies unless necessary
- keep components small and reusable
- do not create duplicate route-specific versions of shared components
- keep types explicit
- prefer deterministic fixtures and mock data for early development
- do not implement backend, transcoding, or cloud infrastructure yet unless explicitly requested

## Workflow
When asked to build something:
1. Restate the task briefly.
2. Identify affected routes and components.
3. Update docs if structure changes.
4. Implement the smallest correct version.
5. Check consistency with the design system.

## If uncertain
Ask before changing architecture or expanding scope.