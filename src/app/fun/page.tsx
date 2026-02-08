"use client";

import { useState } from "react";
import Image from "next/image";

interface FunProject {
  title: string;
  name: string;
  tag: string;
  href: string;
  gradient: string;
  imageSrc?: string;
}

const col1: FunProject[] = [
  {
    title: "AI device to never forget people",
    name: "infu",
    tag: "2nd place @ Hack Western 10",
    href: "https://devpost.com/software/infu",
    gradient: "from-slate-300 via-gray-200 to-zinc-300",
  },
  {
    title: "Cursor for document editing",
    name: "AI doc editor",
    tag: "Concept",
    href: "https://x.com/racheljychen/status/1941619198309896654",
    gradient: "from-violet-200 via-fuchsia-200 to-purple-300",
  },
  {
    title: "App for spontaneous hangouts",
    name: "bubbl",
    tag: "1st place @ UXL designathon 2024",
    href: "https://drive.google.com/file/d/1AK_tyewVfWShq_pyKfeYv-6P3nHvEd1E/view",
    gradient: "from-pink-200 via-rose-200 to-pink-300",
    imageSrc: "/fun/bubbl.png",
  },
  {
    title: "AI Chrome extension mental health",
    name: "Zensphere",
    tag: "Best Health Hack @ Methacks 2024",
    href: "https://devpost.com/software/zensphere",
    gradient: "from-cyan-200 via-teal-200 to-emerald-200",
    imageSrc: "/fun/zensphere.png",
  },
];

const col2: FunProject[] = [
  {
    title: "Making hacking for everyone",
    name: "Hack Western 12",
    tag: "Hackathon",
    href: "https://hackwestern.com/",
    gradient: "from-blue-200 via-indigo-200 to-blue-300",
  },
  {
    title: "Sign language translator",
    name: "ASL Translator",
    tag: "Personal Project",
    href: "https://github.com/rachelchxn/asl-translator-deployed",
    gradient: "from-amber-200 via-yellow-200 to-amber-300",
    imageSrc: "/fun/asl-translator.png",
  },
  {
    title: "AI trail generator app",
    name: "trailo",
    tag: "Design Project",
    href: "https://x.com/racheljychen/status/1945714684721533250",
    gradient: "from-green-200 via-emerald-200 to-green-300",
  },
  {
    title: "Youtube video to organized notes",
    name: "TL;DW",
    tag: "Best Cohere Hack @ UofTHacks X",
    href: "https://devpost.com/software/tldw-too-long-didn-t-watch",
    gradient: "from-orange-200 via-amber-200 to-orange-300",
    imageSrc: "/fun/tldw.png",
  },
  {
    title: "Machine learning and data analysis for hotels",
    name: "dataquest",
    tag: "1st place @ Dataquest 2024",
    href: "https://devpost.com/software/the-best-solution",
    gradient: "from-sky-200 via-blue-200 to-indigo-200",
    imageSrc: "/fun/dataquest.png",
  },
];

const col3: FunProject[] = [
  {
    title: "Eye-tracking device for eye health",
    name: "Visionary",
    tag: "Best Eye-Tracking Hack @ Hack the North 2023",
    href: "https://devpost.com/software/visionary-bzvo5p",
    gradient: "from-rose-200 via-pink-200 to-rose-300",
    imageSrc: "/fun/visionary.png",
  },
  {
    title: "Collaborative vibe coding",
    name: "init",
    tag: "Hack the 6ix 2024",
    href: "https://devpost.com/software/init-gaxp0c",
    gradient: "from-slate-200 via-gray-200 to-slate-300",
  },
  {
    title: "Real-time emotion-mapping",
    name: "empa",
    tag: "1st place @ Shehacks 2024",
    href: "https://devpost.com/software/empa",
    gradient: "from-purple-200 via-violet-200 to-purple-300",
    imageSrc: "/fun/empa.png",
  },
  {
    title: "AI chatbot of myself with stable diffusion",
    name: "RachelAI",
    tag: "Client Project",
    href: "https://www.onova.io/innovation-insights/rachelai-a-behind-the-scenes-look-at-creating-a-virtual-ai-chatbot-in-24-hours#the-impact-of-rachelai",
    gradient: "from-red-200 via-orange-200 to-amber-200",
    imageSrc: "/fun/rachelai.png",
  },
];

function FunCard({ project }: { project: FunProject }) {
  const [imgError, setImgError] = useState(false);
  const showImage = project.imageSrc && !imgError;

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
            {showImage ? (
              <Image
                src={project.imageSrc!}
                alt={project.name}
                width={600}
                height={600}
                className="object-cover w-full h-auto transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 33vw"
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
          <h3 className="text-[17px] font-normal font-serif text-foreground leading-[1.5]">
            {project.title}
          </h3>
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
          <h1 className="font-serif lg:w-1/2 lg:min-w-[640px]" style={{ fontSize: '44px', lineHeight: '48.4px', letterSpacing: '-0.88px', fontWeight: 400 }}>
            I lose sleep to hackathons, design sprints, &amp; silly little side
            quests.
          </h1>
          <div className="flex flex-col md:flex-row gap-12 lg:w-2/5 lg:min-w-[640px] animate-fade-in stagger-1">
            <div className="flex flex-col gap-2">
              <p className="text-[15px] text-foreground-light leading-[1.5]">
                Design is my passion, but I make time to code cool things and
                artificialize intelligence. Currently leading design at{" "}
                <a
                  href="https://hackwestern.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  Hack Western
                </a>
                , growing at{" "}
                <a
                  href="https://svsd.school"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-4"
                >
                  SVSD
                </a>
                , and climbing rocks.
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
