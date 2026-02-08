"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

export type MediaItem = {
  type: "video" | "image";
  src: string;
  poster?: string;
  alt?: string;
};

export type MetadataItem = {
  label: string;
  value: string;
};

export type ProjectSection = {
  id: string;
  title: string;
  content: string[];
  media?: MediaItem[];
};

export type ProjectData = {
  title: string;
  subtitle: string;
  heroMedia: MediaItem;
  metadata: MetadataItem[];
  sections: ProjectSection[];
};

function BackArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 12.5L2 8M2 8L6.5 3.5M2 8H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MediaBlock({ media }: { media: MediaItem }) {
  if (media.type === "video") {
    return (
      <div className="w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={media.poster}
          className="w-full h-full object-cover"
        >
          <source src={media.src} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <img
        src={media.src}
        alt={media.alt || ""}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function ProjectLayout({ project }: { project: ProjectData }) {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState<string>("");

  const sidebarNav = project.sections.map((s) => ({
    id: s.id,
    label: s.title,
  }));

  const scrollToSection = useCallback((id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    for (const section of project.sections) {
      const el = sectionRefs.current[section.id];
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [project.sections]);

  return (
    <div className="grid max-w-[1800px] mx-auto grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 md:gap-8 px-6">
      {/* Left Sidebar */}
      <div className="md:sticky md:top-0 md:h-fit px-0 pt-12 pb-0 md:py-12 min-w-40">
        <div className="flex flex-col gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-[15px] font-normal text-foreground-light hover:text-foreground transition-colors duration-200"
          >
            <BackArrowIcon />
            <span>Back</span>
          </Link>

          <nav className="hidden md:flex flex-col gap-1">
            {sidebarNav.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left text-[15px] font-normal py-1 transition-colors duration-200 ${
                  activeSection === item.id
                    ? "text-foreground"
                    : "text-foreground-light hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:max-w-3xl lg:max-w-4xl py-12 flex flex-col gap-12 md:gap-24">
        {/* Header */}
        <div className="flex flex-col gap-8">
          <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light">
            {project.subtitle}
          </h4>
          <h1
            className="font-serif text-foreground"
            style={{
              fontSize: "44px",
              fontWeight: 400,
              lineHeight: "48.4px",
              letterSpacing: "-0.88px",
            }}
          >
            {project.title}
          </h1>

          {/* Hero Media */}
          <div className="w-full aspect-[16/9] overflow-hidden">
            {project.heroMedia.type === "video" ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={project.heroMedia.poster}
                className="w-full h-full object-cover"
              >
                <source src={project.heroMedia.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={project.heroMedia.src}
                alt={project.heroMedia.alt || project.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.metadata.map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] uppercase text-foreground-light">
                  {item.label}
                </h4>
                <p className="text-[15px] text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="flex flex-col gap-12 md:gap-24">
          {project.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => {
                sectionRefs.current[section.id] = el;
              }}
              className="flex flex-col gap-6"
            >
              <h2
                className="font-serif text-foreground"
                style={{
                  fontSize: "32px",
                  fontWeight: 400,
                  lineHeight: "38.4px",
                  letterSpacing: "-0.64px",
                }}
              >
                {section.title}
              </h2>
              {section.content.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[15px] text-foreground-light"
                  style={{ lineHeight: "22.5px" }}
                >
                  {paragraph}
                </p>
              ))}
              {section.media?.map((media, i) => (
                <MediaBlock key={i} media={media} />
              ))}
            </section>
          ))}
        </div>
      </div>

      {/* Right Spacer */}
      <div className="hidden md:block" />
    </div>
  );
}
