import { certifications, profile, skills } from "@/data/profile";
import { ExternalLink, SectionHeading } from "./ui";

export function SkillsSection() {
  return <section id="skills" className="section skills-section" aria-label="Technical skills"><div className="container"><SectionHeading number="02" label="Technical toolkit" title="Tools, in context." description="Technologies used in the documented projects above."/><div className="skills-grid">{skills.map(group => <div className="skill-group" key={group.category}><h3>{group.category}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></div></section>;
}

export function EducationSection() {
  return <section id="about" className="section container" aria-label="About and education"><SectionHeading number="03" label="About & education" title="An engineering perspective."/><div className="about-grid"><div className="about-copy"><p>{profile.about}</p></div><div className="education-card"><p className="eyebrow">Education</p><h3>{profile.university}</h3><p>{profile.degree}</p><div><span>Expected graduation</span><strong>{profile.graduation}</strong></div></div></div></section>;
}

export function CertificationsSection() {
  const enabled = certifications.filter(item => item.enabled && item.evidenceUrl);
  if (!enabled.length) return null;
  return <section className="section container" aria-label="Certifications"><h2>Certifications</h2><div className="certifications">{enabled.map(item => <article key={item.name}><h3>{item.name}</h3><p>{item.issuer}</p><ExternalLink href={item.evidenceUrl}>View credential</ExternalLink></article>)}</div></section>;
}

export function ContactSection() {
  return <section id="contact" className="section contact-section" aria-labelledby="contact-heading"><div className="container contact-inner"><div><p className="eyebrow">04 / Let’s connect</p><h2 id="contact-heading">Let’s build something<br/>that works<span className="accent">.</span></h2><p>Interested in internships and research opportunities<br className="desktop-break"/> across software, robotics, embedded systems, AI, and hardware.</p></div><div className="contact-links">{profile.email && <a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<span aria-hidden="true">↗</span></a>}<ExternalLink href={profile.github}>GitHub<span className="contact-handle">santi-bnt</span></ExternalLink><ExternalLink href={profile.linkedin}>LinkedIn<span className="contact-handle">Santiago Benavent</span></ExternalLink></div></div></section>;
}

export function Footer() {
  return <footer className="container footer"><span>© {new Date().getFullYear()} Santiago Benavent Valenzuela</span><span>Software. Hardware. The connections between.</span><a href="#top">Back to top ↑</a></footer>;
}
