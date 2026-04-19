"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import RotatingText from "@/components/RotatingText";

async function checkImage(src: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

const experiences = [
  {
    year: "2025–NOW",
    company: "Basha DevOps Club",
    role: "Vice President",
    url: undefined,
  },
  {
    year: "2025–NOW",
    company: "NHS + MYAC (Gilbert)",
    role: "Blood Drive Coordinator, Youth Council",
    url: undefined,
  },
  {
    year: "2022–NOW",
    company: "Setu Labs",
    role: "Founder & CEO",
    url: "https://setulabs.ai",
  },
  {
    year: "2021",
    company: "KidCon",
    role: "Organizer & Host",
    url: undefined,
  },
  {
    year: "2020–2021",
    company: "Kids Cloud Club",
    role: "Founder & President",
    url: undefined,
  },
  {
    year: "2019",
    company: "AWS Public Sector Summit",
    role: "Keynote Speaker (DC, ~40k)",
    url: undefined,
  },
  {
    year: "2018",
    company: "AWS",
    role: "Youngest Cloud Practitioner at age 9",
    url: undefined,
  },
];

type Project = {
  title: string;
  org: string;
  status: string;
  href: string;
  external?: boolean;
  mediaType: "video" | "image";
  videoSrc?: string;
  posterSrc: string;
  fallbackGradient: string;
  tintColor: string;
};

const projectsLeft: Project[] = [
  {
    title: "AI tools that remove barriers",
    org: "Setu Labs",
    status: "Building 2022–Now",
    href: "/projects/setu-labs",
    mediaType: "image",
    posterSrc: "/projects/setu-labs/hero.png",
    fallbackGradient: "from-emerald-100 via-green-100 to-teal-100",
    tintColor: "rgba(91, 154, 111, 0.314)",
  },
  {
    title: "The first cloud conference built for kids",
    org: "KidCon",
    status: "Shipped 2021",
    href: "/projects/kidcon",
    mediaType: "image",
    posterSrc: "/projects/kidcon/hero.png",
    fallbackGradient: "from-sky-100 via-blue-100 to-indigo-100",
    tintColor: "rgba(91, 141, 239, 0.314)",
  },
  {
    title: "Building a startup in a summer",
    org: "Infotruster · Leangap",
    status: "Most Outstanding Company 2024",
    href: "/projects/infotruster",
    mediaType: "image",
    posterSrc: "/projects/infotruster/hero.png",
    fallbackGradient: "from-violet-100 via-purple-100 to-pink-100",
    tintColor: "rgba(155, 114, 207, 0.314)",
  },
  {
    title: "Teaching cloud computing to my peers",
    org: "Kids Cloud Club",
    status: "Founded 2020",
    href: "/projects/kids-cloud-club",
    mediaType: "image",
    posterSrc: "/projects/kids-cloud-club/hero.png",
    fallbackGradient: "from-yellow-100 via-amber-100 to-orange-100",
    tintColor: "rgba(232, 145, 58, 0.314)",
  },
];

const projectsRight: Project[] = [
  {
    title: "Keynote to 40,000 in Washington, D.C.",
    org: "AWS Public Sector Summit",
    status: "Keynoted 2019",
    href: "/projects/aws-keynote",
    mediaType: "image",
    posterSrc: "/projects/aws-keynote/hero.png",
    fallbackGradient: "from-orange-200 via-amber-200 to-yellow-200",
    tintColor: "rgba(255, 153, 0, 0.314)",
  },
  {
    title: "Youngest AWS Cloud Practitioner in the world",
    org: "AWS Certification",
    status: "Certified at age 9 · 2018",
    href: "/projects/aws-cert",
    mediaType: "image",
    posterSrc: "/projects/aws-cert/hero.png",
    fallbackGradient: "from-blue-50 via-slate-100 to-gray-100",
    tintColor: "rgba(0, 20, 69, 0.314)",
  },
  {
    title: "Rebuilding a high school coding community",
    org: "Basha DevOps Club",
    status: "VP · 2023–Now",
    href: "/projects/devops-club",
    mediaType: "image",
    posterSrc: "/projects/devops-club/hero.png",
    fallbackGradient: "from-rose-100 via-pink-100 to-red-100",
    tintColor: "rgba(217, 91, 140, 0.314)",
  },
  {
    title: "Talking fruits built with Raspberry Pi",
    org: "Kindergarten Build",
    status: "Shipped early",
    href: "/projects/talking-fruits",
    mediaType: "image",
    posterSrc: "/projects/talking-fruits/hero.png",
    fallbackGradient: "from-lime-100 via-emerald-100 to-green-100",
    tintColor: "rgba(122, 174, 233, 0.314)",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageOk, setImageOk] = useState(false);

  useEffect(() => {
    if (project.mediaType !== "image") return;
    let active = true;
    checkImage(project.posterSrc).then((ok) => {
      if (active) setImageOk(ok);
    });
    return () => {
      active = false;
    };
  }, [project.mediaType, project.posterSrc]);

  useEffect(() => {
    if (project.mediaType !== "video") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { rootMargin: "50px" }
    );

    const currentRef = videoRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [project.mediaType]);

  const Wrapper = project.external ? "a" : Link;
  const props = project.external
    ? { href: project.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: project.href };

  return (
    <Wrapper
      {...(props as any)}
      className="project-card group block transition-all duration-300 ease-in-out !opacity-100"
    >
      <div className="flex flex-col gap-2">
        <div className="relative w-full aspect-[16/9] overflow-hidden transition-all duration-300 ease-in-out" style={{ boxSizing: 'border-box' }}>
          {/* Gradient fallback behind media */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.fallbackGradient}`}
          />
          {project.mediaType === "video" && project.videoSrc ? (
            <video
              ref={videoRef}
              autoPlay={isVisible}
              loop
              muted
              playsInline
              poster={project.posterSrc}
              className="relative w-full h-full object-cover"
            >
              {isVisible && <source src={project.videoSrc} type="video/mp4" />}
            </video>
          ) : imageOk ? (
            <Image
              src={project.posterSrc}
              alt={project.title}
              fill
              className="relative object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 900px"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="text-3xl md:text-4xl font-light text-foreground/15 font-serif transition-all duration-300 group-hover:text-foreground/30 px-6 text-center">
                {project.org}
              </span>
            </div>
          )}
          {/* Colored tint overlay (per-project) */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none group-hover:opacity-100"
            style={{ backgroundColor: project.tintColor }}
          />
          {/* White wash overlay */}
          <div className="absolute inset-0 bg-background/0 transition-colors duration-300 ease-in-out group-hover:bg-background/40" />
        </div>
        <div className="flex flex-col justify-between gap-0.5 mt-1 transition-colors duration-300 ease-in-out lg:flex-row">
          <h3 className="text-[17px] font-normal font-serif text-foreground overflow-hidden">
            {project.title}
          </h3>
          <h4 className="text-[15px] font-normal font-[family-name:var(--font-geist-mono)] text-foreground-light uppercase">
            {project.org} &bull; {project.status}
          </h4>
        </div>
      </div>
    </Wrapper>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col p-6 w-full items-center gap-12 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-full max-w-[1800px]">
        <div className="w-full">
          {/* Hero + Experience Grid */}
          <div className="hero-grid grid grid-cols-1 gap-12 lg:gap-6 pt-8 lg:pt-[26vh] pb-8 w-full lg:grid-cols-2">
            {/* Hero */}
            <div className="flex flex-col w-full gap-4">
              <h1 className="hero-h1 font-serif text-foreground max-w-[700px]" style={{ fontSize: '52px', lineHeight: 1.1, letterSpacing: '-0.02em', fontWeight: 400 }}>
                I&apos;m Karthick, an entrepreneur who{" "}
                <RotatingText />
              </h1>
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-3 w-full justify-end">
              <div className="experience-list flex flex-col gap-2 lg:gap-[2px]">
                {experiences.map((exp, i) => (
                  <div key={i} className="experience-row flex items-baseline gap-2">
                    <h4 className="w-28 min-w-28 text-[15px] font-normal font-[family-name:var(--font-geist-mono)] text-foreground-light">
                      {exp.year}
                    </h4>
                    <div className="w-56 min-w-56 text-[15px] font-medium text-foreground">
                      {exp.url ? (
                        <a href={exp.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                          {exp.company}
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                    </div>
                    <p className="text-[15px] text-foreground-light">
                      {exp.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              {projectsLeft.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {projectsRight.map((project, i) => (
                <ProjectCard key={i} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
