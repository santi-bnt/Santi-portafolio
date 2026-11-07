import Link from "next/link";
import { profile } from "@/data/profile";
import { ExternalLink } from "./ui";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return <header className="site-header"><nav className="nav-shell container" aria-label="Main navigation">
    <Link href="/" className="brand" aria-label="Santiago Benavent — home"><span className="monogram">sb<span>.</span></span><span className="brand-name">Santiago Benavent</span></Link>
    <div className="nav-links">{["Projects", "Skills", "About", "Contact"].map(label => <Link key={label} href={`/#${label.toLowerCase()}`}>{label}</Link>)}</div>
    <div className="nav-actions"><ExternalLink href={profile.github} className="nav-github">GitHub</ExternalLink><ExternalLink href={profile.linkedin} className="nav-linkedin">LinkedIn</ExternalLink>{profile.resumeUrl && <a href={profile.resumeUrl}>Resume</a>}<ThemeToggle /></div>
  </nav></header>;
}
