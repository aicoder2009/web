"use client";

import { useState, useRef, useCallback } from "react";

export default function Footer() {
  const [liked, setLiked] = useState(false);
  const heartRef = useRef<HTMLButtonElement>(null);

  const handleHeartClick = () => {
    setLiked(!liked);
    if (heartRef.current) {
      heartRef.current.classList.remove("heart-pop");
      void heartRef.current.offsetWidth;
      heartRef.current.classList.add("heart-pop");
    }
  };

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText("rachelc0715@gmail.com");
    window.dispatchEvent(new CustomEvent("email-copied"));
  }, []);

  return (
    <footer className="w-full flex items-center justify-center px-6 py-5 border-t border-foreground/10">
      <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between gap-6 max-w-[1800px]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 min-w-0">
          <span className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light">
            Designed + Coded with
          </span>
          <button
            ref={heartRef}
            className="group relative inline-flex items-center justify-center p-1 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
            aria-label="Like"
            onClick={handleHeartClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={liked ? "#e65f2e" : "none"}
              stroke={liked ? "#e65f2e" : "currentColor"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-heart w-[15px] h-[15px] transition-all duration-300 transform text-foreground-light hover:text-accent relative z-10 heart-hover"
              style={{ animation: "none" }}
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          <span className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light">
            by Rachel
          </span>
        </div>

        <div className="flex flex-row items-end gap-3 md:gap-8 w-full md:w-fit justify-between">
          <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-3 md:gap-8">
            <a
              href="https://www.linkedin.com/in/rachel-jiayi-chen/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:!opacity-100"
            >
              <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light hover:text-accent !opacity-100 cursor-pointer transition-colors duration-200">
                Linkedin
              </h4>
            </a>
            <button
              onClick={handleCopyEmail}
              data-cursor="email"
              className="hover:!opacity-100 opacity-60 text-foreground font-[family-name:var(--font-geist-mono)] text-start uppercase text-[15px]"
            >
              EMAIL
            </button>
            <a
              href="https://x.com/racheljychen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:!opacity-100"
            >
              <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light hover:text-accent !opacity-100 cursor-pointer transition-colors duration-200">
                X
              </h4>
            </a>
            <a
              href="https://github.com/rachelchxn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:!opacity-100"
            >
              <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light hover:text-accent !opacity-100 cursor-pointer transition-colors duration-200">
                Github
              </h4>
            </a>
            <a
              href="https://devpost.com/rachelc0715"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:!opacity-100"
            >
              <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light hover:text-accent !opacity-100 cursor-pointer transition-colors duration-200">
                Devpost
              </h4>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
