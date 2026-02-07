"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Work" },
    { href: "/fun", label: "Fun" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="flex justify-center px-6 py-5 z-50 bg-background border-b border-foreground/10 lg:h-16 items-center relative min-h-[32px]">
      <div className="max-w-[1800px] w-full flex items-center gap-6 relative">
        <Link href="/" className="flex items-center gap-3">
          <h4 className="text-[15px] font-medium font-[family-name:var(--font-geist-mono)] uppercase text-foreground tracking-normal">
            Rachel Chen
          </h4>
          <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light tracking-normal">
            Product Designer + Engineer
          </h4>
        </Link>

        <div className="flex items-center gap-6 ml-auto">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group"
              >
                <h4
                  className={`text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase tracking-normal transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-accent"
                      : "text-foreground-light hover:text-foreground"
                  }`}
                >
                  {link.label}
                </h4>
              </Link>
            ))}
            <a
              href="/Rachel_Chen_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase tracking-normal text-foreground-light hover:text-foreground transition-colors duration-200">
                Resume
              </h4>
            </a>
          </nav>

          <button
            className="group flex items-center gap-1.5 hover:opacity-100 hover:text-foreground transition-all duration-200 rounded-full p-2 h-8 mr-[-8px] opacity-50"
            aria-label="Open AI chat"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-accent sparkle-spin"
            >
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
            <span className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase tracking-normal">
              RacheLLM
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
