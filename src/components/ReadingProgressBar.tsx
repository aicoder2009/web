"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll <= 0) {
        setProgress(0);
        return;
      }
      setProgress((scrollTop / maxScroll) * 100);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-accent z-50 transition-[width] duration-75"
      style={{ width: `${progress}%` }}
    />
  );
}
