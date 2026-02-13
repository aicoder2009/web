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
        <div className="aspect-[16/9] bg-accent/10 rounded-sm overflow-hidden mb-4 relative">
          {post.coverImage ? (
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 group-hover:from-accent/30 group-hover:to-accent/10 transition-colors duration-500" />
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
