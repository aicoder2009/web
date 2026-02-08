# Rachel Portfolio — CLAUDE.md

## Project Overview
A pixel-perfect replica of [rachelchen.tech](https://rachelchen.tech), built as a personal portfolio site. The goal is 1:1 visual and behavioral parity with the source site.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router, React Server Components, Turbopack)
- **React**: 19.2.4
- **Styling**: Tailwind CSS 4.1.18 + custom CSS (`globals.css`)
- **Typography**: Libre Baskerville (serif, substitute for proprietary tiemposText), Geist Sans, Geist Mono
- **Animations**: CSS keyframes only (no Framer Motion / GSAP)
- **View Transitions**: React `<ViewTransition>` + `next.config.ts` experimental flag
- **Language**: TypeScript (strict mode)

## Repository
- **Remote**: `https://github.com/aicoder2009/web.git` (origin)
- **Branch strategy**: Use `gh` CLI for all GitHub operations

## Directory Structure
```
rachel-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (fonts, cursor, navbar, footer)
│   │   ├── page.tsx            # Home page (hero, experience, project cards)
│   │   ├── globals.css         # Global styles, Tailwind, animations
│   │   ├── about/page.tsx      # About page
│   │   ├── fun/page.tsx        # Fun/side projects page
│   │   └── projects/[slug]/page.tsx  # Dynamic project detail pages
│   ├── components/
│   │   ├── CustomCursor.tsx    # JS-driven cursor dot (hidden on mobile)
│   │   ├── Footer.tsx          # Footer with heart animation, social links
│   │   ├── Navbar.tsx          # Desktop + mobile hamburger nav
│   │   └── ProjectLayout.tsx   # Shared project page layout
│   └── data/
│       └── projects.ts         # Project metadata (titles, slugs, media paths)
├── public/
│   ├── projects/               # Video/image assets per project
│   ├── about/                  # About page gallery images
│   └── fun/                    # Fun page project thumbnails
├── SOURCE_SPEC.md              # Source site specification (git-ignored)
├── DIFF_REPORT.md              # QA diff report (git-ignored)
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## Dev Commands
```bash
npm run dev      # Start dev server (Turbopack) — run in BACKGROUND
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Design Tokens
| Token | Value |
|-------|-------|
| Background | `#fafcfd` |
| Foreground | `#32404f` |
| Foreground light | `rgba(50, 64, 79, 0.584)` |
| Accent | `#e65f2e` |
| Max content width | `1800px` |
| Page padding | `24px` |
| H1 desktop | 52px / 400 / -0.02em / 1.1 line-height |
| H1 mobile | 40px |

## Key Patterns
- **Path alias**: `@/*` maps to `./src/*`
- **Fonts**: Loaded via `geist` package (sans/mono) + Google Fonts CDN (Libre Baskerville)
- **Custom cursor**: Client component (`"use client"`), renders fixed-position div, follows mouse, enlarges on interactive element hover, hidden on mobile via media query
- **Animations**: Defined as CSS `@keyframes` in `globals.css` — `fadeInUp`, `heartPop`, `heartbeat`
- **Experience hover**: CSS-only dim effect via `.experience-list:hover .experience-row` opacity transitions
- **Card hover**: White wash overlay (`bg-background/40`) on hover

## Known Gaps (as of 2026-02-07)
1. **Missing static assets**: Some about page images (`/about/about1-7.png`), fun page thumbnails (`/fun/*.png`), and `/hackwestern.png` are not yet sourced
2. **Font difference**: Using Libre Baskerville instead of proprietary tiemposText — acceptable tradeoff
3. **No favicon**: `/favicon.ico` returns 404

## Important Notes
- `SOURCE_SPEC.md` and `DIFF_REPORT.md` are git-ignored (reference docs only)
- Project videos in `/public/projects/` are large files — already committed
- Always test changes visually against the source site before committing
