import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { Architecture } from "./architecture";
import { Arrow, ExternalLink, TechTags } from "./ui";
import { ProjectStory } from "./project-story";

export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  return <article className="featured-project"><div className={`project-visual visual-${project.slug}`}>
    <div className="visual-label"><span>PROJECT / {String(index + 1).padStart(2, "0")}</span><span>{project.categories[0]}</span></div>
    {project.images.length ? <figure className={`project-media media-${project.images[0].kind || "diagram"}`}><Image src={project.images[0].src} alt={project.images[0].alt} width={project.images[0].width || 1000} height={project.images[0].height || 1000} sizes="(max-width: 767px) 90vw, 40vw"/><figcaption>{project.images[0].caption}</figcaption></figure> : <Architecture nodes={project.architecture} compact />}
    <div className="visual-bottom"><span>{project.slug === "dc-motor-control" ? "CONTROL_PERIOD_MS = 10" : project.slug === "skiliair" ? "acquire → persist → visualize" : project.slug === "cuty" ? "enclosure design / repository render" : "discover → evaluate → track"}</span><span aria-hidden="true">↗</span></div>
  </div><div className="project-content"><p className="eyebrow">{project.eyebrow}</p><div className="project-title-row"><h3>{project.websiteUrl ? <ExternalLink href={project.websiteUrl}>{project.name}</ExternalLink> : <Link href={`/projects/${project.slug}`}>{project.name}</Link>}</h3><span className="status">{project.status}</span></div><p className="project-description">{project.shortDescription}</p><TechTags items={project.technologies} limit={7}/><ul className="highlights">{project.highlights.map(point => <li key={point}>{point}</li>)}</ul><div className="project-actions">{project.websiteUrl && <ExternalLink href={project.websiteUrl} className="text-link">Visit Website</ExternalLink>}<Link className="text-link" href={`/projects/${project.slug}`}>Explore project<Arrow /></Link><ExternalLink href={project.githubUrl}>View Source</ExternalLink>{project.demoUrl && <ExternalLink href={project.demoUrl}>Live Demo</ExternalLink>}</div></div>{(project.slug === "internship-radar" || project.slug === "cuty") && <ProjectStory project={project}/>}</article>;
}

export function ProjectCard({ project }: { project: Project }) {
  return <article className="small-project"><p className="eyebrow">{project.eyebrow}</p><h3>{project.websiteUrl ? <ExternalLink href={project.websiteUrl}>{project.name}</ExternalLink> : <Link href={`/projects/${project.slug}`}>{project.name}<Arrow diagonal /></Link>}</h3><p>{project.shortDescription}</p>{project.images[0] && <figure className={`small-project-media media-${project.images[0].kind || "diagram"}`}><Link href={`/projects/${project.slug}`}><Image src={project.images[0].src} alt={project.images[0].alt} width={project.images[0].width || 1000} height={project.images[0].height || 1000} sizes="(max-width: 767px) 85vw, 30vw"/></Link><figcaption>{project.images[0].caption}</figcaption></figure>}<TechTags items={project.technologies} limit={5}/><div className="small-project-links">{project.websiteUrl && <ExternalLink href={project.websiteUrl}>Visit Website</ExternalLink>}<Link href={`/projects/${project.slug}`}>Project details<Arrow /></Link><ExternalLink href={project.githubUrl}>View Source</ExternalLink></div></article>;
}
