# karthick.me

My personal portfolio website — built with Next.js, TypeScript, and Tailwind CSS.

**Live at** [karthick.me](https://karthick.me)

## Features

- **ArunLM** — AI chatbot powered by OpenAI (gpt-4o) with file search and multi-turn conversations
- **Project case studies** — Detail pages with video/image media, section navigation, and metadata
- **Fun page** — Side projects showcase with GitHub links
- **View transitions** — Smooth page transitions using React's experimental ViewTransition API
- **Custom cursor** — Interactive cursor that responds to hoverable elements
- **Text selection popover** — Select any text on the site to ask ArunLM about it
- **Responsive** — Desktop sidebar chat, mobile bottom sheet, hamburger nav

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animations | CSS keyframes + [Framer Motion](https://www.framer.com/motion/) |
| AI | [OpenAI Responses API](https://platform.openai.com) (streaming, file search) |
| Typography | Libre Baskerville, Geist Sans, Geist Mono |
| Chat UI | react-markdown, remark-gfm, lucide-react |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OPENAI_API_KEY and OPENAI_VECTOR_STORE_ID

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home — hero, experience, project cards
│   ├── about/page.tsx           # About — bio, photos
│   ├── fun/page.tsx             # Side projects
│   ├── projects/[slug]/page.tsx # Project detail pages
│   └── api/chat/route.ts       # ArunLM API (streaming SSE)
├── components/
│   ├── ChatProvider.tsx         # Chat context + layout
│   ├── ChatSidebar.tsx          # Desktop sidebar + mobile bottom sheet
│   ├── Navbar.tsx               # Navigation + ArunLM button
│   ├── Footer.tsx               # Footer + social links
│   └── ProjectLayout.tsx        # Project page layout
└── data/
    ├── projects.ts              # Project metadata
    └── chatSuggestions.ts       # Chat suggestion pools
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key for ArunLM chatbot |
| `OPENAI_VECTOR_STORE_ID` | Vector store ID for file search |

## Author

**Karthick Arun** — [GitHub](https://github.com/aicoder2009) / [LinkedIn](https://linkedin.com/in/karthickarun) / [Bluesky](https://bsky.app/profile/aicoder2009.bsky.social)
