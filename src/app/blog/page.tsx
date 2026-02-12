"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogPost } from "@/types/blog";

function BlogCard({ post }: { post: BlogPost }) {
  const [imgError, setImgError] = useState(false);
  const showImage = post.imageSrc && !imgError;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block flex flex-col gap-4 transition-opacity duration-300 hover:opacity-90"
    >
      {/* Image / Gradient Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-sm">
        {showImage ? (
          <img
            src={post.imageSrc}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${post.gradient} flex items-center justify-center`}
          >
             {/* Optional: Icon or abstract shape could go here */}
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-[13px] font-[family-name:var(--font-geist-mono)] text-foreground-light uppercase tracking-wide">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-foreground-light/40" />
          <span>{post.category}</span>
        </div>
        
        <h3 className="text-[22px] leading-[1.3] font-serif text-foreground font-normal group-hover:text-accent transition-colors duration-200">
          {post.title}
        </h3>
        
        {post.excerpt && (
          <p className="text-[15px] leading-relaxed text-foreground-light/80 line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading blog posts:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col p-6 w-full items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-full max-w-[1800px] gap-12 py-8">
        
        {/* Header */}
        <div className="flex flex-col gap-6 animate-fade-in">
           <h1 className="hero-h1 font-serif text-foreground" style={{ fontSize: '52px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
            Blog
          </h1>
          <p className="text-[16px] text-foreground-light max-w-2xl leading-relaxed">
            Thoughts on technology, design, and building products.
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center text-foreground-light">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-foreground-light">No blog posts yet. Check back soon!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 animate-fade-in stagger-1">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
