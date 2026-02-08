"use client";

export type TextShimmerProps = {
  duration?: number;
  spread?: number;
  children: React.ReactNode;
  className?: string;
};

export default function TextShimmer({
  className = "",
  duration = 4,
  spread = 20,
  children,
}: TextShimmerProps) {
  const dynamicSpread = Math.min(Math.max(spread, 5), 45);

  return (
    <span
      className={`bg-size-[200%_auto] bg-clip-text font-medium text-transparent animate-[shimmer_4s_infinite_linear] ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(50,64,79,0.35) ${50 - dynamicSpread}%, var(--foreground) 50%, rgba(50,64,79,0.35) ${50 + dynamicSpread}%)`,
        WebkitBackgroundClip: "text",
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </span>
  );
}
