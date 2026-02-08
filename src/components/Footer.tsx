"use client";

import { useState, useRef, useCallback } from "react";

export default function Footer() {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="group relative inline-flex items-center justify-center p-1 transition-all duration-200 hover:scale-110 active:scale-95"
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
              className="heartbeat"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
              <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light hover:text-foreground transition-colors duration-200">
                Linkedin
              </h4>
            </a>
            <div className="relative inline-flex md:static">
              <button onClick={handleCopyEmail}>
                <h4 className={`text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase transition-colors duration-200 ${
                  copied ? "text-accent" : "text-foreground-light hover:text-foreground"
                }`}>
                  {copied ? "Copied!" : "EMAIL"}
                </h4>
              </button>
            </div>
            <a
              href="https://x.com/racheljychen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:!opacity-100"
            >
              <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light hover:text-foreground transition-colors duration-200">
                X
              </h4>
            </a>
            <a
              href="https://github.com/rachelchxn"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:!opacity-100"
            >
              <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light hover:text-foreground transition-colors duration-200">
                Github
              </h4>
            </a>
            <a
              href="https://devpost.com/rachelc0715"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:!opacity-100"
            >
              <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light hover:text-foreground transition-colors duration-200">
                Devpost
              </h4>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
