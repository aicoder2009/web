# Implementation Plan - Writing/Journal Section

## Goal
Add a new section to the portfolio (provisionally called "Writing" or "Journal") that lists posts/updates.
The design should mimic Anthropic's "Press" page: a grid of cards showing a headline image and title.

## Proposed Changes

### 1. Data Structure (`src/data/writing.ts`)
- Define `WritingPost` type:
  - `title`: string
  - `date`: string
  - `category`: string (e.g. "Announcements", "Thoughts")
  - `slug`: string
  - `imageSrc`: string (Hero image)
  - `excerpt`: string (optional)
- Create sample data (placeholder posts).

### 2. UI Implementation (`src/app/writing/page.tsx`)
- Create a new page route `/writing`.
- **Layout**:
  - Header: Title ("Writing" or similar) + Description.
  - Grid: 2 columns on desktop, 1 on mobile.
- **Card Design** (Anthropic Style):
  - Top: Image (AspectRatio 16:9 or 3:2).
  - Bottom:
    - Date | Category (Small mono text).
    - Title (Large Serif text).
    - (Optional) Short excerpt.

### 3. Navigation (`src/components/Navbar.tsx`)
- Add the new section to `navLinks`.

## Questions for User
- **Name**: "Writing", "Journal", "Notes", or "Log"?
- **Content**: Just the list page for now? Or do you need the detail pages (`/writing/[slug]`) too?

## Workplan
- [ ] Create `src/data/writing.ts`
- [ ] Create `src/app/writing/page.tsx`
- [ ] Update `src/components/Navbar.tsx`
