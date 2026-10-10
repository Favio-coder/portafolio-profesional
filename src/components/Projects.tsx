"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/project";

// Only offer filters backed by the existing project data.
const filters = ["Todos", ...new Set(projects.flatMap((project) => project.technologies))];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const stackRef = useRef<HTMLDivElement>(null);
  const filtered = projects.filter((project) =>
    activeFilter === "Todos" || project.technologies.includes(activeFilter)
  );

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    // Use the actual card heights, including wrapped text and the sticky offsets.
    const updateStack = () => {
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"));
      const fits = Array.from(stack.children).every((item, index) =>
        item.getBoundingClientRect().height + navHeight + 16 + index * 18 + 16 <= window.innerHeight
      );
      stack.dataset.stackFits = String(fits);
    };
    const observer = new ResizeObserver(updateStack);
    Array.from(stack.children).forEach((item) => observer.observe(item));
    observer.observe(document.documentElement);
    window.addEventListener("resize", updateStack);
    updateStack();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStack);
    };
  }, [activeFilter]);
  return (
    <section id="projects" className="relative px-6 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-350">
        <SectionHeading number="03" title="PROYECTOS" subtitle="Trabajos seleccionados — software, cloud, data e IA" />
        <SectionDivider className="my-12" label="FILE_SYSTEM" thick />
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos por tecnología">
          {filters.map((filter) => (
            <button key={filter} type="button" onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-sm px-3 py-2 font-mono text-xs transition-colors ${activeFilter === filter ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
              {filter}
            </button>
          ))}
        </div>
        <p className="mb-6 font-mono text-xs text-muted-foreground" role="status">{filtered.length} archivos / {projects.length} proyectos</p>
        <div ref={stackRef} className="project-stack">
          {filtered.map((project, index) => (
            <div key={project.id} className="project-stack-item" style={{ "--stack-index": index } as CSSProperties}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="https://github.com/Favio-coder" target="_blank" rel="noopener noreferrer"
            className="inline-flex border border-border px-6 py-3 font-mono text-sm hover:bg-muted">
            Más proyectos en GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
