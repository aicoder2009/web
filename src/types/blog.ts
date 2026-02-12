export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category?: string;
  author?: string;
  coverImage?: string;
  draft?: boolean;
}

export interface BlogPost extends BlogPostMetadata {
  slug: string;
  content: string;
  readingTime: number;
  excerpt?: string;
  gradient: string; // Fallback if image fails or isn't provided
}
