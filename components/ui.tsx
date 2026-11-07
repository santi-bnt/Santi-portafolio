import type { ReactNode } from "react";

export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} /></svg>;
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}<Arrow diagonal /></a>;
}

export function TechTags({ items, limit }: { items: string[]; limit?: number }) {
  return <ul className="tags" aria-label="Technologies">{items.slice(0, limit).map(item => <li key={item}>{item}</li>)}</ul>;
}

export function SectionHeading({ number, label, title, description }: { number: string; label: string; title: string; description?: string }) {
  return <div className="section-heading"><div><p className="eyebrow"><span>{number}</span> / {label}</p><h2>{title}</h2></div>{description && <p className="section-description">{description}</p>}</div>;
}
