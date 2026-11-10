"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/project";
import { useLanguage } from "@/lib/i18n";

export default function Projects() {
  const { t, lang } = useLanguage();
  const allLabel = t("common.all");

  // Only offer filters backed by the existing project data.
  const filters = [allLabel, ...new Set(projects.flatMap((project) => project.technologies))];
  const [activeFilter, setActiveFilter] = useState(allLabel);
  const stackRef = useRef<HTMLDivElement>(null);

  // Reset filter to "All" when the language changes so the comparison keeps matching.
  useEffect(() => {
    setActiveFilter(allLabel);
  }, [lang, allLabel]);

  const filtered = projects.filter((project) =>
    activeFilter === allLabel || project.technologies.includes(activeFilter)
  );

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    // Use the actual card heights, including wrapped text and the sticky offsets.
    const updateStack = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const stackStyles = getComputedStyle(stack);
      const navHeight = parseFloat(rootStyles.getPropertyValue("--nav-height")) || 80;
      const edge = parseFloat(stackStyles.getPropertyValue("--stack-edge")) || 8;
      const step = parseFloat(stackStyles.getPropertyValue("--stack-step")) || 8;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const fits = Array.from(stack.children).every((item, index) =>
        item.getBoundingClientRect().height + navHeight + edge + index * step + 16 <= viewportHeight
      );
      stack.dataset.stackFits = String(fits);
    };
    const observer = new ResizeObserver(updateStack);
    Array.from(stack.children).forEach((item) => observer.observe(item));
    observer.observe(document.documentElement);
    window.addEventListener("resize", updateStack);
    window.visualViewport?.addEventListener("resize", updateStack);
    updateStack();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStack);
      window.visualViewport?.removeEventListener("resize", updateStack);
    };
  }, [activeFilter]);
  return (
    <section id="projects" className="relative px-6 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-350">
        <SectionHeading number="03" title={t("projects.title")} subtitle={t("projects.subtitle")} />
        <SectionDivider className="my-12" label="FILE_SYSTEM" thick />
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={t("projects.filterAria")}>
          {filters.map((filter) => (
            <button key={filter} type="button" onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`rounded-sm px-3 py-2 font-mono text-xs transition-colors ${activeFilter === filter ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
              {filter}
            </button>
          ))}
        </div>
        <p className="mb-6 font-mono text-xs text-muted-foreground" role="status">{t("projects.status", { filtered: String(filtered.length), total: String(projects.length) })}</p>
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
            {t("projects.moreGitHub")}
          </a>
        </div>
      </div>
    </section>
  );
}
