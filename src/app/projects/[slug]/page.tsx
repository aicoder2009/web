import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectLayout from "@/components/ProjectLayout";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return {};

  return {
    title: `${project.title} | Karthick Arun`,
    description: project.subtitle,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    notFound();
  }

  return <ProjectLayout project={project} />;
}
