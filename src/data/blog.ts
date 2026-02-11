export interface BlogPost {
  title: string;
  date: string;
  category: string;
  slug: string;
  imageSrc: string;
  excerpt?: string;
  gradient: string; // Fallback if image fails or isn't provided
}

export const blogPosts: BlogPost[] = [
  {
    title: "Reflecting on 2024",
    date: "Dec 31, 2024",
    category: "Reflection",
    slug: "reflecting-on-2024",
    imageSrc: "/blog/reflection.jpg",
    excerpt: "A look back at a year of building, learning, and growing.",
    gradient: "from-blue-100 via-indigo-100 to-violet-100",
  },
  {
    title: "Why I'm betting on AI hardware",
    date: "Nov 15, 2024",
    category: "Thoughts",
    slug: "ai-hardware-bet",
    imageSrc: "/blog/hardware.jpg",
    gradient: "from-emerald-100 via-teal-100 to-cyan-100",
  },
  {
    title: "Building accessible web apps",
    date: "Oct 01, 2024",
    category: "Engineering",
    slug: "accessible-web-apps",
    imageSrc: "/blog/a11y.jpg",
    gradient: "from-orange-100 via-amber-100 to-yellow-100",
  },
];
