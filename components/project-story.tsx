"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Project, EvidenceState } from "@/data/projects";

type StoryStep = { title: string; label: string; description: string; state: EvidenceState };

// Presentation-only selection of existing project evidence. Canonical facts stay in projects.ts.
function getSteps(project: Project): StoryStep[] {
  if (project.slug === "internship-radar") return [
    { title: "Opportunity Discovery", label: "Official sources", description: project.highlights[0], state: "Implemented" },
    { title: "Profile Matching", label: "Fit + eligibility gates", description: project.technicalWork[0].description, state: "Implemented" },
    { title: "Application Tracking", label: "Persistent application state", description: project.technicalWork[1].description, state: "Implemented" },
    { title: "CV Generation", label: "Validated LaTeX → PDF", description: project.technicalWork[2].description, state: "Implemented" },
  ];
  return [
    { title: "Voice / AI", label: "Gemini · optional OpenAI", description: project.technicalWork[1].description, state: "Implemented" },
    { title: "Computer Vision", label: "Camera → visual targets", description: project.built[1], state: "Implemented" },
    { title: "Animated Face", label: "Local UDP → rendered face", description: project.technicalWork[0].description, state: "Implemented" },
    { title: "Raspberry Pi 5", label: "Voice · vision · touchscreen", description: project.built[0], state: "Implemented" },
    { title: "STM32F401", label: "Future UART motion layer", description: project.currentStatus[3].description, state: "Planned" },
    { title: "Custom PCB", label: "KiCad carrier v1.1", description: `${project.built[2]} ${project.technicalWork[2].description}`, state: "In progress" },
  ];
}

export function ProjectStory({ project }: { project: Project }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const steps = getSteps(project);
  const isRobot = project.slug === "cuty";
  const pcb = project.images.find(image => image.src.includes("carrier"));

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
      }
    }, { rootMargin: "-30% 0px -45% 0px", threshold: 0 });
    element.querySelectorAll(".story-step").forEach(step => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return <div className="project-story" data-story={isRobot ? "cuty" : "radar"} ref={root}>
    <div className="story-intro"><p className="eyebrow">Inside the system</p><p>{isRobot ? "One companion. Distinct engineering layers." : "From discovery to a traceable application."}</p></div>
    <div className="story-layout">
      <div className="story-stage" aria-hidden="true">
        <div className="story-stage-top"><span>{isRobot ? "C.U.T.Y. / SYSTEM LAYERS" : "RADAR / APPLICATION PIPELINE"}</span><span>{String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span></div>
        <div className={`story-system ${isRobot ? "robot-system" : "radar-system"}`}>
          {!isRobot && <div className="system-origin"><span className="signal-dot"/> Official career sources</div>}
          <div className="story-nodes">{steps.map((step, index) => <div key={step.title} className={`story-node ${step.state === "Planned" ? "node-planned" : ""}`} data-active={index === active} data-complete={index < active}>
            <span className="node-index">{String(index + 1).padStart(2, "0")}</span><div><strong>{step.title}</strong><span>{step.label}</span></div>{isRobot && <span className="node-state">{step.state}</span>}
          </div>)}</div>
          {isRobot && pcb && <div className="story-pcb" data-active={active === 5}><Image src={pcb.src} alt="" width={160} height={160} sizes="100px"/><span>Real repository Gerber preview<br/>Fabrication pending</span></div>}
        </div>
        <div className="story-stage-caption"><div key={active} className="stage-crossfade"><span className="eyebrow">{steps[active].state}</span><strong>{steps[active].label}</strong></div><span className="stage-caption-note">Architecture view</span></div>
        <div className="story-track">{steps.map((step, index) => <span key={step.title} data-active={index === active}/>)}</div>
      </div>
      <div className="story-steps">{steps.map((step, index) => <section key={step.title} className="story-step" data-step={index} data-active={active === index}>
        <span className="story-step-number">{String(index + 1).padStart(2, "0")}</span><div><span className={`evidence-state state-${step.state.toLowerCase().replace(" ", "-")}`}>{step.state}</span><h4>{step.title}</h4><p>{step.description}</p>{isRobot && index === 3 && <p className="story-caveat">{project.currentStatus[2].description}</p>}</div>
      </section>)}</div>
    </div>
    <p className="story-footnote">{isRobot ? "Implemented software does not establish complete physical validation. STM32 firmware, full movement, PCB fabrication, assembly, and electrical validation remain pending." : project.currentStatus[1].description}</p>
  </div>;
}
