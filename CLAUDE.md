# Karthick Arun Portfolio — CLAUDE.md

## Project Overview
A portfolio site for Karthick Arun, built as a customized fork of the rachelchen.tech design. Features an AI chatbot (ArunLM) powered by OpenAI Responses API (gpt-4o) with file search over the "Personal Portfolio - Karthick" vector store.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router, React Server Components, Turbopack)
- **React**: 19.2.4
- **Styling**: Tailwind CSS 4.1.18 + custom CSS (`globals.css`)
- **Typography**: Libre Baskerville (serif), Geist Sans, Geist Mono
- **Animations**: CSS keyframes + framer-motion (chat sidebar/bottom sheet)
- **Chat UI**: react-markdown, remark-gfm, lucide-react
- **AI**: OpenAI Responses API (gpt-4o) via `openai` package (streaming + file_search + response chaining)
- **View Transitions**: React `<ViewTransition>` + `next.config.ts` experimental flag
- **Language**: TypeScript (strict mode)

## Repository
- **Remote**: `https://github.com/aicoder2009/web.git` (origin)
- **Branch strategy**: Use `gh` CLI for all GitHub operations

## Environment Variables
```
OPENAI_API_KEY=sk-...              # Required for ArunLM chatbot
OPENAI_VECTOR_STORE_ID=vs_...      # Vector store ID from platform.openai.com (file search)
```

## Directory Structure
```
rachel-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (fonts, cursor, ChatProvider, navbar, footer)
│   │   ├── page.tsx                # Home page (hero, experience, project cards)
│   │   ├── globals.css             # Global styles, Tailwind, animations, chat CSS
│   │   ├── about/page.tsx          # About page
│   │   ├── fun/page.tsx            # Fun/side projects page (Karthick's projects)
│   │   ├── projects/[slug]/page.tsx # Dynamic project detail pages
│   │   └── api/chat/route.ts       # ArunLM API endpoint (Responses API streaming + file_search)
│   ├── components/
│   │   ├── ChatProvider.tsx        # Chat context + horizontal flex layout + mobile FAB
│   │   ├── ChatSidebar.tsx         # Chat UI (desktop sidebar + mobile bottom sheet)
│   │   ├── ChatMessage.tsx         # Chat message bubbles with markdown rendering
│   │   ├── TextSelectionPopover.tsx # "Ask ArunLM" popover on text selection
│   │   ├── CustomCursor.tsx        # JS-driven cursor dot (hidden on mobile)
│   │   ├── Footer.tsx              # Footer with heart animation, social links
│   │   ├── Navbar.tsx              # Desktop + mobile hamburger nav + ArunLM button
│   │   └── ProjectLayout.tsx       # Shared project page layout
│   └── data/
│       ├── projects.ts             # Project metadata (titles, slugs, media paths)
│       └── chatSuggestions.ts      # Page-specific chat suggestion pools
├── public/
│   ├── projects/                   # Video/image assets per project
│   ├── about/                      # About page gallery images
│   └── fun/                        # Fun page project thumbnails
├── .env.example                    # Environment variable template
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## Chat Architecture
- **ChatProvider**: React context wrapping the entire app, manages chat state (open/close, page context, selected text, input ref)
- **ChatSidebar**: Desktop = 384px right sidebar (framer-motion animated width). Mobile = bottom sheet (framer-motion animated y). Tracks `responseId` for multi-turn conversation chaining via `previous_response_id`.
- **ChatMessage**: User bubbles right-aligned, assistant bubbles left-aligned with react-markdown rendering
- **TextSelectionPopover**: Appears on text selection anywhere on the site, sends selected text to ArunLM
- **API Route**: POST /api/chat → OpenAI Responses API (gpt-4o). Uses `file_search` tool with the "Personal Portfolio - Karthick" vector store. Multi-turn via `previous_response_id` chaining (`store: true`). Streams text deltas via SSE. Page context appended to instructions per request.
- **Suggestions**: 3 random per page from pools defined in chatSuggestions.ts

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
- **Custom cursor**: Client component, renders fixed-position div, follows mouse, enlarges on interactive element hover, hidden on mobile
- **Animations**: CSS `@keyframes` in `globals.css` + framer-motion for chat
- **Chat persistence**: Chat messages persist across page navigations, reset on explicit reset button
- **ArunLM button**: In Navbar, collapses to sparkle-only when chat is open

## Important Notes
- `SOURCE_SPEC.md` and `DIFF_REPORT.md` are git-ignored (reference docs only)
- Project videos in `/public/projects/` are large files — already committed
- Always test changes visually before committing
- OPENAI_API_KEY and OPENAI_VECTOR_STORE_ID must be set in `.env.local` for the chatbot to work
