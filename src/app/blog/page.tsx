import type { Metadata } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import BlogPostCard from "@/components/BlogPostCard";

export const metadata: Metadata = {
  title: "Blog - Karthick Arun",
  description: "Thoughts on technology, design, and building products.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="flex flex-col p-6 w-full items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-full max-w-[1800px] gap-12 py-8">
        <div className="flex flex-col gap-6 animate-fade-in">
          <h1 className="hero-h1 font-serif text-foreground"
              style={{ fontSize: "52px", lineHeight: 1.1, letterSpacing: "-0.02em", fontWeight: 400 }}>
            Blog
          </h1>
          <p className="text-[16px] text-foreground-light max-w-2xl leading-relaxed">
            Thoughts on technology, design, and building products.
          </p>
        </div>
        {posts.length === 0 ? (
          <div className="text-center text-foreground-light">No blog posts yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 animate-fade-in stagger-1">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
