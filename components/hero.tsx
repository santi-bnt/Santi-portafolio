import { profile } from "@/data/profile";
import { Arrow, ExternalLink } from "./ui";

export function Hero() {
  return <section className="hero container" aria-labelledby="hero-title"><div className="hero-main">
    <p className="eyebrow"><span className="small-square"/> Software meets hardware</p>
    <h1 id="hero-title">Santiago<br/>Benavent Valenzuela<span className="accent">.</span></h1>
    <p className="hero-title">{profile.title}</p>
    <p className="hero-statement">{profile.hero}</p>
    <p className="hero-description">{profile.introduction}</p>
    <div className="hero-actions"><a href="#projects" className="button primary">View Projects<Arrow /></a><ExternalLink href={profile.github} className="button">GitHub</ExternalLink></div>
    <div className="secondary-actions"><ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink><a href="#contact">Contact<Arrow /></a></div>
  </div><div className="hero-aside"><div className="system-map" role="img" aria-label="Project areas: software and APIs, intelligence and interaction, embedded systems and control, connected across software and hardware.">
    <div className="map-header"><span>ENGINEERING AT THE INTERSECTION</span><span aria-hidden="true">↗</span></div>
    <div className="map-layer"><span className="layer-index">01</span><div><h2>Software</h2><p>Interfaces / APIs / Data</p></div><span className="layer-symbol" aria-hidden="true">&#123; &#125;</span></div>
    <div className="map-connector"><span/>request / response<span/></div>
    <div className="map-layer"><span className="layer-index">02</span><div><h2>Intelligence</h2><p>Voice / Vision / Interaction</p></div><span className="layer-symbol" aria-hidden="true">⌘</span></div>
    <div className="map-connector"><span/>sense / compute / act<span/></div>
    <div className="map-layer"><span className="layer-index">03</span><div><h2>Physical systems</h2><p>Embedded / Robotics / Control</p></div><svg className="layer-symbol" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4m-6 12v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/></svg></div>
    <div className="map-footer"><span className="small-square"/> Built across the stack</div>
  </div><p className="aside-caption">From a browser request to a motor command.<br/>The interesting work is in the connections.</p></div>
  <div className="hero-meta"><span>Tecnológico de Monterrey</span><span>Expected graduation <strong>June 2028</strong></span><a href="#projects">Explore selected work<Arrow /></a></div></section>;
}
