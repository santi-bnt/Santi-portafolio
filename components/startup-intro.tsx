"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";

export function StartupIntro() {
  const intro = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const element = intro.current;
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!element || !hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || window.location.hash || window.scrollY > 24) {
      hero.dataset.entrance = "complete";
      element.dataset.state = "complete";
      return;
    }

    // Start after mounting, not while streamed HTML is still arriving.
    element.dataset.state = "playing";
    hero.dataset.entrance = "pending";
    const reveal = window.setTimeout(() => { hero.dataset.entrance = "playing"; }, 850);
    const finish = () => {
      window.clearTimeout(reveal);
      hero.dataset.entrance = "playing";
      element.dataset.state = "complete";
    };
    const end = window.setTimeout(finish, 1400);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape" || event.key === "Tab") finish(); };
    const onPreference = () => { if (reduced.matches) finish(); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", finish, { once: true });
    window.addEventListener("wheel", finish, { passive: true, once: true });
    window.addEventListener("touchstart", finish, { passive: true, once: true });
    reduced.addEventListener("change", onPreference);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(end);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      reduced.removeEventListener("change", onPreference);
    };
  }, [pathname]);

  return pathname === "/" ? <div ref={intro} className="startup-intro" data-state="idle" aria-hidden="true">
    <span className="intro-corner">SB<span>.</span></span>
    <div className="intro-name"><span><span>Santiago</span></span><span><span>Benavent<span className="intro-period">.</span></span></span></div>
    <div className="intro-footer"><span>{profile.title}</span><span>Portfolio</span></div>
  </div> : null;
}
