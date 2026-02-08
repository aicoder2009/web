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
        <Link href="/" className="flex flex-col sm:flex-row sm:inline-flex sm:gap-4 gap-0 w-full">
          <h4 className="text-[15px] font-medium font-[family-name:var(--font-geist-mono)] uppercase text-foreground tracking-normal">
            Rachel Chen
          </h4>
          <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light tracking-normal">
            Product Designer + Engineer
          </h4>
        </Link>

        <div className="flex gap-2 lg:w-full justify-end items-center">
          <nav className="md:flex hidden items-center gap-6">
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
          <button className="group flex items-center hover:opacity-100 hover:text-accent transition-all duration-200 rounded-full p-2 h-8 w-auto opacity-50" style={{ marginRight: '-8px' }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 30 30"
              fill="none"
              className="sparkle-spin"
            >
              <path d="M14.5231 29.2759C12.6685 22.5706 7.42938 17.3315 0.724097 15.4769C0.240255 15.3431 0.240255 14.657 0.724097 14.5231C7.42938 12.6685 12.6685 7.42939 14.5231 0.724099C14.6569 0.240257 15.343 0.240257 15.4769 0.724099C17.3315 7.42939 22.5706 12.6685 29.2759 14.5231C29.7597 14.657 29.7597 15.343 29.2759 15.4769C22.5706 17.3315 17.3315 22.5706 15.4769 29.2759C15.343 29.7597 14.657 29.7597 14.5231 29.2759Z" fill="currentColor" />
            </svg>
            <span className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase tracking-normal ml-1">
              RacheLLM
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
