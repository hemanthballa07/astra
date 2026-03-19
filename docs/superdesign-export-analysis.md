# Superdesign Export Analysis

## Overview

The superdesign export contains 8 HTML prototype pages for the Astra streaming platform. This document analyzes the design system, components, and patterns found in the V1-scope pages.

## V1 Scope Pages

1. **01-astra-home-with-reusable-components.html** - Home page with hero,continue watching, and content rails
2. **02-astra-title-details-screen.html** - Title detail page with episodes and metadata
3. **03-watching-solo-leveling-astra-video-player.html** - Video player with controls and episode queue
4. **04-astra-category-browse-page.html** - Browse/category page with filters and grid
5. **05-astra-my-list.html** - User's saved titles list

## Technology Stack

- **CSS Framework:** Tailwind CSS (via CDN)
- **Icons:** Iconify (via CDN) - uses lucide icon set
- **Fonts:** Cabinet Grotesk (headings) + Outfit (body) from Fontshare
- **Reactivity:** Petite Vue 0.4.1 (lightweight Vue alternative)
- **Components:** Superdesign component system with unique IDs

## Design System

### Color Palette

```css
--navy-dark: #050811;      /* Primary background */
--navy-card: #0d121f;      /* Card backgrounds */
--accent-purple: #8b5cf6;  /* Primary accent (violet-500) */
--accent-pink: #d946ef;    /* Secondary accent (fuchsia-500) */
```

**Gradient:**
- Text gradient: `from-violet-400 to-fuchsia-400`
- Button gradient: `from-violet-600 to-indigo-600`
- Progress gradient: `from-violet-500 to-fuchsia-500`

**Opacity Scales:**
- Borders: `border-white/5` or `border-white/10`
- Backgrounds: `bg-white/5`, `bg-white/10`, `bg-black/40`, `bg-black/60`
- Text: `text-white/40` (labels), `text-gray-300` (secondary), `text-gray-400` (tertiary)

### Typography

**Font Families:**
- Headings: `'Cabinet Grotesk', sans-serif` (weights: 800, 700, 600)
- Body: `'Outfit', sans-serif` (weights: 600, 500, 400)

**Letter Spacing:**
- Headings: `-0.02em` (tight tracking)
- Uppercase labels: `tracking-widest` or `tracking-wide`

**Text Sizes:**
- Hero title: `text-5xl lg:text-8xl`
- Section headings: `text-xl lg:text-2xl`
- Card titles: `text-sm lg:text-base`
- Meta text: `text-[10px]` or `text-xs`

### Borders & Shadows

**Border Styles:**
- Subtle: `border border-white/5` or `border-white/10`
- Rings: `ring-1 ring-white/[0.06]`
- Focused: `ring-1 ring-violet-500/50`

**Shadows:**
- Card hover: `box-shadow: 0 0 20px rgba(139, 92, 246, 0.3)` (violet glow)
- Subtle: `shadow-lg`, `shadow-xl` (built-in Tailwind)

**Rounded Corners:**
- Standard cards: `rounded-xl`
- Large cards: `rounded-2xl`
- Pills/badges: `rounded-full`
- Inputs: `rounded-full` (search) or `rounded-lg` (selects)

### Spacing & Layout

**Container Padding:**
- Mobile: `px-6`
- Desktop: `lg:px-12`

**Gap Spacing:**
- Tight: `gap-2`, `gap-3`, `gap-4`
- Standard: `gap-6`, `gap-8`
- Wide: `gap-10`, `gap-12`

**Grid Layouts:**
- Portrait cards: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6`
- Browse grid: `grid-cols-2 md:grid-cols-3 xl:grid-cols-5`
- My List grid: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8`

## Reusable Components

###1. HeaderNavigation

**Component ID:** `4bdcf483-9943-4ead-9652-5744441ec3a0`

**Structure:**
- Fixed header: `fixed top-0 w-full z-50`
- Background: Transparent gradient → solid black on scroll
- Layout: Logo | Nav Links | Search | Notifications | Profile

**Props:**
- `activeItem`: Current active nav item
- `isScrolled`: Boolean for scroll state
- `homeHref`, `animeHref`, `seriesHref`, `moviesHref`, `popularHref`, `myListHref`: Navigation URLs

**Nav Links:**
- Home, Anime, TV Series, Movies, New & Popular, My List
- Active state: `text-white`, Inactive: `text-gray-300`
- Hover: `hover:text-white`

**Search Input:**
- Background: `bg-white/10 border border-white/5`
- Rounded: `rounded-full`
- Width: `w-48 lg:w-64`
- Icon: `lucide:search` (left-aligned)
- Placeholder: "Titles, genres..."

**Profile:**
- Avatar: Gradient circle (violet-600 to indigo-600)
- Chevron icon with rotation on hover: `group-hover:rotate-180`

### 2. Footer

**Component ID:** `e27ecca3-1b03-4438-bf6b-7f2ec673ac61`

**Structure:**
- 5-column grid: Logo/social (2 cols) | Explore | Support | Account | Apps
- Background: `bg-black/50 border-t border-white/5`
- Padding: `pt-16 pb-12 px-6 lg:px-12`

**Sections:**
1. **Logo & Social:**
   - Logo image
   - Description text: `text-gray-400 text-sm`
   - Social links: Twitter, Instagram, Discord

2. **Explore:** Anime, Movies, TV Shows, Collections
3. **Support:** Help Center, Terms of Use, Privacy Policy, Corporate Info
4. **Account:** Profile, Subscription, Redeem Gift Cards
5. **Apps:** iOS App, Android App, Windows/Mac

**Bottom Bar:**
- Copyright: `text-xs text-gray-500`
- Language selector: "English (US)"
- Region: "Global"

## Page-Specific Patterns

### Home Page (01)

**Hero Section:**
- Height: `h-[85vh] lg:h-[95vh]`
- Background image with multi-layer gradient overlay:
  ```css
  background: linear-gradient(to top, var(--navy-dark) 0%, rgba(5,8,17,0.4) 40%, rgba(5,8,17,0) 100%),
              linear-gradient(to right, var(--navy-dark) 0%, rgba(5,8,17,0.6) 30%, rgba(5,8,17,0) 100%);
  ```
- Content: Badge, Title (with gradient), Metadata, Description, CTAs
- Badges: Type (red), Trending (fuchsia-400 with sparkles icon)
- Metadata: Match %, Year, Rating, Season, Genres (as pills)
- CTAs: Play (white bg, black text), More Info (gray/blur)

**Continue Watching:**
- Horizontal scroll rail: `overflow-x-auto no-scrollbar`
- Card size: `w-72 lg:w-80`
- Card ratio: `aspect-video`
- Progress bar: Bottom overlay, `bg-violet-500` with percentage width
- Meta: Title, Episode info (S1:E8), Time remaining (4m left)
- Hover: Scale image, show play icon

**Trending Anime:**
- Horizontal scroll rail
- Card size: `w-40 lg:w-52`
- Card ratio: `aspect-[2/3]`
- Badge: "Sub | Dub" (top-right, black/60 bg with backdrop-blur)
- Hover overlay: Gradient from bottom, Play + Add to List buttons
- Meta: Title, Rating (star icon + number), Season/Episodes

**Category Pills:**
- Horizontal scroll
- Active: `bg-gradient-to-r from-violet-600 to-indigo-600`
- Inactive: `bg-white/5 border border-white/10`
- Rounded: `rounded-full`
- Padding: `px-6 py-3`

**Most Popular Movies:**
- Grid layout: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6`
- Card ratio: `aspect-[2/3]`
- Hover: Circular play button overlay with backdrop
- Meta: Year badge, Genre text

**Latest Episodes:**
- Grid: `grid-cols-1 md:grid-cols-2 xl:grid-cols-3`
- Horizontal card: Thumbnail (w-40 h-24) + Text
- Background: `bg-white/5 border border-white/10`
- Rounded: `rounded-2xl`
- Badge: "Just Updated" (green)

### Title Details Page (02)

**Hero Section:**
- Height: `h-[80vh]`
- Backdrop image (opacity-60) with gradient overlay
- Layout: Poster (left, desktop only) | Metadata + CTAs (right)

**Poster Card:**
- Width: `w-64 lg:w-80`
- Ratio: `aspect-[2/3]`
- Positioned: `mb-[-40px]` (overlaps next section)
- Border: `border-4 border-white/5`
- Badge: "4K Ultra HD" (top-right, violet bg)

**Metadata:**
- Rating: Star icon + "9.1 Rating" (fuchsia-400)
- Year, Age rating, Match %
- Genres as pills: `bg-white/5 border border-white/10`
- Season/Episodes count

**CTAs:**
- Watch Now: `bg-white text-black` with play icon
- Add to List: `bg-white/10 border border-white/20` with plus icon
- Share: Icon-only button

**Episodes Section:**
- Season selector dropdown
- Episode cards: Horizontal layout with thumbnail + details
- Progress bar (bottom of thumbnail)
- "WATCHED" badge (green) if completed
- Hover: Play icon overlay

**Reviews Section:**
- Card: `bg-white/5 border border-white/10 rounded-2xl p-6`
- Avatar: Colored circle with initials
- Star rating display
- Italic quote text

**Cast & Crew:**
- Horizontal scroll
- Avatar: Circular, `w-24 h-24`
- Hover: Border color violet-500
- Name + Role

**You May Also Like:**
- Horizontal scroll rail
- Card size: `w-48 lg:w-56`
- Same as trending anime pattern

### Video Player Page (03)

**Player:**
- Ratio: `aspect-video`
- Background: Black with image overlay
- Rounded: `rounded-2xl`
- Border: `border border-white/5 shadow-2xl`

**Play Button:**
- Size: `w-24 h-24`
- Background: `bg-white/10 backdrop-blur-md`
- Border: `border border-white/20`
- Icon: Large play icon (text-5xl) with slight margin-left for optical centering

**Controls Overlay:**
- Background: Gradient from bottom (`player-gradient`)
- Opacity: 0 → 100 on hover
- Layout: Progress bar | Control buttons | Settings buttons

**Progress Bar:**
- Full width, `h-1.5`
- Background: `bg-white/20`
- Fill: Gradient purple-to-pink
- Scrubber: White circle (w-4 h-4), visible on hover

**Control Buttons:**
- Play/Pause, Rewind, Forward
- Volume with expandable slider
- Time display: "14:22 / 23:45"

**Settings:**
- Subtitles button with language display
- Settings icon
- Fullscreen icon

**Episode Info:**
- Back link to title details
- Season badge
- Episode title + description
- Share button
- Next Episode CTA (gradient button)

**Up Next Sidebar:**
- Width: `w-full lg:w-96`
- Background: `bg-white/5 border border-white/10 rounded-2xl p-6`
- Autoplay toggle
- Episode list with thumbnails
- Active episode: `active-episode` class with border-left violet accent
- Progress indicator on active

**Player Settings Panel:**
- Audio language dropdown
- Subtitles dropdown
- Quality dropdown
- All with violet-400 accent color

### Browse/Category Page (04)

**Hero Banner:**
- Height: `h-[50vh] lg:h-[60vh]`
- Category title with gradient accent
- Description text

**Layout:**
- Sidebar (left): `w-full lg:w-72`
- Content (right): `flex-1`

**Sidebar Filters:**
- Section title: "Filters" with filter icon
- Sort dropdown
- Sub-genres checkboxes
- Year range inputs (From/To)
- Rating radio buttons
- Apply button (gradient)

**Checkbox/Radio:**
- Accent color: `accent-violet-500`
- Hover: Text color changes to white

**Content Area:**
- Title count display
- View toggles (grid/list icons)
- Portrait card grid
- Pagination controls at bottom

**Pagination:**
- Button size: `w-10 h-10`
- Active: `bg-violet-600`
- Inactive: `bg-white/5 border border-white/10`
- Ellipsis: `...`
- Prev/Next arrows

### My List Page (0 5)

**Header:**
- Padding: `pt-32 pb-10` (account for fixed nav)
- Title: "My List"
- Stats: "24 Titles Saved • 8 Continued recently"

**Filters:**
- Search input: "Search in list..."
- Tab buttons: All, Anime, Movies, Series
- Sort dropdown: Recently Added, A-Z, Highest Rated, Release Year

**Grid:**
- Denser grid: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8`
- Larger cards than other pages

**Card Hover Overlay:**
- Watch button (white bg, black text)
- Remove button (red accent: `bg-red-500/20 text-red-400 border-red-500/30`)
- Gradient overlay from bottom

**Type Badges:**
- Anime: `bg-violet-600`
- Movie: `bg-fuchsia-600`
- Series: `bg-indigo-600`
- Position: Top-left
- Text: `text-[10px] font-black uppercase`

## Card Component Patterns

### 1. Landscape Card (Continue Watching)

```html
<div class="w-72 lg:w-80 group cursor-pointer">
  <div class="relative aspect-video rounded-xl overflow-hidden mb-2 border border-white/5">
    <img src="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <iconify-icon icon="lucide:play-circle" class="text-5xl text-white"></iconify-icon>
    </div>
    <!-- Progress Bar -->
    <div class="absolute bottom-0 left-0 w-full h-1 bg-white/20">
      <div class="h-full bg-violet-500 w-[65%]"></div>
    </div>
  </div>
  <div class="flex justify-between items-start">
    <div>
      <h3 class="font-medium">Title</h3>
      <p class="text-xs text-gray-400">S1:E8 • 4m left</p>
    </div>
    <button class="text-gray-400 hover:text-white">
      <iconify-icon icon="lucide:info"></iconify-icon>
    </button>
  </div>
</div>
```

### 2. Portrait Card (Standard)

```html
<div class="w-40 lg:w-52 group cursor-pointer">
  <div class="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-white/5">
    <img src="..." class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
    <div class="absolute top-2 right-2">
      <span class="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold uppercase">
        Sub | Dub
      </span>
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
      <button class="w-full bg-white text-black py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 mb-2">
        <iconify-icon icon="lucide:play-circle"></iconify-icon> Play
      </button>
      <button class="w-full bg-white/20 backdrop-blur-md text-white py-2 rounded-lg text-xs font-bold">
        Add to List
      </button>
    </div>
  </div>
  <h3 class="font-medium text-sm lg:text-base group-hover:text-violet-400 transition-colors line-clamp-1">
    Title
  </h3>
  <div class="flex items-center gap-2 text-[10px] text-gray-400">
    <span class="flex items-center gap-0.5">
      <iconify-icon icon="lucide:star" class="text-yellow-500"></iconify-icon> 8.7
    </span>
    <span>S2 • 24 Episodes</span>
  </div>
</div>
```

### 3. Episode Card (Horizontal)

```html
<div class="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
  <div class="relative w-48 h-28 lg:w-64 lg:h-36 rounded-lg overflow-hidden flex-shrink-0">
    <img src="..." class="w-full h-full object-cover">
    <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
      <iconify-icon icon="lucide:play-circle" class="text-4xl text-white"></iconify-icon>
    </div>
    <!-- Progress Bar (if watching) -->
    <div class="absolute bottom-0 left-0 w-full h-1 bg-white/20">
      <div class="h-full bg-violet-500 w-[65%]"></div>
    </div>
    <!-- Status Badge -->
    <div class="absolute top-2 right-2 bg-green-500 text-[10px] font-bold px-1.5 py-0.5 rounded">
      WATCHED
    </div>
  </div>
  <div class="flex flex-col justify-center flex-1 min-w-0">
    <div class="flex justify-between items-start">
      <h3 class="font-bold text-lg mb-1 truncate">01. Episode Title</h3>
      <span class="text-xs text-gray-500 font-medium whitespace-nowrap ml-4">24m</span>
    </div>
    <p class="text-sm text-gray-400 line-clamp-2 leading-relaxed">
      Episode description text...
    </p>
  </div>
</div>
```

## Interactive Patterns

### Hover Effects

**Image Scale:**
- Standard: `group-hover:scale-105` (duration-500)
- Dramatic: `group-hover:scale-110` (duration-700)

**Overlay Fade:**
```css
.opacity-0 group-hover:opacity-100 transition-opacity duration-300
```

**Card Glow:**
```css
.card-shadow:hover {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}
```

**Text Color:**
```css
group-hover:text-violet-400 transition-colors
```

**Icon Rotation:**
```css
group-hover:rotate-180 transition-transform duration-300
```

### Progress Indicators

**Linear Bar:**
```html
<div class="w-full h-1 bg-white/20 rounded-full">
  <div class="h-full bg-violet-500 w-[65%] rounded-full"></div>
</div>
```

**Gradient Progress:**
```html
<div class="h-full progress-gradient rounded-full" style="width: 65%"></div>
```

Where `.progress-gradient`:
```css
background: linear-gradient(to right, var(--accent-purple), var(--accent-pink));
```

### Badges

**Type Badge:**
```html
<span class="px-2 py-0.5 bg-violet-600 text-white text-[10px] font-black uppercase rounded shadow-lg">
  Anime
</span>
```

**Status Badge:**
```html
<span class="px-2 py-0.5 bg-green-500 text-[10px] font-bold rounded">
  WATCHED
</span>
```

**Info Badge:**
```html
<span class="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-[10px] font-bold uppercase">
  Sub | Dub
</span>
```

## Animation & Transitions

**Standard Durations:**
- Fast: 200-300ms (opacity, colors)
- Medium: 500ms (transform scale)
- Slow: 700ms (dramatic image scales)

**Common Transitions:**
```css
transition-transform duration-500
transition-opacity duration-300
transition-colors duration-200
transition-all duration-300
```

**Easing:**
- Uses Tailwind defaults (cubic-bezier)
- No custom easing functions defined

## Utility Classes

**Custom Classes:**
```css
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.hero-gradient { /* Multi-layer gradient */ }
.player-gradient { /* Bottom fade gradient */ }
.poster-overlay { /* Bottom to transparent gradient */ }
.progress-gradient { /* Purple to pink gradient */ }
.active-episode { /* Violet left border + background */ }
.control-btn:hover { /* Violet color + scale */ }
.card-glow:hover { /* Violet shadow glow */ }
```

## Responsive Breakpoints

**Tailwind Defaults:**
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

**Common Patterns:**
- Padding: `px-6 lg:px-12`
- Grid columns: `grid-cols-2 md:grid-cols-4 lg:grid-cols-6`
- Text sizes: `text-sm lg:text-base`, `text-xl lg:text-2xl`
- Card widths: `w-40 lg:w-52`, `w-48 lg:w-56`

## Implementation Notes

### Petite Vue Integration

Components use `v-scope` with props:
```html
<div v-scope="{ ...{ propName: 'value' }, $emit() {} }">
  <element :prop="propName" @event="$emit('eventName')">
</div>
```

**Event Handling:**
- `@click="$emit('eventName')"` for user interactions
- `@input="$emit('eventName', { data })"` for form inputs

**Dynamic Classes:**
```html
:class="['base-class', condition ? 'true-class' : 'false-class']"
```

### Scroll Behavior

**Header Scroll Detection:**
```javascript
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-nav');
  if (window.scrollY > 50) {
    // Add solid background
  } else {
    // Restore gradient background
  }
});
```

### Accessibility Considerations

**Missing in Prototype:**
- aria-labels on icon buttons
- Skip links
- Focus management
- Keyboard navigation
- Screen reader announcements

**To Add in React Implementation:**
- Proper semantic HTML
- ARIA attributes where needed
- Focus visible states
- Keyboard shortcuts
- Reduced motion support

## Next Steps for React Implementation

1. **Create Design Tokens:**
   - Convert CSS variables to Tailwind config
   - Define custom utilities
   - Set up custom fonts

2. **Build Component Library:**
   - Header/Navigation
   - Footer
   - Card variants (Landscape, Portrait, Episode, Horizontal)
   - Badges
   - Progress bars
   - Buttons
   - Form inputs

3. **Implement Pages:**
   - Home
   - Title Details
   - Video Player
   - Browse
   - My List

4. **Add Interactivity:**
   - Replace Petite Vue with React state
   - Add proper event handlers
   - Implement routing with Next.js

5. **Enhance Accessibility:**
   - Add ARIA labels
   - Implement keyboard navigation
   - Add focus management
   - Support reduced motion

6. **Optimize Performance:**
   - Lazy load images
   - Virtual scrolling for long lists
   - Code splitting
   - Optimize bundle size
