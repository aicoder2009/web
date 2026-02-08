import Link from "next/link";

const experiences = [
  {
    year: "2025",
    company: "Bloomberg",
    role: "Software Engineering Intern",
    url: "https://bloomberg.com",
  },
  {
    year: "2025",
    company: "1Password",
    role: "Product Design Intern",
    url: "https://1password.com",
  },
  {
    year: "2024",
    company: "Royal Bank of Canada",
    role: "Software Engineering Intern",
    url: "https://rbc.com",
  },
  {
    year: "2023",
    company: "Onova",
    role: "Product Design + Engineering Intern",
    url: "https://onova.io",
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
    title: "The future of AI & hardware",
    org: "OpenAI x Hardware",
    status: "Concept 2025",
    href: "/projects/openai",
    mediaType: "video",
    videoSrc: "/projects/openai/openai.mp4",
    posterSrc: "/projects/openai/openai.png",
    fallbackGradient: "from-orange-200 via-pink-200 to-purple-200",
    tintColor: "rgba(233, 141, 52, 0.314)",
  },
  {
    title: "Mobile-first for Figma",
    org: "Figma",
    status: "Concept 2025",
    href: "/projects/figma",
    mediaType: "video",
    videoSrc: "/projects/figma/figma.mp4",
    posterSrc: "/projects/figma/figma.png",
    fallbackGradient: "from-violet-100 via-purple-100 to-pink-100",
    tintColor: "rgba(162, 89, 255, 0.314)",
  },
  {
    title: "The world's first AI poker coach",
    org: "PokerGPT",
    status: "Shipped 2023",
    href: "/projects/pokergpt",
    mediaType: "video",
    videoSrc: "/projects/pokergpt/pokergpt.mp4",
    posterSrc: "/projects/pokergpt/pokergpt.png",
    fallbackGradient: "from-green-100 via-emerald-100 to-teal-100",
    tintColor: "rgba(52, 168, 83, 0.314)",
  },
  {
    title: "Making 0-1 building for everyone",
    org: "Hack Western 12",
    status: "Shipped 2025",
    href: "https://hackwestern.com",
    external: true,
    mediaType: "image",
    posterSrc: "/hackwestern.png",
    fallbackGradient: "from-blue-100 via-indigo-100 to-violet-100",
    tintColor: "rgba(79, 70, 229, 0.314)",
  },
];

const projectsRight: Project[] = [
  {
    title: "Novel consumer AI experiences",
    org: "Amazon Alexa+",
    status: "Contract 2025",
    href: "/projects/alexa",
    mediaType: "video",
    videoSrc: "/projects/alexa/alexa.mp4",
    posterSrc: "/projects/alexa/alexa.png",
    fallbackGradient: "from-sky-100 via-blue-100 to-indigo-100",
    tintColor: "rgba(0, 20, 69, 0.314)",
  },
  {
    title: "Patent-pending AI",
    org: "Royal Bank of Canada",
    status: "Handed off 2024",
    href: "/projects/rbc",
    mediaType: "image",
    posterSrc: "/projects/rbc/rbc.png",
    fallbackGradient: "from-yellow-100 via-amber-100 to-orange-100",
    tintColor: "rgba(232, 242, 251, 0.6)",
  },
  {
    title: "Bringing autofill to macOS",
    org: "1Password",
    status: "Shipped 2025",
    href: "/projects/1password",
    mediaType: "video",
    videoSrc: "/projects/1password/1password.mp4",
    posterSrc: "/projects/1password/1password.png",
    fallbackGradient: "from-blue-50 via-slate-100 to-gray-100",
    tintColor: "rgba(25, 100, 210, 0.314)",
  },
  {
    title: "Innovation management for Fortune 500s",
    org: "Earth",
    status: "Shipped 2023",
    href: "/projects/earth",
    mediaType: "video",
    videoSrc: "/projects/earth/earth.mp4",
    posterSrc: "/projects/earth/earth.png",
    fallbackGradient: "from-emerald-100 via-green-100 to-lime-100",
    tintColor: "rgba(16, 185, 129, 0.314)",
  },
];

function ProjectCard({ project }: { project: Project }) {
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
              autoPlay
              loop
              muted
              playsInline
              poster={project.posterSrc}
              className="relative w-full h-full object-cover"
            >
              <source src={project.videoSrc} type="video/mp4" />
            </video>
          ) : (
            <img
              src={project.posterSrc}
              alt={project.title}
              className="relative w-full h-full object-cover"
            />
          )}
          {/* Colored tint overlay (per-project) */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none group-hover:opacity-100"
            style={{ backgroundColor: project.tintColor }}
          />
          {/* White wash overlay */}
          <div className="absolute inset-0 bg-transparent transition-colors duration-300 ease-in-out group-hover:bg-background/30" />
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
                I&apos;m Rachel, a product designer who{" "}
                <span className="italic">engineers</span>.
              </h1>
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-3 w-full justify-end">
              <div className="experience-list flex flex-col gap-2 lg:gap-[2px]">
                {experiences.map((exp, i) => (
                  <div key={i} className="experience-row flex gap-2">
                    <h4 className="w-26 min-w-26 text-[15px] font-normal font-[family-name:var(--font-geist-mono)] text-foreground-light uppercase">
                      {exp.year}
                    </h4>
                    <div className="flex flex-col lg:flex-row gap-0.5">
                      <div className="w-56 min-w-56">
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[15px] font-normal font-[family-name:var(--font-geist-sans)] text-foreground hover:text-accent hover:underline underline-offset-4 transition-colors duration-200"
                        >
                          {exp.company}
                        </a>
                      </div>
                      <p className="text-[15px] text-foreground-light">
                        {exp.role}
                      </p>
                    </div>
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
