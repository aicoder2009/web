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

**Phase 1: Core Setup & Infrastructure** ⏱️ ~2-3 hours
- [ ] **Decision: Choose content strategy**
  - Recommendation: MDX with `@next/mdx` package
  - Alternative: Use `contentlayer` for type-safe MDX processing
  - File location: `/src/content/blog/` for blog posts
- [ ] **Install dependencies**
  ```bash
  npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
  npm install remark-gfm rehype-highlight rehype-slug rehype-autolink-headings
  npm install gray-matter reading-time
  ```
- [ ] **Configure MDX in `next.config.ts`**
  - Add MDX page extensions
  - Configure remark/rehype plugins
- [ ] **Create type definitions** (`src/types/blog.ts`)
  - Define `BlogPost` interface
  - Define `BlogPostMetadata` interface
  - Export helper types
- [ ] **Create utility functions** (`src/lib/blog.ts`)
  - `getAllBlogPosts()` - Read and parse all MDX files
  - `getBlogPostBySlug(slug)` - Get single post
  - `calculateReadingTime(content)` - Estimate reading time
  - `sortPostsByDate(posts)` - Sort helper
- [ ] **Create 2-3 sample blog posts**
  - Example: `/src/content/blog/hello-world.mdx`
  - Example: `/src/content/blog/building-with-nextjs.mdx`
  - Include frontmatter with all metadata fields

**Phase 2: UI Implementation** ⏱️ ~4-5 hours
- [ ] **Blog index page** (`src/app/blog/page.tsx`)
  - Hero section with "Blog" title (h1, Libre Baskerville)
  - Subtitle/description (optional)
  - Grid layout for post cards (CSS Grid, gap-6)
  - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop
  - Load posts using `getAllBlogPosts()`
  - Map through posts to render cards
- [ ] **BlogPostCard component** (`src/components/BlogPostCard.tsx`)
  - Similar structure to ProjectCard
  - Cover image with fallback gradient
  - Title (serif, text-foreground)
  - Date + reading time (mono, text-foreground-light)
  - Description/excerpt (2-3 lines, truncate)
  - Tags (optional, small pills)
  - Hover effect (lift + shadow, similar to projects)
  - Link to `/blog/[slug]`
- [ ] **Blog post page** (`src/app/blog/[slug]/page.tsx`)
  - Use `generateStaticParams()` for SSG
  - Hero section with:
    - Back button (← Blog)
    - Title (h1, Libre Baskerville, 48px desktop)
    - Metadata row: Date • Reading time • Tags
  - Article wrapper (max-width: 720px, centered)
  - MDX content rendering with custom components
  - Proper typography (18px body, 1.7 line-height)
- [ ] **MDX Components** (`src/components/mdx/`)
  - Custom heading components (h2, h3 with anchor links)
  - Code block component with syntax highlighting
  - Image component with caption support
  - Blockquote styling
  - Link styling (accent color on hover)
  - Create `mdx-components.tsx` to export all
- [ ] **Syntax highlighting setup**
  - Use `rehype-highlight` or `shiki`
  - Choose theme (e.g., github-dark, night-owl)
  - Add CSS for code blocks in `globals.css`
  - Test with code examples in sample posts
- [ ] **Navigation update**
  - Add "Blog" to navLinks in `src/components/Navbar.tsx`
  - Position: after "Fun", before "About"
  - Test mobile menu

**Phase 3: Polish & Enhancements** ⏱️ ~3-4 hours
- [ ] **Reading time calculation**
  - Implement in `src/lib/blog.ts`
  - Display in card and post header
  - Format: "5 min read"
- [ ] **Tag filtering** (optional but recommended)
  - Add filter UI to blog index (pill buttons)
  - Implement client-side filtering
  - OR: Create tag pages `/blog/tag/[tag]`
- [ ] **SEO optimization**
  - Add metadata export to blog pages
  - Include: title, description, Open Graph image
  - Generate OG images dynamically (optional)
  - Add structured data (JSON-LD for Article)
- [ ] **RSS feed generation** (optional)
  - Create `/api/rss/route.ts`
  - Generate XML feed from blog posts
  - Add RSS link in footer
- [ ] **Responsive testing**
  - Test on mobile (375px, 414px)
  - Test on tablet (768px, 1024px)
  - Test on desktop (1440px, 1920px)
  - Check card layouts, typography, code blocks
- [ ] **Performance optimization**
  - Optimize images (use Next.js Image)
  - Lazy load content
  - Check bundle size impact

**Phase 4: Content & ArunLM Integration** ⏱️ ~2-3 hours
- [ ] **Write initial blog posts** (3-5 posts recommended)
  - Topics aligned with portfolio (AI, entrepreneurship, engineering)
  - Mix of technical and thought leadership
  - Each post: 800-1500 words
- [ ] **ArunLM chat suggestions** (`src/data/chatSuggestions.ts`)
  - Add blog index suggestions:
    - "What topics does Karthick write about?"
    - "Show me articles about AI"
    - "What's the most recent blog post?"
  - Add blog post page suggestions:
    - "Summarize this article"
    - "Explain [concept] in simpler terms"
    - "What are the key takeaways?"
- [ ] **Update OpenAI vector store**
  - Export blog posts as text/markdown
  - Upload to "Personal Portfolio - Karthick" vector store
  - Test ArunLM can reference blog content
- [ ] **Final testing**
  - Test all links work
  - Test ArunLM can answer blog questions
  - Proofread all content
  - Check mobile experience
- [ ] **Launch preparation**
  - Deploy to staging (if available)
  - Get feedback from 2-3 people
  - Make final adjustments
  - Deploy to production
  - Announce on social media (LinkedIn, Twitter)

### Detailed Technical Implementation Guide

#### MDX Configuration Example
```typescript
// next.config.ts
import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // ... other config
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});

export default withMDX(nextConfig);
```

#### Blog Utilities Example
```typescript
// src/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost } from '@/types/blog';

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_PATH);
  
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(BLOG_PATH, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const stats = readingTime(content);
      
      return {
        slug: file.replace('.mdx', ''),
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        readingTime: Math.ceil(stats.minutes),
        content,
        author: data.author || 'Karthick Arun',
        coverImage: data.coverImage,
        draft: data.draft || false,
      };
    })
    .filter(post => !post.draft || process.env.NODE_ENV === 'development')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}
```

#### Sample Blog Post Structure
```mdx
---
title: "Building Modern Web Apps with Next.js 15"
description: "Exploring the new features and capabilities of Next.js 15, including Server Components and improved performance."
date: "2026-02-01"
tags: ["Next.js", "React", "Web Development"]
coverImage: "/blog/nextjs-15/cover.png"
---

# Building Modern Web Apps with Next.js 15

Next.js 15 brings powerful new features that make building web applications faster and more intuitive...

## Server Components

Server Components are a game-changer for React applications...

\`\`\`typescript
// Example server component
export default async function BlogPost({ params }) {
  const post = await getBlogPostBySlug(params.slug);
  return <article>{post.content}</article>;
}
\`\`\`

## Key Takeaways

- Server Components reduce bundle size
- Improved data fetching patterns
- Better performance out of the box
```

### Open Questions & Decisions Needed

#### Critical Decisions (need answers before starting)
1. ✅ **Content strategy**: MDX (recommended and detailed above)
2. ⚠️ **Comments system**: 
   - **Option 1**: None (cleanest, recommended for MVP)
   - **Option 2**: Giscus (GitHub discussions, free, privacy-friendly)
   - **Option 3**: Disqus (feature-rich but ads/tracking concerns)
   - **Decision needed**: Start without comments, add Giscus later if needed?
3. ⚠️ **Initial content volume**: 
   - **Recommendation**: Launch with 3-5 high-quality posts
   - Focus on quality over quantity
   - Post cadence: 1-2 per month sustainable

#### Nice-to-Have Features (can defer to v2)
4. **Newsletter**: Substack integration or Mailchimp?
   - **Recommendation**: Defer to v2, validate audience interest first
5. **Analytics**: 
   - **Option 1**: Vercel Analytics (simple, privacy-friendly)
   - **Option 2**: Google Analytics 4
   - **Recommendation**: Start with Vercel Analytics
6. **Series support**: Link related posts together
   - **Recommendation**: Add in v2 when you have content for series
7. **Draft workflow**: 
   - **Solution**: Use `draft: true` in frontmatter
   - Only show drafts in development mode (`process.env.NODE_ENV === 'development'`)
   - Preview on staging branch before production

#### Content Strategy Decisions
8. **Post categories/topics**: 
   - Entrepreneurship & startups
   - AI/ML engineering
   - Product development
   - Career & learning
9. **Post length target**: 800-1500 words (5-8 min reads)
10. **Voice/tone**: Professional but approachable, first-person perspective

### Design References
- Existing portfolio aesthetic (clean, minimal, serif headers)
- Project card layout can be adapted for blog cards
- Consider: overreacted.io (Dan Abramov) - clean tech blog
- Consider: Stripe blog - excellent typography
- Consider: Linear blog - minimal, focused

---

## Quick Start Implementation Guide

### Step-by-Step: Getting Started (30 minutes)

1. **Install dependencies** (5 min)
   ```bash
   npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
   npm install remark-gfm rehype-highlight rehype-slug rehype-autolink-headings
   npm install gray-matter reading-time
   npm install --save-dev @types/node
   ```

2. **Create directory structure** (2 min)
   ```bash
   mkdir -p src/content/blog
   mkdir -p src/types
   mkdir -p src/lib
   mkdir -p src/components/mdx
   ```

3. **Add type definitions** (3 min)
   - Create `src/types/blog.ts` with BlogPost interface

4. **Configure MDX** (5 min)
   - Update `next.config.ts` with MDX configuration

5. **Create blog utilities** (5 min)
   - Create `src/lib/blog.ts` with helper functions

6. **Create first blog post** (10 min)
   - Create `src/content/blog/hello-world.mdx`
   - Add frontmatter and content

### Component Code Examples

#### BlogPostCard Component
```typescript
// src/components/BlogPostCard.tsx
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group block transition-all duration-300 hover:-translate-y-1"
    >
      <article className="h-full flex flex-col">
        {/* Cover Image or Gradient */}
        <div className="aspect-[16/9] bg-accent/10 rounded-sm overflow-hidden mb-4">
          {post.coverImage ? (
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5" />
          )}
        </div>
        
        {/* Content */}
        <div className="flex flex-col gap-2">
          <h3 className="text-[22px] font-serif text-foreground group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          
          <div className="flex items-center gap-2 text-[13px] font-mono text-foreground-light">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
          
          <p className="text-[15px] text-foreground-light line-clamp-2">
            {post.description}
          </p>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.slice(0, 3).map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 text-[11px] font-mono uppercase bg-accent/10 text-accent rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
```

#### Blog Index Page
```typescript
// src/app/blog/page.tsx
import { getAllBlogPosts } from '@/lib/blog';
import BlogPostCard from '@/components/BlogPostCard';

export const metadata = {
  title: 'Blog - Karthick Arun',
  description: 'Thoughts on entrepreneurship, AI, and building products',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="flex flex-col gap-12 px-6 py-12 max-w-[1800px] mx-auto">
      {/* Hero */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[52px] md:text-[72px] font-serif text-foreground font-normal leading-[1.1]">
          Blog
        </h1>
        <p className="text-[18px] text-foreground-light max-w-2xl">
          Thoughts on entrepreneurship, artificial intelligence, and building products that matter.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
```

#### Blog Post Page
```typescript
// src/app/blog/[slug]/page.tsx
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return {};
  
  return {
    title: `${post.title} - Karthick Arun`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8 px-6 py-12 max-w-[1800px] mx-auto">
      {/* Back Button */}
      <Link 
        href="/blog"
        className="text-[15px] font-mono text-foreground-light hover:text-accent transition-colors"
      >
        ← Blog
      </Link>

      {/* Article Header */}
      <header className="flex flex-col gap-4 max-w-[720px]">
        <h1 className="text-[42px] md:text-[52px] font-serif text-foreground font-normal leading-[1.1]">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-3 text-[14px] font-mono text-foreground-light">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </time>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-1 text-[11px] font-mono uppercase bg-accent/10 text-accent rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <article className="prose prose-lg max-w-[720px] prose-headings:font-serif prose-headings:text-foreground prose-p:text-foreground-light prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none">
        <MDXRemote 
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight],
            },
          }}
        />
      </article>
    </div>
  );
}
```

### CSS for Syntax Highlighting
```css
/* Add to globals.css */

/* Code block styling */
.prose pre {
  background-color: #1e1e1e;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
}

.prose pre code {
  background: transparent;
  padding: 0;
  color: #d4d4d4;
  font-size: 14px;
  line-height: 1.6;
}

/* Syntax highlighting theme (VS Code Dark+) */
.hljs-keyword { color: #569cd6; }
.hljs-string { color: #ce9178; }
.hljs-comment { color: #6a9955; font-style: italic; }
.hljs-function { color: #dcdcaa; }
.hljs-number { color: #b5cea8; }
.hljs-attr { color: #9cdcfe; }
.hljs-tag { color: #569cd6; }
```

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
