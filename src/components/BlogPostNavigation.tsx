import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface BlogPostNavigationProps {
  previous: BlogPost | null;
  next: BlogPost | null;
}

export default function BlogPostNavigation({
  previous,
  next,
}: BlogPostNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav className="flex items-stretch justify-between gap-4 border-t border-foreground/10 pt-8 mt-8">
      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          className="group flex items-center gap-2 text-foreground-light hover:text-accent transition-colors"
        >
          <ChevronLeft size={16} className="shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] font-[family-name:var(--font-geist-mono)] uppercase tracking-wider">
              Previous
            </span>
            <span className="text-[15px] text-foreground group-hover:text-accent transition-colors line-clamp-1">
              {previous.title}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex items-center gap-2 text-foreground-light hover:text-accent transition-colors text-right"
        >
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-[family-name:var(--font-geist-mono)] uppercase tracking-wider">
              Next
            </span>
            <span className="text-[15px] text-foreground group-hover:text-accent transition-colors line-clamp-1">
              {next.title}
            </span>
          </div>
          <ChevronRight size={16} className="shrink-0" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
