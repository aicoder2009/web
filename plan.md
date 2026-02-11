# Implementation Plan - Press Page

## Goal
Add a "Press" page to the portfolio, styled similarly to Anthropic's press page (headline image + title), to showcase media coverage.

## Proposed Changes

### 1. Data Structure (`src/data/press.ts`)
- Define `PressItem` type:
  - `title`: string
  - `publisher`: string
  - `date`: string
  - `url`: string
  - `imageSrc`: string (hero image)
- Create sample data.

### 2. UI Implementation (`src/app/press/page.tsx`)
- Create a new page route `/press`.
- Use a grid layout (similar to existing Projects grid).
- Cards will feature:
  - Top: 16/9 aspect ratio image.
  - Bottom: Title (serif), Publisher & Date (mono).
- Responsive design (1 col mobile, 2/3 cols desktop).

### 3. Navigation (`src/components/Navbar.tsx`)
- Add "Press" to `navLinks`.

## Brainstorming / To Decide
- **Content Source**: Manual file (current plan) vs CMS.
- **Card Details**: Add excerpts? Tags?
- **Animations**: Re-use `ProjectCard` hover effects?

## Workplan
- [ ] Create `src/data/press.ts`
- [ ] Create `src/app/press/page.tsx`
- [ ] Update `src/components/Navbar.tsx`
