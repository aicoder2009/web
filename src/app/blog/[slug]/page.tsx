import { getAllBlogPosts, getBlogPostBySlug, formatDate } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} - Karthick Arun`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col p-6 w-full items-center gap-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-full max-w-[1800px] gap-8 py-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="text-[15px] font-[family-name:var(--font-geist-mono)] text-foreground-light hover:text-accent transition-colors w-fit"
        >
          ← Blog
        </Link>

        {/* Article Header */}
        <header className="flex flex-col gap-4 max-w-[720px] mx-auto w-full">
          <h1 className="text-[42px] md:text-[52px] font-serif text-foreground font-normal leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-[14px] font-[family-name:var(--font-geist-mono)] text-foreground-light">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[11px] font-[family-name:var(--font-geist-mono)] uppercase bg-accent/10 text-accent rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-[720px] mx-auto w-full prose-headings:font-serif prose-headings:text-foreground prose-h1:hidden prose-p:text-foreground-light prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none prose-strong:text-foreground prose-blockquote:text-foreground-light prose-blockquote:border-accent">
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
    </div>
  );
}
