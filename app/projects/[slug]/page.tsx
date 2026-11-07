import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Architecture } from "@/components/architecture";
import { Arrow, ExternalLink, TechTags } from "@/components/ui";
import { projects } from "@/data/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return project ? { title: project.name, description: project.shortDescription, openGraph: { title: `${project.name} | Santiago Benavent`, description: project.shortDescription } } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return <main id="main-content" className="container project-page"><Link href="/#projects" className="back-link">← All projects</Link><header className="project-page-header"><p className="eyebrow">{project.eyebrow}</p><h1>{project.name.endsWith(".") ? project.name.slice(0, -1) : project.name}<span className="accent">.</span></h1><p className="project-lead">{project.shortDescription}</p><div className="detail-meta"><span className="status">{project.status}</span>{project.websiteUrl && <ExternalLink href={project.websiteUrl} className="text-link">Visit Website</ExternalLink>}<ExternalLink href={project.githubUrl} className="text-link">View Source</ExternalLink>{project.demoUrl && <ExternalLink href={project.demoUrl}>Live Demo</ExternalLink>}</div></header><div className="project-detail-grid"><div className="project-detail-body">
    <section aria-labelledby="overview"><p className="eyebrow">01 / Context</p><h2 id="overview">Overview</h2><p>{project.description}</p><h3>Problem / Goal</h3><p>{project.goal}</p></section>
    <section aria-labelledby="built"><p className="eyebrow">02 / Implementation</p><h2 id="built">What I built</h2>{(project.slug === "tic-cat-toe" || project.slug === "matt") && <p className="team-note">Team project. The repository documents the system; individual contribution boundaries are not fully recorded.</p>}<ul className="detail-list">{project.built.map(item => <li key={item}>{item}</li>)}</ul></section>
    <section aria-labelledby="technical"><p className="eyebrow">03 / Engineering decisions</p><h2 id="technical">Key technical work</h2><div className="technical-work">{project.technicalWork.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>
    <section aria-labelledby="status"><p className="eyebrow">04 / Evidence & boundaries</p><h2 id="status">Current status</h2><div className="status-list">{project.currentStatus.map((item, i) => <div key={i}><span className={`evidence-state state-${item.state.toLowerCase().replace(" ", "-")}`}>{item.state}</span><p>{item.description}</p></div>)}</div></section>
    {project.images.length > 0 && <section aria-labelledby="materials"><h2 id="materials">Project material</h2>{project.images.map(img => <figure className={`detail-image media-${img.kind || "diagram"}`} key={img.src}><Image src={img.src} alt={img.alt} width={img.width || 1000} height={img.height || 1000} sizes="(max-width: 767px) 90vw, 60vw"/><figcaption>{img.caption} <a href={img.sourceUrl} target="_blank" rel="noopener noreferrer">Original source ↗</a></figcaption></figure>)}</section>}
    <section aria-labelledby="sources"><h2 id="sources">Repository & documentation</h2><ul className="source-list">{project.sources.map(source => <li key={source.url}><ExternalLink href={source.url}>{source.label}</ExternalLink></li>)}</ul></section>
  </div><aside className="detail-sidebar"><div><p className="eyebrow">System map</p><h2>Architecture</h2><Architecture nodes={project.architecture}/><p className="architecture-note">Simplified from repository documentation. Dashed blocks indicate planned work.</p></div><div><h2>Technologies</h2><TechTags items={project.technologies}/></div></aside></div><Link className="next-project" href={`/projects/${nextProject.slug}`}><div><p className="eyebrow">Next project</p><h2>{nextProject.name}</h2></div><Arrow/></Link></main>;
}
