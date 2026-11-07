"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Progressive enhancement: server-rendered content stays readable without JS.
export function MotionController() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    const observed = new Set<Element>();
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "true");
          reveals.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    function scan() {
      document.querySelectorAll<HTMLElement>(".section-heading, .project-content, .project-visual, .small-project, .skill-group, .about-grid, .contact-inner, .project-detail-body > section, .story-step").forEach((element, i) => {
        if (observed.has(element)) return;
        observed.add(element);
        element.dataset.reveal = element.matches(".project-visual, .small-project") ? "scale" : "rise";
        element.style.setProperty("--reveal-delay", `${element.matches(".skill-group, .small-project") ? (i % 3) * 65 : 0}ms`);
        if (reduced.matches || element.getBoundingClientRect().top < innerHeight * 0.96) {
          element.dataset.visible = "true";
        } else {
          reveals.observe(element);
        }
      });
      schedule();
    }

    function update() {
      frame = 0;
      document.body.dataset.scrolled = String(window.scrollY > 24);
      const distance = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
      document.documentElement.dataset.motion = reduced.matches ? "reduced" : "full";
      let scene = "default";
      document.querySelectorAll<HTMLElement>(".project-story").forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < innerHeight * 0.65 && rect.bottom > innerHeight * 0.35) scene = element.dataset.story || "default";
      });
      document.body.dataset.scene = scene;
      document.querySelectorAll<HTMLElement>(".hero-aside, .project-visual").forEach(element => {
        const rect = element.getBoundingClientRect();
        const offset = !reduced.matches && desktop.matches && rect.bottom > 0 && rect.top < innerHeight
          ? Math.max(-9, Math.min(9, (innerHeight / 2 - rect.top - rect.height / 2) * 0.025)) : 0;
        element.style.setProperty("--parallax", `${offset.toFixed(2)}px`);
      });
    }

    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    const mutations = new MutationObserver(scan);
    mutations.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
    scan();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    reduced.addEventListener("change", scan);
    desktop.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      reveals.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", scan);
      desktop.removeEventListener("change", schedule);
    };
  }, [pathname]);

  return <div className="scroll-progress" ref={progress} aria-hidden="true"/>;
}
