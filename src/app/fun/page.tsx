"use client";

import { useState } from "react";

interface FunProject {
  title: string;
  name: string;
  tag: string;
  href: string;
  gradient: string;
  imageSrc?: string;
  videoSrc?: string;
  inProgress?: boolean;
}

const col1: FunProject[] = [
  {
    title: "Digital Alfa Zeta flip display for any screen",
    name: "DotClock",
    tag: "TypeScript",
    href: "https://github.com/aicoder2009/dotclock",
    gradient: "from-amber-200 via-yellow-200 to-amber-300",
  },
  {
    title: "Open source ad-free citation machine",
    name: "OpenCitation",
    tag: "TypeScript",
    href: "https://github.com/aicoder2009/opencitation",
    gradient: "from-sky-200 via-blue-200 to-indigo-200",
  },
  {
    title: "AWS account pause tool — stops all services without nuking",
    name: "awsbreak",
    tag: "Python",
    href: "https://github.com/aicoder2009/awsbreak",
    gradient: "from-orange-200 via-amber-200 to-orange-300",
  },
];

const col2: FunProject[] = [
  {
    title: "Language identification word game with 20+ languages",
    name: "Linguarush",
    tag: "TypeScript · 4 Game Modes",
    href: "https://github.com/aicoder2009/Linguarush",
    gradient: "from-green-200 via-emerald-200 to-green-300",
  },
  {
    title: "AI snake identification PWA with OpenAI Vision + AWS Lambda",
    name: "SnakeID",
    tag: "TypeScript · Oct 2025",
    href: "https://github.com/aicoder2009/SnakeID",
    gradient: "from-rose-200 via-pink-200 to-rose-300",
  },
  {
    title: "Intelligent macOS storage optimizer with ML",
    name: "Jerry",
    tag: "In Progress",
    href: "https://github.com/aicoder2009/Jerry",
    gradient: "from-violet-200 via-fuchsia-200 to-purple-300",
    inProgress: true,
  },
];

const col3: FunProject[] = [
  {
    title: "Chat-first scheduling app for high school students",
    name: "Pando",
    tag: "TypeScript · In Progress",
    href: "https://github.com/aicoder2009/Pando",
    gradient: "from-cyan-200 via-teal-200 to-emerald-200",
    inProgress: true,
  },
  {
    title: "Podcast about AI — conversations, trends, and the future",
    name: "The AI Tripod Podcast",
    tag: "Ongoing",
    href: "#",
    gradient: "from-slate-300 via-gray-200 to-zinc-300",
  },
];

function FunCard({ project }: { project: FunProject }) {
  const [imgError, setImgError] = useState(false);
  const showImage = project.imageSrc && !imgError;
  const showVideo = !!project.videoSrc;

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card group block transition-all duration-300 ease-in-out !opacity-100"
    >
      <div className="flex flex-col gap-2">
        <div className="relative w-full overflow-hidden transition-all duration-300 ease-in-out">
          <div className="relative w-full">
            {showVideo ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-auto"
              >
                <source src={project.videoSrc!} type="video/mp4" />
              </video>
            ) : showImage ? (
              <img
                src={project.imageSrc!}
                alt={project.name}
                className="object-cover w-full h-auto transition-opacity duration-300"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className={`w-full aspect-[3/4] bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}
              >
                <span className="text-2xl md:text-3xl font-light text-foreground/15 font-serif transition-all duration-300 group-hover:text-foreground/30">
                  {project.name}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-background/0 transition-colors duration-300 ease-in-out group-hover:bg-background/40" />
          </div>
        </div>
        <div className="flex flex-col gap-0.5 mt-1">
          <div className="flex items-center gap-2">
            <h3 className="text-[17px] font-normal font-serif text-foreground leading-[1.5]">
              {project.title}
            </h3>
            {project.inProgress && (
              <span className="in-progress-tag">
                🚧 In Progress
              </span>
            )}
          </div>
          <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] text-foreground-light uppercase">
            {project.name} &bull; {project.tag}
          </h4>
        </div>
      </div>
    </a>
  );
}

export default function FunPage() {
  return (
    <div className="flex flex-col p-6 w-full items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-full max-w-[1800px] gap-4">
        {/* Hero */}
        <div className="flex flex-col gap-8 py-8 animate-fade-in">
          <h1 className="hero-h1 font-serif lg:w-1/2 lg:min-w-[640px]" style={{ fontSize: '52px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
            I build tools that solve real problems &amp; scratch my own itches.
          </h1>
          <div className="flex flex-col md:flex-row gap-12 lg:w-2/5 lg:min-w-[640px] animate-fade-in stagger-1">
            <div className="flex flex-col gap-2">
              <p className="text-[15px] text-foreground-light leading-[1.5]">
                When I&apos;m not building{" "}
                <a
                  href="https://aigenie.biz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  Aigenie
                </a>
                , I&apos;m hacking on side projects, contributing to open source,
                and exploring AI at every layer of the stack. Currently playing
                pickleball and podcasting.
              </p>
            </div>
          </div>
        </div>

        {/* 3-Column Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full animate-fade-in stagger-2">
          <div className="flex flex-col gap-6">
            {col1.map((project, i) => (
              <FunCard key={i} project={project} />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {col2.map((project, i) => (
              <FunCard key={i} project={project} />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {col3.map((project, i) => (
              <FunCard key={i} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
