"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";

interface SocialShareButtonsProps {
  title: string;
  slug: string;
}

const BASE_URL = "https://karthickarun.vercel.app";

export default function SocialShareButtons({
  title,
  slug,
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `${BASE_URL}/blog/${slug}`;

  const shareX = () => {
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnClass =
    "p-2 rounded-md text-foreground-light hover:text-accent hover:bg-accent/10 transition-colors";

  return (
    <div className="flex items-center gap-1">
      <span className="text-[12px] font-[family-name:var(--font-geist-mono)] text-foreground-light uppercase tracking-wider mr-1">
        Share
      </span>
      <button onClick={shareX} aria-label="Share on X" className={btnClass}>
        <Twitter size={16} />
      </button>
      <button
        onClick={shareLinkedIn}
        aria-label="Share on LinkedIn"
        className={btnClass}
      >
        <Linkedin size={16} />
      </button>
      <button
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={btnClass}
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  );
}
