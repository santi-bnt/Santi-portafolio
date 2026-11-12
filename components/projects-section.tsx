"use client";

import { useState } from "react";
import { projects, type Category } from "@/data/projects";
import { FeaturedProject, ProjectCard } from "./project-card";
import { SectionHeading } from "./ui";

const filters: (Category | "All")[] = ["All", "Software", "Robotics", "Embedded", "Hardware"];

export function ProjectsSection() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const visible = projects.filter(p => filter === "All" || p.categories.includes(filter));
  const featured = visible.filter(p => p.featured);
  const more = visible.filter(p => !p.featured);
  return <section id="projects" className="section container" aria-labelledby="projects-heading"><SectionHeading number="01" label="Selected work" title="Systems I’m building." description="A closer look at the software, control loops, and hardware behind each project."/><h2 id="projects-heading" className="sr-only">Featured projects</h2><div className="project-filter" role="group" aria-label="Filter projects by engineering area">{filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === "All" && <span>{projects.length}</span>}</button>)}</div><div id="project-results" aria-live="polite"><p className="sr-only">Showing {visible.length} projects for {filter}.</p>{featured.map(project => <FeaturedProject key={project.slug} project={project} index={projects.indexOf(project)}/>)}{more.length > 0 && <div className="more-projects"><div className="more-heading"><h3>More engineering work</h3><span className="eyebrow">Software, RTL & physical systems</span></div><div className="more-grid" data-count={more.length}>{more.map(project => <ProjectCard project={project} key={project.slug}/>)}</div></div>}</div></section>;
}
