import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { BlogPost, BlogPostMetadata } from "@/types/blog";

const BLOG_PATH = path.join(process.cwd(), "src/content/blog");

// Gradient fallbacks for blog posts (matching existing style)
const gradients = [
  "from-blue-100 via-indigo-100 to-violet-100",
  "from-emerald-100 via-teal-100 to-cyan-100",
  "from-orange-100 via-amber-100 to-yellow-100",
  "from-pink-100 via-rose-100 to-red-100",
  "from-purple-100 via-fuchsia-100 to-pink-100",
];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // Ensure directory exists
  if (!fs.existsSync(BLOG_PATH)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_PATH);

  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file, index) => {
      const filePath = path.join(BLOG_PATH, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);
      const stats = readingTime(content);

      const metadata = data as BlogPostMetadata;

      return {
        slug: file.replace(/\.mdx?$/, ""),
        title: metadata.title || "Untitled",
        description: metadata.description || "",
        date: metadata.date || new Date().toISOString(),
        tags: metadata.tags || [],
        category: metadata.category || "General",
        readingTime: Math.ceil(stats.minutes),
        content,
        author: metadata.author || "Karthick Arun",
        coverImage: metadata.coverImage,
        draft: metadata.draft || false,
        excerpt: metadata.description,
        gradient: gradients[index % gradients.length],
      };
    })
    .filter((post) => !post.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getAdjacentPosts(
  slug: string
): Promise<{ previous: BlogPost | null; next: BlogPost | null }> {
  const posts = await getAllBlogPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export async function getRelatedPosts(
  slug: string,
  tags: string[],
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  const otherPosts = posts.filter((p) => p.slug !== slug);

  if (tags.length === 0) return otherPosts.slice(0, limit);

  const scored = otherPosts.map((post) => {
    const overlap = post.tags.filter((t) => tags.includes(t)).length;
    return { post, score: overlap };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
