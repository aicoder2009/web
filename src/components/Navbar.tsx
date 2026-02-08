"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChat } from "./ChatProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isChatOpen, toggleChat, inputRef } = useChat();

  const navLinks = [
    { href: "/", label: "Work" },
    { href: "/fun", label: "Fun" },
    { href: "/about", label: "About" },
  ];

  const handleArunLMClick = () => {
    if (isChatOpen) {
      // Already open — focus input
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      toggleChat();
    }
  };

  return (
    <header className="flex justify-center px-6 py-5 z-50 bg-background gap-6 border-b border-foreground/10 lg:h-16 items-center relative min-h-[32px]">
      <div className="max-w-[1800px] w-full flex items-center gap-6 relative">
        {/* Logo / Name */}
        <div className="flex items-center w-full">
          <Link href="/" className="flex flex-col sm:flex-row sm:inline-flex sm:gap-4 gap-0 !opacity-100" onClick={() => setMobileOpen(false)}>
            <h4 className="text-[15px] font-medium font-[family-name:var(--font-geist-mono)] uppercase text-foreground tracking-normal !opacity-100">
              Karthick Arun
            </h4>
            <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light tracking-normal flex items-center gap-0">
              Builder + Engineer
            </h4>
          </Link>
        </div>

        {/* Desktop nav + ArunLM */}
        <div className="md:flex hidden gap-8 w-full justify-end items-center">
          <div className="flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group"
              >
                <h4
                  className={`text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase tracking-normal transition-colors duration-200 !opacity-100 ${
                    pathname === link.href
                      ? "text-accent"
                      : "text-foreground-light hover:text-accent"
                  }`}
                >
                  {link.label}
                </h4>
              </Link>
            ))}
          </div>

          {/* ArunLM button */}
          <div className="flex gap-2 lg:w-full justify-end items-center">
            <button
              onClick={handleArunLMClick}
              className={`group flex items-center hover:opacity-100 hover:text-accent transition-all duration-200 rounded-full h-8 ${
                isChatOpen
                  ? "bg-accent/8 w-8 justify-center p-0"
                  : "p-2 w-auto opacity-50"
              }`}
              aria-label={isChatOpen ? "Close AI chat" : "Open AI chat"}
              style={{ marginRight: '-8px' }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M14.5231 29.2759C12.6685 22.5706 7.42938 17.3315 0.724097 15.4769C0.240255 15.3431 0.240255 14.657 0.724097 14.5231C7.42938 12.6685 12.6685 7.42939 14.5231 0.724099C14.6569 0.240257 15.343 0.240257 15.4769 0.724099C17.3315 7.42939 22.5706 12.6685 29.2759 14.5231C29.7597 14.657 29.7597 15.343 29.2759 15.4769C22.5706 17.3315 17.3315 22.5706 15.4769 29.2759C15.343 29.7597 14.657 29.7597 14.5231 29.2759Z"
                  fill={isChatOpen ? "var(--accent)" : "currentColor"}
                  className="group-hover:fill-accent transition-colors duration-200"
                />
              </svg>
              <span
                className={`text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase tracking-normal overflow-hidden transition-all whitespace-nowrap text-current ${
                  isChatOpen
                    ? "max-w-0 opacity-0 pl-0"
                    : "max-w-[100px] opacity-100 pl-2.5"
                }`}
              >
                ArunLM
              </span>
            </button>
          </div>
        </div>

        {/* Mobile: hamburger + ArunLM */}
        <div className="md:hidden flex gap-4 items-center">
          <button
            onClick={handleArunLMClick}
            className={`group flex items-center hover:opacity-100 hover:text-accent transition-all duration-200 rounded-full h-8 ${
              isChatOpen
                ? "bg-accent/8 w-8 justify-center p-0"
                : "p-2 w-auto opacity-50"
            }`}
            aria-label={isChatOpen ? "Close AI chat" : "Open AI chat"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M14.5231 29.2759C12.6685 22.5706 7.42938 17.3315 0.724097 15.4769C0.240255 15.3431 0.240255 14.657 0.724097 14.5231C7.42938 12.6685 12.6685 7.42939 14.5231 0.724099C14.6569 0.240257 15.343 0.240257 15.4769 0.724099C17.3315 7.42939 22.5706 12.6685 29.2759 14.5231C29.7597 14.657 29.7597 15.343 29.2759 15.4769C22.5706 17.3315 17.3315 22.5706 15.4769 29.2759C15.343 29.7597 14.657 29.7597 14.5231 29.2759Z"
                fill={isChatOpen ? "var(--accent)" : "currentColor"}
                className="group-hover:fill-accent transition-colors duration-200"
              />
            </svg>
          </button>

          <button
            className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <span
              className="block w-4 h-[1.5px] bg-foreground transition-all duration-200"
              style={mobileOpen ? { transform: 'rotate(45deg) translateY(3.25px)' } : {}}
            />
            <span
              className="block w-4 h-[1.5px] bg-foreground transition-all duration-200"
              style={mobileOpen ? { transform: 'rotate(-45deg) translateY(-3.25px)' } : {}}
            />
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <nav className="md:hidden flex flex-col gap-4 pt-4 pb-2 w-full max-w-[1800px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group"
              onClick={() => setMobileOpen(false)}
            >
              <h4
                className={`text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase tracking-normal transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-accent"
                    : "text-foreground-light hover:text-accent"
                }`}
              >
                {link.label}
              </h4>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
