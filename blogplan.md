# Blog Feature Planning Document

## Overview
This document contains planning for blog-related features for Karthick Arun's portfolio website.

---

## Blog Feature Plan

### Goal
Add a blog to the portfolio to share thoughts, insights, and technical articles. The blog should feel like a natural extension of the portfolio's minimalist design aesthetic.

### Core Requirements
1. **Blog listing page** (`/blog`) - Shows all blog posts in reverse chronological order
2. **Individual blog post pages** (`/blog/[slug]`) - Displays full blog post content
3. **Blog metadata** - Title, date, description, tags, reading time
4. **Content format** - Support for Markdown with code syntax highlighting
5. **Navigation integration** - Add "Blog" link to main navigation

### Technical Architecture

#### 1. Content Storage Strategy
**Options to consider:**
- **Option A: MDX files** - Store blog posts as `.mdx` files in `/src/content/blog/`
  - Pros: Full React component support, type-safe, no external dependencies
  - Cons: Requires build-time processing
- **Option B: Markdown files** - Store as `.md` files with frontmatter
  - Pros: Simpler, portable, widely supported
  - Cons: No React components in content
- **Option C: Headless CMS** (Contentful, Sanity, etc.)
  - Pros: Non-technical editing, rich media management
  - Cons: External dependency, API costs

**Recommended: Option A (MDX)** for flexibility with React components

#### 2. Data Structure

**BlogPost type:**
```typescript
interface BlogPost {
  slug: string;           // URL-friendly identifier
  title: string;          // Post title
  description: string;    // Short summary (for meta/cards)
  date: string;           // ISO 8601 format
  tags: string[];         // Categories/topics
  readingTime: number;    // Estimated minutes
  content: string;        // Full MDX/Markdown content
  author?: string;        // Default to "Karthick Arun"
  coverImage?: string;    // Optional hero image
  draft?: boolean;        // Hide from production
}
```

#### 3. Page Structure

**Blog Index (`src/app/blog/page.tsx`):**
- Hero section with page title "Blog" or "Writing"
- Grid of blog post cards (similar to project cards)
- Each card shows:
  - Title (Libre Baskerville serif)
  - Date + reading time (Geist Mono)
  - Description
  - Tags (optional)
- Responsive grid (1 col mobile, 2-3 cols desktop)
- Sort by date (newest first)
- Optional: Filter by tag

**Blog Post Page (`src/app/blog/[slug]/page.tsx`):**
- Hero section with title + metadata (date, reading time, tags)
- Article content area:
  - Max width ~720px for readability
  - Typography optimized for long-form reading
  - Code blocks with syntax highlighting (Shiki/Prism)
  - Images with captions
- Optional: Table of contents for longer posts
- Optional: "Share" buttons
- Optional: "Related posts" section at bottom

#### 4. Styling Considerations
- Match existing design system (sage green accent, Libre Baskerville headers)
- Blog post content should use readable font size (16-18px body text)
- Code blocks with proper contrast and syntax highlighting
- Responsive images
- Proper spacing for long-form content (line height ~1.7)

#### 5. Navigation Integration
Add "Blog" to `navLinks` array in `src/components/Navbar.tsx`:
```typescript
const navLinks = [
  { href: "/", label: "Work" },
  { href: "/fun", label: "Fun" },
  { href: "/blog", label: "Blog" },  // New
  { href: "/about", label: "About" },
  { href: "/resume.pdf", label: "Resume", external: true },
];
```

#### 6. ArunLM Integration
- Add blog-specific chat suggestions to `src/data/chatSuggestions.ts`
- Examples: "Summarize this blog post", "Explain this concept further", "What are related topics?"
- Blog content should be included in OpenAI vector store for ArunLM to reference

### Implementation Phases

**Phase 1: Core Setup**
- [ ] Choose content strategy (MDX recommended)
- [ ] Create blog data structure and types
- [ ] Set up MDX processing (if using MDX)
- [ ] Create sample blog posts (2-3 drafts)

**Phase 2: UI Implementation**
- [ ] Create blog index page (`/blog`)
- [ ] Create blog post template (`/blog/[slug]`)
- [ ] Add syntax highlighting for code blocks
- [ ] Ensure responsive design
- [ ] Add blog link to navigation

**Phase 3: Polish**
- [ ] Add reading time calculation
- [ ] Add tag filtering (optional)
- [ ] Optimize for SEO (meta tags, Open Graph)
- [ ] Add RSS feed generation (optional)
- [ ] Test on mobile/tablet/desktop

**Phase 4: Content & Launch**
- [ ] Write initial blog posts
- [ ] Update vector store with blog content for ArunLM
- [ ] Add chat suggestions for blog pages
- [ ] Launch and announce

### Open Questions & Decisions Needed
1. **Content volume**: How many blog posts initially? Should we prioritize quality over quantity?
2. **Comments**: Do we want a commenting system? (Giscus, Disqus, or none?)
3. **Newsletter**: Should we add email subscription for new posts?
4. **Analytics**: Track post views? Popular posts section?
5. **Series support**: Should posts be able to link together as multi-part series?
6. **Draft workflow**: How to preview drafts before publishing?

### Design References
- Existing portfolio aesthetic (clean, minimal, serif headers)
- Project card layout can be adapted for blog cards
- Consider: overreacted.io (Dan Abramov) - clean tech blog
- Consider: Stripe blog - excellent typography
- Consider: Linear blog - minimal, focused

---

## Press Feature Plan (Secondary Priority)

### Goal
Add a "Press" page to showcase media coverage, styled similarly to Anthropic's press page.

### Proposed Changes

#### 1. Data Structure (`src/data/press.ts`)
- Define `PressItem` type:
  - `title`: string
  - `publisher`: string
  - `date`: string
  - `url`: string
  - `imageSrc`: string (hero image)
- Create sample data.

#### 2. UI Implementation (`src/app/press/page.tsx`)
- Create new page route `/press`
- Grid layout (similar to Projects grid)
- Cards with:
  - 16:9 aspect ratio image
  - Title (serif), Publisher & Date (mono)
- Responsive (1 col mobile, 2-3 cols desktop)

#### 3. Navigation
- Add "Press" to `navLinks` (decide placement)

### Press Feature Workplan
- [ ] Create `src/data/press.ts`
- [ ] Create `src/app/press/page.tsx`
- [ ] Update `src/components/Navbar.tsx`
- [ ] Gather press coverage content
